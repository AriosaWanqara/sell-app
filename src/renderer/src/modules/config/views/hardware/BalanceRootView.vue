<script setup lang="ts">
import { watch } from 'vue'
import BalanceCard from '../../components/balance/BalanceCard.vue'
import useBalance from '../../composable/useBalance'
import { ref } from 'vue'
import SaveBalance from '../../components/balance/SaveBalance.vue'

const { Balances, isBalanceLoading, balancesHasError, deleteBalancesMutation, refetch } =
  useBalance()

const openAddBalanceModal = ref(false)

const onDeleteEmit = (params) => {
  if (params) {
    deleteBalancesMutation.mutate(params)
  }
}
watch(deleteBalancesMutation.isError, () => {
  if (deleteBalancesMutation.isError.value) {
    alert('error')
  }
})

watch(deleteBalancesMutation.isSuccess, () => {
  if (deleteBalancesMutation.isSuccess.value) {
    refetch()
  }
})

const emitSave = (params) => {
  if (params) {
    openAddBalanceModal.value = false
    refetch()
  }
}
</script>

<template>
  <div>
    <VContainer>
      <VRow>
        <VCol cols="12">
          <VBtn density="compact" flat @click="openAddBalanceModal = true">Agreagar</VBtn>
        </VCol>
        <VCol cols="12">
          <div class="tw-w-full">
            <div v-if="isBalanceLoading">cargando...</div>
            <div class="tw-w-full" v-else>
              <div v-if="balancesHasError">error...</div>
              <div class="tw-flex tw-flex-col tw-gap-2">
                <BalanceCard v-for="item in Balances" :balance="item" @delete="onDeleteEmit" />
              </div>
            </div>
          </div>
        </VCol>
        <VDialog v-model="openAddBalanceModal" max-width="450">
          <SaveBalance @save="emitSave" />
        </VDialog>
      </VRow>
    </VContainer>
  </div>
</template>

<style scoped></style>
