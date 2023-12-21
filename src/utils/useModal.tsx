import React, { CSSProperties, createContext, useCallback, useContext, useState } from 'react'
import { Modal } from '../components'

interface ContextProps {
  addModal: (
    content: any,
    options?: {
      className?: string
      style?: CSSProperties
      onClose?: any
      isOpen?: boolean
      preventBackdropClick?: boolean
      hasCloseIcon?: boolean
      backdropClassName?: string
      themeStyle?: 1 | 2 | 3
    }
  ) => void
  removeModal: () => void
}

const ModalContext = createContext<Partial<ContextProps>>({})

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<Array<boolean | any>>([])
  const [options, setOptions] = useState<Array<{}>>([])

  const addModal = useCallback(
    (content, options) => {
      setModalContent((prevContent) => [...prevContent, content])
      setOptions((prevOptions) => [...prevOptions, options])
      setIsOpen(true)
    },
    [setModalContent, setOptions, setIsOpen]
  )

  const removeModal = useCallback(() => {
    setModalContent((prevContent) => prevContent.slice(0, -1))
    setOptions((prevOptions) => prevOptions.slice(0, -1))
  }, [])

  return (
    <ModalContext.Provider value={{ addModal, removeModal }}>
      {modalContent.map((content, index) => (
        <Modal key={index} isOpen={isOpen} onClose={() => removeModal()} {...options[index]}>
          {content}
        </Modal>
      ))}
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  return useContext(ModalContext) as ContextProps
}
