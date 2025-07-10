const API_KEY = '05d6082902a880a0414cdf6742fe637d';
const API_URL = `https://data.fixer.io/api/latest?access_key=${API_KEY}`;

const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const form = document.getElementById('currency-form');

let rates = {};

async function fetchRates() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error?.info || 'Failed to fetch rates');
    }
    rates = data.rates;
    populateCurrencyOptions(Object.keys(rates));
  } catch (err) {
    resultDiv.textContent = 'Error fetching currency rates. Please check your API key.';
    form.querySelector('button').disabled = true;
  }
}

function populateCurrencyOptions(currencies) {
  fromCurrency.innerHTML = '';
  toCurrency.innerHTML = '';
  currencies.forEach(currency => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });
  fromCurrency.value = 'USD';
  toCurrency.value = 'INR';
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  convertCurrency();
});

function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;
  if (!rates[from] || !rates[to]) {
    resultDiv.textContent = 'Invalid currency selection.';
    return;
  }
  
  const eurAmount = amount / rates[from];
  const converted = eurAmount * rates[to];
  resultDiv.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
}

fetchRates();
