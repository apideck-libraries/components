import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'

import { Default as Card } from '../stories/Card.stories'
import { render } from '@testing-library/react'

describe('Card', () => {
  const props = {
    title: 'Integration settings',
    tag: 'Live',
    description: 'A sample project for managing integration settings with the Vault API.'
  }

  it('should render the component', async () => {
    const { getByTestId } = render(<Card {...props} />)
    expect(getByTestId('card')).toBeInTheDocument()
  })

  it('should have custom className', async () => {
    const { getByTestId } = render(<Card className="test" {...props} />)
    const card = getByTestId('card')
    expect(card.classList.contains('test')).toBe(true)
  })

  it('should have custom style properties', async () => {
    const { getByTestId } = render(<Card style={{ maxWidth: 200 }} {...props} />)
    const card = getByTestId('card')
    const style = window.getComputedStyle(card)
    expect(style.maxWidth).toBe('200px')
  })

  it('should have shadow styles', async () => {
    const { getByTestId } = render(<Card withShadow={true} {...props} />)
    const card = getByTestId('card')
    expect(card.classList.contains('withShadow')).toBe(true)
  })

  it('should not have shadow styles', async () => {
    const { getByTestId } = render(<Card withShadow={false} {...props} />)
    const card = getByTestId('card')
    expect(card.classList.contains('withShadow')).toBe(false)
  })

  it('should not have an image', async () => {
    const { getByAltText } = render(
      <Card image="https://developers.apideck.com/samples/integration-settings.png" {...props} />
    )
    const image = getByAltText(props.title)
    expect(image).toBeInTheDocument()
  })

  it('should show icons', async () => {
    const icons = [
      'https://res.cloudinary.com/apideck/image/upload/v1529455970/catalog/activecampaign/icon128x128.png',
      'https://res.cloudinary.com/apideck/image/upload/v1529456047/catalog/salesforce/icon128x128.png'
    ]
    const { getByTestId } = render(<Card subTitle="999 connectors" icons={icons} {...props} />)
    const cardIcons = getByTestId('icons')
    expect(cardIcons).toBeInTheDocument()
  })
})
