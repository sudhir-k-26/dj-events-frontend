'use client';
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Map({ lat = 37.7749, lng = -122.4194 }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        'https://api.maptiler.com/maps/streets/style.json?key=biGNiSmHUJikp92HEPWl',
      center: [lng, lat],
      zoom: 13,
    });

    new maplibregl.Marker().setLngLat([lng, lat]).addTo(map.current);
  }, [lat, lng]);

  return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
}
