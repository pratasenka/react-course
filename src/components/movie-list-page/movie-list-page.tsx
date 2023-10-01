import React, { useEffect } from "react"
import { useState } from "react";

import { MoviesList } from "../movies-list/movies-list";
import { HeaderSearch } from "../header-search/header-search";
import { MovieDetails } from "../movie-details/movie-details";
import { Portal } from "../portal/portal";
import { EditMovieDetails } from "../edit-movie-details/edit-movie-details";
import { ModalDialog } from "../modal-dialog/modal-dialog";
import { nanoid } from "nanoid";
import { DeleteMovie } from "../delete-movie/delete-movie";

export interface MovieData {
    id: string;
    name: string;
    imageUrl: string;
    releaseYear: string;
    duration: string;
    relevantGenres: string[];
    description: string;
    rating: string;
}

const genres = ['Documentary', 'Comedy', 'Horror', 'Crime'];


// const moviesArray: MovieData[] = [];

// for (let i = 0; i < 1; ++i) {
//     moviesArray.push({
//         id: nanoid(),
//         name: `Oppenheimer ${20 - i}`,
//         imageUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900',
//         releaseYear: 2025 + (-2 ^ i),
//         duration: '3h 10min',
//         relevantGenres: ['DOCUMENTARY', 'HORROR'],
//         description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean turpis turpis, mollis ut cursus ac, ultricies sed odio. Duis eleifend elit quam, sed gravida odio pharetra in. Quisque quam est, condimentum nec turpis id, auctor vulputate dui. Vivamus tempus, arcu ultrices tempor congue, odio orci semper nulla, placerat facilisis odio urna id tellus.`,
//         rating: '8.8',
//     })
// };



export default function MovieListPage() {
    const [movies, setMovies] = useState<MovieData[]>([]);
    const [sortBy, setSortBy] = useState('');
    const [activeGenres, setActiveGenres] = useState<string[]>([...genres]);
    const [searchText, setSearchText] = useState('');
    const [modalDialogParams, setModalDialogParams] = useState<any>(null);
    const [movieDetails, setMovieDetails] = useState(null as any);

    const fetchMoviesData = () => {
        console.log(`http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=asc&search=${searchText}&searchBy=title&filter=${activeGenres.length === genres.length ? '' : activeGenres.join(',')}`)
        fetch(decodeURIComponent(`http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=asc&search=${searchText}&searchBy=title&filter=${activeGenres.length === genres.length ? '' : activeGenres.join(',')}`))
            .then(response => {
                return response.json()
            })
            .then(parsedResponse => {
                console.log(parsedResponse.data)
                setMovies(parsedResponse.data.map((movie: any): MovieData => {
                    return {
                        id: movie.id,
                        name: movie.title,
                        imageUrl: movie.poster_path,
                        releaseYear: movie.release_date,
                        duration: movie.runtime,
                        relevantGenres: movie.genres,
                        description: movie.overview,
                        rating: movie.vote_average,
                    }
                }))
            })
    }

    useEffect(() => {
        fetchMoviesData();
    }, [activeGenres, searchText, sortBy]);

    const modalDialogContentConfiguration = (params: any) => {
        if (params.title === "ADD MOVIE") {
            return <EditMovieDetails
                action={addMovie}
            />
        }

        if (params.title === "EDIT MOVIE") {
            return <EditMovieDetails
                movie={params.movie}
                action={editMovie}
            />
        }

        if (params.title === "DELETE MOVIE") {
            return <DeleteMovie
                movie={params.movie}
                action={deleteMovie}
            />
        }

        return <h3 style={{ padding: '30px' }}>Something went wrong...</h3>
    }

    const changeActiveGenresCallback = (activeGenres: string[]) => {
        setActiveGenres(activeGenres);
    }

    const updateMovieDetails = (movie?: MovieData) => {
        if (movie) setMovieDetails(movie);
        else setMovieDetails(null as any)
    }

    const addMovie = (movie: MovieData) => {
        setMovies([...movies, movie]);
        setModalDialogParams(null)
    }

    const editMovie = (movie: MovieData) => {
        movies.splice(
            movies.findIndex(oldMovie => oldMovie.id === movie.id),
            1,
            movie
        )
        setMovies([...movies]);
        setModalDialogParams(null)
    }

    const deleteMovie = (movie: MovieData) => {
        movies.splice(
            movies.findIndex(oldMovie => oldMovie.id === movie.id),
            1
        )
        setMovies([...movies]);
        setModalDialogParams(null)
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
                        searchCallback={(searchText: string) => setSearchText(searchText)}
                        setEditMovieDetails={() => setModalDialogParams({ title: 'ADD MOVIE', action: addMovie })}
                    />
                }
            </div>

            <div className="App-content">
                <MoviesList
                    movies={movies}
                    genres={genres}
                    activeGenres={activeGenres}
                    edit={(movie: MovieData) => setModalDialogParams({ title: 'EDIT MOVIE', movie: movie, action: editMovie })}
                    delete={(movie: MovieData) => setModalDialogParams({ title: 'DELETE MOVIE', movie: movie, action: deleteMovie })}
                    setActiveGenres={changeActiveGenresCallback}
                    setMovieDetails={updateMovieDetails}
                    setSortBy={setSortBy}
                />
            </div >
        </div>
        {
            modalDialogParams &&
            <Portal>
                <ModalDialog
                    title={modalDialogParams.title}
                    close={() => setModalDialogParams(null)}
                >
                    {modalDialogContentConfiguration(modalDialogParams)}
                </ModalDialog>
            </Portal>
        }
    </>
    );
}

