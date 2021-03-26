import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'

import { fireEvent, render } from '@testing-library/react'

import { Default as Toggle } from '../stories/Toggle.stories'

describe('Toggle', () => {
  it('should render the component', async () => {
    const { getByRole } = render(<Toggle onToggle={() => {}} />)
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('should show enabled state', async () => {
    const { getByRole } = render(<Toggle isEnabled={true} onToggle={() => {}} />)
    const toggle = getByRole('button')

    expect(toggle.classList.contains('bg-primary-600')).toBe(true)
    expect(toggle.classList.contains('bg-gray-200')).toBe(false)
  })

  it('should show loading state', async () => {
    const { getByTestId } = render(<Toggle isLoading={true} onToggle={() => {}} />)
    const toggler = getByTestId('toggler')
    expect(toggler.classList.contains('animate-ping')).toBe(true)
  })

  it('should call the provided function on toggle', () => {
    const MockFunction = jest.fn()
    const { getByRole } = render(<Toggle isEnabled={false} onToggle={() => MockFunction()} />)
    const toggle = getByRole('button')

    fireEvent.click(toggle)
    expect(MockFunction).toHaveBeenCalledTimes(1)
  })

  it('should extend classes', () => {
    const { getByRole } = render(<Toggle isEnabled={false} onToggle={() => {}} className="test" />)
    const toggle = getByRole('button')
    expect(toggle.classList.contains('test')).toBe(true)
  })

  it('should extend inline styles', () => {
    const { getByRole } = render(
      <Toggle isEnabled={false} onToggle={() => {}} style={{ maxWidth: 200 }} />
    )
    const toggle = getByRole('button')
    const style = window.getComputedStyle(toggle)
    expect(style.maxWidth).toBe('200px')
  })
})
