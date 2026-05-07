import React, { useRef, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import MapView, { Marker, UrlTile, Polyline } from 'react-native-maps';

export default function MapComponent({ CLUBS, userLocation, routeCoordinates, onClubPress, isNavigating, centerMapTrigger }: { CLUBS: any[], userLocation: { latitude: number, longitude: number }, routeCoordinates?: any[], onClubPress?: (club: any) => void, isNavigating?: boolean, centerMapTrigger?: number }) {
  const mapRef = useRef<MapView>(null);
  const initialLocationSet = useRef(false);

  const prevCenterTrigger = useRef(centerMapTrigger);
  const prevRouteCoordinates = useRef(routeCoordinates);

  useEffect(() => {
    if (mapRef.current) {
      if (isNavigating) {
        // Just track user location and keep high zoom during navigation
        mapRef.current.animateCamera({
          center: { latitude: userLocation.latitude, longitude: userLocation.longitude },
          zoom: 17,
          pitch: 60,
          heading: 0,
        }, { duration: 1000 });
      } else if (routeCoordinates && routeCoordinates.length > 0 && prevRouteCoordinates.current !== routeCoordinates) {
        mapRef.current.fitToCoordinates(routeCoordinates, {
          edgePadding: { top: 100, right: 50, bottom: 200, left: 50 },
          animated: true,
        });
      } else if ((!initialLocationSet.current && (!routeCoordinates || routeCoordinates.length === 0)) || prevCenterTrigger.current !== centerMapTrigger) {
        mapRef.current.animateToRegion({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        });
        initialLocationSet.current = true;
      }
    }
    prevCenterTrigger.current = centerMapTrigger;
    prevRouteCoordinates.current = routeCoordinates;
  }, [routeCoordinates, userLocation, isNavigating, centerMapTrigger]);

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFillObject}
      initialRegion={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      }}
      customMapStyle={[
        {
          "featureType": "all",
          "stylers": [
            { "saturation": -100 },
            { "lightness": -70 }
          ]
        }
      ]}
    >
      <UrlTile
        urlTemplate="https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false}
      />
      
      {routeCoordinates && routeCoordinates.length > 0 && (
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#00FF66"
          strokeWidth={4}
        />
      )}
      
      {/* User Location Marker */}
      <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}>
         <View className="w-6 h-6 rounded-full bg-[#00FF66] items-center justify-center border-[3px] border-[#0c0c0e] shadow-[0_0_15px_rgba(0,255,102,1)]">
            <View className="absolute w-28 h-28 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/20" />
            <View className="absolute w-48 h-48 rounded-full bg-[#00FF66]/5" />
            <View className="w-2 h-2 bg-white rounded-full" />
         </View>
      </Marker>

      {/* Club Markers */}
      {CLUBS.map((club: any) => (
         <Marker key={club.id} coordinate={{ latitude: club.lat, longitude: club.lng }} onPress={(e) => { e.stopPropagation(); onClubPress?.(club); }}>
           <View className="items-center w-24 h-24 mt-8">
              <View className={`w-[68px] h-[68px] rounded-full border-[3px] ${club.isLive ? 'border-[#FF0080]' : club.hasFlashDrop ? 'border-[#FFB800]' : club.status === 'Busy' ? 'border-[#D900FF]' : 'border-white/30'} p-0.5 bg-[#0D0F14] shadow-[0_0_20px_rgba(217,0,255,0.5)]`}>
                 <Image source={{ uri: club.image }} className="w-full h-full rounded-full opacity-80" />
                 <View 
                   className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-[2px] border-[#0D0F14]" 
                   style={{ backgroundColor: club.isLive ? '#FF0080' : club.status === 'Busy' ? '#D900FF' : club.status === 'Closed' ? '#FF3333' : '#00FF66' }}
                 />
              </View>
              <Text className="text-white font-bold mt-1 text-[12px] tracking-tight text-center drop-shadow-md">{club.name}</Text>
              <Text className="text-white/80 text-[10px] font-medium text-center drop-shadow-md">{club.dist}</Text>
           </View>
         </Marker>
      ))}

    </MapView>
  );
}
