import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeLatest('GET_MOVIE', getMovie)
  yield takeLatest('GET_GENRES', getGenres)
  yield takeLatest('ADD_MOVIE', addMovie)
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}
function* getMovie(action) {
  try{
    const movieChoice = yield axios.get(`/api/search/${action.payload}`);
    console.log('movieChoice is :',movieChoice)
    yield put({
      type:'MOVIE_DATA',
      payload: movieChoice
    }) 
  } catch(error) {
    console.log('error getting movie data', error)
  }
}
function* getGenres() {
  try {
    const allGenres = yield axios.get('/api/genres');
    console.log('the genres are',allGenres)
    yield put({
      type: 'SET_GENRES',
      payload: allGenres.data
    });
  } catch (error) {
    console.log('get genres error:', error);
  }
}

function* addMovie(action) {
  console.log('new movie is', action.payload)
  try {
    yield axios.post('/api/movies', action.payload)
    yield put({type: 'FETCH_MOVIES'})
  }catch(error){
    console.log('error adding a new movie',error)
  }
}



// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres
const genres = (state = [''], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the individual movie data, including
// putting the genres into their own array and then
// storing all the data in one array
const movieData = (state = [''], action) => {
  if (action.type === 'MOVIE_DATA') {
    let movieInfo = action.payload.data;
    console.log('movieInfo is', movieInfo[0].name)
    let movieGenres = []
    for (let i=0; i < movieInfo.length; i ++){
      movieGenres.push(movieInfo[i].name)
    }
    console.log('genres are ',movieGenres)
    const returnMovieData = [{
      title: movieInfo[0].title,
      poster: movieInfo[0].poster,
      description: movieInfo[0].description,
      genres: movieGenres
        }];
    return returnMovieData
  }
  return state
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieData
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
