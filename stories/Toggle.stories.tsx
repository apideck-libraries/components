import { Meta, Story } from '@storybook/react'
import { Props, Toggle } from '../src/components/Toggle'

import React from 'react'

const meta: Meta = {
  title: 'Toggle',
  component: Toggle,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<Props> = args => <Toggle {...args} />

export const Default = Template.bind({})
Default.args = { isEnabled: false, onToggle: () => {} }

export const Enabled = Template.bind({})
Enabled.args = { isEnabled: true, onToggle: () => {} }

export const Loading = Template.bind({})
Loading.args = { isLoading: true, onToggle: () => {} }
