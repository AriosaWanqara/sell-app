import { useMutation, useQuery } from '@tanstack/vue-query'
import { axiosJava } from '../api/axios'
import { ref } from 'vue'
import { Balance, postBalance } from '../models/Balance'

const Balances = ref<Balance[]>([])

const fetchPersistBalances = async (): Promise<Balance[]> => {
  const { data } = await axiosJava.get<Balance[]>('/balance/list')
  return data
}

const saveBalance = async (Balance: postBalance): Promise<any> => {
  const { data } = await axiosJava.post<any>('/balance/add', Balance)
  return data
}
const deleteBalance = async (id: string): Promise<any> => {
  const { data } = await axiosJava.delete<any>(`/balance/delete/${id}`)
  return data
}

const useBalance = () => {
  const { isError, isLoading, refetch } = useQuery(['persist-balance'], fetchPersistBalances, {
    onSuccess(data) {
      Balances.value = data
    }
  })

  const saveBalancesMutation = useMutation(saveBalance)
  const deleteBalancesMutation = useMutation(deleteBalance)
  return {
    Balances,
    balancesHasError: isError,
    isBalanceLoading: isLoading,
    saveBalancesMutation,
    deleteBalancesMutation,
    refetch
  }
}

export default useBalance
