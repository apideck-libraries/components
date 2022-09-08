import { CheckBox, Props } from '../src/components/CheckBox'
import { Meta, Story } from '@storybook/react'

import React from 'react'

const meta: Meta = {
  title: 'CheckBox',
  component: CheckBox,
  argTypes: {
    value: {
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

const Template: Story<Props> = (args) => <CheckBox {...args} />

export const Default = Template.bind({})
Default.args = { name: 'input-name' }

export const WithLabel = Template.bind({})
WithLabel.args = { name: 'input-name', label: 'Check me' }

export const WithLabelDescription = Template.bind({})
WithLabelDescription.args = {
  name: 'input-name',
  label: 'Check me',
  labelDescription: 'This is a description'
}

export const WithValue = Template.bind({})
WithValue.args = { name: 'input-name', label: 'Uncheck me', value: true }

export const Disabled = Template.bind({})
Disabled.args = { name: 'input-name', label: 'Do not check me', disabled: true }

export const Valid = Template.bind({})
Valid.args = { name: 'input-name', valid: true }

export const InValid = Template.bind({})
InValid.args = { name: 'input-name', valid: false }
