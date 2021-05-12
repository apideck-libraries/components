import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'
import styles from '../styles/input'

export interface Props extends HTMLAttributes<HTMLSelectElement> {
  name: string
  options: { label: string; value: any }[]
  disabled?: boolean
  required?: boolean
  multiple?: boolean
  value?: string | string[]
  defaultValue?: string | string[]
  className?: string
  valid?: boolean
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  {
    className = '',
    disabled = false,
    defaultValue = '',
    placeholder = 'Select an option',
    options,
    valid,
    ...other
  },
  ref
) {
  return (
    <select
      className={classNames(
        'w-full px-3 py-2 text-base text-gray-600 shadow-sm border-gray-300 rounded-md focus:outline-none sm:text-sm focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400',
        { 'cursor-not-allowed opacity-50': disabled },
        styles.dark,
        {
          [styles.valid]: valid !== undefined && valid
        },
        {
          [styles.invalid]: valid !== undefined && !valid
        },
        className
      )}
      ref={ref}
      disabled={disabled}
      defaultValue={defaultValue}
      data-testid={other.name}
      {...other}
    >
      <option disabled value="">
        {placeholder}
      </option>

      {options.map((option, index) => {
        const { value, label } = option

        return (
          <option key={`${label}-${index}`} value={value}>
            {label}
          </option>
        )
      })}
    </select>
  )
})

export default Select
