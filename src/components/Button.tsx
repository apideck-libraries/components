import classNames from 'classnames'
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import '../styles/tailwind.css'

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'danger-outline'
  size?: 'small' | 'regular' | 'large' | 'larger'
  className?: string
  isDisabled?: boolean
  isLoading?: boolean
  text?: string
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    children,
    type = 'button',
    isDisabled = false,
    variant = 'primary',
    size = 'regular',
    className = '',
    isLoading = false,
    text,
    ...other
  },
  ref
) {
  const baseStyles =
    'inline-flex items-center justify-center border border-transparent leading-4 font-medium rounded transition duration-300 ease-in-out'

  const variantStyles = {
    primary:
      'bg-primary-600 text-white shadow hover:shadow-md active:bg-primary-600 hover:bg-primary-700 focus:shadow-outline-primary',
    secondary:
      'text-primary-700 bg-primary-100 hover:bg-primary-200 shadow hover:shadow-md focus:shadow-outline-primary',
    outline: 'border border-gray-300 text-gray-600 shadow hover:shadow-md hover:text-gray-700',
    danger:
      'bg-red-500 text-white shadow hover:shadow-md active:bg-red-600 hover:bg-red-700 focus:shadow-outline-red',
    'danger-outline':
      'border border-red-300 text-red-600 shadow hover:shadow-md active:border-red-400 hover:border-red-400'
  }

  const sizeStyles = {
    small: 'px-2.5 py-1.5 text-xs',
    regular: 'px-4 py-2 text-sm',
    large: 'px-5 py-3 text-base',
    larger: 'px-6 py-4 text-md'
  }

  const iconStyles = {
    small: 'h-3 w-3',
    regular: 'h-4 w-4',
    large: 'h-5 w-5',
    larger: 'h-6 w-6'
  }

  return (
    <button
      className={classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        { 'opacity-50': isDisabled },
        { 'cursor-not-allowed': isDisabled || isLoading },
        className
      )}
      type={type}
      disabled={isDisabled}
      ref={ref}
      {...other}
    >
      {isLoading && (
        <svg
          data-testid="loading-svg"
          className={classNames(iconStyles[size], 'animate-spin -ml-1 mr-3 text-white')}
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
      )}
      {text || children}
    </button>
  )
})
