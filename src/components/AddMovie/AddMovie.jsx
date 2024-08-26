import { Button, Select, MenuItem } from '@mui/material';
import React, { useState, useEffect }from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AddMovie = () => {
    const dispatch = useDispatch();
    const category = useSelector(store => store.genres);
    const history = useHistory();

    let [newName, setNewName] = useState('');
    let [newTitle, setNewTitle] = useState('');
    let [newUrl, setNewUrl] = useState('');
    let [newDescription, setNewDescription] = useState('');
    let [newGenre, setNewGenre] = useState('');


    useEffect(() => {
        dispatch({ type: 'GET_GENRES' });
      }, []);

const addNewMovie = (event) => {
    event.preventDefault();

   const movieToAdd = {
    title: newTitle,
    description: newDescription,
    poster: newUrl,
    genre_id: newGenre  
};
    dispatch({ type: 'ADD_MOVIE', payload: movieToAdd });
    history.push('/')
}

    return (
        <div>

            <h3>Add a New Movie form</h3>
            <form onSubmit={addNewMovie}>
                <input type='text' placeholder="Title" value={newTitle} onChange={(e) => {setNewTitle(e.target.value)}} />
                <input type='url' placeholder="image url" value={newUrl} onChange={(e) => {setNewUrl(e.target.value)}} />
                <input className="description" type='text' placeholder="Description" value={newDescription} onChange={(e) => {setNewDescription(e.target.value)}} />
              <h3>Select a genre from the dropdown</h3>
              <Select
                    value={newGenre}
                    onChange={(e) => {setNewGenre(e.target.value)}}
                >
                    {category.map((genre) => (
                    <MenuItem value={genre.id} >{genre.name} </MenuItem>
                    ))}
                </Select>

                <Button type='submit'>Add New Movie</Button>
            </form>
        </div>
    );
}


export default AddMovie;
