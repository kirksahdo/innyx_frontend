<template>
  <div class="size-full flex flex-col">
    <NavComponent />
    <main class="size-full overflow-auto">
      <router-view />
    </main>
    <footer class="bg-gray-800 text-white p-4 text-center">
      <p>&copy; 2025 Innyx. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import NavComponent from '../nav/NavComponent.vue'
</script>
