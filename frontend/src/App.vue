<template>
  <div class="layout-container">
    
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>CAKRA CCTV</h2>
        <p>Monitor Wilayah Kediri</p>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari lokasi CCTV..." 
          class="search-input"
        />
      </div>
      
      <div v-if="loading" class="sidebar-loading">
        <p>Sinkronisasi data...</p>
      </div>
      
      <ul v-else class="cctv-list">
        <li 
          v-for="cctv in filteredCctv" 
          :key="cctv.id" 
          class="cctv-item"
          @click="handleSelectCctv(cctv)"
        >
          <div class="cctv-info-wrapper">
            <strong>📍 {{ cctv.namaCctv }}</strong>
            <span>Wilayah: {{ cctv.wilayah }}</span>
            <span :class="['status-badge', cctv.status.toLowerCase() === 'online' ? 'aktif' : 'offline']">
              {{ cctv.status }}
            </span>
          </div>

          <button 
            v-if="cctv.status.toLowerCase() === 'online'"
            class="sidebar-play-btn"
            @click.stop="handleOpenStream(cctv)"
          >
            ▶ Putar Video
          </button>
        </li>
        <li v-if="filteredCctv.length === 0" class="cctv-item empty-state">
          Data tidak ditemukan.
        </li>
      </ul>
    </aside>

    <main class="main-content">
      <div v-if="loading" class="loading-overlay">
        <p>Memuat Peta...</p>
      </div>

      <MapCakra 
        :cctvData="dataCctv" 
        :activeCctv="selectedCctv" 
        @open-stream="handleOpenStream"
      />
    </main>

    <VideoModal 
      v-if="activeStreamCctv" 
      :cctv="activeStreamCctv" 
      @close="activeStreamCctv = null"
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import MapCakra from './components/MapCakra.vue';
import VideoModal from './components/VideoModal.vue';

const dataCctv = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCctv = ref(null);

// State penampung data CCTV yang sedang di-streaming-kan
const activeStreamCctv = ref(null);

// Mengambil data API
onMounted(async () => {
  try {
    // Ubah URL di bawah ini ke alamat IP dan Port Backend Anda
    const response = await fetch('https://dbcakra.zlpmd.my.id/api/cctv');
    const result = await response.json();
    dataCctv.value = result.data;
  } catch (error) {
    console.error('Gagal mengambil data CCTV:', error);
  } finally {
    loading.value = false;
  }
});

const filteredCctv = computed(() => {
  if (!searchQuery.value) return dataCctv.value;
  return dataCctv.value.filter(cctv => 
    cctv.namaCctv.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    cctv.wilayah.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleSelectCctv = (cctv) => {
  selectedCctv.value = cctv;
};

// Fungsi membuka modal streaming
const handleOpenStream = (cctv) => {
  activeStreamCctv.value = cctv;
};
</script>

<style>
html, body { margin: 0 !important; padding: 0 !important; width: 100vw !important; height: 100vh !important; font-family: sans-serif; overflow: hidden; }
#app { margin: 0 !important; padding: 0 !important; width: 100vw !important; height: 100vh !important; max-width: none !important; }

.layout-container { display: flex; height: 100vh; width: 100vw; }
.sidebar { width: 320px; background-color: #ffffff; border-right: 1px solid #e0e0e0; display: flex; flex-direction: column; z-index: 10; box-shadow: 2px 0 10px rgba(0,0,0,0.05); }
.sidebar-header { padding: 20px; background-color: #f8f9fa; border-bottom: 1px solid #e0e0e0; }
.sidebar-header h2 { margin: 0 0 5px 0; font-size: 1.2rem; color: #333; }
.sidebar-header p { margin: 0 0 15px 0; font-size: 0.85rem; color: #666; }

/* Styling Kolom Pencarian */
.search-input { 
  width: 100%; 
  padding: 10px; 
  border: 1px solid #ccc; 
  border-radius: 6px; 
  font-size: 0.9rem; 
  box-sizing: border-box; 
  background-color: #ffffff; /* Memaksa background menjadi putih */
  color: #333333; /* Memastikan teks yang diketik berwarna gelap */
}

/* Mengatur warna teks placeholder "Cari lokasi CCTV..." */
.search-input::placeholder {
  color: #888888;
}

.search-input:focus { 
  outline: none; 
  border-color: #007bff; 
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25); /* Tambahan efek glow biru saat diklik (opsional) */
}

.sidebar-loading { padding: 20px; text-align: center; color: #666; font-size: 0.9rem; }
.cctv-list { list-style: none; padding: 15px; margin: 0; overflow-y: auto; flex: 1; }

.cctv-item { 
  display: flex; 
  justify-content: space-between;
  align-items: center;
  padding: 12px; 
  margin-bottom: 10px; 
  background-color: #f8f9fa; 
  border: 1px solid #eee; 
  border-radius: 8px; 
  cursor: pointer; 
  transition: all 0.2s; 
}
.cctv-item:hover { background-color: #e9ecef; border-color: #d3d9df; }

.cctv-info-wrapper { display: flex; flex-direction: column; flex: 1; }
.cctv-item strong { color: #2c3e50; font-size: 0.95rem; margin-bottom: 4px; }
.cctv-item span { font-size: 0.8rem; color: #555; margin-bottom: 4px; }

.status-badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; width: max-content; }
.status-badge.aktif { background-color: #d4edda; color: #155724; }
.status-badge.offline { background-color: #f8d7da; color: #721c24; }

/* Tombol kecil di dalam sidebar list */
.sidebar-play-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
  margin-left: 10px;
}
.sidebar-play-btn:hover { background: #218838; }

.cctv-item.empty-state { text-align: center; cursor: default; background: none; border: none; color: #888; justify-content: center; }
.main-content { flex: 1; position: relative; }
.loading-overlay { position: absolute; top: 15px; left: 50%; transform: translateX(-50%); background: white; padding: 10px 20px; border-radius: 8px; z-index: 999; box-shadow: 0 4px 6px rgba(0,0,0,0.1); font-size: 0.9rem; }
</style>