import { Meta, Story } from '@storybook/react'
import { Props, Select } from '../src/components/Select'

import React from 'react'

const meta: Meta = {
  title: 'Select',
  component: Select,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<Props> = args => <Select {...args} />

const options = [
  {
    label: 'Option 1',
    value: '1'
  },
  {
    label: 'Option 2',
    value: '2'
  },
  {
    label: 'Option 3',
    value: '3'
  }
]
export const Default = Template.bind({})
Default.args = { name: 'input-name', options }

export const WithValue = Template.bind({})
WithValue.args = { name: 'input-name', options, defaultValue: options[1].value }

export const Disabled = Template.bind({})
Disabled.args = { name: 'input-name', options, disabled: true }

export const Multiple = Template.bind({})
Multiple.args = { name: 'input-name', options, multiple: true }

export const Valid = Template.bind({})
Valid.args = { name: 'input-name', options, valid: true }

export const InValid = Template.bind({})
InValid.args = { name: 'input-name', options, valid: false }

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = { name: 'input-name', options, placeholder: 'Select an API' }
