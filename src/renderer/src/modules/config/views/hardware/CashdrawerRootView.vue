<script setup lang="ts">
import { watch } from 'vue'
import CashDrawerCard from '../../components/cash-drawer/CashDrawerCard.vue'
import useCashDrawer from '../../composable/useCashDrawer'
import { ref } from 'vue'
import UpdateCashDrawer from '../../components/cash-drawer/UpdateCashDrawer.vue'

const {
  cashDrawers,
  cashDrawersHasError,
  isCashDrawersLoading,
  deleteCashDrawerMutation,
  refetch
} = useCashDrawer()

const openCreateCashDrawerModal = ref(false)

const onDeleteEmit = (params) => {
  deleteCashDrawerMutation.mutate(params)
}

watch(deleteCashDrawerMutation.isError, () => {
  if (deleteCashDrawerMutation.isError.value) {
    alert('error')
  }
})
watch(deleteCashDrawerMutation.isSuccess, () => {
  if (deleteCashDrawerMutation.isSuccess.value) {
    refetch()
  }
})

const emitCreate = (params) => {
  if (params) {
    openCreateCashDrawerModal.value = false
  }
}
</script>
<template>
  <div>
    <VContainer>
      <VRow>
        <VCol cols="12">
          <VBtn density="compact" flat @click="openCreateCashDrawerModal = true">Agregar</VBtn>
        </VCol>
        <VCol cols="12">
          <div class="tw-w-full">
            <div v-if="isCashDrawersLoading">cargando...</div>
            <div class="tw-w-full" v-else>
              <div v-if="cashDrawersHasError">error...</div>
              <div class="tw-flex tw-flex-col tw-gap-2">
                <CashDrawerCard
                  v-for="item in cashDrawers"
                  :cash-drawer="item"
                  @delete="onDeleteEmit"
                />
              </div>
            </div>
          </div>
        </VCol>
        <VDialog v-model="openCreateCashDrawerModal" max-width="450">
          <UpdateCashDrawer @update-cash-drawer="emitCreate" />
        </VDialog>
      </VRow>
    </VContainer>
  </div>
</template>

<style scoped></style>
