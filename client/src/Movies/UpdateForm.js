import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
  id: Date.now(),
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialItem);

  // ----- WATCH THIS!!! movie might be movies or vice versa
  useEffect(() => {
    const movieToEdit = props.movies.find(el => `${el.id}` === props.match.params.id);

    if (movieToEdit) {
      setMovie(movieToEdit);
    }
  }, [props.movies, props.match.params.id]);

  const handleChange = ev => {
    if(ev.target.name === 'stars') {
      let starsArr = ev.target.value.split(', ')
      setMovie(
        {...movie, [ev.target.name]: starsArr}
      )
    } else {
      setMovie(
        {...movie, [ev.target.name]: ev.target.value}
      )
    }
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.updateMovies(res.data)
        props.history.push(`/movies/${movie.id}`)
      })
      .catch(err => console.log(err))
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="director"
          value={movie.director}
        />
        
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          placeholder="metascore"
          value={movie.metascore}
        />

        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;