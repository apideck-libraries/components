import '../src/styles/tailwind.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Button, CheckBox, DateInput, Select, TextArea, TextInput, Toggle } from '../.'

const App = () => {
  return (
    <div className="min-h-screen pt-12 bg-gray-50">
      <form className="max-w-sm p-6 mx-auto bg-white border rounded-md shadow-lg">
        <h1 className="mb-4 text-2xl font-extrabold text-gray-900">Form</h1>
        <DateInput className="mb-4" placeholder="Date input" />
        <TextInput className="mb-4" placeholder="Text input" />
        <TextArea className="mb-4" placeholder="Text area" />
        <Select
          className="mb-4"
          placeholder="Select input"
          options={[
            {
              label: 'Apples',
              value: 'apples'
            },
            {
              label: 'Oranges',
              value: 'oranges'
            }
          ]}
        />

        <CheckBox required={true} className="mb-4" />

        <div className="mb-4">
          <Toggle isEnabled={false} onToggle={() => console.log('Toggled')} />
        </div>
        <Button text="Button" type="submit" className="block" />
      </form>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
