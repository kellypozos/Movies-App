const API_URL ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=58daa79c6dfe0745c4c3aa62c9c7c574&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API ='https://api.themoviedb.org/3/search/movie?api_key=58daa79c6dfe0745c4c3aa62c9c7c574&query="'


const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const encabezado = document.getElementById('encabezado')

//GET peliculas iniciales 
getMovies(API_URL)


async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
       
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Descripción general</h3>
           ${overview}
        </div>
    
        `

        main.appendChild(movieEl)
    })
}

function getClassByRate(vote){
    if(vote >=8){
        return 'green'
    } else if(vote >=5){
        return 'orange'
    } else if(vote <5){
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    encabezado.innerHTML = ''

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value = ''

        const encabezadoEl = document.createElement('div')
        encabezadoEl.classList.add('encabezado')

        encabezadoEl.innerHTML = `
       
        <span class="material-symbols-outlined">arrow_back_ios</span>
    
        `

        encabezado.appendChild(encabezadoEl)

        encabezado.addEventListener('click', (e) => {
            e.preventDefault()
            window.location.reload()

        })

    } else {
        window.location.reload()
    }
})


