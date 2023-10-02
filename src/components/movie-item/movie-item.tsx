import React from "react"
import { useState } from "react"

import "./movie-item.css";


export function MovieItem(props: any): React.ReactElement {
    const capitalize = (word: string): string => {
        return word
            .toLowerCase()
            .replace(/\w/, firstLetter => firstLetter.toUpperCase());
    }

    return <>
        <div className="movie-item" onClick={() => props.setMovieDetails(props.movie)}>
            <div className="movie-item-image-container">
                <div className="dropdown dropdown-position">
                    <button className="dropbtn">x</button>
                    <div className="dropdown-content">
                        <a href="#"
                            onClick={(e) => {
                                e.stopPropagation()
                                props.edit(props.movie)
                            }}
                        >Edit</a>
                        <a href="#"
                            onClick={(e) => {
                                e.stopPropagation()
                                props.delete(props.movie)
                            }}
                        >Delete</a>
                    </div>
                </div>
                <img className="movie-item-image" src={props.movie.imageUrl} />
            </div>

            <div className="movie-item-detail">
                <div className="movie-item-detail-row">
                    <span id={'movie-item-name-'+props.movie.name} className="movie-item-name">{props.movie.name}</span>
                    <div className="movie-item-release-date-right">
                        <span className="movie-item-release-date">{props.movie.releaseYear.split('-')[0]}</span>
                    </div>

                </div>
                <div className="movie-item-detail-row">
                    <span className="movie-item-genre">
                        {props.movie.relevantGenres.map((genre: string) => capitalize(genre)).join(', ')}
                    </span>
                </div>
            </div>
        </div>
    </>
}