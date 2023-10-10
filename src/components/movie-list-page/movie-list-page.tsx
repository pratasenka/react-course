import React, { useEffect } from "react"
import { useState } from "react";
import { useNavigate, useParams, useSearchParams, createSearchParams } from "react-router-dom";

import { MoviesList } from "../movies-list/movies-list";
import { HeaderSearch } from "../header-search/header-search";
import { MovieDetails } from "../movie-details/movie-details";
import { Portal } from "../portal/portal";
import { EditMovieDetails } from "../edit-movie-details/edit-movie-details";
import { ModalDialog } from "../modal-dialog/modal-dialog";
import { DeleteMovie } from "../delete-movie/delete-movie";
import { filterSearchParams } from "../../utils";
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

const genres = ['documentary', 'comedy', 'horror', 'crime'];


export default function MovieListPage(props: any) {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [movies, setMovies] = useState<MovieData[]>([]);
    const [movieDetails, setMovieDetails] = useState(null as any);
    const [modalDialogParams, setModalDialogParams] = useState<any>(null);


    const fetchMoviesData = async (signal: any) => {
        const movies: MovieData[] | null = await request.findMoviesByQuery(
            {
                sortBy: searchParams.get('sortBy') || '',
                sortOrder: 'asc',
                search: searchParams.get('query') || '',
                searchBy: 'title',
                filter: searchParams.get('genre') || '',
            },
            signal
        );

        if (movies) setMovies(movies);
    }

    const fetchMovieData = async (movieId: string, signal: AbortSignal) => {
        const movie: MovieData | null = await request.findMovieById(movieId, signal);
        if (movie) setMovieDetails(movie);
    }

    const updateSearchParameters = (key: string) => {
        return (value: string | string[]) => {
            setSearchParams(
                createSearchParams({
                    ...Object.fromEntries([...searchParams]),
                    [key]: value instanceof Array ? value.join(',') : value,
                })
            );
        }
    }

    useEffect(() => {
        const abortController = new AbortController();

        if (movieId) fetchMovieData(movieId, abortController.signal);
        fetchMoviesData(abortController.signal);

        return () => abortController.abort();
    }, [searchParams, movieId]);



    const updateMovieDetails = (movie?: MovieData) => {
        navigate({
            pathname: `/${movie ? movie.id : ''}`,
            search: `?${createSearchParams({
                ...Object.fromEntries([...searchParams])
            })}`
        });

        if (movie) setMovieDetails(movie);
        else setMovieDetails(null as any);
    }

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
                        searchText={searchParams.get('query')}
                        searchCallback={(searchText: string) => updateSearchParameters('query')(searchText)}
                        setEditMovieDetails={() => setModalDialogParams({ title: 'ADD MOVIE', action: addMovie })}
                    />
                }
            </div>

            <div className="App-content">
                <MoviesList
                    movies={movies}
                    genres={genres}
                    activeGenres={searchParams.get('genre')?.split(',') || []}
                    edit={(movie: MovieData) => setModalDialogParams({ title: 'EDIT MOVIE', movie: movie, action: editMovie })}
                    delete={(movie: MovieData) => setModalDialogParams({ title: 'DELETE MOVIE', movie: movie, action: deleteMovie })}
                    setActiveGenres={(activeGenres: string[]) => updateSearchParameters('genre')(activeGenres.length === genres.length ? [] : activeGenres)}
                    setMovieDetails={updateMovieDetails}
                    sortBy={searchParams.get('sortBy') || ''}
                    setSortBy={(sortBy: string) => updateSearchParameters('sortBy')(sortBy)}
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

