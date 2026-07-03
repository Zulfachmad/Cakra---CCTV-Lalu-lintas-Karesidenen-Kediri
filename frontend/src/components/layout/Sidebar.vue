<template>

<div
class="sidebar"
:class="{open:open}">

<SearchBar/>

<SearchHistory/>

<NearbyList/>

</div>

</template>

<script setup>

import SearchBar from "../sidebar/SearchBar.vue"

import SearchHistory from "../sidebar/SearchHistory.vue"

import NearbyList from "../sidebar/NearbyList.vue"

defineProps({

open:Boolean

})

</script>

<style scoped>

.sidebar{

position:absolute;

left:0;

top:0;

bottom:0;

width:320px;

background:#67DDE3;

padding:20px;

z-index:999;

transform:translateX(-100%);

transition:.3s;

overflow:auto;

}

.open{

transform:translateX(0);

}

</style>