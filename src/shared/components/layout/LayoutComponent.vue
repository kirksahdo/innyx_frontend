<template>
  <div class="size-full flex flex-col">
    <NavComponent />
    <main class="size-full overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavComponent from '../nav/NavComponent.vue'
</script>
