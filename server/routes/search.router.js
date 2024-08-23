const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios')

const router = express.Router();

router.get(`/:id`, (req, res) => {
    let movieId = req.params.id
    const sqlText = `
      SELECT "movies".title, "movies".description, "movies".poster,"genres".name 
            FROM "movies_genres"
            JOIN "movies" 
                ON movies.id = movies_genres.movie_id 
            JOIN "genres"
                ON genres.id = movies_genres.genre_id
			WHERE movies.id = $1;`
    const sqlValue = [movieId];

    pool.query(sqlText, sqlValue)
    .then((response) => {
        console.log('response data is ',response.rows)
        let movieInfo = response.rows
        res.send(movieInfo)
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;