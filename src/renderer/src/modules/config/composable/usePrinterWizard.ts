import { ref } from 'vue'
import { Printers } from '../models/Printers'

const printer = ref<Printers>(<Printers>{})
const progres = ref(0)
const stepName = ref('')

const usePrinterWizard = () => {
  return {
    printer,
    progres,
    stepName
  }
}

export default usePrinterWizard
