import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import * as React from 'react'
import { Default as TextInput } from '../stories/TextInput.stories'

describe('Text Input', () => {
  describe('When type is text', () => {
    const props = {
      name: 'TextInput',
      placeholder: 'placeholder'
    }

    it('should render the component', async () => {
      const { getByPlaceholderText } = render(<TextInput {...props} />)
      const input = getByPlaceholderText(props.placeholder)

      expect(input).toBeInTheDocument()
    })

    it('should allow letters to be inputted', async () => {
      const { getByPlaceholderText } = render(<TextInput {...props} />)
      const input = getByPlaceholderText(props.placeholder) as HTMLInputElement

      fireEvent.change(input, { target: { value: 'Great stuff' } })
      expect(input.value).toBe('Great stuff')
    })

    it('should be disabled', async () => {
      const { getByPlaceholderText } = render(<TextInput disabled={true} {...props} />)
      const input = getByPlaceholderText('placeholder') as HTMLTextAreaElement

      expect(input).toBeDisabled()
    })

    it('should have default value', async () => {
      const { getByPlaceholderText } = render(
        <TextInput value="Great stuff" onChange={() => {}} {...props} />
      )
      const input = getByPlaceholderText('placeholder') as HTMLTextAreaElement

      expect(input.value).toBe('Great stuff')
    })

    it('should extend classes', () => {
      const { getByPlaceholderText } = render(<TextInput className="test" {...props} />)
      const input = getByPlaceholderText(props.placeholder) as HTMLInputElement

      expect(input.classList.contains('test')).toBe(true)
    })

    it('should render valid classes', () => {
      const { getByPlaceholderText } = render(<TextInput valid={true} {...props} />)
      const input = getByPlaceholderText(props.placeholder) as HTMLInputElement

      expect(input.classList.contains('border-green-600')).toBe(true)
    })
  })
  describe('When type is number', () => {
    const props = {
      name: 'NumberInput',
      type: 'number',
      placeholder: 'Test Placeholder'
    }

    it('should render the component', async () => {
      const { getByPlaceholderText } = render(<TextInput {...props} />)
      const input = getByPlaceholderText(props.placeholder) as HTMLInputElement

      expect(input).toBeInTheDocument()
    })

    it('should allow numbers to be inputted', async () => {
      const { getByPlaceholderText } = render(<TextInput {...props} />)
      const input = getByPlaceholderText(props.placeholder) as HTMLInputElement
      fireEvent.change(input, { target: { value: 23 } })

      expect(input.value).toBe('23')
    })

    it('should not allow letters to be inputted', async () => {
      const { getByPlaceholderText } = render(<TextInput {...props} />)
      const input = getByPlaceholderText(props.placeholder) as HTMLInputElement
      fireEvent.change(input, { target: { value: 'Great stuff' } })

      expect(input.value).toBe('')
    })
  })
  describe('When type is email', () => {
    const props = {
      name: 'EmailInput',
      type: 'email',
      required: true,
      placeholder: 'Test Placeholder'
    }

    it('should render the component', async () => {
      const { getByPlaceholderText } = render(<TextInput {...props} />)
      const input = getByPlaceholderText(props.placeholder) as HTMLInputElement

      expect(input).toBeInTheDocument()
    })

    it('should allow emails addresses to be inputted', async () => {
      const { getByPlaceholderText } = render(<TextInput {...props} />)
      const input = getByPlaceholderText(props.placeholder) as HTMLInputElement
      fireEvent.change(input, { target: { value: 'jake@apideck.com' } })

      expect(input.value).toBe('jake@apideck.com')
    })
    describe('When sensitive is true', () => {
      it('should show the show button', async () => {
        const { getByTestId } = render(<TextInput {...props} sensitive={true} />)
        const button = getByTestId('show-button')

        expect(button).toBeInTheDocument()
      })
      it('should toggle the type of the input when pressing the show button', async () => {
        const screen = render(<TextInput {...props} sensitive={true} />)
        const button = screen.getByTestId('show-button')
        const input = screen.getByPlaceholderText(props.placeholder) as HTMLInputElement

        expect(input.type).toBe('password')
        fireEvent.click(button)
        expect(input.type).toBe('text')
        fireEvent.click(button)
        expect(input.type).toBe('password')
      })
    })
    describe('When canBeCopied is true', () => {
      it('should show the copy button', async () => {
        const { getByTestId } = render(<TextInput {...props} canBeCopied={true} />)
        const button = getByTestId('copy-button')

        expect(button).toBeInTheDocument()
      })
    })
  })
})
