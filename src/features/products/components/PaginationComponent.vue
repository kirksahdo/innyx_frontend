<template>
  <div class="flex justify-between items-center mt-4">
    <span class="text-sm text-gray-700">
      Mostrando {{ showing }} de {{ totalProducts }} produtos
    </span>
    <nav class="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
      >
        Anterior
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="[
          'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium',
          currentPage === page
            ? 'bg-primary-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50',
        ]"
      >
        {{ page }}
      </button>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
      >
        Próximo
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
interface Props {
  showing: number
  totalProducts: number
  changePage: (page: number) => void
  totalPages: number
  currentPage: number
}

defineProps<Props>()
</script>

<style scoped></style>
