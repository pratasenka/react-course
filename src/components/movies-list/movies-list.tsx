import React from "react"
import { useState, useEffect } from "react"

import "./movies-list.css";
import { MovieData } from "../movie-list-page/movie-list-page";
import { SelectGenre } from "../select-genre/select-genre";
import { MovieItem } from "../movie-item/movie-item";


export function MoviesList(props: any): React.ReactElement {
    const [movies, setMovies] = useState([...props.movies]);

    useEffect(() => {
        setMovies([...props.movies])
    }, [props.movies])

    return <>
        <SelectGenre
            genres={props.genres}
            activeGenres={props.activeGenres}
            setActiveGenres={props.setActiveGenres}
            sortBy={props.sortBy}
            setSortBy={props.setSortBy}
        />
        <div className="movies-count">
            <span data-testid="moviesCountLabel"><b>{movies.length}</b> movies found</span>
        </div>
        <div className="container">
            {
                movies.map((movie: MovieData) => {
                    return <MovieItem
                        key={movie.id}
                        id={movie.id}
                        movie={movie}
                        edit={props.edit}
                        delete={props.delete}
                        setMovieDetails={props.setMovieDetails}
                    />
                })
            }
        </div>
    </>
}