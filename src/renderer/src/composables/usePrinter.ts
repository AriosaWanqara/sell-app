import { axiosJava } from '@renderer/modules/config/api/axios'
import { Printers } from '@renderer/modules/config/models/Printers'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

const persistPrinters = ref<Printers[]>([])
const fetchServerPrinter = async (): Promise<String[]> => {
  const { data } = await axiosJava.get<String[]>(`/printer/list`)
  return data
}
const fetchServerPersistPrinter = async (): Promise<Printers[]> => {
  const { data } = await axiosJava.get<Printers[]>(`/printer/persist/list`)
  return data
}

const printTest = async (req: { printerName; fontSize }): Promise<any> => {
  const { data } = await axiosJava.post<any>(`/printer/test`, req)
  return data
}

const savePrinters = async (req: { printers: Printers[] }): Promise<any> => {
  const { data } = await axiosJava.post<any>(`/printer/add`, req)
  return data
}
const updatePrinters = async (printers: Printers): Promise<any> => {
  const { data } = await axiosJava.patch<any>(`/printer/update`, printers)
  return data
}
const deletePrinters = async (id: string): Promise<any> => {
  const { data } = await axiosJava.delete<any>(`/printer/delete/${id}`)
  return data
}

const usePrinter = () => {
  const { isError, data, isFetching } = useQuery(['get-server-printer'], fetchServerPrinter, {
    retry: false
  })

  const printTestMutation = useMutation(printTest)
  const savePrintersMutation = useMutation(savePrinters)

  return {
    isError,
    data,
    isFetching,
    printTestMutation,
    savePrintersMutation
  }
}
export const usePersistPrinter = () => {
  const { isError, isLoading, refetch } = useQuery(
    ['get-server-persist-printer'],
    fetchServerPersistPrinter,
    {
      retry: false,
      onSuccess(data) {
        persistPrinters.value = data
      }
    }
  )
  const printTestMutation = useMutation(printTest)
  const savePrintersMutation = useMutation(savePrinters)
  const updatePrintersMutation = useMutation(updatePrinters)
  const deletePrintersMutation = useMutation(deletePrinters, {
    onSuccess(data, variables, context) {
      console.log(data)
      console.log(variables)
      console.log(context)
    }
  })
  return {
    isError,
    persistPrinters,
    isLoading,
    printTestMutation,
    savePrintersMutation,
    deletePrintersMutation,
    refetch,
    updatePrintersMutation
  }
}

export default usePrinter
