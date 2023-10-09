import React, { useEffect } from "react"
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { MoviesList } from "../movies-list/movies-list";
import { HeaderSearch } from "../header-search/header-search";
import { MovieDetails } from "../movie-details/movie-details";
import { Portal } from "../portal/portal";
import { EditMovieDetails } from "../edit-movie-details/edit-movie-details";
import { ModalDialog } from "../modal-dialog/modal-dialog";
import { DeleteMovie } from "../delete-movie/delete-movie";
import { constructUrl, filterSearchParams } from "../../utils";
import { request } from '../../requests';


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


export default function MovieListPage(props: any) {
    const navigate = useNavigate()

    const { movieId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [movies, setMovies] = useState<MovieData[]>([]);
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');
    const [activeGenres, setActiveGenres] = useState<string[]>(searchParams.get('genre')?.split(',') || []);
    const [searchText, setSearchText] = useState(searchParams.get('query') || '');
    const [modalDialogParams, setModalDialogParams] = useState<any>(null);
    const [movieDetails, setMovieDetails] = useState(null as any);


    const fetchMoviesData = async (signal: any) => {
        const movies: MovieData[] | null = await request.findMoviesByQuery(
            {
                sortBy: sortBy,
                sortOrder: 'asc',
                query: searchText,
                searchBy: 'title',
                filter: activeGenres.length === genres.length ? '' : activeGenres.join(','),
            },
            signal
        );

        if (movies) setMovies(movies);
    }

    const fetchMovieData = async (movieId: string, signal: AbortSignal) => {
        const movie: MovieData | null = await request.findMovieById(movieId, signal);
        if (movie) setMovieDetails(movie);
    }

    useEffect(() => {
        const abortController = new AbortController();

        if (movieId) fetchMovieData(movieId, abortController.signal);
        fetchMoviesData(abortController.signal);

        setSearchParams(
            filterSearchParams({
                query: searchText,
                genre: activeGenres.join(','),
                sortBy: sortBy,
            })
        );


        return () => abortController.abort();
    }, [activeGenres, searchText, sortBy, movieId]);

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
        setActiveGenres(activeGenres.length === genres.length ? [] : activeGenres);
    }

    const updateMovieDetails = (movie?: MovieData) => {
        navigate(`/${movie ? movie.id : ''}`);

        if (movie) setMovieDetails(movie);
        else setMovieDetails(null as any);
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
                    sortBy={sortBy}
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

