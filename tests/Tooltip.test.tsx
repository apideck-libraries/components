import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'

import { fireEvent, render } from '@testing-library/react'

import { Default as Tooltip } from '../stories/Tooltip.stories'

describe('Tooltip', () => {
  it('should render the Tooltip with the provided text', () => {
    const { getByText } = render(<Tooltip text="Text Tooltip">Tooltip</Tooltip>)
    expect(getByText('Text Tooltip')).toBeInTheDocument()
  })

  it('should render the tooltip with the pointer to the right', () => {
    const { getByTestId } = render(
      <Tooltip text="Text Tooltip" alignPointerRight>
        Tooltip
      </Tooltip>
    )
    const pointer = getByTestId('pointer')
    expect(pointer.classList.contains('right-2')).toBe(true)
  })

  it('should extend classes', () => {
    const { getByTestId } = render(
      <Tooltip text="Text Tooltip" className="test">
        Tooltip
      </Tooltip>
    )
    const tooltip = getByTestId('tooltip-container')
    expect(tooltip.classList.contains('test')).toBe(true)
  })

  it('should extend inline styles', () => {
    const { getByTestId } = render(
      <Tooltip text="Text Tooltip" className="test" styles={{ maxWidth: 200 }}>
        Tooltip
      </Tooltip>
    )
    const tooltip = getByTestId('tooltip')
    const style = window.getComputedStyle(tooltip)
    expect(style.maxWidth).toBe('200px')
  })

  it('should return nothing if text not provided', () => {
    const { queryByTestId } = render(<Tooltip>Tooltip</Tooltip>)
    const tt = queryByTestId('tooltip')
    expect(tt).toBeNull()
  })

  it('should set the display on block on mouse enter', () => {
    const { getByTestId } = render(<Tooltip text="Hey there">Tooltip</Tooltip>)
    fireEvent.mouseEnter(getByTestId('tooltip-container'))
    const tooltip = getByTestId('tooltip')
    const style = window.getComputedStyle(tooltip)
    expect(style.display).toBe('block')
  })

  it('should set the opacity to 1 on mouse leave', () => {
    const { getByTestId } = render(<Tooltip text="Hey there">Tooltip</Tooltip>)
    fireEvent.mouseLeave(getByTestId('tooltip-container'))
    const tooltip = getByTestId('tooltip')
    const style = window.getComputedStyle(tooltip)
    expect(style.opacity).toBe('0')
  })
})
