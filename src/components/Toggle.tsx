import React, { Fragment, forwardRef } from 'react'

import { Switch } from '@headlessui/react'
import classNames from 'classnames'
import styles from '../styles/input'

export interface Props {
  onToggle: (checked: boolean) => void
  isEnabled?: boolean
  isLoading?: boolean
  hasIcons?: boolean
  className?: string
  label?: string | React.ReactNode
  labelClassName?: string
  style?: React.CSSProperties
}

export const Toggle = forwardRef<any, Props>(function Toggle(
  { label, labelClassName = '', ...props },
  ref
) {
  if (label) {
    return (
      <Switch.Group as="div" className="flex items-center">
        <ToggleComponent ref={ref} {...props} />
        <Switch.Label as="span" className={`ml-3 text-gray-900 dark:text-white ${labelClassName}`}>
          {label}
        </Switch.Label>
      </Switch.Group>
    )
  }
  return <ToggleComponent {...props} />
})

export const ToggleComponent = forwardRef<HTMLButtonElement, Props>(function Toggle(
  { isEnabled = false, isLoading = false, hasIcons = false, className = '', onToggle, ...other },
  ref
) {
  return (
    <Switch
      checked={isEnabled}
      onChange={onToggle}
      className={classNames(
        'relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-200',
        {
          'bg-primary-600': isEnabled,
          'bg-gray-200': !isEnabled
        },
        styles.dark,
        className
      )}
      aria-pressed={isEnabled}
      ref={ref}
      {...other}
    >
      <span
        data-testid="toggler"
        className={classNames(
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 shadow transform ring-0 transition ease-in-out duration-700',
          {
            'translate-x-5': isEnabled,
            'translate-x-0': !isEnabled,
            'p-1': isLoading
          }
        )}
      >
        {isLoading ? (
          <svg
            data-testid="loading-icon"
            className="h-3 w-3 text-gray-400 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : null}
        {hasIcons && !isLoading ? (
          <Fragment>
            <span
              className={classNames(
                isEnabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
              )}
              aria-hidden="true"
              data-testid="disabled-icon"
            >
              <svg
                className="h-3 w-3 text-gray-400 dark:text-gray-700"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              className={classNames(
                isEnabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
              )}
              aria-hidden="true"
              data-testid="enabled-icon"
            >
              <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 12 12">
                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
              </svg>
            </span>
          </Fragment>
        ) : null}
      </span>
    </Switch>
  )
})
