<template>
  <div>
    <h1>CAKRA CCTV</h1>

```
<p v-if="loading">Loading data dari backend...</p>

<p v-else-if="error">
  Error: {{ error }}
</p>

<div v-else>
  <h3>Status: {{ apiData.status }}</h3>

  <p>{{ apiData.message }}</p>

  <p>Versi: {{ apiData.data?.versi }}</p>
  <p>Proyek: {{ apiData.data?.proyek }}</p>
</div>
```

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const apiData = ref({})
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/status')

    if (!response.ok) {
      throw new Error('Gagal mengambil data dari backend')
    }

    apiData.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
