<template>
  <div id="map" class="map-container"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps({
  cctvData: Array,
  activeCctv: Object
});

// Deklarasi emit untuk melemparkan fungsi buka video ke parent (App.vue)
const emit = defineEmits(['openStream']);

const map = ref(null);
const markersGroup = ref({});

onMounted(async () => {
  map.value = L.map('map', {
    center: [-7.8166, 112.0116],
    zoom: 13,
    minZoom: 12, 
    maxBoundsViscosity: 1.0 
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map.value);

  try {
    const response = await fetch('/kediri.geojson');
    if (response.ok) {
      const geojsonData = await response.json();
      const layerBatasKota = L.geoJSON(geojsonData, {
        filter: feature => feature.geometry.type !== "Point",
        style: { color: "#ff0000", weight: 3, opacity: 0.8, fillOpacity: 0.0 }
      }).addTo(map.value);

      const presisiBounds = layerBatasKota.getBounds();
      map.value.fitBounds(presisiBounds); 
      map.value.setMaxBounds(presisiBounds); 

      setTimeout(() => map.value.invalidateSize(), 200);
    }
  } catch (error) {
    console.error("Gagal memuat GeoJSON:", error);
  }
});

watch(() => props.cctvData, (newData) => {
  if (!map.value || !newData) return;

  newData.forEach(cctv => {
    if (cctv.latitude && cctv.longitude) {
      const marker = L.marker([cctv.latitude, cctv.longitude]).addTo(map.value);
      
      const isOnline = cctv.status && cctv.status.toLowerCase() === 'online';

      marker.bindPopup(`
        <div class="custom-popup">
          <b class="popup-title">📹 ${cctv.namaCctv}</b>
          <div class="popup-info">Wilayah: ${cctv.wilayah}</div>
          <div class="popup-status ${isOnline ? 'text-green' : 'text-red'}">
            Status: <strong>${cctv.status}</strong>
          </div>
          <hr style="margin: 8px 0; border: 0; border-top: 1px solid #eee;">
          
          <div style="text-align: center; margin-top: 5px;">
             ${isOnline 
                ? `<button id="btn-stream-${cctv.id}" style="background:#007bff; color:white; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:12px; width:100%; font-weight:bold;">Lihat Live Stream</button>`
                : `<span style="font-size:12px; color:#999;">Kamera Offline</span>`
             }
          </div>
        </div>
      `);

      // JEMBATAN BINDING DATA: Dengarkan saat popup terbuka di peta
      marker.on('popupopen', () => {
        if (isOnline) {
          const button = document.getElementById(`btn-stream-${cctv.id}`);
          if (button) {
            button.onclick = () => {
              // Lempar data cctv terpilih ke App.vue
              emit('openStream', cctv);
            };
          }
        }
      });

      const key = cctv.id || cctv.namaCctv;
      markersGroup.value[key] = marker;
    }
  });
});

watch(() => props.activeCctv, (selected) => {
  if (selected && map.value) {
    const key = selected.id || selected.namaCctv;
    const targetMarker = markersGroup.value[key];

    if (targetMarker) {
      map.value.flyTo([selected.latitude, selected.longitude], 17, {
        animate: true,
        duration: 1.5
      });
      targetMarker.openPopup();
    }
  }
});
</script>

<style scoped>
.map-container { height: 100%; width: 100%; z-index: 1; }
:deep(.custom-popup) { font-family: sans-serif; min-width: 180px; }
:deep(.popup-title) { font-size: 14px; color: #333; display: block; margin-bottom: 4px; }
:deep(.popup-info) { font-size: 12px; color: #666; margin-bottom: 2px; }
:deep(.popup-status) { font-size: 12px; }
:deep(.text-green) { color: #155724; }
:deep(.text-red) { color: #721c24; }
</style>