import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import * as React from 'react'
import { Primary as Button } from '../stories/Button.stories'

describe('Button', () => {
  it('should render the button without crashing', () => {
    const { getByRole } = render(<Button text="test" />)
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('should call the onClick method when a user clicks on the button', () => {
    const mockClick = jest.fn()
    const { getByRole } = render(<Button text="test" onClick={mockClick} />)
    const buttonElement = getByRole('button')
    fireEvent.click(buttonElement)

    expect(buttonElement).not.toBeDisabled()
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('should render the button with the provided text prop', () => {
    const { getByRole } = render(<Button text="cool button" />)
    const buttonElement = getByRole('button')
    expect(buttonElement).toHaveTextContent('cool button')
  })

  it('should render the button with the provided text as children', () => {
    const { getByRole } = render(<Button>cool button</Button>)
    const buttonElement = getByRole('button')
    expect(buttonElement).toHaveTextContent('cool button')
  })

  it('should disable the button is isDisabled prop is true', () => {
    const { getByRole } = render(<Button isDisabled>Disabled button</Button>)
    const buttonElement = getByRole('button')
    expect(buttonElement).toBeDisabled()
  })

  it('should show the loading icon if isLoading prop is true', () => {
    const { getByTestId } = render(<Button text="test" isLoading={true} />)
    const svgElement = getByTestId('loading-svg')

    expect(svgElement).toBeInTheDocument()
  })

  it('should not be clickable if button is loading', () => {
    const mockClick = jest.fn()
    const { getByRole } = render(<Button text="test" isLoading={true} />)
    const buttonElement = getByRole('button')
    fireEvent.click(buttonElement)

    expect(mockClick).not.toHaveBeenCalledTimes(1)
  })

  it('should contain base classes', () => {
    const expected =
      'inline-flex items-center justify-center border border-transparent leading-4 font-medium rounded transition duration-300 ease-in-out'
    const { getByRole } = render(<Button text="test" />)
    const buttonElement = getByRole('button')

    expect(buttonElement.getAttribute('class')).toContain(expected)
  })

  it('should extend classes', () => {
    const { getByRole } = render(<Button text="test" className="test" />)
    const buttonElement = getByRole('button')

    expect(buttonElement.classList.contains('test')).toBe(true)
  })

  describe('Types', () => {
    it('should contain the button type by default', () => {
      const { getByRole } = render(<Button text="test" />)
      const buttonElement = getByRole('button')

      expect(buttonElement.getAttribute('type')).toBe('button')
    })

    it('should contain the submit type if provided', () => {
      const { getByRole } = render(<Button text="test" type="submit" />)
      const buttonElement = getByRole('button')

      expect(buttonElement.getAttribute('type')).toBe('submit')
    })

    it('should contain the reset type if provided', () => {
      const { getByRole } = render(<Button text="test" type="reset" />)
      const buttonElement = getByRole('button')

      expect(buttonElement.getAttribute('type')).toBe('reset')
    })
  })

  describe('Variants', () => {
    it('should render a primary button', () => {
      const { getByRole } = render(<Button text="test" variant="primary" />)
      const buttonElement = getByRole('button')

      expect(buttonElement.classList.contains('bg-primary-600')).toBe(true)
    })

    it('should render a secondary button', () => {
      const { getByRole } = render(<Button text="test" variant="secondary" />)
      const buttonElement = getByRole('button')

      expect(buttonElement.classList.contains('bg-primary-100')).toBe(true)
    })

    it('should show a outline button', () => {
      const { getByRole } = render(<Button text="test" variant="outline" />)
      const buttonElement = getByRole('button')

      expect(buttonElement.classList.contains('border-gray-300')).toBe(true)
    })

    it('should show a danger button', () => {
      const { getByRole } = render(<Button text="test" variant="danger" />)
      const buttonElement = getByRole('button')

      expect(buttonElement.classList.contains('bg-red-500')).toBe(true)
    })

    it('should show a danger outline button', () => {
      const { getByRole } = render(<Button text="test" variant="danger-outline" />)
      const buttonElement = getByRole('button')

      expect(buttonElement.classList.contains('border-red-300')).toBe(true)
    })
  })

  describe('Sizes', () => {
    it('should render a small button', () => {
      const { getByRole } = render(<Button text="test" size="small" />)
      const buttonElement = getByRole('button')

      expect(buttonElement.classList.contains('text-xs')).toBe(true)
    })

    it('should render a regular button', () => {
      const { getByRole } = render(<Button text="test" size="regular" />)
      const buttonElement = getByRole('button')

      expect(buttonElement.classList.contains('text-sm')).toBe(true)
    })

    it('should render a large button', () => {
      const { getByRole } = render(<Button text="test" size="large" />)
      const buttonElement = getByRole('button')

      expect(buttonElement.classList.contains('text-base')).toBe(true)
    })

    it('should render a larger button', () => {
      const { getByRole } = render(<Button text="test" size="larger" />)
      const buttonElement = getByRole('button')

      expect(buttonElement.classList.contains('text-md')).toBe(true)
    })
  })
})
