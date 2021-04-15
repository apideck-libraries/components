import { Card, Props } from '../src/components/Card'
import { Meta, Story } from '@storybook/react'

import React from 'react'

const meta: Meta = {
  title: 'Card',
  component: Card,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<Props> = args => <Card {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Integration settings',
  subTitle: 'Live',
  description: 'A sample project for managing integration settings with the Vault API.',
  image: 'https://developers.apideck.com/samples/integration-settings.png',
  style: { maxWidth: 290 }
}

export const TextOnly = Template.bind({})
TextOnly.args = {
  title: 'Integrate CRM data',
  description: 'A sample project for integrating and viewing CRM data with the CRM API.',
  style: { maxWidth: 290 }
}

export const WithoutShadow = Template.bind({})
WithoutShadow.args = {
  title: 'Integrate CRM data',
  subTitle: 'Live',
  description: 'A sample project for integrating and viewing CRM data with the CRM API.',
  image: 'https://developers.apideck.com/samples/crm.png',
  style: { maxWidth: 290 },
  withShadow: false
}
