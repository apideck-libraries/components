import React, { HTMLAttributes, forwardRef, ReactNode } from 'react'
import classNames from 'classnames'

export type Props = HTMLAttributes<HTMLDivElement> & {
  className?: string
  colorClassName?: string
  label: string
  size?: 'small' | 'regular' | 'large'
  iconComponent?: ReactNode
  iconUrl?: string
  iconInline?: boolean
  onClose?: VoidFunction
}

const chipSizeStyles = {
  small: 'h-5',
  regular: 'h-7',
  large: 'h-9'
}

const textSizeStyles = {
  small: 'text-xs',
  regular: 'text-sm',
  large: 'text-base'
}

const closeSizeStyles = {
  small: 'mr-2',
  regular: 'ml-2 mr-3',
  large: 'ml-3 mr-3'
}

export const Chip = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    className,
    colorClassName = classNames(
      'bg-primary-200',
      'text-primary-900',
      'hover:text-primary-700',
      'dark:hover:text-primary-400'
    ),
    size = 'regular',
    label,
    iconComponent,
    iconUrl,
    iconInline = false,
    onClose
  } = props

  const hasCloseBtn = !!onClose
  const hasIcon = !!iconUrl || !!iconComponent

  const labelSizeStyles = {
    small: `${!hasIcon && 'ml-2'} ${!hasCloseBtn && 'mr-2'}`,
    regular: `${!hasIcon && 'ml-4'} ${!hasCloseBtn && 'mr-4'}`,
    large: `${!hasIcon && 'ml-5'} ${!hasCloseBtn && 'mr-4'}`
  }

  const iconSizeStyles = {
    small: `mr-1 ${iconInline ? (iconUrl ? 'pl-0.5 py-0.5' : 'pl-2 py-2') : 'px-0 py-0'}`,
    regular: `mr-2 ${iconInline ? (iconUrl ? 'pl-1 py-1' : 'pl-4 py-4') : 'px-0 py-0'}`,
    large: `mr-3 ${iconInline ? (iconUrl ? 'pl-1 py-1' : 'pl-5 py-5') : 'px-0 py-0'}`
  }

  const chipStyle = chipSizeStyles[size]
  const labelStyle = `${textSizeStyles[size]} ${labelSizeStyles[size]}`
  const closeStyle = `ml-2 ${closeSizeStyles[size]}`
  const iconStyle = hasIcon && iconSizeStyles[size]

  return (
    <div
      data-testid="chip"
      ref={ref}
      className={classNames(
        'inline-flex items-center rounded-full transition-opacity ease-in-out',
        chipStyle,
        colorClassName,
        className
      )}
    >
      {hasIcon && (
        <>
          {iconComponent ? (
            <div
              className={classNames('inline-flex items-center h-full mr-2', iconStyle)}
              data-testid="chip-image-component"
            >
              {iconComponent}
            </div>
          ) : (
            iconUrl && (
              <div
                className={classNames('inline-flex items-center h-full mr-2', iconStyle)}
                data-testid="chip-image-url"
              >
                <img src={iconUrl} alt="icon" className={'h-full rounded-full'} />
              </div>
            )
          )}
        </>
      )}
      <span data-testid="chip-label" className={classNames('text-xs font-semibold', labelStyle)}>
        {label}
      </span>
      {onClose && (
        <button
          data-testid="chip-close-btn"
          className={classNames('bg-transparent hover focus:outline-none', closeStyle)}
          onClick={onClose}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times"
            className="w-2"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
          >
            <path
              fill="currentColor"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
          </svg>
        </button>
      )}
    </div>
  )
})
