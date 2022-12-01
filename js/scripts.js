//IIFE
let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=80';

let modalContainer = document.querySelector('#modal-container');

//a function to open the modal container when the user click on one of the pokemon buttons
function showModal(title, text, img) {
modalContainer.innerHTML = '';

let modal = document.createElement('div');
modal.classList.add('modal');

// Add the new modal content
let closeButtonElement = document.createElement('button');
closeButtonElement.classList.add('modal-close');
closeButtonElement.innerText = 'Close';
closeButtonElement.addEventListener('click', hideModal);

let titleElement = document.createElement('h1');
titleElement.innerText = title;

let contentElement = document.createElement('p');
contentElement.innerText = text;

let imageElement = document.createElement("img");
imageElement.setAttribute("src", img);
imageElement.setAttribute("width", "80%");
imageElement.setAttribute("height", "80%");
imageElement.setAttribute("alt", "Pokemon image");
imageElement.classList.add("pokemon-image");
//imageElement.src = item.imageUrl; //why does it not work?? if I uncomment this, the modal does not open

modal.appendChild(closeButtonElement);
modal.appendChild(titleElement);
modal.appendChild(contentElement);
modal.appendChild(imageElement);
modalContainer.appendChild(modal);

modalContainer.classList.add('is-visible');
}

function hideModal() {
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal container,
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
}

function getAll() {
  return pokemonList;
}

function forEach(pokemon) {
  return pokemonList.forEach(pokemon);
}

//creating a list of buttons with pokemon names
function addListItem(pokemon) {  
  let pokemonList = document.querySelector('.pokemon-list');
    //creates a list element
  let listItem = document.createElement('li');
    //creates a button
  let button = document.createElement('button');
    //adds text to the button
  button.innerText = pokemon.name;
    //adds a class to the button, in order to be able to add to it style in css
  button.classList.add('mybutton');
    //adds the button as a child element to listItem parent element
  listItem.appendChild(button);
    //adds the listItem as a child element to it's parent, the pokemonList
  pokemonList.appendChild(listItem);
    //adds a button function
  button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }
  
  //fetching the pokemon data from URL
    function loadList() {
      return fetch(apiUrl).then(function (response) {  // <== this is a promise
        return response.json();  // <== the data is transferred from the server in JSON language
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      }).catch(function (e) {  
        console.error(e);
      })
    }
  
//function for loading details of each Pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // adding the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    function showDetails(item) {
      showModal(item.name, item.name + ' is ' + item.height + ' high. ' + 'Type: ' + item.types, item.imageUrl); //why does the height and type not show???
   };

    /*function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        console.log(pokemon.name, 'height: ' + pokemon.height);
      });
    }*/
    
    //functions returned by IIFE 
    return {
      add: add,
      getAll: getAll,
      loadList: loadList,
      forEach: forEach,
      addListItem: addListItem,
      loadDetails: loadDetails,
      showDetails: showDetails,
      showModal: showModal,
      hideModal: hideModal
    };
})();

//FROM HERE WE ARE OUTSIDE OF IIFE

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}

//pokemonRepository.add({ name: 'Charizard', height: 1.7, weight: 90.5, types: ['fire', 'flying'] }); // adds a new pokemon to the repository
//console.log(pokemonRepository.getAll()); // prints pokemons to the console


//Iterates over the each pokemon in pokemonList using forEach loop, highlights the biggest one

/*function myLoopFunction(pokemon) {
    pokemonRepository.addListItem(pokemon);
}


pokemonRepository.forEach(myLoopFunction);


/*Filters pokemonlist by name

function filterList(pokemon) {
    if (pokemon.name === 'Raichu') {
      return pokemon.name;
    };
}
console.log(pokemonRepository.filter(filterList));
*/



/*Prints to the document each Pokemon's name followed by height
for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' ' + '(height: '), 
    document.write(pokemonList[i].height + ')<br>');
    
Highlights the biggest Pokemon which size is above 0.7
  if (pokemonList[i].height > 0.7) {document.write('- Wow, this one is the biggest!' + '<br>')};
  }*/


