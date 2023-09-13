<script setup lang="ts">
import { ref } from 'vue'
import { CashDrawer, saveCahsDrawer } from '../../models/CashDrawer'
import useSerialPorts from '../../composable/useSerialPorts'
import usePrinter from '@renderer/composables/usePrinter'
import useCashDrawer from '../../composable/useCashDrawer'
import { watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'

interface props {
  cashDrawer?: CashDrawer
}

const { serialPorts } = useSerialPorts()
const { data } = usePrinter()
const { saveCashDrawerMutation, refetch } = useCashDrawer()

const props = defineProps<props>()
const emit = defineEmits(['update-cash-drawer'])
const cashDrawer = ref<saveCahsDrawer>({
  id: props.cashDrawer?.id ?? null,
  isUsb: props.cashDrawer?.usb ?? false,
  port: props.cashDrawer?.port ?? null,
  printer: props.cashDrawer?.printer ? props.cashDrawer.printer : null
})
const CashDrawerType = ref([
  { usb: true, label: 'USB' },
  { usb: false, label: 'Impresora' }
])
const onSubmit = () => {
  if (!cashDrawer.value.id) {
    cashDrawer.value.id = uuidv4()
  }
  saveCashDrawerMutation.mutate(cashDrawer.value)
}

watch(saveCashDrawerMutation.isError, () => {
  if (saveCashDrawerMutation.isError.value) {
    alert('error')
  }
})
watch(saveCashDrawerMutation.isSuccess, () => {
  if (saveCashDrawerMutation.isSuccess.value) {
    refetch()
    emit('update-cash-drawer', true)
  }
})
</script>

<template>
  <div>
    <VCard>
      <VCardText>
        <VSelect
          density="compact"
          :items="CashDrawerType"
          v-model="cashDrawer.isUsb"
          item-title="label"
          item-value="usb"
          variant="outlined"
          label="Tipo de gaveta"
        />
        <VSelect
          v-if="cashDrawer.isUsb"
          density="compact"
          :items="serialPorts"
          v-model="cashDrawer.port"
          variant="outlined"
          label="Puerto COM"
          no-data-text="No se encontro ninguna balanza"
        />
        <VSelect
          v-else
          density="compact"
          :items="data"
          v-model="cashDrawer.printer"
          variant="outlined"
          label="Impresora"
          no-data-text="No tiene configurado impresoras"
        />
        <VBtn density="compact" color="primary" flat @click="onSubmit">Guardar</VBtn>
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped></style>
