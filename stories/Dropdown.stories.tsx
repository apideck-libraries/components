import { Meta, Story } from '@storybook/react'
import { Dropdown, Option, Props } from '../src/components/Dropdown'

import React, { useState } from 'react'

const meta: Meta = {
  title: 'Dropdown',
  component: Dropdown,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<Props> = (args) => (
  <div className="apideck">
    <Dropdown {...args} />
  </div>
)

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

export const BorderTop = Template.bind({})
BorderTop.args = {
  options: [
    { label: 'Create', href: `https://app.apideck.com/unify/unified-apis/lead` },
    {
      label: 'Edit',
      onClick: () => console.log('Lets Edit')
    },
    {
      borderTop: true,
      label: 'Delete',
      href: `https://insomnia.rest/run?label=TrueLayer%20API&uri=https%3A%2F%2Fspecs.apideck.com%2Fcrm.yml`
    }
  ],
  align: 'left'
}

export const connectorOptions = [
  {
    value: 'exact-online',
    label: 'Exact Online',
    imageUrl:
      'https://res.cloudinary.com/apideck/image/upload/v1548122132/catalog/exact-online/icon128x128.png'
  },
  {
    value: 'myob',
    label: 'MYOB',
    imageUrl:
      'https://res.cloudinary.com/apideck/image/upload/v1554586086/catalog/myob/icon128x128.jpg'
  },
  {
    value: 'quickbooks',
    label: 'QuickBooks',
    imageUrl:
      'https://res.cloudinary.com/apideck/image/upload/v1529456366/catalog/quickbooks/icon128x128.png'
  },
  {
    value: 'xero',
    label: 'Xero',
    imageUrl:
      'https://res.cloudinary.com/apideck/image/upload/v1529456372/catalog/xero/icon128x128.png'
  },
  {
    value: 'sage-hr',
    label: 'Sage HR',
    imageUrl: 'https://res.cloudinary.com/apideck/image/upload/v1634905030/icons/sage-hr.jpg'
  },
  {
    value: 'activecampaign',
    label: 'ActiveCampaign',
    imageUrl:
      'https://res.cloudinary.com/apideck/image/upload/v1529455970/catalog/activecampaign/icon128x128.png'
  },
  {
    value: 'close',
    label: 'Close',
    imageUrl:
      'https://res.cloudinary.com/apideck/image/upload/v1531304652/catalog/closeio/icon128x128.png'
  },
  {
    value: 'copper',
    label: 'Copper',
    imageUrl:
      'https://res.cloudinary.com/apideck/image/upload/v1535538972/catalog/copper/icon128x128.png'
  }
]

export const IsSearchable = Template.bind({})
IsSearchable.args = {
  options: connectorOptions,
  align: 'left',
  isSearchable: true
}

export const IsScrollable = Template.bind({})
IsScrollable.args = {
  options: [...connectorOptions, ...connectorOptions],
  align: 'left',
  isScrollable: true
}

export const IsSearchableAndScrollable = Template.bind({})
IsSearchableAndScrollable.args = {
  options: [...connectorOptions, ...connectorOptions],
  align: 'left',
  isSearchable: true,
  isScrollable: true
}

export const IsClearable = Template.bind({})
IsClearable.args = {
  options: [...connectorOptions, ...connectorOptions],
  align: 'left',
  isSearchable: true,
  isScrollable: true,
  onClear: () => console.log('cleared!')
}

const [first, ...rest] = connectorOptions
export const WithDisabled = Template.bind({})
WithDisabled.args = {
  options: [{ ...first, disabled: true }, ...rest],
  align: 'left',
  isSearchable: true,
  isScrollable: true,
  onClear: () => console.log('cleared!')
}

// --- Multi Select Stories ---

// Uncontrolled Multi Select
export const MultiSelectUncontrolled = Template.bind({})
MultiSelectUncontrolled.args = {
  options: connectorOptions,
  align: 'left',
  isMultiSelect: true,
  isSearchable: true,
  isScrollable: true,
  buttonLabel: 'Select Connectors (Uncontrolled)',
  onSelectionChange: (selected) => console.log('Uncontrolled selection:', selected),
  onClear: () => console.log('Uncontrolled cleared!')
}

// Controlled Multi Select
const MultiSelectControlledTemplate: Story<Props> = (args) => {
  const [selected, setSelected] = useState<Option[]>([connectorOptions[1], connectorOptions[3]])

  return (
    <div className="apideck">
      <Dropdown
        {...args}
        selectedOptions={selected}
        onSelectionChange={(newSelection) => {
          console.log('Controlled selection change:', newSelection)
          setSelected(newSelection)
        }}
        onClear={() => {
          console.log('Controlled cleared!')
          setSelected([])
        }}
      />
      <div className="mt-4 p-4 bg-gray-100 rounded dark:bg-gray-700">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Current Selection (Controlled):
        </p>
        <pre className="mt-1 text-xs text-gray-600 dark:text-gray-300">
          {JSON.stringify(
            selected.map((s) => s.value),
            null,
            2
          )}
        </pre>
      </div>
    </div>
  )
}

export const MultiSelectControlled = MultiSelectControlledTemplate.bind({})
MultiSelectControlled.args = {
  options: connectorOptions,
  align: 'left',
  isMultiSelect: true,
  isSearchable: true,
  isScrollable: true,
  buttonLabel: 'Select Connectors (Controlled)'
}
