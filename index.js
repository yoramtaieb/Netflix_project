import { fetchMovie, fetchNetflixOriginals, fetchTrending, fetchTopRated, fetchByGenreMovies, fetchSerie, fetchSearch} from "./apiService.js";
import Header from "./components/Header.mjs";
import Modale from "./components/Modale.mjs";


(async() => {
    let movie = await fetchMovie(157336);
    document.getElementById("header").innerHTML = Header(movie);
    document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
    var o = 0

    async function display(fun, htmlElemnt, typeImg, parmFun = null) {
        let movies = await fun(parmFun)
        movies = movies.results

        htmlElemnt.style.overflow = "auto"
        htmlElemnt.style.display = "flex"

        if (typeImg == 'poster') {
            for (let i = 0; i < movies.length; i++) {

                if (movies[i].id != 'null') {
                    htmlElemnt.innerHTML += `
                    <img data-key-id=${movies[i].id} data-key-serie=true src="https://image.tmdb.org/t/p/original//${movies[i].poster_path}" class="movies__container--movie-image" onerror="this.style.display='none'" alt="${movies[i].original_title || movies[i].original_name}"/>
                `
                }
            }
        } else if (typeImg == 'backdrop') {
            for (let i = 0; i < movies.length; i++) {
                if (movies[i].id != 'null') {
                    htmlElemnt.innerHTML += `
                    <img data-key-id=${movies[i].id} data-key-serie=false src="https://image.tmdb.org/t/p/original//${movies[i].backdrop_path}" class="movies__container--movie-image" onerror="this.style.display='none'" alt="${movies[i].original_title || movies[i].original_name}"/>
                `
                }
            }
        }
        o++
        if (o >= 6) {
            let images = Array.from(document.querySelectorAll('.movies__container--movie-image'))
            images.map(function(elm) {
                elm.addEventListener('click', async function() {
                    let id = this.getAttribute('data-key-id')
                    let isSerie = this.getAttribute('data-key-serie')
                    
                    if (isSerie == "true") {
                        let nbDiv = document.getElementsByClassName('js-nb')
                        if (nbDiv.length < 1) {                            
                            let serie = await fetchSerie(id)                        
                            let containerSerieNetflix = document.getElementsByClassName('movies__container--movie__netflix')[0]
                            let div = document.createElement('div')
                            div.classList.add('js-nb')
                            div.innerHTML = Modale(serie)
                            containerSerieNetflix.after(div)
                            let buttonCross = document.getElementsByClassName('buttonCross')[0]
                            buttonCross.addEventListener('click', function() {
                                buttonCross.parentElement.remove()
                            })
                            let bgModal = document.getElementsByClassName('container-model')[0]
                            bgModal.style.backgroundImage = `url(https://image.tmdb.org/t/p/original//${serie.backdrop_path})`                        
                        } else {
                            let removeSerie = document.getElementsByClassName('js-nb')[0].remove()
                            let serie = await fetchSerie(id)
                            let containerSerieNetflix = document.getElementsByClassName('movies__container--movie__netflix')[0]
                            let div = document.createElement('div')
                            div.classList.add('js-nb')
                            div.innerHTML = Modale(serie)
                            containerSerieNetflix.after(div)
                            let buttonCross = document.getElementsByClassName('buttonCross')[0]
                            buttonCross.addEventListener('click', function() {
                                buttonCross.parentElement.remove()
                            })
                            let bgModal = document.getElementsByClassName('container-model')[0]
                            bgModal.style.backgroundImage = `url(https://image.tmdb.org/t/p/original//${serie.backdrop_path})`   
                        }                        
                    } else {
                        let nbDiv = document.getElementsByClassName('js-nb')                          
                        if (nbDiv.length < 1) {
                            let movie = await fetchMovie(id)
                            let parentMovie = this.parentElement
                            let divMovie = document.createElement('div')
                            divMovie.classList.add('js-nb')
                            divMovie.innerHTML = Modale(movie)
                            parentMovie.after(divMovie)
                            let buttonCross = document.getElementsByClassName('buttonCross')[0]
                            buttonCross.addEventListener('click', function() {
                                buttonCross.parentElement.remove()
                            })
                            let bgModal = document.getElementsByClassName('container-model')[0]
                            bgModal.style.backgroundImage = `url(https://image.tmdb.org/t/p/original//${movie.backdrop_path})`
                        } else {
                            document.getElementsByClassName('js-nb')[0].remove()
                            let movie = await fetchMovie(id)
                            let parentMovie = this.parentElement
                            let divMovie = document.createElement('div')
                            divMovie.classList.add('js-nb')
                            divMovie.innerHTML = Modale(movie)
                            parentMovie.after(divMovie)
                            let buttonCross = document.getElementsByClassName('buttonCross')[0]
                            buttonCross.addEventListener('click', function() {
                                buttonCross.parentElement.remove()
                            })
                            let bgModal = document.getElementsByClassName('container-model')[0]
                            bgModal.style.backgroundImage = `url(https://image.tmdb.org/t/p/original//${movie.backdrop_path})`
                        } 
                    }
                })
            })
            
            var timerId;
            var searchBoxDom = document.getElementsByClassName('navigation__container--left__input')[0];
            var searchContainer = document.getElementsByClassName('search-container')[0]
            // console.log(searchBoxDom)
            // This represents a very heavy method. Which takes a lot of time to execute
            async function makeAPICall() {
                // console.log('ok')
                let test = await fetchSearch(searchBoxDom.value);
                test = test.results
                searchContainer.innerHTML = ''
                for (let i = 0; i < test.length; i++){
                    searchContainer.innerHTML += `
                    <img data-key-id=${test[i].id} data-key-serie=true src="https://image.tmdb.org/t/p/original//${test[i].poster_path}" class="search-movie-poster" onerror="this.style.display='none'" alt="${test[i].original_title || test[i].original_name}"/>
                    `
                }

            }

            // Debounce function: Input as function which needs to be debounced and delay is the debounced time in milliseconds
            var debounceFunction = function(func, delay) {
                // Cancels the setTimeout method execution
                clearTimeout(timerId)

                // Executes the func after delay time.
                timerId = setTimeout(func, delay)
            }

            // Event listener on the input box
            searchBoxDom.addEventListener('input', function() {
                if (searchBoxDom.value.length >= 1) {
                    debounceFunction(makeAPICall, 300)
                    searchContainer.style.display = 'flex'
                    document.getElementById('header').style.display = 'none'
                    document.getElementsByClassName('movies')[0].style.display = 'none'
                } else {
                    searchContainer.innerHTML = ''
                    searchContainer.style.display = 'none'
                    document.getElementById('header').style.display = 'flex'
                    document.getElementsByClassName('movies')[0].style.display = 'block'
                }
            })
        }
    }

    display(fetchNetflixOriginals, document.getElementsByClassName("movies__container--movie__netflix")[0], 'poster')
    display(fetchTrending, document.getElementsByClassName("movies__container--movie")[0], 'backdrop')
    display(fetchTopRated, document.getElementsByClassName("movies__container--movie")[1], 'backdrop')
    display(fetchByGenreMovies, document.getElementsByClassName("movies__container--movie")[2], 'backdrop', 28)
    display(fetchByGenreMovies, document.getElementsByClassName("movies__container--movie")[3], 'backdrop', 35)
    display(fetchByGenreMovies, document.getElementsByClassName("movies__container--movie")[4], 'backdrop', 99)
})();
/**
 *                     let parent = this.parentElement.parentElement
                    parent.innerHTML += Modale(format)
                    let buttonCross = document.getElementsByClassName('buttonCross')[0]
                    buttonCross.addEventListener('click', () => {
                        buttonCross.parentNode.remove()
                    })
 */