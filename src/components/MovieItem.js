import React from "react";

const MovieItem = ({ movie, addToMyList }) => {
  return (
    <li className="movie-item">
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
      <p>Rating: {movie.rating}</p>
      <button onClick={addToMyList}>Add to My List</button>
    </li>
  );
};

export default MovieItem;
