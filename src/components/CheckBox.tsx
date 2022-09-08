import React, { Fragment, HTMLAttributes, ReactNode, forwardRef } from 'react'

import classNames from 'classnames'
import styles from '../styles/input'

export interface Props extends HTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  value?: boolean
  className?: string
  labelClassName?: string
  labelDescription?: string
  disabled?: boolean
  defaultChecked?: boolean
  required?: boolean
  valid?: boolean
  checked?: boolean
}

export const CheckBox = forwardRef<HTMLInputElement, Props>(function CheckBox(
  {
    className = '',
    labelClassName = '',
    label,
    value = false,
    disabled,
    name,
    valid,
    labelDescription,
    ...other
  },
  ref
) {
  return (
    <Wrapper
      label={label}
      disabled={disabled}
      name={name}
      labelClassName={labelClassName}
      labelDescription={labelDescription}
    >
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
  labelClassName,
  labelDescription
}: {
  name: string
  label?: string
  disabled?: boolean
  labelClassName?: string
  labelDescription?: string
  children: ReactNode
}) =>
  label ? (
    <label
      htmlFor={name}
      className={classNames({ 'cursor-not-allowed': disabled }, labelClassName, 'flex items-start')}
    >
      {children}
      <div className="inline-block ml-2 text-sm ">
        <span
          className={classNames(
            'text-gray-700 dark:text-gray-100 dark:focus:text-white dark:focus:bg-transparent font-medium',
            {
              'cursor-not-allowed': disabled
            }
          )}
        >
          {label}
        </span>
        {labelDescription && <p className="text-gray-500 dark:text-gray-400">{labelDescription}</p>}
      </div>
    </label>
  ) : (
    <Fragment>{children}</Fragment>
  )

export default CheckBox
