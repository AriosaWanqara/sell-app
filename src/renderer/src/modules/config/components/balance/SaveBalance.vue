<script setup lang="ts">
import { ref } from 'vue'
import { Balance, postBalance } from '../../models/Balance'
import useSerialPorts from '../../composable/useSerialPorts'
import useBalanceType from '../../composable/useBalanceType'
import useBalance from '../../composable/useBalance'
import { v4 as uuidv4 } from 'uuid'
import { watch } from 'vue'
interface props {
  balance?: Balance
}

const { serialPorts, isSerialPortsLoading } = useSerialPorts()
const { BalanceType, isBalanceTypeLoading } = useBalanceType()
const { saveBalancesMutation, refetch } = useBalance()

const getWeightTimer = ref([
  { value: 0, label: 'Peso manual' },
  { value: 1, label: '1 segundo' },
  { value: 2, label: '2 segundo' },
  { value: 3, label: '3 segundo' },
  { value: 4, label: '4 segundo' },
  { value: 5, label: '5 segundo' }
])
const props = defineProps<props>()
const balance = ref<postBalance>({
  id: props.balance?.id ?? null,
  balanceType: props.balance?.balanceType.id ?? null,
  getWeightTimer: props.balance?.getWeightTimer ?? null,
  port: props.balance?.port ?? null
})

const emit = defineEmits(['save'])

const onSubmit = () => {
  if (!balance.value.id) {
    balance.value.id = uuidv4()
  }
  saveBalancesMutation.mutate(balance.value)
}

watch(saveBalancesMutation.isError, () => {
  if (saveBalancesMutation.isError.value) {
    alert('error')
  }
})
watch(saveBalancesMutation.isSuccess, () => {
  if (saveBalancesMutation.isSuccess.value) {
    refetch()
    emit('save', true)
  }
})
</script>

<template>
  <div>
    <VCard>
      <VCardText>
        <VSelect
          density="compact"
          :items="BalanceType"
          v-model="balance.balanceType"
          item-title="port"
          item-value="id"
          variant="outlined"
          :loading="isBalanceTypeLoading"
          label="Tipo de gaveta"
        />
        <VSelect
          density="compact"
          :items="getWeightTimer"
          v-model="balance.getWeightTimer"
          item-title="label"
          item-value="value"
          variant="outlined"
          label="Tipo de gaveta"
        />
        <VSelect
          density="compact"
          :items="serialPorts"
          v-model="balance.port"
          variant="outlined"
          :loading="isSerialPortsLoading"
          label="Tipo de gaveta"
        />
        <VBtn density="compact" color="primary" flat @click="onSubmit">Guardar</VBtn>
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped></style>
