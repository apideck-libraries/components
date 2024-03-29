import React, { CSSProperties, useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { createPortal } from 'react-dom'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void
  isOpen: boolean
  className?: string
  hasCloseIcon?: boolean
  preventBackdropClick?: boolean
  backdropClassName?: string
  style?: CSSProperties
  themeStyle?: 1 | 2 | 3
}

export const Modal = React.forwardRef<HTMLDivElement, Props>(function Modal(props, ref) {
  const {
    children,
    onClose,
    isOpen,
    hasCloseIcon,
    preventBackdropClick,
    className = '',
    backdropClassName = '',
    themeStyle = 1,
    style = {},
    ...other
  } = props

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const modalComponent = (
    <Transition show={isOpen}>
      <Transition.Child
        enter="transition ease-out duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={classNames(
            'fixed inset-0 z-50 flex items-end bg-gray-400 bg-opacity-75 dark:bg-gray-700 dark:bg-opacity-75 sm:items-center justify-center',
            backdropClassName
          )}
          data-testid="backdrop"
          onClick={() => {
            if (!preventBackdropClick) {
              onClose()
            }
          }}
        >
          <Transition.Child
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 transform translate-y-1/4 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0  transform translate-y-1/4 scale-95"
            className={classNames(
              'relative w-full p-5 overflow-y-auto bg-white dark:text-gray-400 rounded-t-lg sm:p-6 no-scrollbar sm:rounded-lg sm:m-4 sm:max-w-xl',
              className,
              {
                'dark:bg-gray-800 shadow-lg': themeStyle === 1,
                'dark:bg-gray-900 shadow-lg': themeStyle === 2,
                'ring-1 ring-black ring-opacity-5 dark:bg-gray-900/90 dark:backdrop-blur dark:ring-gray-800/70':
                  themeStyle === 3
              }
            )}
            style={{ maxHeight: '90%', ...style }}
            ref={ref}
            role="dialog"
            onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
            {...other}
          >
            {hasCloseIcon && (
              <button
                className="absolute top-4 right-4 sm:top-5 sm:right-5 text-gray-700 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 p-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            {children}
          </Transition.Child>
        </div>
      </Transition.Child>
    </Transition>
  )

  const parentElement = document.getElementsByClassName('apideck')?.length
    ? document.getElementsByClassName('apideck')[0]
    : document.body

  return mounted ? createPortal(modalComponent, parentElement) : null
})
