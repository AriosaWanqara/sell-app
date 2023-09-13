<script setup lang="ts">
import usePrinterWizard from '@renderer/modules/config/composable/usePrinterWizard'
import { useDark } from '@vueuse/core'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const { printer, progres, stepName } = usePrinterWizard()
const router = useRouter()
const isDark = useDark()
const rules = {
  characterNumber: {
    required: helpers.withMessage('El número de caracteres es requerido', required)
  }
}

const v$ = useVuelidate(rules, printer.value)

onBeforeMount(() => {
  stepName.value = 'Configuración de caracteres'
})

const back = () => {
  router.push({ name: 'config-printers-list' })
}
const saveCharactersConfig = () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    if (progres.value < 3) {
      progres.value = 3
    }
    router.push({ name: 'config-printers-ticket' })
  }
}
</script>

<template>
  <div class="tw-h-full tw-grid tw-place-items-center">
    <div class="tw-text-center">
      <h1 class="tw-text-2xl">Configuración de Caracteres</h1>
      <p class="tw-w-[700px]">
        Cuente y escriba el número de caracteres de la primera línea que se imprimió en este
        momento. Si no se realizó la impresión, verifique que su impresora este conectada y
        encendida antes de continuar.
      </p>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-gap-2 tw-max-w-[550px] tw-m-auto tw-mt-5 tw-items-center"
      >
        <img
          src="../../../../../assets/images/impresion.gif"
          alt=""
          class="tw-rounded-md"
          width="350"
        />
        <div class="tw-w-full tw-flex tw-gap-1">
          <VTextField
            label="Cantidad de caracteres"
            class=""
            density="compact"
            :error-messages="v$.characterNumber.$errors.map((e) => e.$message.toString())"
            variant="outlined"
            v-model="printer.characterNumber"
          />
          <VBtn
            variant="tonal"
            class="dark:tw-bg-gray-300 dark:tw-text-black"
            :class="{ 'light-btn': !isDark }"
            >Re-imprimir</VBtn
          >
        </div>
      </div>
    </div>
    <footer
      class="tw-fixed tw-bottom-3 tw-flex tw-gap-2 tw-py-3 tw-px-8 tw-border-[1px] tw-rounded-full dark:tw-border-slate-700 dark:tw-bg-slate-700 tw-border-slate-300 tw-bg-slate-300"
    >
      <VBtn class="dark:tw-bg-gray-300" @click="back"> Atras</VBtn>
      <VBtn class="dark:tw-bg-gray-300" @click="saveCharactersConfig"> Contiar</VBtn>
    </footer>
  </div>
</template>

<style scoped>
.light-btn {
  background-color: rgb(92, 92, 92);
  color: white;
}
</style>
