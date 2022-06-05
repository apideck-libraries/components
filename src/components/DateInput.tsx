import React, { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'
import { useOutsideClick } from '../utils'

export interface Props {
  name: string
  type: 'date' | 'datetime'
  onChange: (e: Event) => void
  value?: string // yyyy-mm-dd or yyyy-mm-ddT00:00:00.000Z
  placeholder?: string | undefined
  disabled?: boolean
  required?: boolean
  className?: string
  containerClassName?: string
  minDate?: string | number | Date
  maxDate?: string | number | Date
  isRange?: boolean
  onClear?: () => void
}

export const DateInput: React.FC<Props> = ({
  name,
  value = '',
  type = 'date',
  placeholder = 'Select date',
  disabled = false,
  className = '',
  containerClassName = '',
  onChange,
  minDate,
  maxDate,
  isRange = false,
  onClear,
  ...other
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const datePickerRef = useRef<HTMLDivElement>(null)
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const [datePickerValue, setDatePickerValue] = useState<string>(value)
  const [hoveringDay, setHoveringDay] = useState<number | any>()
  const [year, setYear] = useState<number>(
    value ? new Date(value).getFullYear() : new Date(minDate ?? new Date()).getFullYear()
  )
  const [month, setMonth] = useState<number>(
    value ? new Date(value).getMonth() : new Date(minDate ?? new Date()).getMonth()
  )
  const [day, setDay] = useState<number | any>(value ? new Date(value).getDate() : null)
  const [time, setTime] = useState<string>('00:00')
  const [numberOfDays, setNumberOfDays] = useState<number[]>([])
  const [blankDays, setBlankDays] = useState<number[]>([])
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  useOutsideClick(datePickerRef, () => setShowDatePicker(false))

  useEffect(() => {
    const getNumberOfDays = () => {
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      const dayOfWeek = new Date(year, month).getDay()
      const blankDaysArray = []
      const daysArray = []
      for (let i = 1; i <= dayOfWeek; i++) blankDaysArray.push(i)
      for (let i = 1; i <= daysInMonth; i++) daysArray.push(i)

      setBlankDays(blankDaysArray)
      setNumberOfDays(daysArray)
    }

    getNumberOfDays()
  }, [month, year, minDate])

  useEffect(() => {
    const formattedDate = (day: number): string => {
      const selectedDate = new Date(year, month, day)
      let formattedDate = `${selectedDate.getFullYear()}-${(
        '0' +
        (selectedDate.getMonth() + 1)
      ).slice(-2)}-${('0' + selectedDate.getDate()).slice(-2)}`

      if (type === 'datetime') {
        formattedDate = `${formattedDate} ${time}`
      }
      return formattedDate
    }

    const handleValueChanged = () => {
      setDatePickerValue(formattedDate(day))

      if (inputRef?.current) {
        let inputValue = formattedDate(day)
        const event = new Event('input', { bubbles: true })
        if (type === 'datetime' && time) {
          const dateTime = new Date(
            year,
            month,
            day,
            parseInt(time.substring(0, 2)),
            parseInt(time.substring(3, 5))
          )
          inputValue = dateTime.toISOString()
        }
        inputRef.current.value = inputValue
        inputRef.current.dispatchEvent(event)
        onChange(event)
      }
    }

    if (day) handleValueChanged()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, day])

  useEffect(() => {
    // If value is provided for a datetime, set the correct state for time
    if (value && type === 'datetime' && time === '00:00') {
      const timeString = new Date(value.toString()).toLocaleTimeString('en', {
        timeStyle: 'short',
        hour12: false,
        timeZone: 'UTC'
      })
      setTime(timeString)
    }
  }, [time, type, value])

  const isToday = (day: number) => {
    const today = new Date()
    const selectedDay = new Date(year, month, day)

    return today.toDateString() === selectedDay.toDateString()
  }

  const isMinDay = (day: number) => {
    if (!minDate) return
    const selectedDay = new Date(year, month, day)
    const min = new Date(minDate)

    return selectedDay.toDateString() === min.toDateString()
  }

  const isBeforeMinDate = (day: number) => {
    if (!minDate) return
    const selectedDay = new Date(year, month, day)
    const min = new Date(minDate)

    return selectedDay.getTime() < min.getTime() && !isMinDay(day)
  }

  const isAfterMinDate = (day: number) => {
    if (!minDate) return
    const selectedDay = new Date(year, month, day)
    const min = new Date(minDate)

    return selectedDay.getTime() > min.getTime()
  }

  const isAfterMaxDate = (day: number) => {
    if (!maxDate) return
    const selectedDay = new Date(year, month, day)
    const max = new Date(maxDate)

    return selectedDay.getTime() >= max.getTime()
  }

  const isBeforeHoverDay = (day: number) => {
    const hover = new Date(year, month, hoveringDay)
    const selectedDay = new Date(year, month, day)

    return selectedDay.getTime() <= hover.getTime()
  }

  const isBeforeSelectedDay = (day: number) => {
    if (!datePickerValue) return false
    const selected = new Date(datePickerValue)
    const selectedDay = new Date(year, month, day)

    return selectedDay.getTime() <= selected.getTime()
  }

  const isHoverDay = (day: number) => {
    const hover = new Date(year, month, hoveringDay)
    const selectedDay = new Date(year, month, day)

    return selectedDay.toDateString() === hover.toDateString()
  }

  const isSelectedDay = (day: number) => {
    const selectedDay = new Date(year, month, day)
    const selected = new Date(datePickerValue)

    return selectedDay.toDateString() === selected.toDateString()
  }

  const selectDay = (day: number) => {
    setDay(day)
    setShowDatePicker(false)
  }

  const prevMonth = () => {
    const isLastYear = month - 1 < 0
    if (isLastYear) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const nextMonth = () => {
    const isNextYear = month + 1 > 11
    if (isNextYear) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div className={classNames('relative w-full', containerClassName)}>
      <input hidden readOnly type="text" name={name} ref={inputRef} value={datePickerValue} />
      <input
        type="text"
        readOnly
        value={datePickerValue}
        placeholder={placeholder}
        onClick={() => setShowDatePicker(!showDatePicker)}
        data-testid={name}
        className={classNames(
          'block w-full text-gray-600 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400',
          { 'cursor-not-allowed opacity-50': disabled },
          className
        )}
        disabled={disabled}
        {...other}
      />

      <div className="absolute top-0 right-0 z-10 px-3 py-2">
        <svg
          className={classNames('w-5 h-5 text-gray-400', {
            'opacity-0': datePickerValue && onClear
          })}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {datePickerValue && onClear && (
          <button
            className="absolute hover:bg-gray-100 rounded-full flex items-center justify-center p-1 top-2 right-2"
            style={{ top: 7 }}
            onClick={() => {
              setDatePickerValue('')
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
      <div
        data-testid="datePicker"
        ref={datePickerRef}
        style={{ minWidth: 360 }}
        className={classNames(
          'absolute top-0 right-0 z-20 p-4 mt-12 bg-white rounded-md shadow-md max-w-sm',
          {
            hidden: !showDatePicker
          }
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-lg font-bold text-gray-800">{monthNames[month]}</span>
            <input
              className="inline-block p-1 ml-1 text-lg font-normal text-gray-600 border-none rounded focus:border-none"
              style={{ width: 70 }}
              value={year || ''}
              type="number"
              data-testid="year"
              onChange={(e) => setYear(+e.target.value)}
            />
            {type === 'datetime' && (
              <>
                <input
                  className="inline-block p-1 pr-0 ml-1 font-normal text-gray-600 border-none rounded focus:border-none"
                  value={time}
                  type="time"
                  data-testid="timeInput"
                  onChange={(e) => setTime(e.target.value)}
                />
              </>
            )}
          </div>
          <div>
            <button
              type="button"
              className="inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-gray-200"
              data-testid="prevMonth"
              onClick={() => prevMonth()}
            >
              <svg
                className="inline-flex w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-gray-200"
              data-testid="nextMonth"
              onClick={() => nextMonth()}
            >
              <svg
                className="inline-flex w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap mb-3 -mx-1">
          {days?.map((day, index) => {
            return (
              <div style={{ width: '14.26%' }} className="px-1" key={`${day}-${index}`}>
                <div className="text-xs font-medium text-center text-gray-800">{day}</div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-wrap -mx-1">
          {blankDays?.map((day) => {
            return (
              <div
                key={day}
                style={{ width: '14.28%' }}
                className="p-1 text-sm text-center border border-transparent"
              ></div>
            )
          })}
          {numberOfDays?.map((dayNumber, index) => {
            return (
              <div style={{ width: '14.28%' }} className="px-1 mb-1" key={index}>
                <div
                  data-testid={`day-${dayNumber}`}
                  onClick={() => {
                    if (
                      !(minDate && isBeforeMinDate(dayNumber)) &&
                      !(maxDate && isAfterMaxDate(dayNumber))
                    )
                      selectDay(dayNumber)
                  }}
                  onMouseOver={() => setHoveringDay(dayNumber)}
                  onMouseOut={() => setHoveringDay(null)}
                  className={classNames(
                    'text-sm leading-loose text-center transition duration-100 ease-in-out rounded-md cursor-pointer',
                    {
                      '!text-gray-200 hover:!bg-transparent !cursor-default':
                        (minDate && isBeforeMinDate(dayNumber)) ||
                        (maxDate && isAfterMaxDate(dayNumber)),
                      'font-bold': isToday(dayNumber),
                      'text-gray-700 hover:bg-primary-200': !isToday(dayNumber),
                      'bg-primary-300 -mr-1 pr-1 rounded-r-none': isMinDay(dayNumber) && isRange,
                      'bg-primary-200 -mx-1.5 px-1.5 rounded-none':
                        isAfterMinDate(dayNumber) &&
                        (isBeforeHoverDay(dayNumber) || isBeforeSelectedDay(dayNumber)) &&
                        !isAfterMaxDate(dayNumber) &&
                        isRange,
                      'rounded-r bg-primary-300':
                        (isHoverDay(dayNumber) || isSelectedDay(dayNumber)) && isRange,
                      '!bg-primary-200': isSelectedDay(dayNumber)
                    }
                  )}
                >
                  {dayNumber}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
