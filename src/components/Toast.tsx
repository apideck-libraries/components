import React, { useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'
import { useToast } from '../utils'

export interface Props {
  title: string
  description: string
  type?: 'success' | 'warning' | 'error' | 'info'
  id?: number
  autoClose?: boolean
}

export const Toast: React.FC<Props> = ({ title, description, type = 'info', id, autoClose }) => {
  const [shouldShow, setShouldShow] = useState(false)
  const { removeToast } = useToast()

  useEffect(() => {
    if (!shouldShow) setShouldShow(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setShouldShow(false)
        setTimeout(() => {
          removeToast(id)
        }, 300)
      }, 3500)
      return () => {
        clearTimeout(timer)
      }
    }
    return
  }, [id, removeToast, autoClose])

  const icon = {
    info: (
      <svg
        className="w-6 h-6 text-indigo-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        data-testid="icon"
      >
        <path
          d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    success: (
      <svg
        className="w-6 h-6 text-green-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        data-testid="icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    warning: (
      <svg
        className="w-6 h-6 text-yellow-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        data-testid="icon"
      >
        <path
          d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    error: (
      <svg
        className="w-6 h-6 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        data-testid="icon"
      >
        <path
          d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  const borderStyle = {
    success: 'border-green-400',
    warning: 'border-yellow-500',
    error: 'border-red-400',
    info: 'border-indigo-400'
  }

  return (
    <div
      className="flex items-end justify-center w-full px-4 pt-6 pointer-events-none top-2 right-2 sm:px-6 sm:items-start sm:justify-end"
      key={id}
    >
      <Transition
        show={shouldShow}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className={`w-full max-w-sm bg-white border-l-2 rounded-md shadow-lg pointer-events-auto ${borderStyle[type]}`}
        data-testid="toast"
      >
        <div className="overflow-hidden rounded-lg shadow-xs">
          <div className="p-3">
            <div className="flex items-start">
              <div className="flex-shrink-0">{icon[type]}</div>
              <div className="ml-2 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium leading-5 text-gray-900">{title}</p>
                <p className="mt-1 text-sm leading-5 text-gray-500">{description}</p>
              </div>
              <span
                className="float-right cursor-pointer"
                onClick={() => removeToast(id)}
                data-testid="remove"
              >
                <svg
                  className="text-gray-600 fill-current hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                >
                  <path d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}