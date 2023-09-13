import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import { axiosJava } from '../api/axios'
import { BalanceType } from '../models/BalanceType'

const BalanceType = ref<BalanceType[]>([])

const fetchPersistBalanceType = async (): Promise<BalanceType[]> => {
  const { data } = await axiosJava.get<BalanceType[]>('/balance-type/list')
  return data
}

const useBalanceType = () => {
  const { isError, isLoading, refetch } = useQuery(['balance-type'], fetchPersistBalanceType, {
    onSuccess(data) {
      BalanceType.value = data
    }
  })

  //   const saveBalanceTypeMutation = useMutation(saveBalanceType)
  //   const deleteBalanceTypeMutation = useMutation(deleteBalanceType)
  return {
    BalanceType,
    balanceTypeHasError: isError,
    isBalanceTypeLoading: isLoading,
    refetch
  }
}

export default useBalanceType
