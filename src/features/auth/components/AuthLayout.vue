<script setup lang="ts">
import innyxLogo from '@/assets/innyx_logo.png'
</script>

<template>
  <div class="flex h-full w-full flex-col bg-primary-900 justify-center items-center">
    <div
      class="flex flex-col items-center gap-6 w-[500px] p-20 rounded-2xl shadow-xl bg-background"
    >
      <img class="mx-auto h-10 w-auto" :src="innyxLogo" alt="Your Company" />
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-text">
        <slot name="title"></slot>
      </h2>
      <slot></slot>
    </div>
  </div>
</template>
