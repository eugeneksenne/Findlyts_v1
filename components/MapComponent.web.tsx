import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function MapComponent({ CLUBS, userLocation, routeCoordinates, onClubPress, isNavigating, centerMapTrigger }: { CLUBS: any[], userLocation: { latitude: number, longitude: number }, routeCoordinates?: any[], onClubPress?: (club: any) => void, isNavigating?: boolean, centerMapTrigger?: number }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  
  const uMarkerRef = useRef<L.Marker | null>(null);
  const cMarkersRef = useRef<L.Marker[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);
  
  const initialLocationSet = useRef(false);
  const prevCenterTrigger = useRef(centerMapTrigger);
  const prevRouteCoordinates = useRef(routeCoordinates);
  const prevClubs = useRef(CLUBS);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [userLocation.latitude, userLocation.longitude],
        zoom: 15,
        zoomControl: false,
        tap: false // Prevent Leaflet tap emulation from interfering with React Native Web
      } as any);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance.current);
      initialLocationSet.current = true;
      
      // Init user marker
      const userIcon = L.divIcon({
        className: 'custom-icon',
        html: `
          <div style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background-color: #00FF66; border: 3px solid #0c0c0e; box-shadow: 0 0 15px rgba(0,255,102,1);">
            <div style="width: 8px; height: 8px; background-color: white; border-radius: 50%;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      uMarkerRef.current = L.marker([userLocation.latitude, userLocation.longitude], { icon: userIcon }).addTo(mapInstance.current);
      
      prevCenterTrigger.current = centerMapTrigger;
    }

    const map = mapInstance.current;

    // Update User Marker
    if (uMarkerRef.current) {
      uMarkerRef.current.setLatLng([userLocation.latitude, userLocation.longitude]);
    }

    // Update Club Markers
    if (prevClubs.current !== CLUBS || cMarkersRef.current.length === 0) {
      cMarkersRef.current.forEach(m => m.remove());
      cMarkersRef.current = [];
      CLUBS.forEach(club => {
        const statusColor = club.isLive ? '#FF0080' : club.status === 'Busy' ? '#D900FF' : club.status === 'Closed' ? '#FF3333' : '#00FF66';
        const borderColor = club.isLive ? '#FF0080' : club.hasFlashDrop ? '#FFB800' : club.status === 'Busy' ? '#D900FF' : 'rgba(255,255,255,0.3)';
        const shadowColor = club.isLive ? 'rgba(255,0,128,0.5)' : club.hasFlashDrop ? 'rgba(255,184,0,0.5)' : 'rgba(217,0,255,0.5)';
        const clubIcon = L.divIcon({
          className: 'custom-icon',
          html: `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div style="width: 68px; height: 68px; border-radius: 50%; border: 3px solid ${borderColor}; padding: 2px; background-color: #0D0F14; box-shadow: 0 0 20px ${shadowColor}; position: relative;">
                <img src="${club.image}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; opacity: 0.8;" />
                <div style="position: absolute; bottom: 0; right: 0; width: 14px; height: 14px; background-color: ${statusColor}; border-radius: 50%; border: 2px solid #0D0F14;"></div>
              </div>
              <span style="color: white; font-weight: bold; margin-top: 4px; font-size: 12px; text-align: center; text-shadow: 0px 0px 4px rgba(0,0,0,0.8);">${club.name}</span>
              <span style="color: rgba(255,255,255,0.8); font-size: 10px; font-weight: 500; text-shadow: 0px 0px 4px rgba(0,0,0,0.8);">${club.dist}</span>
            </div>
          `,
          iconSize: [80, 100],
          iconAnchor: [40, 50]
        });
        const cMarker = L.marker([club.lat, club.lng], { icon: clubIcon }).addTo(map);
        if (onClubPress) {
          cMarker.on('click', () => onClubPress(club));
        }
        cMarkersRef.current.push(cMarker);
      });
      prevClubs.current = CLUBS;
    }

    // Update Polyline and Camera
    if (routeCoordinates && routeCoordinates.length > 0) {
      const latlngs = routeCoordinates.map(c => [c.latitude, c.longitude] as [number, number]);
      if (!polylineRef.current) {
        polylineRef.current = L.polyline(latlngs, { color: '#00FF66', weight: 4 }).addTo(map);
      } else {
        polylineRef.current.setLatLngs(latlngs);
      }
      
      if (isNavigating) {
        map.panTo([userLocation.latitude, userLocation.longitude], { animate: true });
      } else if (prevRouteCoordinates.current !== routeCoordinates) {
        map.flyToBounds(polylineRef.current.getBounds(), { padding: [50, 50] });
      } else if (prevCenterTrigger.current !== centerMapTrigger) {
        map.flyTo([userLocation.latitude, userLocation.longitude], 15, { animate: true });
      }
    } else {
      if (polylineRef.current) {
        polylineRef.current.remove();
        polylineRef.current = null;
      }
      
      if (prevCenterTrigger.current !== centerMapTrigger || !initialLocationSet.current) {
        map.panTo([userLocation.latitude, userLocation.longitude], { animate: true });
      }
    }

    initialLocationSet.current = true;
    prevCenterTrigger.current = centerMapTrigger;
    prevRouteCoordinates.current = routeCoordinates;

    setTimeout(() => {
      mapInstance.current?.invalidateSize();
    }, 100);

  }, [CLUBS, userLocation, routeCoordinates, isNavigating, centerMapTrigger]);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 0 }}>
      <div 
        ref={mapRef} 
        style={{ width: '100%', height: '100%', backgroundColor: '#0D0F14', touchAction: 'none' }} 
      />
    </div>
  );
}
