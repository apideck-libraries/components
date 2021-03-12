import * as React from 'react'
import 'react-app-polyfill/ie11'
import * as ReactDOM from 'react-dom'
import { Button, CheckBox, DateInput, Select, TextArea, TextInput } from '../.'
import '../src/styles/tailwind.css'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm p-4 mx-auto bg-white border rounded-md shadow-lg bg-primary-500">
        <form>
          <DateInput className="mb-4" placeholder="Date placeholder" />
          <TextInput className="mb-4" placeholder="Placeholder" />
          <TextArea className="mb-4" placeholder="Placeholder" />
          <Select
            className="mb-4"
            placeholder="Select some stuff"
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
          <div className="mb-4">
            <CheckBox label="Accept terms" required={true} />
          </div>
          <Button text="button" type="submit" className="block" />
        </form>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
