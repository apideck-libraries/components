import { Chip, Props } from '../src/components/Chip'
import { Meta, Story } from '@storybook/react'

import React from 'react'

const meta: Meta = {
  title: 'Chip',
  component: Chip,
  args: {
    iconInline: false
  },
  argTypes: {
    colorClassName: {
      // Because TailwindCSS purges all unused classes we need to provide some classes upfront,
      // thats why we use a select instead of an input field.
      options: [
        'bg-red-200 text-red-900',
        'bg-green-900 text-green-200 dark:bg-green-200 dark:text-green-900',
        'bg-gray-200 text-green-600'
      ],
      control: { type: 'select' }
    },
    iconComponent: {
      control: false
    }
  },
  parameters: {
    controls: { sort: 'alpha' },
    actions: {
      argTypesRegex: '(?!^onClose)^on[A-Z].*'
    }
  }
}

export default meta

const Template: Story<Props> = (args) => (
  <div className="apideck">
    <Chip {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = { label: 'Chip text', className: 'blob' }

export const WithClose = Template.bind({})
WithClose.args = { label: 'Chip text' }
WithClose.argTypes = { onClose: { action: 'close icon clicked' } }

export const WithIconUrl = Template.bind({})
WithIconUrl.args = {
  label: 'Chip text',
  iconUrl:
    'https://res.cloudinary.com/apideck/image/upload/v1551284663/catalog/zendesk-sell/icon128x128.png'
}

const Dot = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="8"
    width="8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
  </svg>
)

export const WithIconComponent = Template.bind({})
WithIconComponent.args = {
  label: 'Enabled',
  iconComponent: <Dot />,
  iconInline: true
}

const SearchGlass = () => (
  <svg
    className="MuiSvgIcon-root jss59"
    stroke="currentColor"
    fill="currentColor"
    focusable="false"
    viewBox="0 0 24 24"
    aria-hidden="true"
    height="16"
    width="16"
  >
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
  </svg>
)

export const Search = Template.bind({})
Search.args = {
  label: 'With search icon component',
  iconComponent: <SearchGlass />,
  iconInline: true
}

export const Badge = Template.bind({})
Badge.args = { label: '4' }

export const Discount = Template.bind({})
Discount.args = { label: '25% discount' }
