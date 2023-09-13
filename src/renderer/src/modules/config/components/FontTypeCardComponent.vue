<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { useRouter } from 'vue-router'
import usePrinterWizard from '../composable/usePrinterWizard'

interface props {
  imgUri: string
  type: string
  description: string
}
const isDark = useDark()
const props = defineProps<props>()
const router = useRouter()
const { printer, progres } = usePrinterWizard()

const nextStep = (type) => {
  printer.value.fontSize = type
  if (progres.value < 1) {
    progres.value = 1
  }
  router.push({ name: 'config-printers-list' })
}
</script>
<template>
  <div
    class="tw-flex tw-flex-col tw-gap-2 tw-items-center tw-p-6 tw-rounded-md tw-border-[1px] dark:tw-border-gray-600 tw-border-white dark:hover:tw-border-gray-400 hover:tw-shadow-sm dark:hover:tw-shadow-slate-500 hover:tw-border-gray-400 tw-transition-colors tw-duration-200"
  >
    <img :src="props.imgUri" alt="" width="250" class="tw-rounded-md" />
    <p>{{ props.description }}</p>
    <v-btn
      variant="flat"
      @click="nextStep(props.type)"
      class="px-4 dark:tw-bg-gray-300 dark:tw-text-black"
      :class="{ 'light-btn': !isDark }"
      size="small"
      >Continuar</v-btn
    >
  </div>
</template>

<style scoped>
.light-btn {
  background-color: rgb(92, 92, 92);
  color: white;
}
</style>
