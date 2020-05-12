import {fetchMovie, fetchNetflixOriginals, fetchTrending, fetchTopRated, fetchByGenreMovies}  from "./apiService.js";
import Header from "./components/Header.mjs";

(async() => {
    let movie = await fetchMovie(157336);
    //console.log(movie)
    document.getElementById("header").innerHTML = Header(movie);
    document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

    let moviesOriginals = await fetchNetflixOriginals();
    moviesOriginals = moviesOriginals.results

    let netflixOriginals = document.getElementsByClassName("movies__container--movie__netflix")[0]
    // console.log(netflixOriginals)
    for(let i = 0; i < moviesOriginals.length; i++){
        netflixOriginals.innerHTML += `
            <img src="https://image.tmdb.org/t/p/original//${moviesOriginals[i].poster_path}" class="movies__container--movie-image"/>
            `
        // console.log(movies[i].poster_path)
    }
    netflixOriginals.style.overflow = "auto"
    netflixOriginals.style.display = "flex"

    let moviesTrending = await fetchTrending();
    moviesTrending = moviesTrending.results

    let moviesTopRated = await fetchTopRated();
    moviesTopRated = moviesTopRated.results

    let moviesContainer = document.getElementsByClassName("movies__container--movie")
    let trending = moviesContainer[0]
    let topRated = moviesContainer[1]
    // console.log(trending)
    for(let i = 0; i < moviesTrending.length; i++){
        // console.log(moviesTrending[i])
        trending.innerHTML += `
        <img src="https://image.tmdb.org/t/p/original//${moviesTrending[i].backdrop_path}" class="movies__container--movie-image"/>
        `
    }
    trending.style.overflow = "auto"
    trending.style.display = "flex"

    for(let i = 0; i < moviesTopRated.length; i++){
        // console.log(moviesTopRated[i])
        topRated.innerHTML += `
        <img src="https://image.tmdb.org/t/p/original//${moviesTopRated[i].backdrop_path}" class="movies__container--movie-image"/>
        `
    }
    topRated.style.overflow = "auto"
    topRated.style.display = "flex"

    let genre = await fetchByGenreMovies();
    genre = genre.genres

    // console.log(genre)

    for(let i = 0; i < genre.length; i++){
        console.log(genre[i].name)

    }

})();