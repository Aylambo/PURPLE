import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow'
import {saveConvo} from '../store/actions/convo.actions.js'

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=c4a36b6ffbb8e563c6190c6e7d503ded&format=1'

const Currency = ({ firebaseConfig }) => {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)


  const [convo, setConvo] = useState([])


  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  const saveConversion = () => {
    const oneConv = {
      fromAmount,
      toAmount,
      fromCurrency,
      toCurrency,
    }
    saveConvo(oneConv)
    setConvo(oneConv)
  }

  return (
    <div className="convertor">
      <h1>Convertor</h1>
      <div className="conv-rows">
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div className="equals">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
      <button onClick={saveConversion}>Save</button>
      {convo &&
      <section>{convo.fromAmount} {convo.fromCurrency} = {convo.toAmount} {convo.toCurrency}</section>
      }
    </div>
  );
}

export default Currency;
