import '../styles/tailwind.css'

import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

export interface Props extends HTMLAttributes<HTMLTextAreaElement> {
  name: string
  value?: string
  isDisabled?: boolean
  className?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  { className = '', isDisabled = false, ...other },
  ref
) {
  return (
    <textarea
      className={classNames(
        'w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-primary-500 focus:border-primary-500',
        { 'cursor-not-allowed opacity-50': isDisabled },
        className
      )}
      id={other.name}
      disabled={isDisabled}
      ref={ref}
      {...other}
    />
  )
})

export default TextArea
