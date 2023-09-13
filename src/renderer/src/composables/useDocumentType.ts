import type { DocumentType } from '@renderer/modules/config/models/DocumentType'
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { ref } from 'vue'

const port = ref(window.store.store.get('port') || '52135')

const fetchServerDocumentType = async (): Promise<DocumentType[]> => {
  const { data } = await axios.get<DocumentType[]>(
    `http://localhost:${port.value}/document-type/list`
  )
  return data
}

const useDocumentType = () => {
  const { isError, data, isFetching } = useQuery(
    ['get-server-documents'],
    fetchServerDocumentType,
    {
      retry: false
    }
  )

  return {
    DocumentTypeHasError: isError,
    DocumentType: data,
    isFetching
  }
}

export default useDocumentType
