import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Details () {
    let movieDetails = useSelector(store => store.movieData[0])
    let history = useHistory()
    console.log('movie details received ',movieDetails)
    return(
        <div data-testid="movieDetails">
            <h1>You selected....</h1>
            <h2>{movieDetails ? movieDetails.title : ''} <br></br>
            Which hails from the genre {movieDetails ? movieDetails.genres : ''}</h2>

            <img src={movieDetails ? movieDetails.poster : ''}></img>
            {movieDetails ? movieDetails.description : ''}

            <p></p>
            <button data-testid="toList" onClick={() => {history.push('/')}}>Return to Movie List</button>
        </div>

    )
}

export default Details;