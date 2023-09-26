import React from "react"
import { useState } from "react";

import { MoviesList } from "./components/movies-list/movies-list";
import { HeaderSearch } from "./components/header-search/header-search";
import { MovieDetails } from "./components/movie-details/movie-details";
import './App.css';
import { Dropdown } from "./components/dropdown/dropdown";

export interface MovieData {
  name: string;
  imageUrl: string;
  releaseYear: number;
  duration: string;
  relevantGenres: string[];
  description: string;
  rating: string;
}

const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];


const movies: MovieData[] = [];

for (let i = 0; i < 11; ++i) {
  movies.push({
    name: `Oppenheimer ${20 - i}`,
    imageUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900',
    releaseYear: 2025 + (-2 ^ i),
    duration: '3h 10min',
    relevantGenres: ['DOCUMENTARY', 'HORROR'],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean turpis turpis, mollis ut cursus ac, ultricies sed odio. Duis eleifend elit quam, sed gravida odio pharetra in. Quisque quam est, condimentum nec turpis id, auctor vulputate dui. Vivamus tempus, arcu ultrices tempor congue, odio orci semper nulla, placerat facilisis odio urna id tellus.`,
    rating: '8.8',
  })
};


function App() {
  const [activeGenres, setActiveGenres] = useState([genres[0]]);
  const [searchText, setSearchText] = useState('');
  // const [movieDetails, setMovieDetails] = useState(movies[0] as any);
  const [movieDetails, setMovieDetails] = useState(null as any);

  const searchCallback = (searchText: string) => {
    console.log(searchText);
    setSearchText(searchText);
  }

  const changeActiveGenresCallback = (activeGenres: string[]) => {
    console.log(activeGenres);
    setActiveGenres(activeGenres);
  }

  const updateMovieDetails = (movie?: MovieData) => {
    console.log('called', movie)
    if (movie) setMovieDetails(movie);
    else setMovieDetails(null as any)
  }

  return (<>
    <div className="App">
      <div className="App-header">
        {movieDetails ?
          <MovieDetails
            movie={movieDetails}
            backToSearch={updateMovieDetails}
          />
          :
          <HeaderSearch
            searchText={searchText}
            searchCallback={searchCallback}
          />
        }

      </div>

      <div className="App-content">
        <MoviesList
          movies={movies}
          genres={genres}
          activeGenres={activeGenres}
          setActiveGenres={changeActiveGenresCallback}
          setMovieDetails={updateMovieDetails}
        />
      </div >
    </div>
  </>
  );
}

export default App;
