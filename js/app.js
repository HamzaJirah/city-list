// Set global Variables
const form = document.querySelector('.city-form');
const inputCity = document.querySelector('.city-name');
const listOfCities = document.querySelector('.collection');
const deleteAllCities = document.querySelector('.delete-all');
const searchCity = document.querySelector('.filter-input')

// console.log(inputCity);
// invoke load event listeners function 
loadEventListeners();

// function to load all event listeners
function loadEventListeners(){
  // DOM Content loaded event
  document.addEventListener('DOMContentLoaded', getCities);
  // addCity event listener
  form.addEventListener('submit', addCity);
  // removeCity event listener
  listOfCities.addEventListener('click', removeOneCity);
  //delete all event listener
  deleteAllCities.addEventListener('click', removeAllCity);
  // search city 
  searchCity.addEventListener('keyup', filterCity);
}

// Get Cities from Local Storage when DOMContentLoaded
function getCities(){
  let cities;
  if(localStorage.getItem('cities') === null){
    cities = [];
  } else {
    cities = JSON.parse(localStorage.getItem('cities'));
  }

  cities.forEach(city => {
    // create div container for p and i elements
    const divEl = document.createElement('div');
    // add classname to divEl
    divEl.className = 'city-collection';
    //create paragraph element
    const paragraph = document.createElement('p');
    // append paragraph text node to paragraph
    paragraph.appendChild(document.createTextNode(city));
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
  })
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

  // store city in local storage
  storeCityInLocalStorage(inputCity.value);

  // Clear input field when city is added
  inputCity.value = '';

  e.preventDefault();
}

// function to store city in local storage
function storeCityInLocalStorage(city){
  let cities;
  if(localStorage.getItem('cities') === null){
    cities = [];
  } else {
    cities = JSON.parse(localStorage.getItem('cities'));
  }

  cities.push(city);

  localStorage.setItem('cities', JSON.stringify(cities));
}

// remove city function 
function removeOneCity(e){
  if(e.target.classList.contains('delete-city')){
    if(confirm('Do you want to delete the city?')){
      e.target.previousSibling.parentElement.remove();

      // invoke remove city from local storage
      removeCityFromLocalStorage(e.target.previousSibling.parentElement);
    }
  }
}
// function to remove city from local storage
function removeCityFromLocalStorage(cityItem){
  let cities;
  if(localStorage.getItem('cities') === null){
    cities = [];
  } else {
    cities = JSON.parse(localStorage.getItem('cities'));
  }

  cities.forEach((city, index) => {
    if(cityItem.textContent === city){
      cities.splice(index, 1);
    }
  })

  localStorage.setItem('cities', JSON.stringify(cities));
}



// remove all city fuction 
function removeAllCity(){
  if(confirm('Do you want to delete all?')){
    listOfCities.innerHTML = '';
  }

  // invoke clear Cities from local storage
  clearCitiesFromLocalStorage();
}

//function to clear local storage
function clearCitiesFromLocalStorage(){
  localStorage.clear();
}

// search/filter city
function filterCity(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.city-collection').forEach(function(city){
    const item = city.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      city.style.display = 'grid';
      city.style.gridTemplateColumns = '1fr 1fr';
    } else {
      city.style.display = 'none';
    }
  });
}

