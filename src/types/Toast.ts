export interface Toast {
  title: string
  description: string
  type?: 'success' | 'warning' | 'error' | 'info'
  id?: number
  autoClose?: boolean
}
