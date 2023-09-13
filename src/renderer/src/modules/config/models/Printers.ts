import { DocumentType } from './DocumentType'

export interface Printers {
  id: string
  printerName: string
  fontSize: string
  copyNumber: number
  characterNumber: number
  documentTypes: DocumentType
  linedType: number
}
