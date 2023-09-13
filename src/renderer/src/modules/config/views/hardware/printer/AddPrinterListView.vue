<script setup lang="ts">
import usePrinter from '@renderer/composables/usePrinter'
import usePrinterWizard from '@renderer/modules/config/composable/usePrinterWizard'
import isNumber from '@renderer/services/isNumber'
import { onBeforeMount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const router = useRouter()
const { printer, progres, stepName } = usePrinterWizard()

const rules = {
  printerName: {
    required: helpers.withMessage('El nombre de la impresora es requerido', required)
  },
  copyNumber: { required: helpers.withMessage('El número de copias es requerido', required) }
}

const v$ = useVuelidate(rules, printer.value)

onBeforeMount(() => {
  stepName.value = 'Configuración de impresora'
})

const { data, printTestMutation } = usePrinter()

const savePrinterConfig = () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    printTestMutation.mutate(printer.value)
  }
}

watch(printTestMutation.isError, () => {
  if (printTestMutation.isError.value) {
    alert('No se pudo hacer el test, verifique el estado de su impresora')
  }
})
watch(printTestMutation.isSuccess, () => {
  if (printTestMutation.isSuccess.value) {
    if (progres.value < 2) {
      progres.value = 2
    }
    router.push({ name: 'config-printers-characters' })
  }
})

const back = () => {
  router.push({ name: 'config-printers-font' })
}
</script>

<template>
  <div class="tw-flex tw-justify-center tw-items-center tw-flex-col tw-gap-4 tw-h-full">
    <h1 class="tw-text-2xl">Configure una impresora</h1>
    <div class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-p-10 tw-w-[550px]">
      <VSelect
        :items="data"
        v-model="printer.printerName"
        variant="outlined"
        density="compact"
        :error-messages="v$.printerName.$errors.map((error) => error.$message.toString())"
        label="Seleccione una impresora"
        class="tw-w-full"
      />
      <VTextField
        variant="outlined"
        label="Cantidad de copias"
        density="compact"
        v-model="printer.copyNumber"
        class="tw-w-full"
        :error-messages="v$.copyNumber.$errors.map((error) => error.$message.toString())"
        @keypress="isNumber($event)"
        maxlength="2"
      />
    </div>
    <footer
      class="tw-fixed tw-bottom-3 tw-flex tw-gap-2 tw-py-3 tw-px-8 tw-border-[1px] tw-rounded-full dark:tw-border-slate-700 dark:tw-bg-slate-700 tw-border-slate-300 tw-bg-slate-300"
    >
      <VBtn class="dark:tw-bg-gray-300" @click="back"> Atras</VBtn>
      <VBtn class="dark:tw-bg-gray-300" @click="savePrinterConfig"> Contiar</VBtn>
    </footer>
  </div>
</template>

<style scoped></style>
