import axios from 'axios'
import { ref } from 'vue'
const port = ref(window.store.store.get('port') || '52135')

const baseURL = `http://localhost:${port.value}`
export const axiosJava = axios.create({
  baseURL: baseURL
})

axiosJava.interceptors.request.use((req) => {
  req.headers['Content-Type'] = `application/json`
  return req
})
