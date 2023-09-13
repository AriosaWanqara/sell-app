<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>
    <h1 class="tw-text-red-300">Home</h1>
    <button
      class="border-2 rounded-sm px-2 py-1 hover:bg-slate-500 hover:text-white transition-all duration-200"
      @click="() => router.push({ name: 'config-home' })"
    >
      go config
    </button>
  </div>
</template>

<style scoped></style>
