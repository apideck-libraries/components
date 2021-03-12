import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

export interface Props extends HTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  value?: boolean
  className?: string
  disabled?: boolean
  required?: boolean
  valid?: boolean
}

export const CheckBox = forwardRef<HTMLInputElement, Props>(function CheckBox(
  { className = '', label, value = false, disabled, name, valid, ...other },
  ref
) {
  return (
    <>
      <input
        className={classNames(
          'w-5 h-5 text-primary-600 border-gray-300 shadow-sm rounded-md focus:ring-primary-500 focus:border-primary-500',
          { 'cursor-not-allowed opacity-50': disabled },
          {
            'border-green-600 focus:border-green-400 focus:shadow-outline-green':
              valid !== undefined && valid
          },
          {
            'border-red-600 focus:border-red-400 focus:shadow-outline-red':
              valid !== undefined && !valid
          },
          className
        )}
        name={name}
        id={name}
        type="checkbox"
        defaultChecked={value}
        disabled={disabled}
        ref={ref}
        data-testid={name}
        {...other}
      />
      {label && (
        <label
          htmlFor={name}
          className={classNames('inline-block ml-2 text-sm text-gray-600', {
            'cursor-not-allowed': disabled
          })}
        >
          {label}
        </label>
      )}
    </>
  )
})

export default CheckBox
