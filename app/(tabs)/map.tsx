import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform, StyleSheet, ActivityIndicator, TextInput, Keyboard } from 'react-native';
import { Shield, Search, Bell, Flame, MapPin, Layers, Send, Ghost, ChevronRight, X, Navigation, Route, Compass } from 'lucide-react-native';
import MapComponent from '../../components/MapComponent';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// Helper to provide SQLite interface that doesn't crash on web, using AsyncStorage as fallback
const getDatabase = async (dbName: string) => {
  return {
    execAsync: async () => {},
    getAllAsync: async (query: string, params: any[]) => {
      try {
        const data = await AsyncStorage.getItem(`@WebDB_${dbName}`);
        if (data) {
          const parsed = JSON.parse(data);
          // primitive filter for province
          return parsed.filter((c: any) => c.province === params[0]);
        }
      } catch(e) {}
      return [];
    },
    runAsync: async (query: string, params: any[]) => {
      try {
        let current = [];
        const data = await AsyncStorage.getItem(`@WebDB_${dbName}`);
        if (data) current = JSON.parse(data);
        
        const newClub = {
          id: params[0], country: params[1], province: params[2], city: params[3],
          name: params[4], type: params[5], match: params[6], image: params[7],
          lat: params[8], lng: params[9]
        };
        
        const index = current.findIndex(c => c.id === newClub.id);
        if (index >= 0) current[index] = newClub;
        else current.push(newClub);
        
        await AsyncStorage.setItem(`@WebDB_${dbName}`, JSON.stringify(current));
      } catch(e) {}
    }
  };
};

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;
  const distInKm = 12742 * Math.asin(Math.sqrt(a)); 
  return distInKm; // returns kilometers
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1556616428-f60fa6e1ab26?w=300&h=300&fit=crop'
];

interface Club {
  id: string | number;
  name: string;
  type: string;
  dist: string;
  distanceNum: number;
  match: string;
  image: string;
  lat: number;
  lng: number;
  status?: 'Open' | 'Busy' | 'Closed';
}

export default function MapScreen() {
  const router = useRouter();
  const [selectedClubPreview, setSelectedClubPreview] = useState<Club | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<any[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [setupPhase, setSetupPhase] = useState<'checking' | 'installing' | 'done'>('checking');
  const [setupMessage, setSetupMessage] = useState('Checking installation...');
  const [isNightGuardActive, setIsNightGuardActive] = useState(false);

  const [isNavigating, setIsNavigating] = useState(false);
  const [reportingStatusClub, setReportingStatusClub] = useState<Club | null>(null);

  const handleReportStatus = (status: 'Open' | 'Busy' | 'Closed') => {
    if (!reportingStatusClub) return;
    
    // Update local state
    const updatedClubs = clubs.map(c => 
      c.id === reportingStatusClub.id ? { ...c, status } : c
    );
    setClubs(updatedClubs);
    
    if (selectedClubPreview && selectedClubPreview.id === reportingStatusClub.id) {
      setSelectedClubPreview({ ...selectedClubPreview, status });
    }
    
    setReportingStatusClub(null);
    alert('Thank you for your report!');
  };
  const [navigationSteps, setNavigationSteps] = useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [navDestination, setNavDestination] = useState<Club | null>(null);
  const [centerMapTrigger, setCenterMapTrigger] = useState(0);

  const fetchClubsForLocation = async (lat: number, lng: number, forceInstall: boolean = false) => {
    setIsLoading(true);
    setUserLocation({ latitude: lat, longitude: lng });

    try {
      // Reverse geocode to get structural hierarchy
      let countryName = 'Unknown';
      let regionName = 'Unknown';
      let cityName = 'Unknown';

      if (forceInstall) setSetupMessage('Detecting your country...');

      try {
         const geoCode = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
         if (geoCode.length > 0) {
            const info = geoCode[0];
            if (info.country) countryName = info.country.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');
            if (info.region) regionName = info.region;
            if (info.city || info.subregion) cityName = info.city || info.subregion || 'Unknown';
         }
      } catch(e) {}

      const dbName = `clubs_${countryName}.db`;
      const db = await getDatabase(dbName);

      // Initialize table
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS clubs (
          id TEXT PRIMARY KEY,
          country TEXT,
          province TEXT,
          city TEXT,
          name TEXT,
          type TEXT,
          match TEXT,
          image TEXT,
          lat REAL,
          lng REAL
        );
      `);

      // Load offline clubs
      let localClubs: Club[] = [];
      try {
        // Fetch all clubs for the country to ensure we get all the data downloaded for South Africa (or local area)
        const cachedClubs = await db.getAllAsync<any>(
          `SELECT * FROM clubs`, 
          []
        );
        
        if (cachedClubs.length > 0) {
           const updatedLocalClubs = cachedClubs.map((club: any) => {
              const distKm = getDistance(lat, lng, club.lat, club.lng);
              let distStr = "";
              if (distKm < 1) {
                distStr = `${Math.round(distKm * 1000)}m`;
              } else {
                distStr = `${distKm.toFixed(1)}km`;
              }
              const randomStatus = Math.random();
              let status: 'Open' | 'Busy' | 'Closed' = 'Open';
              if (randomStatus > 0.8) status = 'Closed';
              else if (randomStatus > 0.5) status = 'Busy';
              return { 
                id: club.id,
                name: club.name,
                type: club.type,
                dist: distStr,
                distanceNum: distKm,
                match: club.match,
                image: club.image,
                lat: club.lat,
                lng: club.lng,
                status
              };
           }).sort((a: Club, b: Club) => a.distanceNum - b.distanceNum);
           
           setClubs(updatedLocalClubs.slice(0, 30));
           localClubs = updatedLocalClubs;
           
           if (!forceInstall) {
             setIsLoading(false);
           }
        }
      } catch(e) {}

      // If we are forcing install (first time setup) OR no clubs found locally at all
      if (forceInstall || localClubs.length === 0) {
        if (forceInstall) setSetupMessage('Downloading global clubs database for your local area...');
        
        let query = `[out:json];
          (
            node["amenity"~"nightclub|bar|pub"](around:200000, ${lat}, ${lng});
            way["amenity"~"nightclub|bar|pub"](around:200000, ${lat}, ${lng});
          );
          out center;`;
          
        if (countryName === 'south_africa' || (lat < -22 && lat > -35 && lng > 16 && lng < 33)) {
          if (forceInstall) setSetupMessage('Downloading all clubs for South Africa...');
          query = `[out:json][timeout:90];
            area["ISO3166-1"="ZA"][admin_level=2]->.searchArea;
            (
              node["amenity"~"nightclub|bar|pub"](area.searchArea);
              way["amenity"~"nightclub|bar|pub"](area.searchArea);
            );
            out center;`;
        }
        
        let data = { elements: [] };
        try {
          const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query
          });
          data = await response.json();
        } catch (fetchError) {
          console.warn('Overpass API failed, using fallback locations:', fetchError);
          // provide a few fallback elements near Johannesburg if fetch fails
          data = {
            elements: [
              {
                id: 'fallback_1',
                lat: -26.107,
                lon: 28.056,
                tags: { name: 'Taboo Night Club', amenity: 'nightclub' }
              },
              {
                id: 'fallback_2',
                lat: -26.141,
                lon: 28.044,
                tags: { name: 'The Vault', amenity: 'nightclub' }
              },
              {
                id: 'fallback_3',
                lat: -26.098,
                lon: 28.053,
                tags: { name: 'Altitude Beach', amenity: 'bar' }
              },
              {
                id: 'fallback_4',
                lat: -26.113,
                lon: 28.048,
                tags: { name: 'Truth Nightclub', amenity: 'nightclub' }
              }
            ]
          };
        }
        
        if (forceInstall) setSetupMessage('Creating local database...');
        let fetchedClubs: Club[] = data.elements
          .filter((el: any) => el.tags && el.tags.name)
          .map((el: any, index: number) => {
             const clubLat = el.lat || el.center?.lat;
             const clubLng = el.lon || el.center?.lon;
             const distKm = getDistance(lat, lng, clubLat, clubLng);
             let distStr = "";
             if (distKm < 1) {
               distStr = `${Math.round(distKm * 1000)}m`;
             } else {
               distStr = `${distKm.toFixed(1)}km`;
             }
             const randomStatus = Math.random();
             let status: 'Open' | 'Busy' | 'Closed' = 'Open';
             if (randomStatus > 0.8) status = 'Closed';
             else if (randomStatus > 0.5) status = 'Busy';
             const isLive = Math.random() > 0.8;
             const hasFlashDrop = !isLive && Math.random() > 0.8;
             return {
               id: el.id,
               name: el.tags.name,
               type: el.tags.amenity === 'nightclub' ? 'Nightclub' : (el.tags.amenity === 'pub' ? 'Pub' : 'Bar'),
               dist: distStr,
               distanceNum: distKm,
               match: `${Math.floor(80 + Math.random() * 18)}%`,
               image: fallbackImages[index % fallbackImages.length],
               lat: clubLat,
               lng: clubLng,
               status,
               isLive,
               hasFlashDrop
             };
          });
        
        fetchedClubs.sort((a, b) => a.distanceNum - b.distanceNum);
        
        try {
          for (const club of fetchedClubs) {
            await db.runAsync(
              `INSERT OR REPLACE INTO clubs (id, country, province, city, name, type, match, image, lat, lng) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [club.id.toString(), countryName, regionName, cityName, club.name, club.type, club.match, club.image, club.lat, club.lng]
            );
          }
        } catch(e) {}
        
        fetchedClubs = fetchedClubs.slice(0, 30);
        setClubs(fetchedClubs);
      }

      const displayClubs = forceInstall || localClubs.length === 0 ? clubs : localClubs;
      
      // We need to re-evaluate what clubs are displayed to draw the route
      // Let's rely on state setClubs but we can find nearest manually here just to build route
      if (!forceInstall && localClubs.length > 0) {
        // do route from local
        // getRoute(lat, lng, localClubs[0]);
      } else if (clubs.length === 0) { // meaning we just fetched it but clubs isn't updated in closure
        // we'll leave it to the next render if possible or use the fetched one
      }
      
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoute = async (lat: number, lng: number, nearest: Club, startNav: boolean = false) => {
    if (!nearest || !Number.isFinite(lat) || !Number.isFinite(lng)) return;

    const requestRoute = async (profile: 'driving' | 'foot') => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      try {
        const routeRes = await fetch(
          `https://router.project-osrm.org/route/v1/${profile}/${lng},${lat};${nearest.lng},${nearest.lat}?overview=full&geometries=geojson&steps=true`,
          { signal: controller.signal }
        );

        if (!routeRes.ok) {
          throw new Error(`OSRM request failed: ${routeRes.status}`);
        }

        const routeData = await routeRes.json();
        if (!routeData?.routes?.length) {
          throw new Error('No route returned');
        }

        return routeData;
      } finally {
        clearTimeout(timeoutId);
      }
    };

    try {
      let routeData;
      try {
        routeData = await requestRoute('driving');
      } catch {
        routeData = await requestRoute('foot');
      }

      const primaryRoute = routeData.routes[0];
      const coords = primaryRoute.geometry.coordinates.map((c: any) => ({
        latitude: c[1],
        longitude: c[0]
      }));

      setRouteCoordinates(coords);

      if (startNav && primaryRoute.legs?.length > 0) {
        setNavigationSteps(primaryRoute.legs[0].steps || []);
        setCurrentStepIndex(0);
        setNavDestination(nearest);
        setIsNavigating(true);
        startLocationTracking(nearest);
      }
    } catch (error) {
      console.warn('Route fetch failed', error);
      setRouteCoordinates([]);
      if (startNav) {
        setNavigationSteps([]);
        setIsNavigating(false);
      }
    }
  }

  const startLocationTracking = async (destination: Club) => {
    // We now have a global location watcher in useEffect, 
    // so no need to start a new one here.
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setNavigationSteps([]);
    setNavDestination(null);
    setRouteCoordinates([]);
  };

  useEffect(() => {
    if (isNavigating && navigationSteps.length > 0 && currentStepIndex < navigationSteps.length && userLocation) {
      const currentStep = navigationSteps[currentStepIndex];
      const stepLocation = currentStep.maneuver.location; // [lng, lat]
      const dist = getDistance(userLocation.latitude, userLocation.longitude, stepLocation[1], stepLocation[0]);
      
      // If within 50 meters of the maneuver point, advance
      if (dist < 0.05) {
        if (currentStepIndex < navigationSteps.length - 1) {
          setCurrentStepIndex(currentStepIndex + 1);
        } else {
          stopNavigation();
          alert("You have arrived at your destination!");
        }
      }
    }
  }, [userLocation, isNavigating, navigationSteps, currentStepIndex]);

  /*
  useEffect(() => {
    if (clubs.length > 0 && routeCoordinates.length === 0 && userLocation) {
      getRoute(userLocation.latitude, userLocation.longitude, clubs[0]);
    }
  }, [clubs, userLocation]);
  */

  useEffect(() => {
    let globalSubscription: Location.LocationSubscription | null = null;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        setSetupPhase('done');
        return;
      }

      // Use actual high-accuracy location initially
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;
      
      // Keep location updated in real-time
      globalSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 10,
          timeInterval: 2000,
        },
        (loc) => {
          setUserLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
        }
      );
      
      // Check if installed
      const isInstalled = await AsyncStorage.getItem('@NightGuard_Installed_v2');
      if (!isInstalled) {
        setSetupPhase('installing');
        await fetchClubsForLocation(lat, lng, true);
        await AsyncStorage.setItem('@NightGuard_Installed_v2', 'true');
        setSetupPhase('done');
      } else {
        setSetupPhase('done');
        await fetchClubsForLocation(lat, lng, false);
      }
    })();
    return () => {
      if (globalSubscription) {
        globalSubscription.remove();
      }
    };
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await Location.geocodeAsync(searchQuery);
      if (results.length > 0) {
        const { latitude, longitude } = results[0];
        await fetchClubsForLocation(latitude, longitude);
      } else {
        alert("Location not found");
      }
    } catch (e) {
      alert("Error searching location");
    } finally {
      setIsSearching(false);
    }
  };

  if (setupPhase === 'checking' || setupPhase === 'installing') {
    return (
      <View className="flex-1 bg-[#0D0F14] items-center justify-center px-8">
        <Image source={{uri: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=300&h=300&fit=crop'}} className="absolute inset-0 opacity-20" blurRadius={10} />
        <ActivityIndicator size="large" color="#D900FF" />
        <Text className="text-white mt-6 font-black text-2xl text-center tracking-wider">NIGHTGUARD</Text>
        <Text className="text-[#D900FF] mt-2 font-bold text-lg text-center uppercase tracking-widest">Setup</Text>
        <Text className="text-gray-300 mt-4 text-center font-medium leading-relaxed">{setupMessage}</Text>
      </View>
    );
  }

  if (!userLocation) {
    return (
      <View className="flex-1 bg-[#0D0F14] items-center justify-center">
        <ActivityIndicator size="large" color="#D900FF" />
      </View>
    );
  }

  const nearestClub = clubs.length > 0 ? clubs[0] : null;
  const nearbyClubs = clubs.length > 1 ? clubs.slice(1) : [];

  return (
    <View className="flex-1 bg-[#0D0F14]">
      {/* Background Map View */}
      <View className="absolute inset-0">
        <MapComponent 
          CLUBS={clubs} 
          userLocation={userLocation} 
          routeCoordinates={routeCoordinates} 
          onClubPress={(club) => setSelectedClubPreview(club)} 
          isNavigating={isNavigating}
          centerMapTrigger={centerMapTrigger}
        />
        {/* Dark Map Overlay for Aesthetics */}
        <View className="absolute inset-0 bg-[#0D0F14]/20" pointerEvents="none" />
      </View>


      {/* Navigation HUD */}
      {isNavigating && navigationSteps.length > 0 && currentStepIndex < navigationSteps.length && (
        <View className="absolute top-12 left-4 right-4 z-[60]">
          <View className="bg-[#0D0F14]/90 backdrop-blur-xl border border-white/20 rounded-[32px] p-6 flex-row items-center shadow-[0_0_30px_rgba(204,255,0,0.2)]">
            <View className="w-16 h-16 bg-[#D900FF]/20 rounded-2xl items-center justify-center border border-[#D900FF]/30">
                <Route size={32} color="#D900FF" />
            </View>
            <View className="flex-1 ml-4">
                <Text className="text-white text-2xl font-black">{navigationSteps[currentStepIndex].maneuver?.modifier ? navigationSteps[currentStepIndex].maneuver.modifier.replace('-', ' ').toUpperCase() : 'PROCEED'}</Text>
                <Text className="text-white/70 text-base font-bold mt-1" numberOfLines={2}>{navigationSteps[currentStepIndex].name || 'Unnamed road'}</Text>
            </View>
            <TouchableOpacity 
              className="w-12 h-12 bg-red-500/20 rounded-full items-center justify-center border border-red-500/50 ml-2"
              onPress={stopNavigation}
            >
              <X size={24} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Top Header */}
      {!isNavigating && (
      <View className="absolute top-12 left-0 right-0 px-4 flex-row justify-between items-center z-50" pointerEvents="box-none">
        
        {isSearching ? (
           <View className="flex-1 flex-row items-center bg-[#0D0F14]/80 backdrop-blur-md border border-white/20 rounded-full px-4 h-12 shadow-lg">
              <Search size={20} color="#D900FF" />
              <TextInput 
                 className="flex-1 text-white font-bold ml-2 h-full"
                 placeholder="Search city like 'Middelburg'"
                 placeholderTextColor="#aaa"
                 value={searchQuery}
                 onChangeText={setSearchQuery}
                 onSubmitEditing={() => {
                   Keyboard.dismiss();
                   handleSearch();
                 }}
                 autoFocus={true}
                 returnKeyType="search"
              />
              <TouchableOpacity onPress={() => setIsSearching(false)}>
                 <X size={20} color="#fff" />
              </TouchableOpacity>
           </View>
        ) : (
          <>
            <View className="flex-row items-center gap-3">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }} className="w-12 h-12 rounded-full border-2 border-white/20" />
              <TouchableOpacity 
                onPress={() => setIsNightGuardActive(!isNightGuardActive)}
                onLongPress={() => router.push('/nightguard')}
                delayLongPress={400}
                className={`flex-row items-center border rounded-full px-4 py-2 gap-2 shadow-lg ${
                  isNightGuardActive 
                    ? 'bg-[#D900FF]/20 border-[#D900FF] shadow-[#D900FF]/30 backdrop-blur-md' 
                    : 'bg-[#0D0F14]/40 border-white/10 backdrop-blur-md'
                }`}
              >
                 <Shield size={16} color={isNightGuardActive ? '#D900FF' : '#8e8e93'} />
                 <Text className={`font-bold text-sm ${isNightGuardActive ? 'text-white' : 'text-[#8e8e93]'}`}>NightGuard</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row gap-3">
               <TouchableOpacity 
                  className="w-12 h-12 rounded-full bg-[#0D0F14]/40 backdrop-blur-md border border-white/10 items-center justify-center shadow-lg"
                  onPress={() => setIsSearching(true)}
               >
                 <Search size={20} color="#fff" />
               </TouchableOpacity>
               <TouchableOpacity className="w-12 h-12 rounded-full bg-[#0D0F14]/40 backdrop-blur-md border border-white/10 items-center justify-center relative shadow-lg">
                 <Bell size={20} color="#fff" />
                 <View className="absolute -top-1 -right-1 bg-[#FF0080] w-5 h-5 rounded-full items-center justify-center border-2 border-[#0D0F14]">
                   <Text className="text-white text-[10px] font-bold">3</Text>
                 </View>
               </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      )}

      {/* Nearest Club Top Card */}
      {!isNavigating && nearestClub && (
        <View className="absolute top-32 left-4 right-4 z-50">
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => setSelectedClubPreview(nearestClub)}
            className="bg-[#0D0F14]/80 backdrop-blur-xl border border-[#FF0080]/30 rounded-[32px] p-4 flex-row shadow-[0_0_25px_rgba(255,0,85,0.15)] overflow-hidden relative"
          >
             <View className="absolute top-0 right-0 w-32 h-32 bg-[#FF0080]/10 rounded-bl-full" />
             <Image source={{ uri: nearestClub.image }} className="w-28 h-28 rounded-[24px]" />
             <View className="flex-1 ml-5 justify-center">
                <View className="flex-row justify-between items-start mb-1">
                   <Text className="text-white/50 text-[10px] font-extrabold tracking-[0.2em] uppercase">Nearest Club</Text>
                </View>
                <Text className="text-white text-2xl font-black mb-1 tracking-tight" numberOfLines={1}>{nearestClub.name}</Text>
                <View className="flex-row items-center gap-3 mb-3">
                   <View className="bg-white/10 px-2 py-0.5 rounded-md">
                      <Text className="text-white/90 text-[11px] font-bold">{nearestClub.type}</Text>
                   </View>
                   <View className="flex-row items-center gap-1">
                      <MapPin size={12} color="#D900FF" />
                      <Text className="text-[#D900FF] text-xs font-bold">{nearestClub.dist} away</Text>
                   </View>
                   <View className="flex-row items-center gap-1">
                      <Flame size={12} color="#FF0080" />
                      <Text className="text-[#FF0080] font-bold text-xs">{nearestClub.match}</Text>
                   </View>
                </View>
                <Text className="text-white/60 text-[12px] font-medium leading-4 pr-2" numberOfLines={2}>Get ready for an amazing night at {nearestClub.name} tonight!</Text>
             </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Right Action Buttons */}
      {!isNavigating && (
      <View className="absolute top-[45%] right-4 gap-4 z-40" pointerEvents="box-none">
         <TouchableOpacity className="w-14 h-14 rounded-full bg-[#0D0F14]/60 backdrop-blur-md border border-white/10 items-center justify-center shadow-lg">
            <Layers size={24} color="#fff" />
         </TouchableOpacity>
         <TouchableOpacity 
           className="w-14 h-14 rounded-full bg-[#0D0F14]/60 backdrop-blur-md border border-white/10 items-center justify-center shadow-lg"
           onPress={() => setCenterMapTrigger(prev => prev + 1)}
         >
            <Compass size={24} color="#fff" />
         </TouchableOpacity>
         <TouchableOpacity className="w-14 h-14 rounded-full bg-[#0D0F14]/60 backdrop-blur-md border border-white/10 items-center justify-center shadow-lg">
            <Ghost size={24} color="#fff" />
         </TouchableOpacity>
      </View>
      )}

      {/* Bottom Sheet UI */}
      {!isNavigating && (
      <View className="absolute bottom-0 w-full pt-20 pb-[120px] z-40 bg-gradient-to-t from-black via-black/90 to-transparent" pointerEvents="box-none">
         <Text className="text-white text-[24px] font-black px-6 mb-4 tracking-tight drop-shadow-md">Clubs Nearby</Text>
         {nearbyClubs.length > 0 ? (
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}>
              {nearbyClubs.map((club) => (
                 <TouchableOpacity key={club.id} activeOpacity={0.8} onPress={() => setSelectedClubPreview(club)}>
                   <View className="bg-[#0D0F14]/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-3 flex-row items-center w-[300px] shadow-xl">
                      <Image source={{ uri: club.image }} className="w-20 h-20 rounded-[24px]" />
                      <View className="flex-1 ml-4 py-1 justify-between h-[80px]">
                         <View>
                            <View className="flex-row justify-between items-start">
                               <Text className="text-white font-bold tracking-tight text-lg mb-0.5" numberOfLines={1}>{club.name}</Text>
                               <View className="flex-row items-center gap-1 mt-1">
                                  <Flame size={12} color="#FF0080" />
                                  <Text className="text-[#FF0080] font-bold text-xs">{club.match}</Text>
                               </View>
                            </View>
                            <View className="flex-row items-center gap-2 mt-0.5">
                               <View className="bg-white/10 self-start px-2 py-0.5 rounded-md">
                                  <Text className="text-white/80 text-[10px] font-bold">{club.type}</Text>
                               </View>
                               {club.status && (
                                  <View className="flex-row items-center gap-1">
                                     <View className={`w-2 h-2 rounded-full ${club.status === 'Open' ? 'bg-[#D900FF]' : club.status === 'Busy' ? 'bg-[#FFAA00]' : 'bg-[#FF3333]'}`} />
                                     <Text className="text-white/80 text-[10px] font-bold">{club.status}</Text>
                                  </View>
                               )}
                            </View>
                         </View>
                         <View className="flex-row justify-between items-center mt-auto">
                            <View className="flex-row items-center gap-1">
                               <MapPin size={12} color="#D900FF" />
                               <Text className="text-[#D900FF] text-xs font-bold">{club.dist}</Text>
                            </View>
                            <TouchableOpacity className="w-8 h-8 rounded-full bg-white/5 items-center justify-center border border-white/10" onPress={() => setSelectedClubPreview(club)}>
                               <ChevronRight size={16} color="#fff" />
                            </TouchableOpacity>
                         </View>
                      </View>
                   </View>
                 </TouchableOpacity>
              ))}
           </ScrollView>
         ) : (
            <Text className="text-white/50 px-6">No more clubs found around this area.</Text>
         )}
      </View>
      )}

      {/* Selected Club Preview Modal */}
      {selectedClubPreview && (
        <View className="absolute inset-0 z-[100] justify-center items-center px-6">
          <TouchableOpacity 
            className="absolute inset-0 bg-[#0D0F14]/60 backdrop-blur-sm" 
            activeOpacity={1} 
            onPress={() => setSelectedClubPreview(null)} 
          />
          <View className="bg-[#11131A] border border-white/10 rounded-[32px] w-full overflow-hidden shadow-2xl">
            <Image source={{ uri: selectedClubPreview.image }} className="w-full h-48" />
            <TouchableOpacity 
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0D0F14]/50 items-center justify-center"
              onPress={() => setSelectedClubPreview(null)}
            >
              <X size={16} color="#fff" />
            </TouchableOpacity>
            <View className="p-6">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-white text-2xl font-black flex-1 pr-4">{selectedClubPreview.name}</Text>
                <View className="bg-[#FF0080]/20 px-2 py-1 rounded-md flex-row items-center gap-1">
                  <Flame size={12} color="#FF0080" />
                  <Text className="text-[#FF0080] font-bold text-xs">{selectedClubPreview.match}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center gap-3 mb-6">
                <View className="flex-row items-center gap-2">
                   <View className="bg-white/10 px-2 py-1 rounded-md">
                      <Text className="text-white/90 text-xs font-bold">{selectedClubPreview.type}</Text>
                   </View>
                   {selectedClubPreview.status && (
                      <View className="flex-row items-center gap-1.5 ml-2">
                         <View className={`w-2.5 h-2.5 rounded-full ${selectedClubPreview.status === 'Open' ? 'bg-[#D900FF]' : selectedClubPreview.status === 'Busy' ? 'bg-[#FFAA00]' : 'bg-[#FF3333]'}`} />
                         <Text className="text-white/90 text-xs font-bold">{selectedClubPreview.status}</Text>
                      </View>
                   )}
                </View>
                <View className="flex-row items-center gap-1">
                   <MapPin size={14} color="#D900FF" />
                   <Text className="text-[#D900FF] text-sm font-bold">{selectedClubPreview.dist} away</Text>
                </View>
              </View>

              <View className="flex-row gap-3 mb-4">
                <TouchableOpacity 
                  className="flex-1 bg-[#1A1F2B] border border-[#11131A] py-4 rounded-xl flex-row justify-center items-center gap-2"
                  onPress={() => {
                    setSelectedClubPreview(null);
                    getRoute(userLocation?.latitude || 0, userLocation?.longitude || 0, selectedClubPreview, true);
                  }}
                >
                  <Navigation size={18} color="#fff" />
                  <Text className="text-white font-bold text-base">Navigate</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="flex-1 bg-[#D900FF] py-4 rounded-xl flex-row justify-center items-center gap-2 shadow-[0_0_15px_rgba(217,0,255,0.3)]"
                  onPress={() => {
                    setSelectedClubPreview(null);
                    router.push(`/club/${selectedClubPreview.id}`);
                  }}
                >
                  <Text className="text-[#0D0F14] font-black text-base uppercase tracking-wider">Lobby</Text>
                  <ChevronRight size={18} color="#0D0F14" />
                </TouchableOpacity>
              </View>
              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 bg-[#1A1F2B] border border-white/5 py-3 rounded-xl flex-row justify-center items-center gap-2">
                   <Text className="text-white/80 font-bold text-sm">Save</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-[#1A1F2B] border border-white/5 py-3 rounded-xl flex-row justify-center items-center gap-2">
                   <Text className="text-white/80 font-bold text-sm">Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Reporting Status Modal */}
      {reportingStatusClub && (
        <View className="absolute inset-0 z-[110] justify-center items-center px-6">
          <TouchableOpacity 
            className="absolute inset-0 bg-[#0D0F14]/80 backdrop-blur-md" 
            activeOpacity={1} 
            onPress={() => setReportingStatusClub(null)} 
          />
          <View className="bg-[#11131A] border border-white/10 rounded-[32px] w-full p-6 shadow-2xl">
             <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-xl font-black">Report Status</Text>
                <TouchableOpacity 
                  className="w-8 h-8 rounded-full bg-white/5 items-center justify-center"
                  onPress={() => setReportingStatusClub(null)}
                >
                  <X size={16} color="#fff" />
                </TouchableOpacity>
             </View>

             <Text className="text-white/60 mb-6 text-sm">How busy is {reportingStatusClub.name} right now?</Text>

             <View className="gap-3">
                <TouchableOpacity 
                  className="bg-[#222] border border-white/10 py-4 rounded-xl flex-row justify-center items-center gap-2"
                  onPress={() => handleReportStatus('Open')}
                >
                  <View className="w-3 h-3 rounded-full bg-[#D900FF]" />
                  <Text className="text-white font-bold text-base">Open & Chill</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="bg-[#222] border border-white/10 py-4 rounded-xl flex-row justify-center items-center gap-2"
                  onPress={() => handleReportStatus('Busy')}
                >
                  <View className="w-3 h-3 rounded-full bg-[#FFAA00]" />
                  <Text className="text-white font-bold text-base">Getting Busy</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="bg-[#222] border border-white/10 py-4 rounded-xl flex-row justify-center items-center gap-2"
                  onPress={() => handleReportStatus('Closed')}
                >
                  <View className="w-3 h-3 rounded-full bg-[#FF3333]" />
                  <Text className="text-white font-bold text-base">Packed / Closed</Text>
                </TouchableOpacity>
             </View>
          </View>
        </View>
      )}
    </View>
  );
}
