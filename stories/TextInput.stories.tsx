import { Meta, Story } from '@storybook/react'
import { Props, TextInput } from '../src/components/TextInput'

import React from 'react'

const meta: Meta = {
  title: 'TextInput',
  component: TextInput,
  argTypes: {
    value: {
      control: {
        type: 'text'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    },
    required: {
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<Props> = (args) => (
  <div className="apideck">
    <TextInput {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  type: 'text',
  name: 'input-name',
  onChange: (e: any) => console.log(e.currentTarget.value)
}

export const WithValue = Template.bind({})
WithValue.args = {
  type: 'text',
  name: 'input-name',
  value: 'Input with some text value',
  onChange: (e: any) => console.log(e.currentTarget.value)
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  type: 'text',
  name: 'input-name',
  placeholder: 'Input with some placeholder'
}

export const Disabled = Template.bind({})
Disabled.args = { type: 'text', name: 'input-name', disabled: true, value: 'I am disabled, sorry' }

export const Valid = Template.bind({})
Valid.args = { type: 'text', name: 'input-name', valid: true }

export const InValid = Template.bind({})
InValid.args = { type: 'text', name: 'input-name', valid: false }

export const Sensitive = Template.bind({})
Sensitive.args = { name: 'input-name', sensitive: true, className: 'max-w-sm' }

export const CanBeCopied = Template.bind({})
CanBeCopied.args = {
  type: 'text',
  name: 'input-name',
  canBeCopied: true,
  className: 'max-w-sm',
  onChange: (e: any) => console.log(e.currentTarget.value)
}

export const SensitiveCopied = Template.bind({})
SensitiveCopied.args = {
  type: 'text',
  name: 'input-name',
  canBeCopied: true,
  sensitive: true,
  className: 'max-w-sm'
}

export const SensitiveCopiedDisabled = Template.bind({})
SensitiveCopiedDisabled.args = {
  type: 'text',
  name: 'input-name',
  canBeCopied: true,
  sensitive: true,
  className: 'max-w-sm',
  disabled: true,
  value: 'apikey1234apikey1234apikey1234apikey1234apikey1234apikey1234apikey1234apikey1234'
}

export const Searchable = Template.bind({})
Searchable.args = {
  type: 'text',
  name: 'input-name',
  searchable: true,
  className: 'max-w-sm',
  placeholder: 'Searchable input'
}

export const OnCloseIconClick = Template.bind({})
OnCloseIconClick.args = {
  type: 'text',
  name: 'input-name',
  searchable: true,
  className: 'max-w-sm',
  placeholder: 'Searchable input',
  onCloseIconClick: () => console.log('Close icon clicked')
}

export const Prepend = Template.bind({})
Prepend.args = {
  name: 'input-name',
  prepend: 'https://',
  className: 'max-w-sm',
  placeholder: 'apideck.com'
}

export const Append = Template.bind({})
Append.args = {
  name: 'input-name',
  append: '.com',
  className: 'max-w-sm',
  placeholder: 'apideck'
}

export const PreAppend = Template.bind({})
PreAppend.args = {
  name: 'input-name',
  prepend: 'https://',
  append: '.com',
  className: 'max-w-sm',
  placeholder: 'apideck'
}
