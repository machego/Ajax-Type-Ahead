const jsonFile = 'planets.json';

const planets = []

fetch(jsonFile)
.then(uni => uni.json())
.then(data => planets.push(...data))

function findMatches(wordToMatch, planets) {
  return planets.filter(universe => {
    // here we need to figure out if the planet matches what searched
    const regex = new RegExp(wordToMatch, 'gi'); //ReExp g=global, i=insensitive
    return universe.planet.match(regex) || universe.color.match(regex)
  })
}

// display commas
function numberCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


function displayMatches() {
  const matchArray = findMatches(this.value, planets)
  //console.log(matchArray)
  const html = matchArray.map(universe => {
    const regex = new RegExp(this.value, 'gi');
    const planetName = universe.planet.replace(regex, `<span class="hl">${this.value}</span>`);
    const colorName = universe.color.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
    <li>
      <span class="name">${planetName}, ${colorName}</span>
      <span class="rank">${universe.rank}</span>
      <span class="distance">${numberCommas(universe.distance)}</span>
    </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);