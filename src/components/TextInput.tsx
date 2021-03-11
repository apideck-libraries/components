import '../styles/tailwind.css'

import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

export interface Props extends HTMLAttributes<HTMLInputElement> {
  name: string
  type?: string
  value?: string
  isDisabled?: boolean
  className?: string
}

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  { className = '', type = 'text', isDisabled = false, ...other },
  ref
) {
  return (
    <input
      className={classNames(
        'w-full text-gray-600 border-gray-300 rounded-md sm:text-sm shadow-sm focus:ring-primary-500 focus:border-primary-500',
        { 'cursor-not-allowed opacity-50': isDisabled },
        className
      )}
      ref={ref}
      type={type}
      disabled={isDisabled}
      id={other.name}
      {...other}
    />
  )
})

export default TextInput
