import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { ref } from 'vue'

const serverInitialPath = ref('C:/Illarli-printers/target/middelware-0.0.1-SNAPSHOT.jar')
const someError = ref(false)
const port = ref(window.store.store.get('port') || '52135')
const serverPath = ref(window.store.store.get('path'))

const fetchServerStatus = async (): Promise<boolean> => {
  const { data } = await axios.get<boolean>(`http://localhost:${port.value}/check`)
  return data
}

const useServer = () => {
  const { isError } = useQuery(['get-server-status'], fetchServerStatus, {
    onSuccess(data) {
      console.log(data)
      this.refetchInterval = 5000
      someError.value = false
    },
    onError(err) {
      console.log(err)
      this.refetchInterval = 1000
      someError.value = true
    },
    retry: false
  })
  return {
    isError,
    someError,
    serverInitialPath,
    serverPath,
    port
  }
}

export default useServer
