<script setup lang="ts">
import usePrinter, { usePersistPrinter } from '@renderer/composables/usePrinter'
import { useRouter } from 'vue-router'
import PrintCard from '../../components/Printers/PrintCard.vue'

const { persistPrinters, refetch } = usePersistPrinter()
const { data } = usePrinter()

const deleteEmit = (payload: boolean) => {
  if (payload) {
    refetch()
  }
}

const router = useRouter()
</script>
<template>
  <div>
    <VContainer>
      <VRow>
        <VCol cols="12">
          <VBtn variant="outlined" @click="() => router.push({ name: 'config-printers-font' })">
            Configuracion rapida
          </VBtn>
        </VCol>
        <VCol cols="12">
          <div class="" v-if="persistPrinters.length <= 0">
            <p>No hay impresoras registradas</p>
          </div>

          <div class="tw-flex tw-gap-1 tw-flex-col tw-overflow-y-auto" v-else>
            <PrintCard
              v-for="printer in persistPrinters"
              :printer="printer"
              @delete="deleteEmit"
              :soprinters="data!"
            />
          </div>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<style scoped></style>
