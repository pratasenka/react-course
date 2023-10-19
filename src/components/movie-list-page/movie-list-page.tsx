import React, { useEffect } from "react"
import { useState } from "react";
import { useNavigate, useParams, useSearchParams, createSearchParams, Outlet, useLocation } from "react-router-dom";

import { MoviesList } from "../movies-list/movies-list";
import { HeaderSearch } from "../header-search/header-search";
import { MovieDetails } from "../movie-details/movie-details";
import { request } from '../../requests';
import { apiRequest } from "../../api-requests";


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


export default function MovieListPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { movieId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [movies, setMovies] = useState<MovieData[]>([]);
    const [movieDetails, setMovieDetails] = useState(null as any);


    const fetchMoviesData = async (signal: any) => {
        const movies: MovieData[] | null = await apiRequest.findMoviesByQuery(
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
        const movie: MovieData | null = await apiRequest.findMovieById(movieId, signal);
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

    useEffect(() => {
        const abortController = new AbortController();

        if (movieId) fetchMovieData(movieId, abortController.signal);
        fetchMoviesData(abortController.signal);

        return () => abortController.abort();
    }, [searchParams, movieId, location.pathname]);

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
                    />
                }
            </div>

            <div className="App-content">
                <MoviesList
                    movies={movies}
                    genres={genres}
                    activeGenres={searchParams.get('genre')?.split(',') || []}
                    edit={(movieId: string) => navigate(`${movieId}/edit`)}
                    setActiveGenres={(activeGenres: string[]) => updateSearchParameters('genre')(activeGenres.length === genres.length ? [] : activeGenres)}
                    setMovieDetails={updateMovieDetails}
                    sortBy={searchParams.get('sortBy') || ''}
                    setSortBy={(sortBy: string) => updateSearchParameters('sortBy')(sortBy)}
                />
            </div >
        </div>
        <Outlet />
    </>
    );
}

