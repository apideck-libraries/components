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

const Template: Story<Props> = args => <CheckBox {...args} />

export const Default = Template.bind({})
Default.args = { name: 'input-name' }

export const WithLabel = Template.bind({})
WithLabel.args = { name: 'input-name', label: 'Check me' }

export const WithValue = Template.bind({})
WithValue.args = { name: 'input-name', label: 'Uncheck me', value: true }

export const Disabled = Template.bind({})
Disabled.args = { name: 'input-name', label: 'Do not check me', isDisabled: true }
