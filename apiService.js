const APÎ_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "2997c5290abfb556adf35db19e36cc28";

export async function fetchMovie(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=617f779f9850bfb3355824689e154920`;
    let res = await fetch(url);
    let movie = await res.json();
    //console.log(movie);
    return movie;
}
export async function fetchSerie(serieId) {
    const url = `https://api.themoviedb.org/3/tv/${serieId}?api_key=617f779f9850bfb3355824689e154920`;
    let res = await fetch(url);
    let serie = await res.json();
    return serie;
}

export async function fetchNetflixOriginals() {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=617f779f9850bfb3355824689e154920&with_networks=213`;
    let res = await fetch(url);
    let movies = await res.json();
    return movies;

}

export async function fetchTrending() {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=617f779f9850bfb3355824689e154920`
    let res = await fetch(url);
    let trendingNow = await res.json();
    return trendingNow;
}

export async function fetchTopRated() {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=617f779f9850bfb3355824689e154920&page=1`
    let res = await fetch(url);
    let topRated = await res.json();
    return topRated;
}

export async function fetchByGenreMovies(genre) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=617f779f9850bfb3355824689e154920&with_genres=${genre}`
    let res = await fetch(url);
    let genreMovies = await res.json();
    return genreMovies;
}

export async function fetchSearch(query){
    const url =`https://api.themoviedb.org/3/search/multi?api_key=617f779f9850bfb3355824689e154920&query=${query}&include_adult=false`
     let res = await fetch(url)
     let queryMovies = await res.json()
     return queryMovies
 }