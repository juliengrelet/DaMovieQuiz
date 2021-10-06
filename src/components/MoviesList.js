import React from 'react';
import Movie from './Movie';

export default function MoviesList({ movies }) {
  return <div>
    <Movie title={movies.title} poster={movies.poster_path} key={movies.id} />
  </div>
}