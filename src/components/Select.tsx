import '../styles/tailwind.css'

import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

export interface Props extends HTMLAttributes<HTMLSelectElement> {
  name: string
  options: { label: string; value: any }[]
  isDisabled?: boolean
  isMultiple?: boolean
  defaultValue?: string | string[]
  className?: string
}

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { className = '', isDisabled = false, isMultiple = false, defaultValue = '', options, ...other },
  ref
) {
  return (
    <select
      className={classNames(
        'w-full px-3 py-2 mt-1 text-base text-gray-600 border-gray-300 rounded-md focus:outline-none sm:text-sm focus:ring-primary-500 focus:border-primary-500',
        { 'cursor-not-allowed opacity-50': isDisabled },
        className
      )}
      ref={ref}
      multiple={isMultiple}
      defaultValue={defaultValue}
      disabled={isDisabled}
      data-testid={other.name}
      {...other}
    >
      <option disabled value="">
        Select an option
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
