import React, { useState } from 'react';
import './Todolist.css';

function Todolist() {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({
    name: '',
    year: '',
    actors: '',
    rating: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails({ ...movieDetails, [name]: value });
  };

  const addMovie = () => {
    if (
      movieDetails.name.trim() !== '' &&
      movieDetails.year.trim() !== '' &&
      movieDetails.actors.trim() !== '' &&
      movieDetails.rating.trim() !== ''
    ) {
      setMovies([...movies, movieDetails]);
      setMovieDetails({ name: '', year: '', actors: '', rating: '' });
    }
  };

  const deleteMovie = (index) => {
    const newMovies = movies.filter((_, i) => i !== index);
    setMovies(newMovies);
  };

  const editMovie = (index) => {
    setMovieDetails(movies[index]);
    setCurrentMovie(index);
    setIsEditing(true);
  };

  const updateMovie = () => {
    const newMovies = movies.map((movie, index) =>
      index === currentMovie ? movieDetails : movie
    );
    setMovies(newMovies);
    setMovieDetails({ name: '', year: '', actors: '', rating: '' });
    setIsEditing(false);
    setCurrentMovie(null);
  };

  return (
    <div className="todo-list">
      <h1>Movies Wishlist</h1>
      <div className="input-group">
        <label>Movie Name:</label>
        <input
          type="text"
          name="name"
          value={movieDetails.name}
          onChange={handleInputChange}
          placeholder="Enter movie name"
        />
      </div>
      <div className="input-group">
        <label>Year Published:</label>
        <input
          type="text"
          name="year"
          value={movieDetails.year}
          onChange={handleInputChange}
          placeholder="Enter year published"
        />
      </div>
      <div className="input-group">
        <label>Actors:</label>
        <input
          type="text"
          name="actors"
          value={movieDetails.actors}
          onChange={handleInputChange}
          placeholder="Enter actors' names"
        />
      </div>
      <div className="input-group">
        <label>Rating:</label>
        <input
          type="text"
          name="rating"
          value={movieDetails.rating}
          onChange={handleInputChange}
          placeholder="Enter rating"
        />
      </div>
      <button onClick={isEditing ? updateMovie : addMovie}>
        {isEditing ? 'Update Movie' : 'Add Movie'}
      </button>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <p><strong>Name:</strong> {movie.name}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Actors:</strong> {movie.actors}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <button onClick={() => editMovie(index)}>Edit</button>
            <button onClick={() => deleteMovie(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;
