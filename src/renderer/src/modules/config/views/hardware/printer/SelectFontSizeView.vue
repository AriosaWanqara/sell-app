<script setup lang="ts">
import FontTypeCardComponent from '@renderer/modules/config/components/FontTypeCardComponent.vue'
import usePrinterWizard from '@renderer/modules/config/composable/usePrinterWizard'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'

const { stepName } = usePrinterWizard()
const cardFontData = ref([
  {
    imgUri: '/src/assets/images/fuenteA.png',
    type: 'A',
    description: 'Fuente A - Letra Grande'
  },
  {
    imgUri: '/src/assets/images/fuenteB.png',
    type: 'B',
    description: 'Fuente B - Letra Pequeña'
  }
])

onBeforeMount(() => {
  stepName.value = 'Tamaño de fuente'
})
</script>
<template>
  <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full tw-gap-4">
    <h1 class="tw-text-2xl">Seleccione el tamaño de la letra</h1>
    <div class="tw-flex tw-justify-center tw-items-center tw-gap-28">
      <FontTypeCardComponent
        v-for="item in cardFontData"
        :type="item.type"
        :img-uri="item.imgUri"
        :description="item.description"
      />
    </div>
  </div>
</template>

<style scoped></style>
