import { ReactNode } from 'react'

export interface Toast {
  title: string
  description?: string | Element | ReactNode
  type?: 'success' | 'warning' | 'error' | 'info'
  id?: number
  autoClose?: boolean
  closeAfter?: number
  closeText?: string
  image?: string
}
