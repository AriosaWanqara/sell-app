<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()
const listConfig = ref([
  {
    label: 'Programas',
    icon: 'fluent:desktop-arrow-right-24-regular',
    children: [
      {
        label: 'Adaptador',
        to: 'config-home-adapter',
        icon: 'icon-park-outline:assembly-line'
      }
    ]
  },
  {
    label: 'Equipos',
    icon: 'solar:cpu-bolt-linear',
    children: [
      {
        label: 'Impresoras',
        to: 'config-home-printers',
        icon: 'ic:sharp-print'
      },
      {
        label: 'Balanzas',
        to: 'config-home-balance',
        icon: 'material-symbols:balance-rounded'
      },
      {
        label: 'Cajas',
        to: 'config-home-cash',
        icon: 'bi:cash-stack'
      }
    ]
  }
])
</script>
<template>
  <div
    class="tw-h-screen tw-bg-neutral-100 tw-w-[200px] tw-flex tw-flex-col tw-gap-1 dark:tw-bg-slate-700 tw-shadow-md"
  >
    <div class="tw-h-[50px] tw-flex tw-justify-start tw-items-center tw-px-3">
      <img src="../../../assets/logos/LOGO-ILLARLI-BLANCO.png" alt="" v-if="isDark" width="120" />
      <img src="../../../assets/logos/LOGO-ILLARLI.png" alt="" v-else width="120" />
    </div>
    <div class="tw-m-0 tw-p-0 tw-pt-1 tw-px-3" v-for="items in listConfig">
      <div class="tw-flex tw-gap-1 tw-items-center">
        <Icon :icon="items.icon" class="dark:tw-text-white tw-text-black" height="24" />
        <h1 class="tw-font-semibold tw-text-gray-500 tw-p-0 tw-m-0">
          {{ items.label }}
        </h1>
      </div>
      <ul class="tw-p-0 tw-list-none tw-pl-3 tw-mb-2">
        <li
          v-for="item in items.children"
          class="tw-mt-4 hover:tw-translate-x-1 hover:tw-text-white tw-transition-all tw-duration-300"
        >
          <div
            class="tw-text-gray-700 dark:tw-text-gray-400 dark:hover:tw-text-white hover:tw-text-black tw-transition-all tw-duration-100 tw-flex tw-items-center tw-gap-2"
            :class="isDark ? 'dark' : 'ligth'"
          >
            <Icon :icon="item.icon" />
            <RouterLink :to="{ name: item.to }">{{ item.label }}</RouterLink>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dark .dark:has(.router-link-exact-active) {
  color: rgb(0, 180, 180);
  font-weight: 700;
}
.ligth:has(.router-link-exact-active) {
  color: rgb(0, 140, 255);
  font-weight: 700;
}
</style>
