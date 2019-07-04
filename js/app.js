// Set global Variables
const form = document.querySelector('.city-form');
const inputCity = document.querySelector('.city-name');
const listOfCities = document.querySelector('.collection');

// console.log(inputCity);
// invoke load event listeners function 
loadEventListeners();

// function to load all event listeners
function loadEventListeners(){
  // addCity event listener
  form.addEventListener('submit', addCity);
}

function addCity(e){
  if(inputCity.value === ''){
    alert('Add a city to submit')
  }

  // create div container for p and i elements
  const divEl = document.createElement('div');
  // add classname to divEl
  divEl.className = 'city-collection';
  //create paragraph element
  const paragraph = document.createElement('p');
  // append paragraph text node to paragraph
  paragraph.appendChild(document.createTextNode(inputCity.value));
  // add classname to paragraph
  paragraph.className = 'text-city';
  // create i element
  const icon = document.createElement('i');
  // add classname to icon
  icon.className = 'fas fa-trash delete-city';
  // append paragraph and icon to div element
  divEl.insertAdjacentElement('afterbegin', paragraph)
  divEl.insertAdjacentElement('beforeend', icon);
  // append div element to list of cities
  listOfCities.appendChild(divEl);

  // Clear input field when city is added
  inputCity.value = '';

  e.preventDefault();
}
