// http://www.omdbapi.com/?i=tt3896198&apikey=f311a7ce - Omdb API
// f311a7ce - my API key

// const posterApiUrl = 'http://www.omdbapi.com/?s=batman&apikey=f311a7ce'
// //'http://img.omdbapi.com/?i=tt3896198&apikey=f311a7ce'

// // async function getPosters() {
// //     try {
// //         const response = await fetch(apiUrl)
// //         if (!response.ok) {
// //                 throw new Error('Network response not ok' + response.statusText)
// //             }
// //         const data = await response.json()
// //         console.log(data)
// //     }
// //     catch (error) {
// //         console.error('Problem with fetch operation:', error)
// //     }
// // }

// // getPosters()

// const movieListEl = document.querySelector(".movie")

// async function main() {
//     const movies = await fetch(`https://www.omdbapi.com/?s=${searchValue}=f311a7ce`)
//     const moviesData = await movies.json()
//     console.log(moviesData)
//     movieListEl.innerHTML = moviesData.Search
//         .map((movie) => movieHTML(movie))
//         .join("")
// }

// main()


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
        <div class="movie__poster">
            <div class="movie__wrapper">
                <img src="${movie.Poster}" alt="">
                <p class="see-more">See More</p>
            </div>
        </div>
        <div class="movie__description">
            <h3 class="movie__title">${movie.Title}</h3>
            <p class="year">${movie.Year}</p>
        </div>
    `
}

// async function fetchMovies(idToReplace) {
//     const baseURL = `https://www.omdbapi.com/?s=`
//     const endpoint = `&apikey=f311a7ce`
//     const apiURL = `${baseURL}${encodeURIComponent(idToReplace)}${endpoint}`

//     const moviesData = await response.json()

//     try {
//         const response = await fetch(apiURL)
//         if (!response.ok) {
//             throw new Error ('Network response invalid')
//         }
        
//     } catch (error) {
//         movies.innerHTML = `<p> No results matched your criteria </p>`
//         console.error('There was a problem with the fetch operation', error)
//     }

//     console.log(moviesData)
//     // let movieListEl = document.querySelector(".movie")
//     // movieListEl.innerHTML = moviesData.Search
//     //     .map((movie) => movieHTML(movie))
//     //     .join("")

    
// }

// fetchMovies(idToReplace)