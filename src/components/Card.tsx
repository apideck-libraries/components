import '../styles/card.css'

import React, { CSSProperties, forwardRef } from 'react'

import classNames from 'classnames'

export interface Props {
  title: string
  description?: string
  image?: string
  subTitle?: string
  withShadow?: boolean
  className?: string
  style?: CSSProperties
}

export const Card = forwardRef<HTMLDivElement, Props>(function Card(
  { title, subTitle, description, image, withShadow = true, className = '', ...other },
  ref
) {
  return (
    <div
      data-testid="card"
      ref={ref}
      className={classNames(
        'flex flex-col overflow-hidden cursor-pointer transition duration-100 rounded-lg shadow-sm ring-1 ring-black ring-opacity-5 hover:ring-primary-300',
        className,
        { withShadow }
      )}
      {...other}
    >
      {image ? (
        <div className="flex-shrink-0">
          <img className="w-full object-fit " src={image} alt={title} />
        </div>
      ) : (
        ''
      )}
      <div className="flex flex-col justify-between flex-1 p-5 bg-white">
        <div className="flex-1">
          {subTitle && (
            <p className="text-sm font-medium text-primary-600">
              <span className="hover:underline">{subTitle}</span>
            </p>
          )}
          <div className="mt-2">
            <p className="text-xl font-semibold text-gray-800">{title}</p>
            <p className="mt-3 text-base text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
})
