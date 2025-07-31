<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingContainer from './shared/components/loading/LoadingContainer.vue'
import ToastContainer from './shared/components/toast/ToastContainer.vue'
</script>

<template>
  <LoadingContainer>
    <ToastContainer>
      <RouterView />
    </ToastContainer>
  </LoadingContainer>
</template>

<style scoped></style>
