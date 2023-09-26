import React from "react"
import { useState } from "react"

import "./movie-item.css";


export function MovieItem(props: any): React.ReactElement {
    const capitalize = (word: string): string => {
        return word
            .toLowerCase()
            .replace(/\w/, firstLetter => firstLetter.toUpperCase());
    }

    return <div className="movie-item" onClick={() => props.setMovieDetails(props.movie)}>
        <img className="movie-item-image" src={props.movie.imageUrl} />
        <div className="movie-item-detail">
            <div className="movie-item-detail-row">
                <span className="movie-item-name">{props.movie.name}</span>
                <div className="movie-item-release-date-right">
                    <span className="movie-item-release-date">{props.movie.releaseYear}</span>
                </div>

            </div>
            <div className="movie-item-detail-row">
                <span className="movie-item-genre">
                    {props.movie.relevantGenres.map((genre: string) => capitalize(genre)).join(', ')}
                </span>
            </div>
        </div>
    </div>
}