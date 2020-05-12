import { fetchMovie, fetchNetflixOriginals, fetchTrending, fetchTopRated, fetchByGenreMovies } from "./apiService.js";
import Header from "./components/Header.mjs";

(async() => {
    let movie = await fetchMovie(157336);
    document.getElementById("header").innerHTML = Header(movie);
    document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

    let moviesOriginals = await fetchNetflixOriginals();
    moviesOriginals = moviesOriginals.results

    let netflixOriginals = document.getElementsByClassName("movies__container--movie__netflix")[0]
    // récupérer les résultats de la section Netflix Originals
    for (let i = 0; i < moviesOriginals.length; i++) {
        netflixOriginals.innerHTML += `
            <img src="https://image.tmdb.org/t/p/original//${moviesOriginals[i].poster_path}" class="movies__container--movie-image"/>
            `
    }
    netflixOriginals.style.overflow = "auto"
    netflixOriginals.style.display = "flex"

    let moviesTrending = await fetchTrending();
    moviesTrending = moviesTrending.results

    let moviesTopRated = await fetchTopRated();
    moviesTopRated = moviesTopRated.results

    let movieGenreActions = await fetchByGenreMovies(28)
    movieGenreActions = movieGenreActions.results

    let movieGenreComedy = await fetchByGenreMovies(35)
    movieGenreComedy = movieGenreComedy.results

    let movieGenreDocumentary = await fetchByGenreMovies(99)
    movieGenreDocumentary = movieGenreDocumentary.results

    let moviesContainer = document.getElementsByClassName("movies__container--movie")
    let trending = moviesContainer[0]
    let topRated = moviesContainer[1]
    let actionsMovie = moviesContainer[2]
    let comediesMovie = moviesContainer[3]
    let documentaryMovie = moviesContainer[4]

    // récupérer les résultats de la section "Trending Now"
    for (let i = 0; i < moviesTrending.length; i++) {
        trending.innerHTML += `
        <img src="https://image.tmdb.org/t/p/original//${moviesTrending[i].backdrop_path}" class="movies__container--movie-image"/>
        `
    }
    trending.style.overflow = "auto"
    trending.style.display = "flex"

    // récupérer les résultats de la section "Top Rated"
    for (let i = 0; i < moviesTopRated.length; i++) {
        topRated.innerHTML += `
        <img src="https://image.tmdb.org/t/p/original//${moviesTopRated[i].backdrop_path}" class="movies__container--movie-image"/> `
    }
    topRated.style.overflow = "auto"
    topRated.style.display = "flex"

    // récupérer les résultats des films de genre Action
    for (let i = 0; i < movieGenreActions.length; i++) {
        console.log(movieGenreActions)
        actionsMovie.innerHTML += ` 
        <img src="https://image.tmdb.org/t/p/original//${movieGenreActions[i].backdrop_path}" class="movies__container--movie-image"/>`
    }
    actionsMovie.style.overflow = "auto"
    actionsMovie.style.display = "flex"

    // récupérer les résultats des films de genre Comedy
    for (let i = 0; i < movieGenreComedy.length; i++) {
        console.log(movieGenreComedy)
        comediesMovie.innerHTML += ` 
        <img src="https://image.tmdb.org/t/p/original//${movieGenreComedy[i].backdrop_path}" class="movies__container--movie-image"/>`
    }
    comediesMovie.style.overflow = "auto"
    comediesMovie.style.display = "flex"

    // récupérer les résultats des films de genre Documentary
    for (let i = 0; i < movieGenreDocumentary.length; i++) {
        console.log(movieGenreDocumentary)
        documentaryMovie.innerHTML += ` 
        <img src="https://image.tmdb.org/t/p/original//${movieGenreDocumentary[i].backdrop_path}" class="movies__container--movie-image"/>`
    }
    documentaryMovie.style.overflow = "auto"
    documentaryMovie.style.display = "flex"

})();