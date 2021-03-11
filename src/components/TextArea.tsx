import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

export interface Props extends HTMLAttributes<HTMLTextAreaElement> {
  name: string
  value?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  { className = '', disabled = false, ...other },
  ref
) {
  return (
    <textarea
      className={classNames(
        'w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-primary-500 focus:border-primary-500',
        { 'cursor-not-allowed opacity-50': disabled },
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
