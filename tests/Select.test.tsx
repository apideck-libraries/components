import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'

import { fireEvent, render } from '@testing-library/react'

import { Default as Select } from '../stories/Select.stories'

describe('Text Area', () => {
  const props = {
    name: 'Select',
    options: [
      {
        label: 'Option 1',
        value: '1'
      },
      {
        label: 'Option 2',
        value: '2'
      },
      {
        label: 'Option 3',
        value: '3'
      }
    ]
  }

  it('should render the component', async () => {
    const { getByTestId } = render(<Select {...props} />)
    const input = getByTestId(props.name) as HTMLSelectElement
    expect(input).toBeInTheDocument()
  })

  it('should have a default selected value', async () => {
    const { getByTestId } = render(<Select defaultValue={props.options[1].value} {...props} />)
    const input = getByTestId(props.name) as HTMLSelectElement
    expect(input.value).toEqual(props.options[1].value)
  })

  it('should render the options', async () => {
    const { getByTestId, getByText } = render(<Select defaultValue="" {...props} />)
    const input = getByTestId(props.name) as HTMLSelectElement

    expect(input.value).toEqual('')
    expect(getByText('Select an option')).toBeInTheDocument()
    props.options.forEach(option => {
      expect(getByText(option.label)).toBeInTheDocument()
    })
  })

  it('should set the default value', async () => {
    const { getByTestId } = render(<Select defaultValue="2" {...props} />)
    const input = getByTestId(props.name) as HTMLSelectElement

    expect(input.value).toEqual('2')
  })

  it('should select a value', async () => {
    const option1 = props.options[0]
    const { getByTestId, getByText } = render(<Select {...props} />)
    const input = getByTestId(props.name) as HTMLSelectElement

    fireEvent.click(getByText(option1.label))
    fireEvent.change(input, {
      target: { value: '1' }
    })

    expect(getByText(option1.label)).toBeInTheDocument()
    expect(input.value).toEqual('1')
  })

  it('should should be a multi-select', async () => {
    const { getByTestId } = render(<Select multiple={true} defaultValue={[]} {...props} />)
    const input = getByTestId(props.name) as HTMLSelectElement
    expect(input.type).toEqual('select-multiple')
  })

  it('should should be disabled', async () => {
    const { getByTestId } = render(<Select disabled={true} {...props} />)
    const input = getByTestId(props.name) as HTMLSelectElement
    expect(input).toBeDisabled()
  })

  it('should extend classes', () => {
    const { getByTestId } = render(<Select className="test" {...props} />)
    const input = getByTestId(props.name) as HTMLSelectElement

    expect(input.classList.contains('test')).toBe(true)
  })

  it('should render small classes', () => {
    const { getByTestId } = render(<Select size="small" {...props} />)
    const input = getByTestId(props.name) as HTMLSelectElement

    expect(input.classList.contains('px-2')).toBe(true)
    expect(input.classList.contains('py-1')).toBe(true)
  })

  it('should render valid classes', () => {
    const { getByTestId } = render(<Select valid={true} {...props} />)
    const input = getByTestId(props.name) as HTMLSelectElement

    expect(input.classList.contains('border-green-600')).toBe(true)
  })

  it('should render invalid classes', () => {
    const { getByTestId } = render(<Select valid={false} {...props} />)
    const input = getByTestId(props.name) as HTMLSelectElement

    expect(input.classList.contains('border-red-600')).toBe(true)
  })
})
