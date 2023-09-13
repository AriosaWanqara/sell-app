export interface CashDrawer {
  id: string
  port: string | null
  printer: string | null
  usb: boolean
}

export interface saveCahsDrawer {
  id: string | null
  isUsb: boolean
  port: string | null
  printer: string | null
}
