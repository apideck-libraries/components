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
  tag: 'Live',
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

const icons = [
  'https://res.cloudinary.com/apideck/image/upload/v1529455970/catalog/activecampaign/icon128x128.png',
  'https://res.cloudinary.com/apideck/image/upload/v1529456047/catalog/salesforce/icon128x128.png',
  'https://res.cloudinary.com/apideck/image/upload/v1536884849/catalog/teamleader/icon128x128.jpg',
  'https://res.cloudinary.com/apideck/image/upload/v1531305954/catalog/salesflare/icon128x128.png',
  'https://res.cloudinary.com/apideck/image/upload/v1529455982/catalog/hubspot/icon128x128.png',
  'https://res.cloudinary.com/apideck/image/upload/v1551284663/catalog/zendesk-sell/icon128x128.png',
  'https://res.cloudinary.com/apideck/image/upload/v1529455988/catalog/pipedrive/icon128x128.png',
  'https://res.cloudinary.com/apideck/image/upload/v1535538972/catalog/copper/icon128x128.png'
]

export const WithIcons = Template.bind({})
WithIcons.args = {
  title: 'Lead API',
  subTitle: '85 connectors',
  description: 'One single API to push and pull data from multiple connectors.',
  style: { maxWidth: 290 },
  icons
}

export const WithoutShadow = Template.bind({})
WithoutShadow.args = {
  title: 'Integrate CRM data',
  tag: 'Live',
  description: 'A sample project for integrating and viewing CRM data with the CRM API.',
  image: 'https://developers.apideck.com/samples/crm.png',
  style: { maxWidth: 290 },
  withShadow: false
}
