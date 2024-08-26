import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, Box, Typography, Button, Grid } from "@mui/material";


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
      <Typography color='blue' fontSize='3em' fontFamily='times'>
           MovieList
      </Typography>
      <Button sx={{margin:2}} variant="contained"   onClick={() => {history.push('/addmovie')}}>Add New Movie</Button>

           
      <Grid container
        display='flex'
        flexDirection='row'
        spacing={2}
        justifyContent="center"
      >
        
        {movies.map(movie => {
          return (
            <Grid item>
            <Card 
            data-testid='movieItem' 
            key={movie.id}
            mx = {2}>
              <h3>{movie.title}</h3>
              <img data-testid="toDetails" src={movie.poster} alt={movie.title} 
                onClick={(e) => handleMovie(movie.id)}/>
            </Card>
            </Grid>
          );
        })}
        {/* </Box> */}
      {/* </section> */}
      </Grid>
    </main>
  );
}

export default MovieList;
