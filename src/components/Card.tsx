import '../styles/card.css'

import React, { CSSProperties, ReactNode, forwardRef } from 'react'

import classNames from 'classnames'

export interface Props {
  children?: ReactNode
  className?: string
  description?: string
  image?: string
  icons?: string[]
  style?: CSSProperties
  subTitle?: string
  tag?: string
  title?: string
  withShadow?: boolean
}

export const Card = forwardRef<HTMLDivElement, Props>(function Card(
  {
    title,
    subTitle,
    tag,
    description,
    image,
    icons,
    withShadow = true,
    className = '',
    children,
    ...other
  },
  ref
) {
  return (
    <div
      data-testid="card"
      ref={ref}
      className={classNames(
        'flex flex-col overflow-hidden cursor-pointer transition duration-100 rounded-lg shadow-sm ring-1 ring-black ring-opacity-5 hover:ring-primary-300 dark:ring-0 dark:hover:ring-0',
        className,
        { withShadow }
      )}
      {...other}
    >
      {image ? (
        <div className="flex-shrink-0">
          <img className="w-full object-fit" src={image} alt={title} />
        </div>
      ) : (
        ''
      )}
      <div className="flex flex-col justify-between flex-1 p-5 bg-white dark:bg-gray-800">
        <div className="flex-1">
          {tag && (
            <p className="text-sm font-medium text-primary-600 dark:text-primary-500">{tag}</p>
          )}
          <div className="mt-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
            {subTitle && (
              <p className="mt-1 text-sm font-medium text-primary-600 dark:text-primary-500">
                {subTitle}
              </p>
            )}
            <p className="mt-1 text-base text-gray-500 dark:text-gray-400">{description}</p>
            {icons && (
              <div className="flex mt-4 -space-x-1" data-testid="icons">
                {icons.slice(0, 7).map((icon, i) => (
                  <img
                    key={i}
                    src={icon}
                    alt="icon"
                    className="inline-block bg-white rounded-full w-7 h-7 ring-2 ring-white dark:bg-gray-800 dark:ring-gray-800"
                  />
                ))}
                {icons.length > 7 && (
                  <span className="inline-flex items-center justify-center text-sm text-white rounded-full w-7 h-7 bg-primary-600 ring-2 ring-white dark:bg-gray-800 dark:ring-gray-800">
                    {`+${icons.length - 7}`}
                  </span>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
})
