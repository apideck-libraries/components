import { CSSProperties, ReactNode, createRef } from 'react'

import React from 'react'
import classNames from 'classnames'

export interface Props {
  text?: string | ReactNode
  styles?: CSSProperties
  alignPointerRight?: boolean
  className?: string
  children: ReactNode
}

export const Tooltip = ({ children, text, alignPointerRight = false, styles, ...other }: Props) => {
  if (!text) return <>{children}</>
  const ref = createRef<HTMLDivElement>()

  const handleMouseEnter = () => {
    if (ref?.current?.style) {
      ref.current.style.display = 'block'
      setTimeout(() => {
        if (ref?.current?.style) {
          ref.current.style.opacity = '1'
          ref.current.style.marginTop = '10px'
        }
      }, 100)
    }
  }

  const handleMouseLeave = () => {
    if (ref?.current?.style) {
      ref.current.style.opacity = '0'
      ref.current.style.marginTop = '0px'
      setTimeout(() => {
        if (ref?.current?.style) {
          ref.current.style.display = 'none'
        }
      }, 100)
    }
  }
  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="tooltip-container"
      {...other}
    >
      <div
        className="absolute z-10 flex items-center px-3 py-2 text-sm text-gray-800 whitespace-no-wrap transition-all duration-150 bg-white border border-gray-200 rounded shadow-sm dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800"
        style={{ top: '100%', opacity: 0, display: 'none', ...styles }}
        data-testid="tooltip"
        ref={ref}
      >
        {text}
        <div
          className={classNames(
            'absolute w-3 h-3 bg-white border-t border-l border-gray-200 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800',
            {
              'right-2': alignPointerRight,
              'left-2': !alignPointerRight
            }
          )}
          data-testid="pointer"
          style={{ top: '-7px', transform: 'rotate(45deg)' }}
        />
      </div>
      {children}
    </div>
  )
}
