<template>

<button
class="toggle"
@click="$emit('toggle')">

☰

</button>

</template>

<style scoped>

.toggle{

position:absolute;

left:20px;

top:20px;

z-index:9999;

width:55px;

height:55px;

border:none;

border-radius:10px;

background:#4DD0E1;

font-size:30px;

cursor:pointer;

box-shadow:0 4px 10px rgba(0,0,0,.2);

}

</style>