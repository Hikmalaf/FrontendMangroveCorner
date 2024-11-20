import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import { Typography } from '@material-tailwind/react';

const Peta = () => {
  useEffect(() => {
    // Hindari inisialisasi ulang jika peta sudah ada
    if (document.getElementById('map')._leaflet_id) return;

    // Inisialisasi peta
    const map = L.map('map', {
      center: [-5.9218, 106.154], // Koordinat pusat
      zoom: 10, // Level zoom awal
    });

    // Base Layers
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      errorTileUrl: '/path-to-error-tile.png', // Atur gambar error tile jika gagal memuat
    });

    const Esri_Satellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '&copy; Esri & OpenStreetMap contributors',
        maxZoom: 19,
      }
    );

    // Tambahkan layer default (Esri Satellite)
    Esri_Satellite.addTo(map);

    // GeoJSON Overlay Layers
    const overlays = {};

    // Fungsi untuk memuat file GeoJSON
    const loadGeoJSON = (fileName, area, callback) => {
      fetch(fileName)
        .then(response => {
          if (!response.ok) throw new Error(`File ${fileName} tidak ditemukan.`);
          return response.json();
        })
        .then(geojsonData => {
          // Validate and process each feature in GeoJSON
          geojsonData.features.forEach(feature => {
            if (feature.geometry && feature.geometry.coordinates) {
              // Check if polygon is closed if needed
              if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                // Ensure polygon is closed
                feature.geometry.coordinates = closePolygon(feature.geometry.coordinates);
              }
            } else {
              console.error('Invalid feature geometry:', feature);
              return; // Skip invalid features
            }
          });

          // Process the GeoJSON data with Leaflet
          const layer = L.geoJSON(geojsonData, {
            onEachFeature: (feature, layer) => {
              layer.bindPopup(`Luas: ${area} Hektare`);
            },
          }).addTo(map);

          callback(layer);
        })
        .catch(error => console.error(`Error loading ${fileName}:`, error));
    };

    // Ensure polygons are closed by matching the first and last coordinate pair
    const closePolygon = (coordinates) => {
      // If it’s a polygon (not multipolygon), check for closure
      if (coordinates.length > 0 && coordinates[0][0] !== coordinates[coordinates.length - 1][0]) {
        coordinates.push(coordinates[0]); // Add the first coordinate to the end to close the polygon
      }
      return coordinates;
    };

    // Tambahkan GeoJSON Banten
    loadGeoJSON('/banten_ya.geojson', 2156.61, layer => {
      overlays['Sebaran Mangrove Banten'] = layer;
      updateLayersControl();
    });

    // Tambahkan GeoJSON Lampung
    loadGeoJSON('/lampung_cuy.geojson', 8144.37, layer => {
      overlays['Sebaran Mangrove Lampung'] = layer;
      updateLayersControl();
    });

    // Layer Control
    let layerControl = L.control.layers(
      { OpenStreetMap: osm, Satelit: Esri_Satellite },
      overlays,
      { collapsed: false }
    ).addTo(map);

    // Update Layers Control
    const updateLayersControl = () => {
      layerControl.remove();
      layerControl = L.control.layers(
        { OpenStreetMap: osm, Satelit: Esri_Satellite },
        overlays,
        { collapsed: false }
      ).addTo(map);
    };

    // Kontrol Geocoder
    L.Control.geocoder().addTo(map);

    // Validasi ukuran peta agar sesuai dengan container
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Cleanup saat komponen di-unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <section className="relative block h-[20vh] sm:h-[50vh] md:h-[60vh] lg:h-[40vh]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/img/background-3.jpg')] bg-cover bg-center scale-105 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 scale-105 z-0"></div>
        <div className="relative container mx-auto h-full flex items-center justify-center px-4 sm:px-8 md:px-16 text-center text-white z-2">
          <div>
            <Typography variant="h1" color="white" className="mb-4 text-4xl sm:text-5xl md:text-4xl font-semibold">
              Peta Sebaran Mangrove
            </Typography>
          </div>
        </div>
      </section>
      <div className="container mx-auto p-6">
        <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
          <div
            id="map"
            style={{
              width: '100%',
              height: '500px',
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Peta;
