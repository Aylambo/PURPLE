import React from 'react'
import SelectSearch from 'react-select-search';

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props

  const option = [
    {name: selectedCurrency, value: currencyOptions}
  ]
  return (
    <div className="conv-main">
      <select className="conv-select" value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
          ))}
      </select>
          <input type="number" className="conv-input" value={amount} onChange={onChangeAmount} />
    
    </div>
  )
}
