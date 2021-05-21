import { Meta, Story } from '@storybook/react'
import { Props, Tooltip } from '../src/components/Tooltip'

import { Button } from '../src/components'
import React from 'react'

const meta: Meta = {
  title: 'Tooltip',
  component: Tooltip,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<Props> = args => <Tooltip {...args} />

export const Default = Template.bind({})
Default.args = { text: 'Hey there!', children: <Button text="Hover for tooltip" /> }

export const AlignRight = Template.bind({})
AlignRight.args = {
  text: 'Align pointer right!',
  children: <Button text="Align right tooltip" />,
  alignPointerRight: true
}
