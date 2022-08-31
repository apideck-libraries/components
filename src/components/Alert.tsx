import React, { HTMLAttributes, ReactNode, forwardRef } from 'react'

import classNames from 'classnames'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'info' | 'warning' | 'danger' | 'success' | 'primary'
  className?: string
  description?: string | ReactNode
  onClose?: VoidFunction
}

export const Alert = forwardRef<HTMLDivElement, Props>(function Alert(
  { children, title, description, variant = 'info', className = '', onClose },
  ref
) {
  const iconClassNames = classNames('h-5 w-5', {
    'text-yellow-400': variant === 'warning',
    'text-red-400': variant === 'danger',
    'text-green-400': variant === 'success',
    'text-blue-400': variant === 'info',
    'text-primary-400': variant === 'primary'
  })

  const icon: {
    warning: JSX.Element
    success: JSX.Element
    danger: JSX.Element
    info: JSX.Element
    primary: JSX.Element
  } = {
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassNames}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassNames}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassNames}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    primary: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassNames}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    danger: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassNames}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  return (
    <div
      className={classNames(
        'rounded-md p-4',
        {
          'bg-yellow-50 dark:bg-yellow-600/75 dark:border-yellow-600': variant === 'warning',
          'bg-red-50 dark:bg-red-600/75 dark:border-red-600': variant === 'danger',
          'bg-green-50 dark:bg-green-600/75 dark:border-green-600': variant === 'success',
          'bg-blue-50 dark:bg-blue-600/75 dark:border-blue-600': variant === 'info',
          'bg-primary-50 dark:bg-primary-600/75 dark:border-primary-600': variant === 'primary'
        },
        className
      )}
      ref={ref}
      data-testid="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">{icon[variant]}</div>
        <div className="ml-3 w-full">
          {title ? (
            <h3
              data-testid="alert-title"
              className={classNames('text-sm font-medium dark:text-white', {
                'text-yellow-800': variant === 'warning',
                'text-red-800': variant === 'danger',
                'text-green-800': variant === 'success',
                'text-blue-800': variant === 'info',
                'text-primary-800': variant === 'primary'
              })}
            >
              {title}
            </h3>
          ) : null}
          {description || children ? (
            <div
              data-testid="alert-description"
              className={classNames('text-sm ', {
                'mt-2': title,
                'text-yellow-700 dark:text-yellow-100': variant === 'warning',
                'text-red-700 dark:text-red-100': variant === 'danger',
                'text-green-700 dark:text-green-100': variant === 'success',
                'text-blue-700 dark:text-blue-100': variant === 'info',
                'text-primary-700 dark:text-primary-100': variant === 'primary'
              })}
            >
              {description || children}
            </div>
          ) : null}
        </div>
        {onClose ? (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                data-testid="alert-close-btn"
                type="button"
                onClick={onClose}
                className={classNames(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  {
                    'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-offset-yellow-50 focus:ring-yellow-600 dark:bg-yellow-800 dark:text-yellow-100 dark:hover:text-white dark:hover:bg-yellow-700':
                      variant === 'warning',
                    'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600 dark:bg-red-800 dark:text-red-100 dark:hover:text-white dark:hover:bg-red-700':
                      variant === 'danger',
                    'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600 dark:bg-green-800 dark:text-green-100 dark:hover:text-white dark:hover:bg-green-700':
                      variant === 'success',
                    'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-offset-blue-50 focus:ring-blue-600 dark:bg-blue-800 dark:text-blue-100 dark:hover:text-white dark:hover:bg-blue-700':
                      variant === 'info',
                    'bg-primary-50 text-primary-500 hover:bg-primary-100 focus:ring-offset-primary-50 focus:ring-primary-600 dark:bg-primary-800 dark:text-primary-100 dark:hover:text-white dark:hover:bg-primary-700':
                      variant === 'primary'
                  }
                )}
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
})
