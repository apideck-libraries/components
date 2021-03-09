import { Button, Props } from '../src/Button';
import { Meta, Story } from '@storybook/react';

import React from 'react';

const meta: Meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { text: 'Button' };

export const Secondary = Template.bind({});
Secondary.args = { text: 'Button', variant: 'secondary' };

export const Loading = Template.bind({});
Loading.args = { text: 'Button', isLoading: true };

export const Small = Template.bind({});
Small.args = { text: 'Small button', size: 'small' };

export const Large = Template.bind({});
Large.args = { text: 'Large button', size: 'large' };

export const Larger = Template.bind({});
Larger.args = { text: 'Larger button', size: 'larger' };

export const Outline = Template.bind({});
Outline.args = { text: 'Outline', variant: 'outline' };

export const Danger = Template.bind({});
Danger.args = { text: 'DANGER', variant: 'danger' };

export const Disabled = Template.bind({});
Disabled.args = {
  text: 'Disabled button',
  variant: 'disabled',
  isDisabled: true,
};
