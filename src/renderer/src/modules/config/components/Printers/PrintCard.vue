<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { usePersistPrinter } from '@renderer/composables/usePrinter'
import { watch } from 'vue'
import UpdatePrint from './UpdatePrint.vue'
import { ref } from 'vue'
import type { Printers } from '../../models/Printers'

const { deletePrintersMutation } = usePersistPrinter()
interface props {
  printer: Printers
  soprinters: String[]
}

const emit = defineEmits(['delete'])

const onDeletePrint = () => {
  deletePrintersMutation.mutate(props.printer.id)
}

watch(deletePrintersMutation.isError, () => {
  if (deletePrintersMutation.isError.value) {
  }
})
watch(deletePrintersMutation.isSuccess, () => {
  if (deletePrintersMutation.isSuccess.value) {
    emit('delete', true)
  }
})

const emitUpdate = (payload) => {
  if (payload) {
    emit('delete', true)
    openUpdatePrinterModal.value = false
  }
}

const props = defineProps<props>()
const openUpdatePrinterModal = ref(false)
</script>

<template>
  <div class="tw-flex tw-gap-1 tw-border-[1px]">
    <div class="tw-w-[80px] tw-p-2 tw-border-r-[1px] tw-flex tw-flex-col tw-items-center">
      <Icon
        icon="ic:baseline-print"
        height="34"
        v-if="props.soprinters.includes(props.printer.printerName)"
      />
      <Icon icon="mdi:printer-off" height="34" v-else color="#F99191" />
      <p class="tw-text-xs">{{ props.printer.printerName }}</p>
    </div>
    <div class="tw-flex-grow tw-flex tw-justify-between">
      <div class="">
        <p class="tw-text-xs">
          Documento <strong>{{ props.printer.documentTypes.name }}</strong>
        </p>
        <p class="tw-text-xs">
          N° Caracteres <strong>{{ props.printer.characterNumber }}</strong>
        </p>
        <p class="tw-text-xs">
          N° copias <strong>{{ props.printer.copyNumber }}</strong>
        </p>
      </div>
      <div class="tw-flex tw-flex-col tw-justify-between tw-p-2">
        <VBtn color="error" size="x-small" variant="flat" @click="onDeletePrint">
          <VIcon>mdi-trash-can</VIcon>
        </VBtn>
        <VBtn color="warning" size="x-small" variant="flat" @click="openUpdatePrinterModal = true">
          <VIcon>mdi-pencil</VIcon>
        </VBtn>
      </div>
    </div>
    <VDialog v-model="openUpdatePrinterModal" max-width="450">
      <UpdatePrint :printer="props.printer" @update-printer="emitUpdate" />
    </VDialog>
  </div>
</template>

<style scoped></style>
