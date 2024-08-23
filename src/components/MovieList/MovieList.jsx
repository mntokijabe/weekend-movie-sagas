import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory

 } from 'react-router-dom/cjs/react-router-dom.min';
function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);
  let [movieChoice, setMovieChoice] = useState('');

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  const handleMovie = (movieId) => {
    event.preventDefault();
    console.log('movie id in handle movie is', movieId)
    dispatch({type:'GET_MOVIE', payload: movieId})
    history.push('/details')
  }

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.title}</h3>
              <img src={movie.poster} alt={movie.title} 
                onClick={(e) => handleMovie(movie.id)}/>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
