<script setup lang="ts">
import { Icon } from '@iconify/vue'
import useServer from '@renderer/composables/useServer'
import { useDark, useToggle, useOnline } from '@vueuse/core'
import { ref } from 'vue'
import Customizer from './Customizer.vue'

const isDark = useDark()
const toggleTheme = useToggle(isDark)
const online = useOnline()
const isServerPathConfig = ref(window.store.store.get('path') != '')
const { someError } = useServer()
const configDrawer = ref(false)
console.log(isServerPathConfig.value)

const starJavaServer = async () => {
  try {
    await window.child_process.child_process.exec(
      `java -jar %localappdata%/Programs/sell-app/target/middelware-0.0.1-SNAPSHOT.jar ${
        window.store.store.get('port') ? window.store.store.get('port') : '52135'
      }`,
      (error) => {
        console.log(`Ocurrió un error al ejecutar el comando: ${error.message}`)
      }
    )
    console.log('algo')
  } catch (error) {}
}
</script>

<template>
  <div class="tw-w-full tw-flex tw-justify-between tw-px-16 tw-h-[50px] tw-items-center">
    <div class="tw-flex tw-gap-1 tw-items-center tw-justify-center">
      <div
        class="tw-w-[6px] tw-h-[6px] tw-rounded-full tw-mt-1 tw-shadow tw-animate-pulse"
        :class="online ? 'tw-bg-green-500 tw-shadow-green-500' : 'tw-bg-red-500 tw-shadow-red-500'"
      ></div>
      <p class="tw-m-0 p-0">
        {{ online ? 'online' : 'offline' }}
      </p>
      <div class="tw-flex tw-gap-1 tw-items-center tw-justify-center tw-ml-14">
        <div
          class="tw-w-[6px] tw-h-[6px] tw-rounded-full tw-mt-1 tw-shadow tw-animate-pulse"
          :class="!someError ? 'tw-bg-green-500 shadow-green-500' : 'tw-bg-red-500 shadow-red-500'"
        ></div>
        <p class="tw-m-0 tw-p-0">Capa</p>
        <VBtn
          class="tw-ml-2"
          @click="starJavaServer"
          :disabled="!someError && isServerPathConfig"
          variant="outlined"
          density="comfortable"
        >
          Montar
        </VBtn>
      </div>
    </div>

    <div class="tw-flex tw-gap-4">
      <Transition mode="out-in" name="fade">
        <div v-if="isDark" @click="toggleTheme()" class="tw-cursor-pointer">
          <Icon icon="bi:moon-stars-fill" height="24" />
        </div>
        <div v-else @click="toggleTheme()" class="tw-cursor-pointer">
          <Icon icon="material-symbols:sunny-rounded" class="tw-text-yellow-600" height="24" />
        </div>
      </Transition>
      <div class="tw-cursor-pointer">
        <Icon icon="ic:baseline-notifications" height="24" />
      </div>
      <div class="tw-cursor-pointer" @click="configDrawer = true">
        <Icon icon="ic:sharp-settings" height="24" />
      </div>
    </div>
    <v-navigation-drawer v-model="configDrawer" temporary location="right">
      <Customizer />
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
