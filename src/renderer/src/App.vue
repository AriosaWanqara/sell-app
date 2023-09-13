<script setup lang="ts"></script>

<template>
  <v-locale-provider>
    <v-app>
      <div class="tw-overflow-x-hidden overflow-y-hidden">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </v-app>
  </v-locale-provider>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.overflow-y-hidden {
  overflow-y: hidden !important;
}
html {
  overflow-y: hidden !important;
}
</style>
