import { Button, Props } from '../src/components/Button'
import { Meta, Story } from '@storybook/react'

import React from 'react'

const meta: Meta = {
  title: 'Button',
  component: Button,
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

const Template: Story<Props> = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = { text: 'Button text' }

export const Secondary = Template.bind({})
Secondary.args = { text: 'Button text', variant: 'secondary' }

export const Loading = Template.bind({})
Loading.args = { text: 'Button text', isLoading: true }

export const Small = Template.bind({})
Small.args = { text: 'Button text', size: 'small' }

export const Large = Template.bind({})
Large.args = { text: 'Button text', size: 'large' }

export const Larger = Template.bind({})
Larger.args = { text: 'Button text', size: 'larger' }

export const Outline = Template.bind({})
Outline.args = { text: 'Button text', variant: 'outline' }

export const Danger = Template.bind({})
Danger.args = { text: 'Button text', variant: 'danger' }

export const DangerOutline = Template.bind({})
DangerOutline.args = { text: 'Button text', variant: 'danger-outline' }
