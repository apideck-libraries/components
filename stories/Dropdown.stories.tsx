import { Dropdown, Props } from '../src/components/Dropdown'
import { Meta, Story } from '@storybook/react'

import React from 'react'

const meta: Meta = {
  title: 'Dropdown',
  component: Dropdown,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<Props> = args => <Dropdown {...args} />

const options = [
  { label: 'Add to Apideck', href: `https://app.apideck.com/unify/unified-apis/lead` },
  {
    label: 'Run in Postman',
    href: `https://app.getpostman.com/run-collection/1311564-22eb0345-7fcb-4358-88bc-af234ffc8943`
  },
  {
    label: 'Run in Insomnia',
    href: `https://insomnia.rest/run?label=TrueLayer%20API&uri=https%3A%2F%2Fspecs.apideck.com%2Fcrm.yml`
  }
]

export const Default = Template.bind({})
Default.args = { options, align: 'left' }

export const WithStyles = Template.bind({})
WithStyles.args = {
  options,
  align: 'left',
  buttonClassName:
    'text-primary-800 bg-primary-100 border-primary-200 group hover:bg-primary-200 focus:ring-primary-600'
}

export const AlignRight = Template.bind({})
AlignRight.args = {
  options,
  align: 'right',
  className: 'ml-20',
  buttonClassName:
    'text-primary-800 bg-primary-100 border-primary-200 group hover:bg-primary-200 focus:ring-primary-600'
}

export const MinWidthItems = Template.bind({})
MinWidthItems.args = {
  options,
  align: 'left',
  minWidth: 240,
  buttonClassName:
    'text-primary-800 bg-primary-100 border-primary-200 group hover:bg-primary-200 focus:ring-primary-600'
}
