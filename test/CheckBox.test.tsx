import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'

import { fireEvent, render } from '@testing-library/react'

import { Default as CheckBox } from '../stories/CheckBox.stories'

describe('Check Box', () => {
  const props = {
    name: 'CheckBox'
  }

  it('should render the component', async () => {
    const { getByTestId } = render(<CheckBox {...props} />)

    const input = getByTestId(props.name) as HTMLInputElement
    expect(input).toBeInTheDocument()
  })

  it('should toggle the checkbox', async () => {
    const { getByTestId } = render(<CheckBox {...props} />)

    const input = getByTestId(props.name) as HTMLInputElement
    expect(input.checked).toEqual(false)
    fireEvent.click(input)
    expect(input.checked).toEqual(true)
    fireEvent.click(input)
    expect(input.checked).toEqual(false)
  })

  it('should have a label', async () => {
    const labelText = 'awesome'
    const { getByText } = render(<CheckBox label={labelText} {...props} />)

    expect(getByText(labelText)).toBeInTheDocument()
  })

  it('should be checked', async () => {
    const { getByTestId } = render(<CheckBox value={true} {...props} />)
    const input = getByTestId(props.name) as HTMLInputElement

    expect(input.checked).toEqual(true)
  })

  it('should be disabled', async () => {
    const { getByTestId } = render(<CheckBox disabled={true} {...props} />)
    const input = getByTestId(props.name) as HTMLInputElement

    expect(input).toBeDisabled()
  })

  it('should extend classes', () => {
    const { getByTestId } = render(<CheckBox className="test" {...props} />)
    const input = getByTestId(props.name) as HTMLInputElement

    expect(input.classList.contains('test')).toBe(true)
  })
})
