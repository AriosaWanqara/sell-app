<script setup lang="ts">
import useDocumentType from '@renderer/composables/useDocumentType'
import usePrinterWizard from '@renderer/modules/config/composable/usePrinterWizard'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import type { DocumentType } from '@renderer/modules/config/models/DocumentType'
import { v4 as uuidv4 } from 'uuid'
import { Printers } from '@renderer/modules/config/models/Printers'
import usePrinter from '@renderer/composables/usePrinter'
import { watch } from 'vue'

const { DocumentType } = useDocumentType()
const router = useRouter()
const rules = {
  documents: { required: helpers.withMessage('Debe escoger mínimo un tipo de documento', required) }
}

const { savePrintersMutation } = usePrinter()
const documents = ref<string[]>([])
const v$ = useVuelidate(rules, { documents })
const printers = ref<Printers[]>([])

const { printer, stepName } = usePrinterWizard()

const back = () => {
  router.push({ name: 'config-printers-characters' })
}

onBeforeMount(() => {
  stepName.value = 'Configuración de Ticket'
})

const saveDocumentsConfig = () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    console.log(documents.value)
    printers.value = []
    documents.value.map((document) => {
      let id = uuidv4()
      let tempDoc = DocumentType.value!.find((x) => x.name == document)
      let newPrinter = { ...printer.value, id: id, documentTypes: tempDoc! }

      printers.value.push(newPrinter)
    })
    savePrintersMutation.mutate({ printers: printers.value })
  }
}

watch(savePrintersMutation.isError, () => {
  if (savePrintersMutation.isError.value) {
  }
})

watch(savePrintersMutation.isSuccess, () => {
  if (savePrintersMutation.isSuccess.value) {
    router.push({ name: 'config-home-printers' })
  }
})
</script>

<template>
  <div class="tw-grid tw-place-items-center tw-h-full">
    <div class="tw-flex tw-flex-col tw-gap-4 tw-w-[550px] tw-items-center">
      <h1 class="tw-text-2xl">Configuración del ticket</h1>
      <p>Seleccione los documentos que desea imprimir con esta configuración</p>
      <VSelect
        :items="DocumentType"
        item-title="name"
        v-model="documents"
        class="tw-w-full"
        multiple
        :error-messages="v$.documents.$errors.map((e) => e.$message.toString())"
        chips
        label="Tipo de documento"
        variant="outlined"
      />
    </div>
    <footer
      class="tw-fixed tw-bottom-3 tw-flex tw-gap-2 tw-py-3 tw-px-8 tw-border-[1px] tw-rounded-full dark:tw-border-slate-700 dark:tw-bg-slate-700 tw-border-slate-300 tw-bg-slate-300"
    >
      <VBtn class="dark:tw-bg-gray-300" @click="back"> Atras</VBtn>
      <VBtn class="dark:tw-bg-gray-300" @click="saveDocumentsConfig"> Guardar impresora</VBtn>
    </footer>
  </div>
</template>

<style scoped></style>
