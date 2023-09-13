<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Balance } from '../../models/Balance'
import { ref } from 'vue'
import SaveBalance from './SaveBalance.vue'

interface props {
  balance: Balance
}

const props = defineProps<props>()
const openUpdateBalanceModal = ref(false)
const emitUpdate = (params) => {
  console.log(params)
  if (params) {
    openUpdateBalanceModal.value = false
  }
}

const emit = defineEmits(['delete'])

const onDelete = () => {
  emit('delete', props.balance.id)
}
</script>
<template>
  <div class="tw-flex tw-gap-1 tw-border-[1px]">
    <div class="tw-w-[80px] tw-p-2 tw-border-r-[1px] tw-flex tw-flex-col tw-items-center">
      <Icon icon="mdi:weight-kilogram" height="34" />
    </div>
    <div class="tw-flex-grow tw-flex tw-justify-between">
      <div class="">
        <p class="tw-text-xs">
          Tipo <strong>{{ props.balance.balanceType.port }}</strong>
        </p>
        <p class="tw-text-xs">
          Puerto <strong>{{ props.balance.port }}</strong>
        </p>
      </div>
      <div class="tw-flex tw-flex-col tw-justify-between tw-p-2 tw-h-full tw-gap-2">
        <VBtn color="error" size="x-small" variant="flat" @click="onDelete">
          <VIcon>mdi-trash-can</VIcon>
        </VBtn>
        <VBtn color="warning" size="x-small" variant="flat" @click="openUpdateBalanceModal = true">
          <VIcon>mdi-pencil</VIcon>
        </VBtn>
      </div>
    </div>
    <VDialog v-model="openUpdateBalanceModal" max-width="450">
      <SaveBalance :balance="props.balance" @save="emitUpdate" />
    </VDialog>
  </div>
</template>

<style scoped></style>
