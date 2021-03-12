import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import * as React from 'react'
import { Default as TextArea } from '../stories/TextArea.stories'

describe('Text Area', () => {
  const props = {
    name: 'TextArea',
    placeholder: 'placeholder'
  }

  it('should render the component', async () => {
    const { getByPlaceholderText } = render(<TextArea {...props} />)

    const input = getByPlaceholderText('placeholder')
    expect(input).toBeInTheDocument()
  })

  it('should allow letters to be inputted', async () => {
    const { getByPlaceholderText } = render(
      <TextArea value="Great stuff" onChange={() => {}} {...props} />
    )
    const input = getByPlaceholderText('placeholder') as HTMLTextAreaElement

    expect(input.value).toBe('Great stuff')
  })

  it('should be disabled', async () => {
    const { getByPlaceholderText } = render(<TextArea disabled={true} {...props} />)
    const input = getByPlaceholderText('placeholder') as HTMLTextAreaElement

    expect(input).toBeDisabled()
  })

  it('should extend classes', () => {
    const { getByPlaceholderText } = render(<TextArea className="test" {...props} />)
    const input = getByPlaceholderText('placeholder') as HTMLTextAreaElement

    expect(input.classList.contains('test')).toBe(true)
  })

  it('should render valid classes', () => {
    const { getByPlaceholderText } = render(<TextArea valid={true} {...props} />)
    const input = getByPlaceholderText(props.placeholder) as HTMLTextAreaElement

    expect(input.classList.contains('border-green-600')).toBe(true)
  })

  it('should render invalid classes', () => {
    const { getByPlaceholderText } = render(<TextArea valid={false} {...props} />)
    const input = getByPlaceholderText(props.placeholder) as HTMLTextAreaElement

    expect(input.classList.contains('border-red-600')).toBe(true)
  })
})
