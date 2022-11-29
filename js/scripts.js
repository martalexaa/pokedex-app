let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=80';

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
  
  //fetching the data from URL
    function loadList() {
      return fetch(apiUrl).then(function (response) {  // <== this is a promise
        return response.json();  // <== the data is transferred from the server in JSON language
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {  
        console.error(e);
      })
    }
  
  //function for loading details
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
      pokemonRepository.loadDetails(item).then(function () {
        console.log(item);
      });
    }
  
    return {
      add: add,
      getAll: getAll,
      loadList: loadList,
      forEach: forEach,
      addListItem: addListItem,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
})();

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


