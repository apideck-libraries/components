import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render, screen } from '@testing-library/react'

import { Default as DateInput } from '../stories/DateInput.stories'
import React from 'react'
import userEvent from '@testing-library/user-event'

describe('Date Input', () => {
  const props: any = {
    name: 'DateInput',
    onChange: () => {}
  }

  it('should render the component', async () => {
    render(<DateInput {...props} />)

    const input = screen.getByTestId('DateInput')
    expect(input).toBeInTheDocument()
  })

  it('should render the date picker when the input is clicked', async () => {
    render(<DateInput {...props} />)

    const input = screen.getByTestId('DateInput') as HTMLInputElement
    const datePicker = screen.getByTestId('datePicker')
    fireEvent.click(input)
    expect(datePicker).toBeInTheDocument()
  })

  it('should render the placeholder', async () => {
    render(<DateInput placeholder="Pick a date" {...props} />)

    const input = screen.getByTestId('DateInput') as HTMLInputElement
    const datePicker = screen.getByTestId('datePicker')
    fireEvent.click(input)
    expect(datePicker).toBeInTheDocument()
  })

  it('should be able to select a date', async () => {
    render(<DateInput {...props} />)

    const input = screen.getByTestId('DateInput') as HTMLInputElement
    fireEvent.click(input)
    const day1 = screen.getByTestId('day-1')
    const day5 = screen.getByTestId('day-5')
    const day15 = screen.getByTestId('day-15')

    fireEvent.click(day1)
    expect(input.value).toContain('01')

    fireEvent.click(input)
    fireEvent.click(day5)
    expect(input.value).toContain('05')

    fireEvent.click(input)
    fireEvent.click(day15)
    expect(input.value).toContain('15')
  })

  it('should have a default value', async () => {
    const value = '1998-01-01'
    render(<DateInput value={value} {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement

    expect(input.value).toEqual(value)
  })

  it('should render a time input', async () => {
    const { getByTestId } = render(<DateInput type="datetime" {...props} />)
    const timeInput = getByTestId('timeInput') as HTMLInputElement

    expect(timeInput).toBeInTheDocument()
  })

  it('should contain a value with a date format', async () => {
    // format datetime: yyyy-mm-dd
    render(<DateInput type="date" {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement
    fireEvent.click(input)
    const day1 = screen.getByTestId('day-1')
    fireEvent.click(day1)
    expect(input.value.length).toEqual(10)
  })

  it('should contain a value with a datetime format', async () => {
    // format datetime: yyyy-mm-ddT00:00:00.000Z
    render(<DateInput type="datetime" {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement
    fireEvent.click(input)
    const day1 = screen.getByTestId('day-1')
    fireEvent.click(day1)
    expect(input.value.length).toEqual(16)
  })

  it('should render a readable datetime', async () => {
    render(<DateInput type="datetime" value="2021-01-01T11:15:00.000Z" {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement
    fireEvent.click(input)
    const day1 = screen.getByTestId('day-1')
    fireEvent.click(day1)
    expect(input.value).toEqual('2021-01-01 12:15')
  })

  it('should be disabled', () => {
    render(<DateInput disabled={true} {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement

    expect(input).toBeDisabled()
  })

  it('should contain the disabled classes', () => {
    const expected = 'cursor-not-allowed opacity-50'
    render(<DateInput disabled={true} {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement

    expect(input.getAttribute('class')).toContain(expected)
  })

  it('should contain base container classes', () => {
    const expected = 'relative w-full'
    render(<DateInput {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement

    expect(input.closest('div')?.getAttribute('class')).toContain(expected)
  })

  it('should extend the container classes', () => {
    const expected = 'test'
    render(<DateInput containerClassName={expected} {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement

    expect(input.closest('div')?.getAttribute('class')).toContain(expected)
  })

  it('should contain base classes', () => {
    const expected = 'block w-full text-gray-600 border-gray-300 rounded-md shadow-sm sm:text-sm'
    render(<DateInput {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement

    expect(input.getAttribute('class')).toContain(expected)
  })

  it('should extend the classes', () => {
    const expected = 'test'
    render(<DateInput className={expected} {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement

    expect(input.getAttribute('class')).toContain(expected)
  })

  it('should navigate to the next month', async () => {
    render(<DateInput type="date" value="2021-01-01" {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement
    const nextMonthButton = screen.getByTestId('nextMonth')

    fireEvent.click(input)
    fireEvent.click(nextMonthButton)
    expect(screen.getByText('February')).toBeInTheDocument()

    fireEvent.click(input)
    fireEvent.click(nextMonthButton)
    expect(screen.getByText('March')).toBeInTheDocument()
  })

  it('should navigate to the next year', async () => {
    render(<DateInput type="date" value="2021-12-31" {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement
    const nextMonthButton = screen.getByTestId('nextMonth')
    const yearInput = screen.getByTestId('year') as HTMLInputElement

    fireEvent.click(input)
    fireEvent.click(nextMonthButton)
    expect(screen.getByText('January')).toBeInTheDocument()
    expect(yearInput.value).toEqual('2022')
  })

  it('should navigate the previous month', async () => {
    render(<DateInput type="date" value="2021-01-01" {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement
    const nextMonthButton = screen.getByTestId('prevMonth')

    fireEvent.click(input)
    fireEvent.click(nextMonthButton)
    expect(screen.getByText('December')).toBeInTheDocument()

    fireEvent.click(input)
    fireEvent.click(nextMonthButton)
    expect(screen.getByText('November')).toBeInTheDocument()
  })

  it('should navigate to the previous year', async () => {
    render(<DateInput type="date" value="2020-01-01" {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement
    const previousMonthButton = screen.getByTestId('prevMonth')
    const yearInput = screen.getByTestId('year') as HTMLInputElement

    fireEvent.click(input)
    fireEvent.click(previousMonthButton)
    expect(screen.getByText('December')).toBeInTheDocument()
    expect(yearInput.value).toEqual('2019')
  })

  it('should change the year', async () => {
    render(<DateInput type="date" {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement
    const yearInput = screen.getByTestId('year') as HTMLInputElement

    fireEvent.click(input)
    fireEvent.change(yearInput, { target: { value: '' } })
    await userEvent.type(yearInput, '2030')
    expect(yearInput.value).toEqual('2030')

    const day1 = screen.getByTestId('day-1')
    fireEvent.click(day1)
    expect(input.value).toContain('2030')
  })

  it('should change the time', async () => {
    render(<DateInput type="datetime" value="2020-01-01" {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement
    const timeInput = screen.getByTestId('timeInput') as HTMLInputElement

    fireEvent.click(input)
    userEvent.type(timeInput, '10:00')
    expect(timeInput.value).toEqual('10:00')

    const day1 = screen.getByTestId('day-1')
    fireEvent.click(day1)
    expect(input.value).toEqual('2020-01-01 10:00')
  })

  it('should show the date picker', async () => {
    render(<DateInput {...props} />)
    const input = screen.getByTestId('DateInput') as HTMLInputElement
    const datePicker = screen.getByTestId('datePicker') as HTMLInputElement

    expect(datePicker.getAttribute('class')).toContain('hidden')

    fireEvent.click(input)
    expect(datePicker.getAttribute('class')).not.toContain('hidden')
  })
})
