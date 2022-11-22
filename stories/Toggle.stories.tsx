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

const Template: Story<Props> = (args) => (
  <div className="apideck">
    <Toggle {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = { isEnabled: false, onToggle: () => {} }

export const Enabled = Template.bind({})
Enabled.args = { isEnabled: true, onToggle: () => {} }

export const Loading = Template.bind({})
Loading.args = { isLoading: true, onToggle: () => {} }

export const HasIcons = Template.bind({})
HasIcons.args = { hasIcons: true, onToggle: () => {} }

export const EnabledAndHasIcons = Template.bind({})
EnabledAndHasIcons.args = { hasIcons: true, isEnabled: true, onToggle: () => {} }

export const EnabledAndHasIconsAndLabel = Template.bind({})
EnabledAndHasIconsAndLabel.args = {
  hasIcons: true,
  isEnabled: true,
  onToggle: (checked) => console.log(checked),
  label: 'Toggle me'
}
