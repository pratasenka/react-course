import React from "react"
import { useState } from "react";

import './App.css';
import { MoviesList } from "./components/movies-list/movies-list";
import { HeaderSearch } from "./components/header-search/header-search";
import { MovieDetails } from "./components/movie-details/movie-details";
import { Portal } from "./components/portal/portal";
import { EditMovieDetails } from "./components/edit-movie-details/edit-movie-details";
import { ModalDialog } from "./components/modal-dialog/modal-dialog";
import { nanoid } from "nanoid";
import { DeleteMovie } from "./components/delete-movie/delete-movie";

export interface MovieData {
  id: string;
  name: string;
  imageUrl: string;
  releaseYear: number;
  duration: string;
  relevantGenres: string[];
  description: string;
  rating: string;
}

// interface ModalDialogParamsType {
//   // active: boolean;
//   // title?: string;
//   // movie?: MovieData;
//   // action?: any;
// }

const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];


const moviesArray: MovieData[] = [];

for (let i = 0; i < 1; ++i) {
  moviesArray.push({
    id: nanoid(),
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
  const [movies, setMovies] = useState([...moviesArray]);
  const [activeGenres, setActiveGenres] = useState([genres[0]]);
  const [searchText, setSearchText] = useState('');
  const [modalDialog, setModalDialog] = useState(<></>)
  const [movieDetails, setMovieDetails] = useState(null as any);

  const searchCallback = (searchText: string) => {
    setSearchText(searchText);
  }

  const changeActiveGenresCallback = (activeGenres: string[]) => {
    setActiveGenres(activeGenres);
  }

  const updateMovieDetails = (movie?: MovieData) => {
    if (movie) setMovieDetails(movie);
    else setMovieDetails(null as any)
  }

  const modalDialogConfiguration = (title: string, component: any) => {
    setModalDialog(
      <ModalDialog
        title={title}
        close={() => setModalDialog(<></>)}
      >
        {component}
      </ModalDialog>)
  }

  const addMovie = (movie: MovieData) => {
    setMovies([...movies, movie]);
    setModalDialog(<></>)
  }

  const editMovie = (movie: MovieData) => {
    movies.splice(
      movies.findIndex(oldMovie => oldMovie.id === movie.id),
      1,
      movie
    )
    setMovies([...movies]);
    setModalDialog(<></>)
  }

  const deleteMovie = (movie: MovieData) => {
    movies.splice(
      movies.findIndex(oldMovie => oldMovie.id === movie.id),
      1
    )
    setMovies([...movies]);
    setModalDialog(<></>)
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
            setEditMovieDetails={() => {
              modalDialogConfiguration(
                "ADD MOVIE",
                <EditMovieDetails
                  action={addMovie}
                />)
            }}
          />
        }
      </div>

      <div className="App-content">
        <MoviesList
          movies={movies}
          genres={genres}
          activeGenres={activeGenres}
          edit={(movie: MovieData) => {
            modalDialogConfiguration(
              "EDIT MOVIE",
              <EditMovieDetails
                movie={movie}
                action={editMovie}
              />)
          }}
          delete={(movie: MovieData) => {
            modalDialogConfiguration(
              "DELETE MOVIE",
              <DeleteMovie
                movie={movie}
                action={deleteMovie}
              />)
          }}
          setActiveGenres={changeActiveGenresCallback}
          setMovieDetails={updateMovieDetails}
        />
      </div >
    </div>
    {
      modalDialog ?
        <Portal>
          {modalDialog}
        </Portal>
        : <></>
    }
  </>
  );
}

export default App;
