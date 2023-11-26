import logo from './logo.svg';
import './App.css';
import Block from './components/Block';
import React from 'react';
import { findAllInRenderedTree } from 'react-dom/test-utils';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('UAH');
  const [toCurrency, setToCurrency] = React.useState('USD');

  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);

  const [fromExchangeRateText, setFromExchangeRateText] = React.useState('');
  const [toExchangeRateText, setToExchangeRateText] = React.useState('');

  const mainCurrency = 'UAH';
  const ratesRef = React.useRef([]);

  React.useEffect(() => {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json;
        onChangeFromPrice(1);
        setExchangeRateText();
      })
      .catch((err) => {
        console.warn(err);
        findAllInRenderedTree('Failed to get information');
      });
  }, []);

  const setExchangeRateText = () => {
    const fromExchangeRate =
      getValueCurrency(fromCurrency) / getValueCurrency(toCurrency);
    const toExchangeRate =
      getValueCurrency(toCurrency) / getValueCurrency(fromCurrency);

    setFromExchangeRateText(
      '1 ' +
        fromCurrency +
        ' = ' +
        fromExchangeRate.toFixed(3) +
        ' ' +
        toCurrency
    );

    setToExchangeRateText(
      '1 ' + toCurrency + ' = ' + toExchangeRate.toFixed(3) + ' ' + fromCurrency
    );
  };

  const getValueCurrency = (currency) => {
    if (currency === mainCurrency) {
      return 1;
    } else {
      const arrayCurrency = ratesRef.current.filter(
        (obj) => obj.cc === currency
      );
      if (arrayCurrency.length > 0) {
        return arrayCurrency[0].rate;
      } else {
        return 0;
      }
    }
  };

  const onChangeFromPrice = (value) => {
    const exchangeRate =
      getValueCurrency(fromCurrency) / getValueCurrency(toCurrency);

    const result = value * exchangeRate;
    setFromPrice(value);
    setToPrice(result.toFixed(3));
  };

  const onChangeToPrice = (value) => {
    const exchangeRate =
      getValueCurrency(toCurrency) / getValueCurrency(fromCurrency);
    const result = value * exchangeRate;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
    setExchangeRateText();
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
    setExchangeRateText();
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
        exchangeRateText={fromExchangeRateText}
      />
      <div className="arrowRightLeft">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="40pt"
          height="40pt"
          viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path d="M3397 4152 c-22 -24 -22 -58 1 -79 9 -10 205 -157 435 -328 l417 -310 -1747 -3 c-1608 -2 -1748 -3 -1765 -19 -24 -21 -23 -58 2 -83 19 -19 47 -19 1756 -20 956 0 1739 -2 1741 -3 1 -2 -178 -138 -400 -302 -221 -164 -414 -310 -429 -323 -33 -30 -36 -64 -8 -92 23 -23 33 -24 63 -8 60 31 1020 754 1027 772 4 11 4 29 1 39 -4 10 -236 189 -516 397 -359 267 -518 379 -536 380 -14 0 -33 -8 -42 -18z" />
            <path d="M1634 2524 c-122 -83 -997 -740 -1005 -755 -13 -24 3 -62 36 -83 14 -9 244 -179 509 -377 329 -244 492 -359 508 -359 50 0 75 59 41 97 -10 11 -202 156 -428 323 -225 167 -414 307 -420 312 -5 4 778 8 1740 8 1616 0 1750 1 1767 16 24 22 23 59 -2 84 -19 19 -42 19 -1756 20 -956 0 -1739 2 -1741 3 -1 2 176 136 394 298 219 162 412 307 430 323 38 33 43 66 13 96 -26 26 -39 25 -86 -6z" />
          </g>
        </svg>
      </div>
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
        exchangeRateText={toExchangeRateText}
      />
    </div>
  );
}

export default App;
