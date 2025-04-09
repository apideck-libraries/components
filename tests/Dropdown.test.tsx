import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'

import { fireEvent, render, screen, within } from '@testing-library/react'

import {
  connectorOptions,
  Default as Dropdown,
  MultiSelectControlled,
  MultiSelectUncontrolled
} from '../stories/Dropdown.stories'

import { Props } from '../src/components/Dropdown'

describe('Dropdown', () => {
  const options = [
    { label: 'Add to Apideck', href: `https://app.apideck.com/unify/unified-apis/lead` },
    {
      label: 'Run in Postman',
      href: `https://app.getpostman.com/run-collection/1311564-22eb0345-7fcb-4358-88bc-af234ffc8943`
    },
    {
      label: 'Run in Insomnia',
      href: `https://insomnia.rest/run?label=TrueLayer%20API&uri=https%3A%2F%2Fspecs.apideck.com%2Fcrm.yml`
    },
    {
      label: 'Or just click me'
    }
  ]

  it('should render the component', async () => {
    const { getByTestId } = render(<Dropdown options={options} />)
    expect(getByTestId('dropdown')).toBeInTheDocument()
  })

  it('should add className to the container', async () => {
    const { getByTestId } = render(<Dropdown options={options} className="test" />)
    const dropdown = getByTestId('dropdown')
    expect(dropdown.classList.contains('test')).toBe(true)
  })

  it('should add className to the trigger button', async () => {
    const { getByRole } = render(<Dropdown options={options} buttonClassName="test" />)
    const button = getByRole('button')
    expect(button.classList.contains('test')).toBe(true)
  })

  it('should render the button label', async () => {
    const { getByRole } = render(<Dropdown options={options} buttonLabel="Actions" />)
    const button = getByRole('button')
    expect(button).toHaveTextContent('Actions')
  })

  it('should render the label of the selected options', async () => {
    const { getByRole } = render(
      <Dropdown options={options} selectedOption={{ label: 'Selected' }} />
    )
    const button = getByRole('button')
    expect(button).toHaveTextContent('Selected')
  })

  it('should show the items on click', async () => {
    const { getByTestId, getByRole } = render(<Dropdown options={options} align="left" />)
    const button = getByRole('button')
    fireEvent.click(button)
    const items = getByTestId('dropdown-items')
    expect(items).toBeInTheDocument()
  })

  it('should align the items to the left', async () => {
    const { getByTestId, getByRole } = render(<Dropdown options={options} align="left" />)
    const button = getByRole('button')
    fireEvent.click(button)
    const items = getByTestId('dropdown-items')
    expect(items.classList.contains('left-0')).toBe(true)
  })

  it('should add min width to the items container', async () => {
    const { getByTestId, getByRole } = render(<Dropdown options={options} minWidth={220} />)
    const button = getByRole('button')
    fireEvent.click(button)
    const items = getByTestId('dropdown-items')
    const style = window.getComputedStyle(items)
    expect(style.minWidth).toBe('220px')
  })

  it('should select an option', async () => {
    const { getByTestId, getByRole } = render(<Dropdown options={options} minWidth={220} />)
    const button = getByRole('button')
    fireEvent.click(button)

    const item0 = getByTestId('item-0')
    fireEvent.click(item0)
    expect(button).toHaveTextContent(options[0].label)

    const item1 = getByTestId('item-1')
    fireEvent.click(item1)
    expect(button).toHaveTextContent(options[1].label)

    const item2 = getByTestId('item-2')
    fireEvent.click(item2)
    expect(button).toHaveTextContent(options[2].label)
  })

  it('should call the onSelect function ', async () => {
    const MockFunction = jest.fn()
    const { getByTestId, getByRole } = render(
      <Dropdown options={options} onSelect={() => MockFunction()} />
    )
    const button = getByRole('button')
    fireEvent.click(button)

    const item0 = getByTestId('item-0')
    fireEvent.click(item0)

    expect(MockFunction).toBeCalled()
  })

  // --- Multi Select Tests ---

  it('should render multi-select checkboxes when isMultiSelect is true', () => {
    render(
      <MultiSelectUncontrolled
        options={connectorOptions}
        {...(MultiSelectUncontrolled.args as Partial<Props>)}
      />
    )
    const button = screen.getByRole('button', { name: /select connectors \(uncontrolled\)/i })
    fireEvent.click(button)

    const itemsContainer = screen.getByTestId('dropdown-items')
    const checkboxes = within(itemsContainer).getAllByRole('checkbox', { hidden: true })
    expect(checkboxes.length).toBe(connectorOptions.length)
    expect(checkboxes[0]).not.toBeChecked()
  })

  it('should select multiple items in uncontrolled multi-select mode', () => {
    const handleSelectionChange = jest.fn()
    render(
      <MultiSelectUncontrolled
        options={connectorOptions}
        {...(MultiSelectUncontrolled.args as Partial<Props>)}
        onSelectionChange={handleSelectionChange}
      />
    )
    const button = screen.getByRole('button', { name: /select connectors \(uncontrolled\)/i })
    fireEvent.click(button)

    const item0 = screen.getByTestId('item-0')
    const item2 = screen.getByTestId('item-2')

    fireEvent.click(item0)
    expect(button).toHaveTextContent('1 selected')
    expect(handleSelectionChange).toHaveBeenCalledWith([
      expect.objectContaining({ value: 'exact-online' })
    ])

    fireEvent.click(item2)
    expect(button).toHaveTextContent('2 selected')
    expect(handleSelectionChange).toHaveBeenCalledWith([
      expect.objectContaining({ value: 'exact-online' }),
      expect.objectContaining({ value: 'quickbooks' })
    ])

    fireEvent.click(item0)
    expect(button).toHaveTextContent('1 selected')
    expect(handleSelectionChange).toHaveBeenCalledWith([
      expect.objectContaining({ value: 'quickbooks' })
    ])
  })

  it('should clear selection in uncontrolled multi-select mode', () => {
    const handleSelectionChange = jest.fn()
    const handleClear = jest.fn()
    render(
      <MultiSelectUncontrolled
        options={connectorOptions}
        {...(MultiSelectUncontrolled.args as Partial<Props>)}
        onSelectionChange={handleSelectionChange}
        onClear={handleClear}
      />
    )
    const button = screen.getByRole('button', { name: /select connectors \(uncontrolled\)/i })
    fireEvent.click(button)

    const item0 = screen.getByTestId('item-0')
    fireEvent.click(item0)
    expect(button).toHaveTextContent('1 selected')

    const clearButton = screen.getByTestId('clear-button')
    fireEvent.click(clearButton)

    expect(button).toHaveTextContent(/select connectors \(uncontrolled\)/i)
    expect(handleSelectionChange).toHaveBeenLastCalledWith([])
    expect(handleClear).toHaveBeenCalledTimes(1)

    fireEvent.click(button)
    const checkbox0 = within(screen.getByTestId('dropdown-items')).getAllByRole('checkbox', {
      hidden: true
    })[0]
    expect(checkbox0).not.toBeChecked()
  })

  it('should reflect controlled selection in multi-select mode', () => {
    render(
      <MultiSelectControlled
        options={connectorOptions}
        {...(MultiSelectControlled.args as Partial<Props>)}
      />
    )
    const button = screen.getByRole('button', { name: /2 selected/i })
    expect(button).toHaveTextContent('2 selected')

    fireEvent.click(button)
    const itemsContainer = screen.getByTestId('dropdown-items')
    const checkboxes = within(itemsContainer).getAllByRole('checkbox', { hidden: true })

    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).toBeChecked()
    expect(checkboxes[2]).not.toBeChecked()
    expect(checkboxes[3]).toBeChecked()
  })

  it('should call onSelectionChange and update selection in controlled multi-select mode', () => {
    render(
      <MultiSelectControlled
        options={connectorOptions}
        {...(MultiSelectControlled.args as Partial<Props>)}
      />
    )
    const button = screen.getByRole('button', { name: /2 selected/i })
    fireEvent.click(button)

    const item0 = screen.getByTestId('item-0')
    fireEvent.click(item0)

    expect(button).toHaveTextContent('3 selected')

    fireEvent.click(button)
    fireEvent.click(button)
    const itemsContainer = screen.getByTestId('dropdown-items')
    const checkboxes = within(itemsContainer).getAllByRole('checkbox', { hidden: true })
    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).toBeChecked()
    expect(checkboxes[3]).toBeChecked()
  })

  it('should clear selection via onClear in controlled multi-select mode', () => {
    render(
      <MultiSelectControlled
        options={connectorOptions}
        {...(MultiSelectControlled.args as Partial<Props>)}
      />
    )
    const button = screen.getByRole('button', { name: /2 selected/i })
    expect(button).toHaveTextContent('2 selected')

    const clearButton = screen.getByTestId('clear-button')
    fireEvent.click(clearButton)

    expect(button).toHaveTextContent(/select connectors \(controlled\)/i)

    fireEvent.click(button)
    const itemsContainer = screen.getByTestId('dropdown-items')
    const checkboxes = within(itemsContainer).getAllByRole('checkbox', { hidden: true })
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked()
    })
  })
})
