const currencyElOne = document.querySelector('#currency-one');
const amountElOne = document.querySelector('#amount-one');
const currencyElTwo = document.querySelector('#currency-two');
const amountElTwo = document.querySelector('#amount-two');

const rateEl = document.querySelector('#rate');
const swapEl = document.querySelector('#swap');

// Fetch exchange rates and update the DOM
const calculate = () => {
  const currencyOne = currencyElOne.value;
  const currencyTwo = currencyElTwo.value;

  fetch(`https://open.exchangerate-api.com/v6/latest/${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwo];
      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountElTwo.value = (amountElOne.value * rate).toFixed(2);
    });
};

// Swap currency one and two
const swap = () => {
  const temp = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = temp;
  calculate();
};

// Event listeners

currencyElOne.addEventListener('change', calculate);
amountElOne.addEventListener('input', calculate);
currencyElTwo.addEventListener('change', calculate);
amountElTwo.addEventListener('input', calculate);

swapEl.addEventListener('click', swap);

// Initial

calculate();
