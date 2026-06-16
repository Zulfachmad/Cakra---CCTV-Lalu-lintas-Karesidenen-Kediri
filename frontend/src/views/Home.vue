<template>
  <div>
    <h1>Dashboard CCTV Kediri</h1>

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

<script>
export default {
  name: "Home",

  data() {
    return {
      apiData: {},
      loading: true,
      error: null
    }
  },

  async mounted() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/status`)

      if (!response.ok) {
        throw new Error("Gagal mengambil data dari backend")
      }

      this.apiData = await response.json()
    } catch (err) {
      this.error = err.message
    } finally {
      this.loading = false
    }
  }
}
</script>
