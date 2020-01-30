import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';

// Components
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import AddMovie from './Movies/AddMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, [])

  const updateMovies = editedMovie => {
    let filteredState = movies.filter(movie => editedMovie.id !== movie.id);
    setMovies(
      [...filteredState, editedMovie]
    )
  };

  const removeDeletedMovies = id => {
    let filteredMovies = movies.filter(movie => movie.id !== id)
    setMovies(filteredMovies)
  }


  return (
    <>
      <SavedList list={savedList} />
      <Route 
        exact path="/" 
        render={props => {
          return <MovieList {...props} movies={movies} />
        }}  
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} removeDeletedMovies={removeDeletedMovies} />;
        }}
      />
      <Route path="/update-movie/:id"
        render={props => {
          return <UpdateForm {...props} movies={movies} updateMovies={updateMovies} />
        }}
      />
      <Route path="/movie/add" component={AddMovie} />
    </>
  );
};

export default App;