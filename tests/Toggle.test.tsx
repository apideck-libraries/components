import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'

import { fireEvent, render } from '@testing-library/react'

import { Default as Toggle } from '../stories/Toggle.stories'

describe('Toggle', () => {
  it('should render the component', async () => {
    const { getByRole } = render(<Toggle isEnabled={false} onToggle={() => {}} />)
    expect(getByRole('switch')).toBeInTheDocument()
  })

  it('should show enabled state', async () => {
    const { getByRole } = render(<Toggle isEnabled={true} onToggle={() => {}} />)
    const toggle = getByRole('switch')

    expect(toggle.classList.contains('bg-primary-600')).toBe(true)
    expect(toggle.classList.contains('bg-gray-200')).toBe(false)
  })

  it('should show loading icon', async () => {
    const { getByTestId } = render(<Toggle isLoading={true} onToggle={() => {}} />)
    const loadingIcon = getByTestId('loading-icon')
    expect(loadingIcon).toBeInTheDocument()
  })

  it('should show disabled icon', async () => {
    const { getByTestId } = render(<Toggle isEnabled={false} hasIcons={true} onToggle={() => {}} />)
    const loadingIcon = getByTestId('disabled-icon')
    expect(loadingIcon).toBeInTheDocument()
  })

  it('should show enabled icon', async () => {
    const { getByTestId } = render(<Toggle isEnabled={true} hasIcons={true} onToggle={() => {}} />)
    const loadingIcon = getByTestId('enabled-icon')
    expect(loadingIcon).toBeInTheDocument()
  })

  it('should call the provided function on toggle', () => {
    const MockFunction = jest.fn()
    const { getByRole } = render(<Toggle isEnabled={false} onToggle={() => MockFunction()} />)
    const toggle = getByRole('switch')

    fireEvent.click(toggle)
    expect(MockFunction).toHaveBeenCalledTimes(1)
  })

  it('should extend classes', () => {
    const { getByRole } = render(<Toggle isEnabled={false} onToggle={() => {}} className="test" />)
    const toggle = getByRole('switch')
    expect(toggle.classList.contains('test')).toBe(true)
  })

  it('should extend inline styles', () => {
    const { getByRole } = render(
      <Toggle isEnabled={false} onToggle={() => {}} style={{ maxWidth: 200 }} />
    )
    const toggle = getByRole('switch')
    const style = window.getComputedStyle(toggle)
    expect(style.maxWidth).toBe('200px')
  })
})
