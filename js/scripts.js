//List of all Pokemons in this app
let pokemonRepository = (function () {
let pokemonList = [
  { 
    name: 'Pikachu', 
    height: 0.4, 
    weight: 6, 
    types: ['electric'] 
},
  { 
    name: 'Raichu', 
    height: 0.8, 
    weight: 30, 
    types: ['electric'] 
},
  { name: 'Squirtle', 
  height: 0.5, 
  weight: 9, 
  types: ['water'] 
},
  { name: 'Nidoran', 
  height: 0.4, 
  weight: 7, 
  types: ['poison'] 
},
];

function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function forEach(pokemon) {
    return pokemonList.forEach(pokemon);
  }

  function showDetails(pokemon) {
    return console.log(pokemon);
  }

/*  function filter(pokemon) {
    return pokemonList.filter(pokemon);
  } */

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    //create a list element
    let listItem = document.createElement('li');
    //create a button
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

  return {
    add: add,
    getAll: getAll,
    forEach: forEach,
    //filter: filter,
    addListItem: addListItem,
    showDetails: showDetails
    }   
})();

pokemonRepository.add({ name: 'Charizard', height: 1.7, weight: 90.5, types: ['fire', 'flying'] }); // adds a new pokemon to the repository
console.log(pokemonRepository.getAll()); // prints pokemons to the console


//Iterates over the each pokemon in pokemonList using forEach loop, highlights the biggest one

function myLoopFunction(pokemon) {
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


