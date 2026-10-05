// Variables store the current choices.
const drink = document.getElementById('drink');
const milk = document.getElementById('milk');
const sweetness = document.getElementById('sweetness');
const ice = document.getElementById('ice');
const cream = document.getElementById('cream');
const controls = document.getElementById('controls');
const brewButton = document.getElementById('brew-button');
const result = document.getElementById('result');
const statusText = document.getElementById('brew-status');
let brewTimer;

// Changing the drink changes its name, color, description and default milk.
function changeDrink() {
  let image = 'latte.jpg';
  let description = 'A smooth coffee with a little milk.';
  milk.value = 60;

  if (drink.value === 'Espresso') {
    image = 'espresso.jpg';
    description = 'Strong, rich, and full of coffee flavor.';
    milk.value = 0;
  } else if (drink.value === 'Americano') {
    image = 'americano.jpg';
    description = 'Espresso with water. Simple and bold.';
    milk.value = 0;
  } else if (drink.value === 'Matcha Latte') {
    image = 'matcha.jpg';
    description = 'A creamy green tea break.';
  }

  document.getElementById('drink-image').src = 'images/' + image;
  document.getElementById('drink-name').textContent = drink.value;
  document.getElementById('drink-description').textContent = description;
  updateCoffee();
}

// Input and checkbox changes update the preview with DOM methods.
function updateCoffee() {
  document.getElementById('milk-value').textContent = milk.value + '%';
  let milkStyle = 'Creamy';
  if (Number(milk.value) === 0) milkStyle = 'No milk';
  else if (Number(milk.value) <= 30) milkStyle = 'Bold';
  else if (Number(milk.value) <= 50) milkStyle = 'Balanced';
  document.getElementById('milk-note').textContent = milkStyle + ' · ' + milk.value + '% milk';
  document.getElementById('sweetness-value').textContent = sweetness.value + '%';
  document.getElementById('sweet-label').textContent = 'Sweetness · ' + sweetness.value + '%';
  document.getElementById('sweet-fill').style.width = sweetness.value + '%';
  document.getElementById('ice-cubes').style.display = ice.checked ? 'block' : 'none';
  document.getElementById('cream-topping').style.display = cream.checked ? 'block' : 'none';
  document.getElementById('temperature').textContent = ice.checked ? 'Iced & refreshing' : 'Warm & cozy';
  document.getElementById('drink-image').alt = (ice.checked ? 'Iced ' : 'Warm ') + drink.value + ' in a clear glass mug';
  result.hidden = true;
  statusText.textContent = 'Ready when you are.';
}

// window.setTimeout is a BOM feature. The result appears after 2 seconds.
function brewCoffee() {
  result.hidden = true;
  controls.disabled = true;
  brewButton.disabled = true;
  brewButton.textContent = 'Brewing…';
  statusText.textContent = 'Making your coffee. Just a moment…';
  document.getElementById('cup').classList.add('brewing');

  brewTimer = window.setTimeout(function () {
    document.getElementById('result-title').textContent = 'Your ' + drink.value + ' is ready!';
    document.getElementById('result-recipe').textContent = 'Milk: ' + milk.value + '% · Sweetness: ' + sweetness.value + '% · Ice: ' + (ice.checked ? 'Yes' : 'No') + ' · Whipped cream: ' + (cream.checked ? 'Yes' : 'No');
    result.hidden = false;
    statusText.textContent = 'Enjoy your coffee ♡';
    controls.disabled = false;
    brewButton.disabled = false;
    brewButton.textContent = 'Brew my coffee →';
    document.getElementById('cup').classList.remove('brewing');
  }, 2000);
}

function resetCoffee() {
  window.clearTimeout(brewTimer);
  drink.value = 'Latte';
  sweetness.value = 40;
  ice.checked = false;
  cream.checked = false;
  controls.disabled = false;
  brewButton.disabled = false;
  brewButton.textContent = 'Brew my coffee →';
  document.getElementById('cup').classList.remove('brewing');
  changeDrink();
}

// Event listeners connect user actions to the functions above.
drink.addEventListener('change', changeDrink);
milk.addEventListener('input', updateCoffee);
sweetness.addEventListener('input', updateCoffee);
ice.addEventListener('change', updateCoffee);
cream.addEventListener('change', updateCoffee);
brewButton.addEventListener('click', brewCoffee);
document.getElementById('reset-button').addEventListener('click', resetCoffee);
changeDrink();
