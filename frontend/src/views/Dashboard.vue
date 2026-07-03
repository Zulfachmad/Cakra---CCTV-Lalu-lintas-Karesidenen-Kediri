<template>
  <div class="dashboard">

    <Sidebar
      :open="sidebarOpen"
    />

    <SidebarToggle
      @toggle="toggleSidebar"
    />

    <MapCakra
      :cctvData="dummyData"
    />

    <PreviewCard
      v-if="selectedCctv"
      :cctv="selectedCctv"
    />

  </div>
</template>

<script setup>
import { ref } from "vue";

import Sidebar from "../components/layout/Sidebar.vue";
import SidebarToggle from "../components/layout/SidebarToggle.vue";

import MapCakra from "../components/MapCakra.vue";

import PreviewCard from "../components/preview/PreviewCard.vue";

const sidebarOpen = ref(false);

const selectedCctv = ref(null);

const dummyData = [
  {
    namaCctv: "Alun-Alun Kediri",
    wilayah: "Kota Kediri",
    status: "Online",
    latitude: -7.8166,
    longitude: 112.0116
  },
  {
    namaCctv: "Simpang Semampir",
    wilayah: "Kota Kediri",
    status: "Online",
    latitude: -7.821,
    longitude: 112.022
  }
];

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
</script>

<style scoped>

.dashboard{

    position:relative;

    width:100%;

    height:100vh;

}

</style>