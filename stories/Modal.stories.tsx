import { Button, Modal, TextInput } from '../src/components'
import { Meta, Story } from '@storybook/react'

import { Props } from '../src/components/Modal'
import React from 'react'

const meta: Meta = {
  title: 'Modal',
  component: Modal,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<Props> = args => <Modal {...args} />

export const Default = Template.bind({})
Default.args = { children: 'Default modal with text', isOpen: true, onClose: () => {} }

export const WithStyles = Template.bind({})
WithStyles.args = {
  children: <Button text="Modal with custom styles" />,
  isOpen: true,
  style: { maxWidth: 200, borderRadius: 20 }
}

const FormComponent = () => {
  return (
    <>
      <h2 className="mb-4 text-xl font-semibold text-gray-700">Create Form</h2>
      <form>
        <label htmlFor="company_name" className="block text-sm font-medium leading-5 text-gray-700">
          Company name
        </label>

        <TextInput className="mt-1" name="company_name" required />

        <div className="mt-4">
          <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">
            First name
          </label>
          <TextInput className="mt-1" name="first_name" />
        </div>
        <div className="mt-4">
          <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">
            Last name
          </label>

          <TextInput className="mt-1" name="last_name" />
        </div>
        <div className="p-4 mt-5 -m-5 sm:px-5 sm:mt-6 sm:-m-6 bg-gray-50">
          <div className="flex justify-between">
            <Button text="Delete" type="button" variant="danger-outline" className="ml-1" />

            <div className="flex flex-row-reverse">
              <Button text="Create" type="submit" className="ml-3 mr-1" />
              <Button text="Cancel" className="inline-flex" variant="outline" />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export const WithForm = Template.bind({})
WithForm.args = {
  children: <FormComponent />,
  isOpen: true,
  style: { maxWidth: 460 }
}
