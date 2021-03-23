import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'

import { createEvent, fireEvent, render } from '@testing-library/react'

import { Button } from '../src/components'
import { Default as Modal } from '../stories/Modal.stories'

describe('Modal', () => {
  it('should render the modal with the provided text', () => {
    const text = 'Here is a modal'
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => {}}>
        {text}
      </Modal>
    )
    expect(getByText(text)).toBeInTheDocument()
  })

  it('should render the modal with the provided component', () => {
    const text = 'Here is a modal'
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <Button text={text} />
      </Modal>
    )
    expect(getByText(text)).toBeInTheDocument()
  })

  it('should not render the modal when isOpen is set to false', () => {
    const text = 'Here is a modal'
    const { queryByText } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <Button text={text} />
      </Modal>
    )
    expect(queryByText(text)).toBeNull()
  })

  it('should close the modal when the backdrop is clicked', () => {
    const MockFunction = jest.fn()
    const { getByTestId } = render(
      <Modal isOpen={true} onClose={() => MockFunction()}>
        Test
      </Modal>
    )
    const backDrop = getByTestId('backdrop')
    fireEvent.click(backDrop)
    expect(MockFunction).toHaveBeenCalledTimes(1)
  })

  it('should prevent further propagation of the click event on the modal content', () => {
    const MockFunction = jest.fn()
    const { getByRole } = render(
      <Modal isOpen={true} onClose={() => MockFunction()}>
        Test
      </Modal>
    )

    const modalContent = getByRole('dialog')
    const myEvent = createEvent.click(modalContent)
    fireEvent.click(modalContent)
    expect(myEvent.stopPropagation).toBeTruthy()
  })

  it('should extend classes', () => {
    const { getByRole } = render(
      <Modal isOpen={true} onClose={() => {}} className="test">
        Test
      </Modal>
    )
    const modal = getByRole('dialog')
    expect(modal.classList.contains('test')).toBe(true)
  })

  it('should extend inline styles', () => {
    const { getByRole } = render(
      <Modal isOpen={true} onClose={() => {}} style={{ maxWidth: 200 }}>
        Test
      </Modal>
    )
    const modal = getByRole('dialog')
    const style = window.getComputedStyle(modal)
    expect(style.maxWidth).toBe('200px')
  })
})
