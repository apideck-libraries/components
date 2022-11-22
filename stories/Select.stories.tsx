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

const Template: Story<Props> = (args) => (
  <div className="apideck">
    <Select {...args} />
  </div>
)

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
Disabled.args = { name: 'input-name', options, disabled: true, className: 'max-w-xs' }

export const Multiple = Template.bind({})
Multiple.args = { name: 'input-name', options, multiple: true, className: 'max-w-xs' }

export const Small = Template.bind({})
Small.args = { name: 'input-name', options, size: 'small', className: 'max-w-xs' }

export const Valid = Template.bind({})
Valid.args = { name: 'input-name', options, valid: true, className: 'max-w-xs' }

export const InValid = Template.bind({})
InValid.args = { name: 'input-name', options, valid: false, className: 'max-w-xs' }

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  name: 'input-name',
  options,
  placeholder: 'Select an API',
  className: 'max-w-sm'
}
