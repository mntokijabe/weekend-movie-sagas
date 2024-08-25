import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
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
        {/* Details page */}

        {/* Add Movie page */}
        
      </Router>
    </div>
  );
}

export default App;
