import React from "react"
import { useState } from "react"

import "./movies-list.css";
import { MovieData } from "../../App"
import { SelectGenre } from "../select-genre/select-genre";
import { MovieItem } from "../movie-item/movie-item";


export function MoviesList(props: any): React.ReactElement {
    const [movies, setMovies] = useState([...props.movies]);

    const sortOptions = [
        { sortName: 'Title', strategy: (a: MovieData, b: MovieData) => a.name.localeCompare(b.name) },
        { sortName: 'Release Date', strategy: (a: MovieData, b: MovieData) => a.releaseYear - b.releaseYear }
    ]

    const movieSorting = (option: string) => {
        const sortOption = sortOptions.find(sortOption => sortOption.sortName === option);

        if (sortOption) setMovies([...movies.sort(sortOption.strategy)]);
        else setMovies([...props.movies]);
    }

    return <>
        <SelectGenre
            genres={props.genres}
            activeGenres={props.activeGenres}
            setActiveGenres={props.setActiveGenres}
            sortOptions={sortOptions.map(sortOption => sortOption.sortName)}
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