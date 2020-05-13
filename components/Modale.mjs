export default function Modale(props) {
    return `
    <div class="container-model">
        <div class="container-linear">
            <div class="containerInfo">
                <h3>${props.original_title}</h3>
                <p> <span class="rating">Rating ${props.vote_average * 10}%</span> Release Date: ${props.release_date} Runtime: ${props.runtime}</p>
                <p class="paraDescription">${props.overview}</p>
                    <div class="containerButtons">
                        <button id="buttonPlay"><i class="fas fa-play"></i>Play</button>
                        <button id="buttonPlus"><i class="fas fa-plus"></i>My List</button>
                    </div>
                </div>
            </div>
        <span class="buttonCross"><i class="fas fa-times fa-2x"></i></span>
        </div>
    </div>`

}