import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          // this is coming from API
          id: movieData.episde_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      // data.<results> is from API
      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (isError) {
      setIsError(isError.message);
    }

    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !isError && (
          <p>Found no movies</p>
        )}
        {isLoading && <p>Loading...</p>}
        {!isLoading && isError && <p>{isError}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
