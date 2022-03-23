import classNames from 'classnames'
import React, { ButtonHTMLAttributes, forwardRef } from 'react'

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
        'relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-200',
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
            'p-1': isLoading
          }
        )}
      >
        <svg
          data-testid="loading-svg"
          className={classNames('text-gray-400 animate-spin', {
            hidden: !isLoading
          })}
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
      </span>
    </button>
  )
})
