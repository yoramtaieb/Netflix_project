import { fetchMovie, fetchNetflixOriginals, fetchTrending, fetchTopRated, fetchByGenreMovies, fetchSerie } from "./apiService.js";
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
                    <img data-key-id=${movies[i].id} data-key-serie=true src="https://image.tmdb.org/t/p/original//${movies[i].poster_path}" class="movies__container--movie-image" onerror="this.style.display='none'" alt="Poster de la série format portrait"/>
                `
                }
            }
        } else if (typeImg == 'backdrop') {
            for (let i = 0; i < movies.length; i++) {
                if (movies[i].id != 'null') {
                    htmlElemnt.innerHTML += `
                    <img data-key-id=${movies[i].id} data-key-serie=false src="https://image.tmdb.org/t/p/original//${movies[i].backdrop_path}" class="movies__container--movie-image" onerror="this.style.display='none'" alt="Image de la série format paysage"/>
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
                    var test
                    if (isSerie == true) {
                        test = await fetchSerie(id)
                    } else {
                        test = await fetchMovie(id)
                    }
                    console.log(test)
                })
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