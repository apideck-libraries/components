import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import React, { forwardRef, ReactNode, useState } from 'react'

export interface Props {
  options: Option[]
  className?: string
  buttonClassName?: string
  buttonLabel?: string
  itemsClassName?: string
  minWidth?: number
  trigger?: ReactNode
  align?: 'left' | 'right'
  upward?: boolean
  selectedOption?: Option
  onSelect?: (option: Option) => void
}

export interface Option {
  label: string | ReactNode
  href?: string
  onClick?: () => void
  borderTop?: boolean
  className?: string
}

export const Dropdown = forwardRef<HTMLDivElement, Props>(function Dropdown(
  {
    options,
    className = '',
    buttonClassName = '',
    buttonLabel = 'Options',
    itemsClassName = '',
    align = 'right',
    minWidth = 180,
    upward = false,
    onSelect,
    selectedOption,
    trigger,
    ...other
  },
  ref
) {
  const [activeOption, setActiveOption] = useState<Option | null>(selectedOption || null)

  const onClick = (option: Option) => {
    setActiveOption(option)
    if (option.onClick) option.onClick()
    if (onSelect) onSelect(option)
  }

  return (
    <Menu
      as="div"
      className={classNames('relative inline-block', className)}
      ref={ref}
      data-testid="dropdown"
      {...other}
    >
      {({ open }) => (
        <>
          {trigger ? (
            <Menu.Button className={buttonClassName}>{trigger}</Menu.Button>
          ) : (
            <Menu.Button
              className={classNames(
                'flex items-center justify-between w-full px-4 py-2 text-sm font-medium border rounded-md shadow-sm text-gray-800 bg-white border-gray-200 group hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cool-gray-100 focus:ring-gray-300 dark:ring-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700',
                buttonClassName
              )}
            >
              <div>{activeOption?.label || buttonLabel}</div>
              <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Menu.Button>
          )}
          <Transition
            show={open}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            className="min-w-sm"
          >
            <Menu.Items
              static
              data-testid="dropdown-items"
              className={classNames(
                'absolute shadow-sm z-10 bg-white origin-top-right dark:bg-gray-800 border divide-y rounded-md outline-none border-cool-gray-200 divide-cool-gray-100 dark:divide-gray-400 dark:border-gray-500',
                {
                  'right-0': align === 'right',
                  'left-0 ': align === 'left',
                  'transform -translate-y-full -mt-12': upward,
                  'mt-2': !upward
                },
                itemsClassName
              )}
              style={{ minWidth }}
            >
              <div className="py-2">
                {options.map((option: Option, i: number) => {
                  return (
                    <Menu.Item key={i}>
                      {({ active }) => {
                        const labelClassName = classNames(
                          active
                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                            : 'text-gray-900',
                          'flex-1 min-w-0 px-2 text-sm truncate cursor-pointer rounded-md py-1.5 mx-2'
                        )

                        return (
                          <div
                            onClick={() => onClick(option)}
                            data-testid={`item-${i}`}
                            className={classNames(
                              'flex items-center justify-between min-w-0 cursor-pointer overflow-hidden',
                              {
                                'mt-1.5 pt-1.5 border-t border-gray-100 dark:border-gray-500':
                                  option.borderTop
                              },
                              option.className || ''
                            )}
                          >
                            {option.href?.length ? (
                              <a href={option.href} className={labelClassName}>
                                {option.label}
                              </a>
                            ) : (
                              <span className={labelClassName}>{option.label}</span>
                            )}
                          </div>
                        )
                      }}
                    </Menu.Item>
                  )
                })}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
})
