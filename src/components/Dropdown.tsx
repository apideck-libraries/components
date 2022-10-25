import { Menu, Transition } from '@headlessui/react'
import React, { ChangeEvent, ReactNode, forwardRef, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

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
  isSearchable?: boolean
  onSelect?: (option: Option) => void
  isScrollable?: boolean
  onClear?: () => void
  iconClassName?: string
}

export interface Option {
  label: string | ReactNode
  href?: string
  onClick?: () => void
  borderTop?: boolean
  className?: string
  labelClassName?: string
  imageUrl?: string
  value?: string | number
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
    isSearchable = false,
    isScrollable = false,
    onClear,
    iconClassName = '',
    ...other
  },
  ref
) {
  const [activeOption, setActiveOption] = useState<Option | null>(selectedOption || null)
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  const onClick = (option: Option) => {
    setActiveOption(option)
    if (option.onClick) option.onClick()
    if (onSelect) onSelect(option)
  }

  const onSearchChange = (text: string) => {
    setSearchTerm(text)
    const results = options.filter(
      (option: Option) =>
        option.value?.toString()?.toLowerCase().includes(text.toLowerCase()) ||
        option.label?.toString()?.toLowerCase().includes(text.toLowerCase())
    )
    setFilteredOptions(results)
  }

  useEffect(() => {
    if (selectedOption) {
      setActiveOption(selectedOption)
    }
  }, [selectedOption])

  const menuOptions = searchTerm?.length ? filteredOptions : options

  return (
    <Menu
      as="div"
      className={classNames('relative inline-block', className)}
      ref={ref}
      data-testid="dropdown"
      {...other}
    >
      {({ open }) => {
        setTimeout(() => searchInputRef.current?.focus())

        return (
          <>
            {trigger ? (
              <Menu.Button className={buttonClassName}>{trigger}</Menu.Button>
            ) : (
              <div className="relative">
                <Menu.Button
                  className={classNames(
                    'flex items-center justify-between w-full px-4 py-2 text-sm font-medium border rounded-md shadow-sm text-gray-800 bg-white border-gray-200 group hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cool-gray-100 focus:ring-gray-300 dark:ring-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700',
                    buttonClassName
                  )}
                >
                  {activeOption?.label || buttonLabel}
                  <svg
                    className={classNames('w-5 h-5 ml-2 -mr-1', iconClassName, {
                      'opacity-0': activeOption && onClear
                    })}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Menu.Button>
                {activeOption && onClear && (
                  <button
                    className="absolute hover:bg-gray-100 rounded-full flex items-center justify-center p-1 top-2 right-2 dark:bg-gray-700"
                    style={{ top: 7 }}
                    onClick={() => {
                      setSearchTerm('')
                      setActiveOption(null)
                      onClear()
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
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
                {isSearchable && (
                  <div className="p-3 relative">
                    <input
                      name="search"
                      type="text"
                      ref={searchInputRef}
                      placeholder="Search"
                      className="w-full text-gray-600 border border-transparent bg-gray-100 rounded-md sm:text-sm focus:ring-transparent focus:border-gray-200 placeholder-gray-400 py-2 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-gray-400"
                      autoComplete="off"
                      autoFocus={true}
                      value={searchTerm}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onSearchChange(e.currentTarget.value)
                      }
                      data-testid="search-input"
                    />
                    {searchTerm?.length > 0 && (
                      <button
                        className="text-gray-400 absolute right-5 top-[21px] rounded-full hover:text-gray-300 dark:text-gray-700 dark:hover:text-gray-500"
                        onClick={() => setSearchTerm('')}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="{2}"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
                <div className={classNames('py-2', { 'max-h-72 overflow-y-auto': isScrollable })}>
                  {searchTerm?.length > 0 && !menuOptions?.length ? (
                    <p className="px-4 text-gray-500 text-sm">No results</p>
                  ) : null}
                  {menuOptions.map((option: Option, i: number) => {
                    return (
                      <Menu.Item key={i}>
                        {({ active }) => {
                          const labelClassName = classNames(
                            active
                              ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                              : 'text-gray-900 dark:text-gray-100',
                            'flex-1 min-w-0 px-2 text-sm truncate cursor-pointer rounded-md py-1.5 mx-2 flex items-center dark:bg-gray-800 dark:text-gray-200',
                            option.labelClassName || ''
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
                                  {option.imageUrl && (
                                    <img
                                      src={option.imageUrl}
                                      className="h-6 w-6 rounded mr-2"
                                      alt="option"
                                    />
                                  )}
                                  {option.label}
                                </a>
                              ) : (
                                <span className={labelClassName}>
                                  {option.imageUrl && (
                                    <img
                                      src={option.imageUrl}
                                      className="h-6 w-6 rounded mr-2"
                                      alt="option"
                                    />
                                  )}
                                  {option.label}
                                </span>
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
        )
      }}
    </Menu>
  )
})
