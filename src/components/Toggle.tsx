import React, { ButtonHTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onToggle: () => void
  isEnabled?: boolean
  isLoading?: boolean
  className?: string
}

export const Toggle = forwardRef<HTMLButtonElement, Props>(function Toggle(
  { isEnabled = false, isLoading = false, className = '', onToggle, ...other },
  ref
) {
  return (
    <button
      type="button"
      onClick={() => onToggle()}
      className={classNames(
        'relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600',
        {
          'bg-primary-600': isEnabled,
          'bg-gray-200': !isEnabled
        },
        className
      )}
      aria-pressed={isEnabled}
      ref={ref}
      {...other}
    >
      <span
        data-testid="toggler"
        className={classNames(
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-700',
          {
            'translate-x-5': isEnabled,
            'translate-x-0': !isEnabled,
            'animate-ping duration-200': isLoading
          }
        )}
      ></span>
    </button>
  )
})
