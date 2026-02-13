const searchValue = document.getElementById('searchValue')
const searchButton = document.getElementById('searchButton')
const resultsArea = document.getElementById('movies')
let movies = [];

searchButton.addEventListener('click', async () => {
  const searchTerm = searchValue.value;
  placeholder.classList.add("hidden")

  showDisc()
  if (!searchTerm) return;

  await fetchData(searchTerm);
  renderMovies();
  // hideDisc()
});

async function fetchData(searchTerm) {
  showDisc();

  await new Promise(resolve => {
    setTimeout(resolve, 1200)
  })

  const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=f311a7ce`);
  const data = await response.json();
  movies = data.Search || []
  return movies;
}

function movieHTML(movie) {
    return `
        <div class="movie__wrapper">
            <img src="${movie.Poster}" alt="" class="movie__img">
            <p class="see-more">See More</p>
            <div class="movie__description">
                <h3 class="movie__title">${movie.Title}</h3>
                <p class="year">${movie.Year}</p>
            </div>
        </div>
    `
}

async function renderMovies(filter) {
    let filteredMovies = [...movies];


   if (filter === 'ALPHABETICAL') {
    filteredMovies.sort((a, b) =>
      a.Title.localeCompare(b.Title)
    );
  }

  if (filter === 'YEAR') {
    filteredMovies.sort((a, b) =>
      b.Year - a.Year
    );
  }
  document.querySelector('.movie').innerHTML =
    filteredMovies.map(movieHTML).join("");
  hideDisc()
}

function filterMovies(event) {
    renderMovies(event.target.value)
    hideDisc()
}

const disc = document.getElementById("movies__loading-state")
const content = document.getElementById("movies__body")
const placeholder = document.getElementById("default__browser-img")

function showDisc() {
  placeholder.classList.add("hidden")
  disc.classList.remove("hidden")
}

function hideDisc() {
  disc.classList.add("hidden")
  content.classList.remove("hidden")
}