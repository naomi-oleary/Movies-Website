// http://www.omdbapi.com/?i=tt3896198&apikey=f311a7ce - Omdb API
// f311a7ce - my API key

// const posterApiUrl = 'http://www.omdbapi.com/?s=batman&apikey=f311a7ce'
// //'http://img.omdbapi.com/?i=tt3896198&apikey=f311a7ce'


const searchValue = document.getElementById('searchValue')
const searchButton = document.getElementById('searchButton')
const resultsArea = document.getElementById('movies')

searchButton.addEventListener('click', () => {
    const searchTerm = searchValue.value
    if (searchTerm) {
        fetchData(searchTerm)
    }
    else {
        movies.innerHTML = '<p>Please enter a search item.</p>'
    }
})

function fetchData(idToReplace) {
    const baseURL = `https://www.omdbapi.com/?s=`
    const endpoint = `&apikey=f311a7ce`
    const apiURL = `${baseURL}${encodeURIComponent(idToReplace)}${endpoint}`


    fetch(apiURL)
        .then(movies => {
            const movieListEl = document.querySelector(".movie")
            if (!movies.ok) {
                throw new Error ('Network response invalid: ' + response.statusText)
            }
            return movies.json()
            console.log(movies.json)
        })
        .then(movies => {
            let movieListEl = document.querySelector(".movie")
            movieListEl.innerHTML = movies.Search
                .map((movie) => movieHTML(movie))
                .join("")
        })
        .catch(error => {
            movies.innerHTML = `<p> No results matched your criteria </p>`
            console.error('There was a problem with the fetch operation', error)
        })
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
    const moviesWrapper = document.querySelector('.movies__loading-state')

    moviesWrapper.classList += ' movies__loading'
    if (!movies) {
        movies = await fetchData(idToReplace)
    }

    moviesWrapper.classList.remove('movies__loading')

    if (filter === 'ALPHABETICAL') {
        const filteredMovies = movies.sort((a, b) => a.Title.localeCompare(b.Title))
    }
    else if (filter === 'YEAR') {
        movies.sort((a, b) => b.Year - a.Year)
    }

    const moviesHtml = movies.map((movie) => {
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
    }).join("")

    moviesWrapper.innerHTML = moviesHtml
}

function filterMovies(event) {
    renderMovies(event.target.value)
}

// setTimeout(() => {
//     renderMovies()
// })

