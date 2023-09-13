import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import { axiosJava } from '../api/axios'

const serialPorts = ref<string[]>([])

const fetchSerialPorts = async (): Promise<string[]> => {
  const { data } = await axiosJava.get<string[]>('/balance/com-list')
  return data
}

const useSerialPorts = () => {
  const { isError, isLoading } = useQuery(['serial-ports'], fetchSerialPorts, {
    onSuccess(data) {
      serialPorts.value = data
    }
  })

  return {
    serialPorts,
    serialPortsHasError: isError,
    isSerialPortsLoading: isLoading
  }
}

export default useSerialPorts
