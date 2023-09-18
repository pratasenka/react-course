import React from "react"
import { useState } from "react"

import "./movies-list.css";
import { MovieData } from "../../App"
import { SelectGenre } from "../select-genre/select-genre";
import { MovieItem } from "../movie-item/movie-item";


export function MoviesList(props: any): React.ReactElement {
    const [movies, setMovies] = useState([...props.movies]);

    const sortOptions = ['Title', 'Release Date']

    const movieSorting = (option: string) => {
        switch (option) {
            case sortOptions[0]:
                setMovies([...movies.sort((a: MovieData, b: MovieData) => a.name.localeCompare(b.name))]);
                break;
            case sortOptions[1]:
                setMovies([...movies.sort((a: MovieData, b: MovieData) => a.releaseYear - b.releaseYear)]);
                break;
            default:
                setMovies([...props.movies]);
                break;
        }
    }

    return <>
        <SelectGenre
            genres={props.genres}
            activeGenres={props.activeGenres}
            setActiveGenres={props.setActiveGenres}
            sortOptions={sortOptions}
            sort={movieSorting}
        />
        <div className="movies-count">
            <span><b>{movies.length}</b> movies found</span>
        </div>
        <div className="container">
            {
                movies.map((movie: MovieData, index: number) => {
                    console.log(`${index} ${movie.name} ${movie.releaseYear}`)
                    return <MovieItem
                        key={`${index}${movie.name}${movie.releaseYear}`}
                        movie={movie}
                        setMovieDetails={props.setMovieDetails}
                    />
                })
            }
        </div>
    </>
}