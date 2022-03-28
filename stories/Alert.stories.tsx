import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Alert, Props } from '../src/components/Alert'

const meta: Meta = {
  title: 'Alert',
  component: Alert,
  argTypes: {
    children: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<Props> = (args) => <Alert {...args} />

export const Info = Template.bind({})
Info.args = { title: 'Info alert', description: `I'm here to inform you about something` }

export const Warning = Template.bind({})
Warning.args = {
  title: 'Warning alert',
  description: `I'm here to warn you about something`,
  variant: 'warning'
}

export const Danger = Template.bind({})
Danger.args = {
  title: 'Warning alert',
  description: `I'm here to warn you about something dangerous`,
  variant: 'danger'
}

export const Success = Template.bind({})
Success.args = {
  title: 'Warning alert',
  description: `I'm here to inform you about something good`,
  variant: 'success'
}

export const WithCloseButton = Template.bind({})
WithCloseButton.args = {
  title: 'Warning alert',
  description: `I'm here to inform you about something good and I have a close button`,
  variant: 'success',
  onClose: () => console.log('Closed')
}
