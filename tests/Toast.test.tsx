import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'

import { Default as Toast } from '../stories/Toast.stories'
import { render } from '@testing-library/react'

describe('Toast', () => {
  it('should render the Toast with the provided title', () => {
    const { getByText } = render(<Toast title="Info Toast" description="" />)
    expect(getByText('Info Toast')).toBeInTheDocument()
  })

  it('should render the Toast with the provided description', () => {
    const { getByText } = render(<Toast title="Info Toast" description="test description" />)
    expect(getByText('test description')).toBeInTheDocument()
  })

  it('should render the info variant by default', () => {
    const { getByTestId } = render(<Toast title="Info Toast" description="Some info" />)
    const toast = getByTestId('toast')
    expect(toast.classList.contains('border-indigo-400')).toBe(true)

    const icon = getByTestId('icon')
    expect(icon.classList.contains('text-indigo-400')).toBe(true)
  })

  it('should render the info variant if type is info', () => {
    const { getByTestId } = render(<Toast title="Info Toast" description="Some info" type="info" />)
    const toast = getByTestId('toast')
    expect(toast.classList.contains('border-indigo-400')).toBe(true)

    const icon = getByTestId('icon')
    expect(icon.classList.contains('text-indigo-400')).toBe(true)
  })

  it('should render the success variant', () => {
    const { getByTestId } = render(
      <Toast title="Info Toast" description="Some info" type="success" />
    )
    const toast = getByTestId('toast')
    expect(toast.classList.contains('border-green-400')).toBe(true)

    const icon = getByTestId('icon')
    expect(icon.classList.contains('text-green-400')).toBe(true)
  })

  it('should render the warning variant', () => {
    const { getByTestId } = render(
      <Toast title="Info Toast" description="Some info" type="warning" />
    )
    const toast = getByTestId('toast')
    expect(toast.classList.contains('border-yellow-500')).toBe(true)

    const icon = getByTestId('icon')
    expect(icon.classList.contains('text-yellow-500')).toBe(true)
  })

  it('should render the error variant', () => {
    const { getByTestId } = render(
      <Toast title="Info Toast" description="Some info" type="error" />
    )
    const toast = getByTestId('toast')
    expect(toast.classList.contains('border-red-400')).toBe(true)

    const icon = getByTestId('icon')
    expect(icon.classList.contains('text-red-400')).toBe(true)
  })

  it('should autoClose after timeout', () => {
    jest.useFakeTimers()
    render(<Toast title="Info Toast" description="Some info" type="error" autoClose={true} />)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 4500)
  })
})
