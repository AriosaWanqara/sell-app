<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'
import usePrinterWizard from '../composable/usePrinterWizard'

const isDark = useDark()
const toggleTheme = useToggle(isDark)
const { progres, stepName } = usePrinterWizard()
const progressBarWidth = computed(() => (progres.value / 4) * 100)
const items = [
  {
    text: 'Tamaño de fuente',
    value: 'config-printers-font',
    disabled: computed(() => false)
  },
  {
    text: 'Configuración de impresora',
    value: 'config-printers-list',
    disabled: computed(() => progres.value < 1)
  },
  {
    text: 'Configuración de caracteres',
    value: 'config-printers-characters',
    disabled: computed(() => progres.value < 2)
  },
  {
    text: 'Configuración de Ticket',
    value: 'config-printers-ticket',
    disabled: computed(() => progres.value < 3)
  }
]
</script>

<template>
  <div
    class="tw-absolute tw-top-0 tw-left-0 tw-h-screen tw-w-screen tw-bg-slate-100 dark:tw-bg-slate-600 tw-overflow-y-auto"
  >
    <div class="tw-fixed tw-w-screen tw-top-0 tw-z-20">
      <header
        class="tw-flex tw-justify-between tw-py-4 tw-border-b-[1px] dark:tw-border-gray-700 tw-shadow-md px-4 tw-items-center"
      >
        <div class="tw-flex tw-gap-6 tw-items-center">
          <RouterLink :to="{ name: 'config-home-printers' }" class="tw-cursor-pointer">
            <Icon icon="ic:outline-arrow-back" />
          </RouterLink>
          <img
            src="../../../assets/images/logo_illarli_blanco.png"
            alt=""
            v-if="isDark"
            width="120"
          />
          <img src="../../../assets/images/logo.png" alt="" v-else width="120" />
          <v-menu>
            <template v-slot:activator="{ props }">
              <div class="tw-flex">
                <p class="tw-m-0">{{ stepName }}</p>
                <v-icon icon="mdi-chevron-down" v-bind="props" class="tw-m-0 tw-mt-1"></v-icon>
              </div>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                :disabled="item.disabled.value"
              >
                <v-list-item-title
                  ><RouterLink :to="{ name: item.value }">{{
                    item.text
                  }}</RouterLink></v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div>
          <Transition mode="out-in" name="fade">
            <div v-if="isDark" @click="toggleTheme()" class="tw-cursor-pointer">
              <Icon icon="bi:moon-stars-fill" height="24" />
            </div>
            <div v-else @click="toggleTheme()" class="tw-cursor-pointer">
              <Icon icon="material-symbols:sunny-rounded" class="tw-text-yellow-600" height="24" />
            </div>
          </Transition>
        </div>
      </header>
      <div
        class="tw-h-1 tw-bg-green-500 tw-rounded-r-md tw-transition-all tw-duration-200"
        :style="`width: ${progressBarWidth}%`"
      ></div>
    </div>
    <router-view v-slot="{ Component }" class="tw-z-0">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
