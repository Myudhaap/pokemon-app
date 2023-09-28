const types = {
  bug: '#26de81',
  dragon: '#ffeaa7',
  electric: '#fed330',
  fairy: '#ff0069',
  fighting: '#30336b',
  fire: '#f0932b',
  flying: '#81ecec',
  grass: '#00b894',
  ground: '#efb549',
  ghost: '#a55eea',
  ice: '#74b9ff',
  normal: '#95afc0',
  poison: '#6c5ce7',
  psychic: '#a29bfe',
  rock: '#2d3436',
  water: '#0190ff'
} 

const card = document.querySelector('.card-pokemon')
const generate = document.getElementById('generate')
const urlApi = 'https://pokeapi.co/api/v2/pokemon/';

const getPokemon = () => {
  const id = Math.floor(Math.random() * 150) + 1;
  fetch(`${urlApi}${id}`)
  .then(response => response.json())
  .then(data => {
    generateCard(data)
  })
}

generate.addEventListener('click', getPokemon)
window.addEventListener('load', getPokemon)

const generateCard = data => {
  console.log(data)
  card.innerHTML = `
  <p class="pokemon-hp">
    <span>HP</span>
    ${data.stats[0].base_stat}
  </p>
  <img src="${data.sprites.other.dream_world.front_default}" alt="Pokemon Image" class="pokemon-img">
  <h2 class="pokemon-name">${data.name.toUpperCase()}</h2>
  <div class="pokemon-types">
  </div>
  <div class="pokemon-stats">
    <div class="stats-attack">
      <h3>${data.stats[1].base_stat}</h3>
      <p>Attack</p>
    </div>
    <div class="stats-defense">
      <h3>${data.stats[2].base_stat}</h3>
      <p>Defense</p>
    </div>
    <div class="stats-speed">
      <h3>${data.stats[5].base_stat}</h3>
      <p>Speed</p>
    </div>
  </div>
  `;
  appendTypes(data.types)
  appendColors(types[data.types[0].type.name])
}


function appendTypes(types){
  const typesEl = document.querySelector('.pokemon-types'); 
  types.forEach(data => {
    const type = document.createElement('span')
    type.textContent = data.type.name;
    typesEl.appendChild(type)
  })
}

function appendColors(color){
  const types = document.querySelectorAll('.pokemon-types span')
  types.forEach(element => element.style.backgroundColor = color)
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 80%)`
}