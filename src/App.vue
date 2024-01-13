<template>
  <NavBar />
  <div class="mt-8">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from "./components/NavBar.vue"

</script>

<style lang="scss" scoped></style>