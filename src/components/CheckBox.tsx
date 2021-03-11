import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

export interface Props extends HTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  value?: boolean
  className?: string
  disabled?: boolean
  required?: boolean
}

export const CheckBox = forwardRef<HTMLInputElement, Props>(function CheckBox(
  { className = '', label, value, disabled, name, ...other },
  ref
) {
  return (
    <>
      <input
        className={classNames(
          'w-5 h-5 text-primary-600 border-gray-300 shadow-sm rounded-md focus:ring-primary-500 focus:border-primary-500',
          { 'cursor-not-allowed opacity-50': disabled },
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
          className={classNames('inline-block pt-2 ml-2 text-sm text-gray-600', {
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
