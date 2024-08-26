import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';
import './App.css';
import { Box } from '@mui/system';
import { Typography,TextareaAutosize } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Box 
        bgcolor="black" 
        height="fit-content"
        width='auto'
        // sx={{height:"80px" }}
        >
        <Typography color='red' fontSize='4em' fontFamily='times'>The Movies Saga!</Typography>
        </Box>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route exact path="/details">
        <Details />
        </Route>
        <Route exact path="/addmovie">
        <AddMovie />
        </Route>

        {/* Add Movie page */}
        
      </Router>
    </div>
  );
}

export default App;
