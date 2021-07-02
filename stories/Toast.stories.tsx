import { Meta, Story } from '@storybook/react'

import { Toast as Props } from '../src/types/Toast'
import React from 'react'
import { Toast } from '../src/components/Toast'

const meta: Meta = {
  title: 'Toast',
  component: Toast,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<Props> = args => <Toast {...args} />

export const Default = Template.bind({})
Default.args = { title: 'Info Toast', description: 'I am here to inform you about some stuff' }

export const Success = Template.bind({})
Success.args = {
  title: 'Success Toast',
  description: 'I am here to inform you about something good',
  type: 'success'
}

export const Warning = Template.bind({})
Warning.args = {
  title: 'Warning Toast',
  description: 'I am here to warn you about something bad',
  type: 'warning'
}

export const Error = Template.bind({})
Error.args = {
  title: 'Error Toast',
  description: 'I am here to scare you with errors',
  type: 'error'
}

export const AutoClose = Template.bind({})
AutoClose.args = {
  title: 'Closing Toast',
  description: 'Sadly, I am here just to disappear again',
  autoClose: true
}

export const CloseAfter = Template.bind({})
CloseAfter.args = {
  title: 'Closing after 6 seconds',
  description: 'Sadly, I am here just to disappear again',
  closeAfter: 6000
}

export const CloseText = Template.bind({})
CloseText.args = {
  title: 'Toast with closing text',
  description: 'No icon to close toaster this but some text. Crazy.',
  closeText: 'Close'
}
