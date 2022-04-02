import classNames from 'classnames'
import React, { forwardRef, HTMLAttributes } from 'react'
import styles from '../styles/input'

export interface Props extends HTMLAttributes<HTMLInputElement> {
  name: string
  type?: string
  value?: string
  required?: boolean
  disabled?: boolean
  className?: string
  valid?: boolean
  autoComplete?: string
  autoFocus?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  { className = '', type = 'text', disabled = false, valid, ...other },
  ref
) {
  return (
    <input
      className={classNames(
        'w-full text-gray-600 border-gray-300 rounded-md sm:text-sm shadow-sm focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400',
        styles.dark,
        { 'cursor-not-allowed opacity-50': disabled },
        {
          [styles.valid]: valid !== undefined && valid
        },
        {
          [styles.invalid]: valid !== undefined && !valid
        },
        className
      )}
      ref={ref}
      type={type}
      disabled={disabled}
      id={other.name}
      {...other}
    />
  )
})

export default TextInput
