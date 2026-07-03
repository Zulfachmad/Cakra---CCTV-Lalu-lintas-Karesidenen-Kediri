<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h3>📹 Live Stream: {{ cctv.namaCctv }}</h3>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <video ref="videoRef" controls autoplay class="video-element"></video>
      </div>
      <div class="modal-footer">
        <span class="location-tag">📍 {{ cctv.lokasiAlamat }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Hls from 'hls.js';

const props = defineProps({
  cctv: Object
});

defineEmits(['close']);

const videoRef = ref(null);
let hlsInstance = null;

onMounted(() => {
  const video = videoRef.value;
  const videoUrl = props.cctv.urlStream;

  if (Hls.isSupported()) {
    hlsInstance = new Hls();
    hlsInstance.loadSource(videoUrl);
    hlsInstance.attachMedia(video);
  } 
  // Fallback untuk Safari / iOS Mac perangkat Apple yang mendukung m3u8 secara native
  else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoUrl;
  }
});

onBeforeUnmount(() => {
  // Hancurkan instansiasi player saat modal ditutup agar streaming berhenti mengonsumsi kuota data
  if (hlsInstance) {
    hlsInstance.destroy();
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Pastikan berada di atas peta Leaflet */
}

.modal-content {
  background: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 720px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.modal-header h3 { margin: 0; font-size: 1.1rem; color: #333; }

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  line-height: 1;
  color: #999;
}
.close-btn:hover { color: #333; }

.modal-body {
  background: #000;
  position: relative;
  padding-top: 56.25%; /* Rasio Aspek Video 16:9 */
}

.video-element {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}

.modal-footer {
  padding: 12px 20px;
  background: #f8f9fa;
  font-size: 0.85rem;
  color: #666;
}
</style>