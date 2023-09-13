<script setup lang="ts">
import useDocumentType from '@renderer/composables/useDocumentType'
import { Printers } from '../../models/Printers'
import { ref } from 'vue'
import { watch } from 'vue'
import usePrinter, { usePersistPrinter } from '@renderer/composables/usePrinter'

const { DocumentType } = useDocumentType()
interface props {
  printer: Printers
}

const props = defineProps<props>()
const refPrinter = ref<Printers>(props.printer)
const documentType = ref(refPrinter.value.documentTypes.id)
const fontType = ref(['A', 'B'])
const { updatePrintersMutation } = usePersistPrinter()
const { data } = usePrinter()
watch(
  documentType,
  () => {
    let document = DocumentType.value?.find((x) => x.id == documentType.value)
    if (document) {
      refPrinter.value.documentTypes = document
    }
  },
  { deep: true }
)

const emit = defineEmits(['update-printer'])

const onSubmit = () => {
  console.log(refPrinter.value)
  updatePrintersMutation.mutate(refPrinter.value)
}

watch(updatePrintersMutation.isError, () => {
  if (updatePrintersMutation.isError) {
    emit('update-printer', false)
  }
})
watch(updatePrintersMutation.isSuccess, () => {
  if (updatePrintersMutation.isSuccess) {
    emit('update-printer', true)
  }
})
</script>

<template>
  <div>
    <VCard>
      <VCardText>
        <VSelect
          density="compact"
          :items="data"
          v-model="refPrinter.printerName"
          item-title="name"
          item-value="id"
          variant="outlined"
          label="Impresora"
        />
        <VSelect
          density="compact"
          :items="DocumentType"
          v-model="documentType"
          item-title="name"
          item-value="id"
          variant="outlined"
          label="Tipo de documento"
        />
        <VTextField
          density="compact"
          v-model="refPrinter.copyNumber"
          variant="outlined"
          label="Número de copia"
        />
        <VTextField
          density="compact"
          v-model="refPrinter.characterNumber"
          variant="outlined"
          label="Número de caracteres"
        />
        <VSelect
          density="compact"
          :items="fontType"
          v-model="refPrinter.fontSize"
          variant="outlined"
          label="Tipo de letra"
        />
        <VBtn density="compact" color="primary" flat @click="onSubmit">Guardar</VBtn>
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped></style>
