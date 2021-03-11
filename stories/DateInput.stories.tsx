import { DateInput, Props } from '../src/components/DateInput'
import { Meta, Story } from '@storybook/react'

import React from 'react'

const meta: Meta = {
  title: 'DateInput',
  component: DateInput,
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
    type: {
      control: {
        type: 'string'
      }
    }
  },
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<Props> = args => <DateInput {...args} />

export const Default = Template.bind({})
Default.args = { type: 'date', name: 'input-name' }

export const Small = Template.bind({})
Small.args = { type: 'date', name: 'input-name', containerClassName: 'max-w-sm' }

export const DateTime = Template.bind({})
DateTime.args = { type: 'datetime', name: 'input-name', containerClassName: 'max-w-sm' }

export const WithValue = Template.bind({})
WithValue.args = {
  type: 'date',
  name: 'input-name',
  value: '1999-05-05',
  containerClassName: 'max-w-sm'
}

export const Disabled = Template.bind({})
Disabled.args = {
  type: 'date',
  name: 'input-name',
  isDisabled: true,
  containerClassName: 'max-w-sm'
}
