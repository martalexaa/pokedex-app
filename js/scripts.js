//IIFE
let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=80';

//a function to open the modal container when the user click on one of the pokemon buttons
function showModal(item) {
  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');
  let modalHeader = $('.modal-header');

  modalTitle.empty();
  modalBody.empty();

  let nameElement = $('<h2>' + item.name + '</h2>');
  let imageElementFront = $('<img class="modal-img" style="width:50%">');
  imageElementFront.attr('src', item.imageUrlFront);
  let imageElementBack =  $('<img class="modal-img" style="width:50%">');
  imageElementBack.attr('src', item.imageUrlBack);
  let heightElement = $('<p>' + 'height: ' + item.height + '</p>');
  let weightElement = $('<p>' + 'weight: ' + item.weight + '</p>');
  let typeElement = $('<p>' + 'type: ' + item.types + '</p>');
  let abilitiesElement = $('<p>' + 'abilities: ' + item.abilities + '</p>');

  modalTitle.append(nameElement);
  modalBody.append(imageElementFront);
  modalBody.append(imageElementBack);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
  modalBody.append(typeElement);
  modalBody.append(abilitiesElement);
}

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

//creating a list of buttons with pokemon names, when you click on them, a modal shows up
function addListItem(pokemon) {  

  let pokemonList = $('.list-group');

  let listItem = $('<li class="list-group-item list-item"></li>');

    let button = $(
      '<button class="pokemon-button btn btn-dark" data-target="#pokemonModal" data-toggle="modal">' +
        pokemon.name +
        '</button>'
    );

  listItem.append(button);

  pokemonList.append(listItem);


  button.on('click', function () {
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
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.abilities = details.abilities.map((ability) => ability.ability.name).join(', ');
        item.types = details.types.map((type) => type.type.name).join(', ');
      }).catch(function (e) {
        console.error(e);
      });
    }

    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        showModal(item);
      });
    }
    
    //functions returned by IIFE 
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
})();

//FROM HERE WE ARE OUTSIDE OF IIFE

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


