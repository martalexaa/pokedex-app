//List of all Pokemons in this app
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

//Iterates over the each pokemon in pokemonList using forEach loop, highlights the biggest one

function myLoopFunction(pokemon) {
  document.write('<p>' + pokemon.name 
  + ' (height: ' + pokemon.height + ' m),' 
  + ' (weight: ' + pokemon.weight + ' kg),' 
  + ' type: ' + pokemon.types);
  if (pokemon.height > 0.7) {
    document.write('<span>' + '  - Wow, this one is the biggest!' + '</span>')
  };  
}
  pokemonList.forEach(myLoopFunction);

/*Prints to the document each Pokemon's name followed by height
for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' ' + '(height: '), 
    document.write(pokemonList[i].height + ')<br>');
    
Highlights the biggest Pokemon which size is above 0.7
  if (pokemonList[i].height > 0.7) {document.write('- Wow, this one is the biggest!' + '<br>')};
  }*/


