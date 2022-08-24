import React, { Fragment, HTMLAttributes, ReactNode, forwardRef } from 'react'

import classNames from 'classnames'
import styles from '../styles/input'

export interface Props extends HTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  value?: boolean
  className?: string
  labelClassName?: string
  disabled?: boolean
  defaultChecked?: boolean
  required?: boolean
  valid?: boolean
  checked?: boolean
}

export const CheckBox = forwardRef<HTMLInputElement, Props>(function CheckBox(
  { className = '', labelClassName = '', label, value = false, disabled, name, valid, ...other },
  ref
) {
  return (
    <Wrapper label={label} disabled={disabled} name={name} labelClassName={labelClassName}>
      <input
        className={classNames(
          'w-5 h-5 text-primary-600 border-gray-300 shadow-sm rounded-md focus:ring-primary-500 focus:border-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700',
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
        name={name}
        id={name}
        type="checkbox"
        disabled={disabled}
        ref={ref}
        data-testid={name}
        {...other}
      />
    </Wrapper>
  )
})

const Wrapper = ({
  children,
  label,
  disabled,
  name,
  labelClassName
}: {
  name: string
  label?: string
  disabled?: boolean
  labelClassName?: string
  children: ReactNode
}) =>
  label ? (
    <label
      htmlFor={name}
      className={classNames(
        { 'cursor-not-allowed': disabled },
        labelClassName,
        'flex items-center'
      )}
    >
      {children}
      <span
        className={classNames(
          'inline-block ml-2 text-sm text-gray-600 dark:text-white dark:focus:text-white dark:focus:bg-gray-900',
          {
            'cursor-not-allowed': disabled
          }
        )}
      >
        {label}
      </span>
    </label>
  ) : (
    <Fragment>{children}</Fragment>
  )

export default CheckBox
