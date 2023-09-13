import { useMutation, useQuery } from '@tanstack/vue-query'
import { CashDrawer, saveCahsDrawer } from '../models/CashDrawer'
import { axiosJava } from '../api/axios'
import { ref } from 'vue'

const cashDrawers = ref<CashDrawer[]>([])

const fetchPersistCashDrawer = async (): Promise<CashDrawer[]> => {
  const { data } = await axiosJava.get<CashDrawer[]>('/cash-drawer/list')
  return data
}

const saveCahsDrawer = async (CashDrawer: saveCahsDrawer): Promise<any> => {
  const { data } = await axiosJava.post<any>('/cash-drawer/add', CashDrawer)
  return data
}
const deleteCahsDrawer = async (id: string): Promise<any> => {
  const { data } = await axiosJava.delete<any>(`/cash-drawer/delete/${id}`)
  return data
}

const useCashDrawer = () => {
  const { isError, isLoading, refetch } = useQuery(
    ['persist-cash-drawer'],
    fetchPersistCashDrawer,
    {
      onSuccess(data) {
        cashDrawers.value = data
      }
    }
  )

  const saveCashDrawerMutation = useMutation(saveCahsDrawer)
  const deleteCashDrawerMutation = useMutation(deleteCahsDrawer)
  return {
    cashDrawers,
    cashDrawersHasError: isError,
    isCashDrawersLoading: isLoading,
    saveCashDrawerMutation,
    refetch,
    deleteCashDrawerMutation
  }
}

export default useCashDrawer
