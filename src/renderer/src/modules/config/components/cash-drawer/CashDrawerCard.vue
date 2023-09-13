<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { CashDrawer } from '../../models/CashDrawer'
import { ref } from 'vue'
import UpdateCashDrawer from './UpdateCashDrawer.vue'

interface props {
  cashDrawer: CashDrawer
}

const props = defineProps<props>()
const openUpdateCashDrawerModal = ref(false)
const emitUpdate = (params) => {
  console.log(params)

  if (params) {
    openUpdateCashDrawerModal.value = false
  }
}

const emit = defineEmits(['delete'])

const onDelete = () => {
  emit('delete', props.cashDrawer.id)
}
</script>
<template>
  <div class="tw-flex tw-gap-1 tw-border-[1px]">
    <div class="tw-w-[80px] tw-p-2 tw-border-r-[1px] tw-flex tw-flex-col tw-items-center">
      <Icon
        icon="streamline:money-cashier-shop-shopping-pay-payment-cashier-store-cash-register-machine"
        height="34"
      />
    </div>
    <div class="tw-flex-grow tw-flex tw-justify-between">
      <div class="">
        <p class="tw-text-xs">
          Tipo <strong>{{ props.cashDrawer.usb ? 'Serial' : 'Impresora' }}</strong>
        </p>
        <p class="tw-text-xs" v-if="props.cashDrawer.printer">
          Impresora <strong>{{ props.cashDrawer.printer }}</strong>
        </p>
        <p class="tw-text-xs" v-else>
          Puerto <strong>{{ props.cashDrawer.port }}</strong>
        </p>
      </div>
      <div class="tw-flex tw-flex-col tw-justify-between tw-p-2 tw-h-full tw-gap-2">
        <VBtn color="error" size="x-small" variant="flat" @click="onDelete">
          <VIcon>mdi-trash-can</VIcon>
        </VBtn>
        <VBtn
          color="warning"
          size="x-small"
          variant="flat"
          @click="openUpdateCashDrawerModal = true"
        >
          <VIcon>mdi-pencil</VIcon>
        </VBtn>
      </div>
    </div>
    <VDialog v-model="openUpdateCashDrawerModal" max-width="450">
      <UpdateCashDrawer :cash-drawer="props.cashDrawer" @update-cash-drawer="emitUpdate" />
    </VDialog>
  </div>
</template>

<style scoped></style>
