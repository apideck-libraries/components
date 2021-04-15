import { Menu, Transition } from '@headlessui/react'
import React, { forwardRef, useState } from 'react'

import classNames from 'classnames'

export interface Props {
  options: Option[]
  className?: string
  buttonClassName?: string
  buttonLabel?: string
  minWidth?: number
  align?: 'left' | 'right'
  selectedOption?: Option
  onSelect?: (option: Option) => void
}

export interface Option {
  label: string
  href?: string
}

export const Dropdown = forwardRef<HTMLInputElement, Props>(function Dropdown(
  {
    options,
    className = '',
    buttonClassName = '',
    buttonLabel = 'Options',
    align = 'right',
    minWidth = 180,
    onSelect,
    selectedOption
  },
  ref
) {
  const [activeOption, setActiveOption] = useState<Option | null>(selectedOption || null)

  const onClick = (option: Option) => {
    setActiveOption(option)
    if (onSelect) onSelect(option)
  }

  return (
    <Menu
      as="div"
      className={classNames('relative inline-block', className)}
      ref={ref}
      data-testid="dropdown"
    >
      {({ open }) => (
        <>
          <Menu.Button
            className={classNames(
              'flex items-center justify-between w-full px-4 py-2 text-sm font-medium border rounded-md shadow-sm text-gray-800 bg-white border-gray-200 group hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cool-gray-100 focus:ring-gray-300',
              buttonClassName
            )}
          >
            <div>
              <span>{activeOption?.label || buttonLabel}</span>
            </div>
            <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Menu.Button>
          <Transition
            show={open}
            enter="transition ease-out duration-100"
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
                'absolute shadow-sm right-0 z-10 mt-2 origin-top-right bg-white border divide-y rounded-md outline-none border-cool-gray-200 divide-cool-gray-100',
                { 'right-0': align === 'right', 'left-0': align === 'left' }
              )}
              style={{ minWidth }}
            >
              <div className="py-2">
                {options.map((option: any, i: number) => {
                  return (
                    <Menu.Item key={i}>
                      {({ active }) => (
                        <div
                          onClick={() => onClick(option)}
                          data-testid={`item-${i}`}
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                          } flex items-center justify-between min-w-0 mx-2 cursor-pointer rounded-md py-1.5 overflow-hidden `}
                        >
                          {option.href?.length ? (
                            <a href={option.href} className="flex-1 min-w-0 px-2 text-sm truncate">
                              {option.label}
                            </a>
                          ) : (
                            <span className="flex-1 min-w-0 px-1 text-sm truncate">
                              {option.label}
                            </span>
                          )}
                        </div>
                      )}
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
