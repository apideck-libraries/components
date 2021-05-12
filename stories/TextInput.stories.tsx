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

const Template: Story<Props> = args => <TextInput {...args} />

export const Default = Template.bind({})
Default.args = { type: 'text', name: 'input-name' }

export const WithValue = Template.bind({})
WithValue.args = { type: 'text', name: 'input-name', value: 'Input with some text value' }

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  type: 'text',
  name: 'input-name',
  placeholder: 'Input with some placeholder'
}

export const Disabled = Template.bind({})
Disabled.args = { type: 'text', name: 'input-name', disabled: true }

export const Valid = Template.bind({})
Valid.args = { type: 'text', name: 'input-name', valid: true }

export const InValid = Template.bind({})
InValid.args = { type: 'text', name: 'input-name', valid: false }
