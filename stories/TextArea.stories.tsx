import { Meta, Story } from '@storybook/react'
import { Props, TextArea } from '../src/components/TextArea'

import React from 'react'

const meta: Meta = {
  title: 'TextArea',
  component: TextArea,
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

const Template: Story<Props> = args => <TextArea {...args} />

export const Default = Template.bind({})
Default.args = { name: 'input-name', placeholder: 'Text Area Component' }

export const WithValue = Template.bind({})
WithValue.args = { name: 'input-name', value: 'Text Area with value' }

export const Disabled = Template.bind({})
Disabled.args = { name: 'input-name', disabled: true }
