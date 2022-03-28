import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import * as React from 'react'
import { Info as Alert } from '../stories/Alert.stories'

describe('Alert', () => {
  it('should render the Alert without crashing', () => {
    const { getByText } = render(<Alert title="test" />)
    expect(getByText('test')).toBeInTheDocument()
  })

  it('should render the Alert with the provided text prop', () => {
    const { getByTestId } = render(<Alert title="cool alert" />)
    expect(getByTestId('alert-title')).toHaveTextContent('cool alert')
  })

  it('should render the alert with the provided description ', () => {
    const { getByTestId } = render(<Alert title="cool alert" description="test description" />)
    expect(getByTestId('alert-description')).toHaveTextContent('test description')
  })

  it('should render the alert with the provided description as children', () => {
    const { getByTestId } = render(<Alert title="cool alert">test children</Alert>)
    expect(getByTestId('alert-description')).toHaveTextContent('test children')
  })

  describe('Variants', () => {
    it('should render a info alert', () => {
      const { getByTestId } = render(<Alert title="test" variant="info" />)
      const alertElement = getByTestId('alert')

      expect(alertElement.classList.contains('bg-blue-50')).toBe(true)
    })

    it('should render a primary alert', () => {
      const { getByTestId } = render(<Alert title="test" variant="primary" />)
      const alertElement = getByTestId('alert')

      expect(alertElement.classList.contains('bg-primary-50')).toBe(true)
    })

    it('should render a waring alert', () => {
      const { getByTestId } = render(<Alert title="test" variant="warning" />)
      const alertElement = getByTestId('alert')

      expect(alertElement.classList.contains('bg-yellow-50')).toBe(true)
    })

    it('should show a danger alert', () => {
      const { getByTestId } = render(<Alert title="test" variant="danger" />)
      const alertElement = getByTestId('alert')

      expect(alertElement.classList.contains('bg-red-50')).toBe(true)
    })

    it('should show a success button', () => {
      const { getByTestId } = render(<Alert title="test" variant="success" />)
      const alertElement = getByTestId('alert')

      expect(alertElement.classList.contains('bg-green-50')).toBe(true)
    })
  })

  describe('With close button', () => {
    it('should render a close btn', () => {
      const mockClick = jest.fn()
      const { getByTestId } = render(<Alert title="test" onClose={mockClick} />)

      expect(getByTestId('alert-close-btn')).toBeInTheDocument()
    })

    it('should call the onClose method when a user clicks on the close button', () => {
      const mockClick = jest.fn()
      const { getByTestId } = render(<Alert title="test" onClose={mockClick} />)
      const closeBtn = getByTestId('alert-close-btn')
      fireEvent.click(closeBtn)

      expect(closeBtn).not.toBeDisabled()
      expect(mockClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('With classes', () => {
    it('should extend classes', () => {
      const { getByTestId } = render(<Alert title="test" className="test" />)
      const alertElement = getByTestId('alert')

      expect(alertElement.classList.contains('test')).toBe(true)
    })
  })
})
