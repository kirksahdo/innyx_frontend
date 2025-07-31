<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingComponent from './shared/components/loading/LoadingComponent.vue'
</script>

<template>
  <LoadingComponent>
    <RouterView />
  </LoadingComponent>
</template>

<style scoped></style>
