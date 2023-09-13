<script setup lang="ts">
import { Icon } from '@iconify/vue'
import isNumber from '@renderer/services/isNumber'
import { watch } from 'vue'
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import useServer from '@renderer/composables/useServer'

const { port, serverInitialPath, serverPath } = useServer()
const rules = {
  port: { required: helpers.withMessage('El puerto es requerido', required) }
}

const path = ref()
const filePath = ref()
const newPort = ref(window.store.store.get('port') || '52135')
const v$ = useVuelidate(rules, { port: newPort })

watch(path, () => {
  if (path.value[0].path != serverInitialPath.value) {
    if (path.value[0].path) {
      filePath.value = path.value[0].path.replaceAll('\\', '/')
      alert('a')
    }
  }
})

const onAdapterConfigSubmit = () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    window.store.store.set('port', newPort.value)
    window.store.store.set('path', filePath.value)
    serverPath.value = filePath.value
    port.value = newPort.value
  }
}
</script>
<template>
  <div class="tw-h-full">
    <v-form
      validate-on="input"
      class="tw-px-4 tw-py-4 tw-flex tw-flex-wrap"
      @submit.prevent="onAdapterConfigSubmit"
    >
      <v-text-field
        label="Puerto"
        v-model="newPort"
        required
        :error-messages="v$.port.$errors.map((e) => e.$message.toString())"
        variant="outlined"
        class="tw-flex-col tw-w-1/2 md:tw-w-1/3 tw-mx-1"
        @keypress="isNumber($event)"
        density="compact"
      />
      <div class="tw-w-full tw-mx-1 tw-mt-4">
        <v-btn color="primary" elevation="0" type="submit" density="comfortable">
          <Icon
            icon="material-symbols:fitbit-check-small-rounded"
            class="tw-text-2xl tw-m-0 tw-p-0"
          />
          Guardar
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<style scoped></style>
