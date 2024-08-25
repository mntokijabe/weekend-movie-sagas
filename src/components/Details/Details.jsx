import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Container, Card, Box, Typography, Button, Grid, CardMedia, CardHeader } from "@mui/material";
import { borders} from  '@mui/system';
import {CardContent} from "@mui/material";

function Details () {
    let movieDetails = useSelector(store => store.movieData[0])
    let history = useHistory()
    console.log('movie details received ',movieDetails)
    return(
        <Container>
        <Typography color='blue' fontSize='3em' fontFamily='times'>
           You Selected...
      </Typography>
        <Grid container spacing={1}
        data-testid="movieDetails"
        display='flex'
        flexDirection='row'
        
        >
            <Grid item sx={{width:'40%' }}>
                <Card elevation={2}sx={{borderRadius:'2%', backgroundColor:"black"}}>
                    <CardMedia
                     image={movieDetails ? movieDetails.poster : ''} />
                <img width='100%' height='100%' src={movieDetails ? movieDetails.poster : ''}></img>
                </Card>
            </Grid>
        <Grid item sx={{width:'60%'}}>
        <Card elevation={4}  sx={{bgcolor:'#f5f5f5'}}>
            <CardContent  >
                <Typography variant="h3">                
               {movieDetails ? movieDetails.title : ''} </Typography>
               </CardContent> 

            <CardContent>
                <Typography variant="h4" sx={{textAlign:'left'}}>
                Genres:
                </Typography>
                {movieDetails.genres.map((genre) => {
                    return(
                    <Button sx={{bgcolor:"", margin:1 }} padding={2}
             variant="outlined">{genre}</Button>
                )}
            )}
              
            </CardContent>
                <Typography variant="body1" sx={{margin:1}}>          
                      {movieDetails ? movieDetails.description : ''}
                </Typography>


            <p></p>
            <Button sx={{margin:2}} variant="contained"  data-testid="toList" onClick={() => {history.push('/')}}>Return to Movie List</Button>
        </Card>
        </Grid>
        </Grid>
        </Container>

    )
}

export default Details;