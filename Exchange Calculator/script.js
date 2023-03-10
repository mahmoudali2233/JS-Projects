const currencyEl_one = document.getElementById("currency-one");
const amount_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amount_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function caclulate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  //this api key will be expired after some time
  fetch(
    ` https://v6.exchangerate-api.com/v6/a82fc9ffcc4e6f6164201714/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amount_two.value = (amount_one.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyEl_one.addEventListener("change", caclulate);
amount_one.addEventListener("input", caclulate);
currencyEl_two.addEventListener("change", caclulate);
amount_two.addEventListener("input", caclulate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caclulate();
});

caclulate();
