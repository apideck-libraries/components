import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'

import { fireEvent, render } from '@testing-library/react'

import { Default as Chip } from '../stories/Chip.stories'

describe('Chip', () => {
  it('should render the Chip without crashing', () => {
    const { getByText } = render(<Chip label="test" />)
    expect(getByText('test')).toBeInTheDocument()
  })

  it('should render the Chip with the provided text prop', () => {
    const { getByTestId } = render(<Chip label="cool chip" />)
    expect(getByTestId('chip-label')).toHaveTextContent('cool chip')
  })

  it('should contain base classes', () => {
    const expected = 'inline-flex items-center rounded-full transition-opacity ease-in-out'
    const { getByTestId } = render(<Chip label="test" />)
    const chipElement = getByTestId('chip')

    expect(chipElement.getAttribute('class')).toContain(expected)
  })

  describe('Sizes', () => {
    it('should render a small chip', () => {
      const { getByTestId } = render(<Chip label="test" size="small" />)
      const chipElement = getByTestId('chip-label')

      expect(chipElement.classList.contains('text-xs')).toBe(true)
    })

    it('should render a regular chip', () => {
      const { getByTestId } = render(<Chip label="test" size="regular" />)
      const chipElement = getByTestId('chip-label')

      expect(chipElement.classList.contains('text-sm')).toBe(true)
    })

    it('should render a large chip', () => {
      const { getByTestId } = render(<Chip label="test" size="large" />)
      const chipElement = getByTestId('chip-label')

      expect(chipElement.classList.contains('text-base')).toBe(true)
    })
  })

  describe('With image url', () => {
    it('should render an image', () => {
      const { getByTestId } = render(
        <Chip label="test" iconUrl="https://picsum.photos/50/50" iconInline />
      )

      const imageWrapper = getByTestId('chip-image-url')
      const expected = 'pl-1 py-1'

      expect(imageWrapper.getAttribute('class')).toContain(expected)
    })

    it('should render an inline image', () => {
      const { getByTestId } = render(
        <Chip label="test" iconUrl="https://picsum.photos/50/50" iconInline />
      )
      const imageWrapper = getByTestId('chip-image-url')
      const expected = 'pl-1 py-1'

      expect(imageWrapper.getAttribute('class')).toContain(expected)
    })
  })

  describe('With image component', () => {
    it('should render an image', () => {
      const ImageComponent = () => <div>dummy img component</div>
      const { getByTestId } = render(<Chip label="test" iconComponent={<ImageComponent />} />)

      expect(getByTestId('chip-image-component')).toBeInTheDocument()
    })

    it('should render an inline image', () => {
      const ImageComponent = () => <div>dummy img component</div>
      const { getByTestId } = render(
        <Chip label="test" iconComponent={<ImageComponent />} iconInline />
      )
      const imageComponentWrapper = getByTestId('chip-image-component')
      const expected = 'pl-4 py-4'

      expect(imageComponentWrapper.getAttribute('class')).toContain(expected)
    })
  })

  describe('With close button', () => {
    it('should render a close btn', () => {
      const mockClick = jest.fn()
      const { getByTestId } = render(<Chip label="test" onClose={mockClick} />)

      expect(getByTestId('chip-close-btn')).toBeInTheDocument()
    })

    it('should call the onClose method when a user clicks on the close button', () => {
      const mockClick = jest.fn()
      const { getByTestId } = render(<Chip label="test" onClose={mockClick} />)
      const closeBtn = getByTestId('chip-close-btn')
      fireEvent.click(closeBtn)

      expect(closeBtn).not.toBeDisabled()
      expect(mockClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('With classes', () => {
    it('should extend classes', () => {
      const { getByTestId } = render(<Chip label="test" className="test" />)
      const chipElement = getByTestId('chip')

      expect(chipElement.classList.contains('test')).toBe(true)
    })
  })

  describe('With color classes', () => {
    it('should render the color classes', () => {
      const colorClasses = 'bg-red-300 text-green-300'
      const { getByTestId } = render(<Chip label="test" colorClassName={colorClasses} />)

      const chipElement = getByTestId('chip')
      expect(chipElement.getAttribute('class')).toContain(colorClasses)
    })
  })
})
