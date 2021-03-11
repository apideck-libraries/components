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

export const Disabled = Template.bind({})
Disabled.args = { type: 'text', name: 'input-name', disabled: true }
