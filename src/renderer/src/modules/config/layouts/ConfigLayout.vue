<script setup lang="ts">
import HeaderConfigComponents from '../components/HeaderConfigComponents.vue'
import AsideBarLayout from './AsideBarLayout.vue'
</script>

<template>
  <div class="tw-flex tw-h-screen tw-bg-white dark:tw-bg-slate-600">
    <AsideBarLayout />
    <div
      class="tw-overflow-y-auto tw-flex-1 tw-text-black dark:tw-text-white tw-overflow-x-hidden tw-flex tw-flex-col"
    >
      <HeaderConfigComponents />
      <router-view v-slot="{ Component }" class="tw-flex-grow">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(0, 63, 63);
  border-radius: 5px;
}
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
