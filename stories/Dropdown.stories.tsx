import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Dropdown, Props } from '../src/components/Dropdown'

const meta: Meta = {
  title: 'Dropdown',
  component: Dropdown,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<Props> = (args) => <Dropdown {...args} />

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

export const Upward = Template.bind({})
Upward.args = {
  options,
  className: 'mt-36',
  align: 'left',
  upward: true,
  buttonClassName:
    'text-primary-800 bg-primary-100 border-primary-200 group hover:bg-primary-200 focus:ring-primary-600'
}

export const UpwardAlignRight = Template.bind({})
UpwardAlignRight.args = {
  options,
  className: 'ml-20 mt-36',
  align: 'right',
  upward: true,
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

export const Trigger = Template.bind({})
Trigger.args = {
  options: [
    {
      label: 'Re-authorize',
      onClick: () => console.log('Lets re-authorize')
    },
    {
      label: 'Disconnect',
      onClick: () => console.log('Lets disconnect')
    },
    {
      label: 'Disable',
      onClick: () => console.log('Lets disable')
    },
    {
      label: 'Delete',
      onClick: () => console.log('Lets delete')
    }
  ],

  align: 'left',
  trigger: (
    <button
      className="inline-flex mt-3 items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none"
      onClick={() => console.log('yo')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
  )
}
