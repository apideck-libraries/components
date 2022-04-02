import classNames from 'classnames'
import React, { forwardRef, HTMLAttributes } from 'react'
import styles from '../styles/input'

export interface Props extends HTMLAttributes<HTMLTextAreaElement> {
  name: string
  value?: string
  disabled?: boolean
  required?: boolean
  valid?: boolean
  autoFocus?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  { className = '', disabled = false, valid, ...other },
  ref
) {
  return (
    <textarea
      className={classNames(
        'w-full px-3 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400',
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
      disabled={disabled}
      id={other.name}
      ref={ref}
      {...other}
    />
  )
})

export default TextArea
