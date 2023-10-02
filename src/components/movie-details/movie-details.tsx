import React from "react"
import { useState } from "react"

import "./movie-details.css";
import { Button } from "../button/button";


export function MovieDetails(props: any): React.ReactElement {

    const capitalize = (word: string): string => {
        return word
            .toLowerCase()
            .replace(/\w/, firstLetter => firstLetter.toUpperCase());
    }

    return <>

        <div className="wrapper movie-details">
            <div className="movie-details-company-name">
                <span><span className="movie-details-company-name-bold">netflix</span>roulette</span>
                <Button className="movie-details-search-movie-button" onClick={() => props.backToSearch()}>X</Button>
            </div>
            <div className="row">
                <div className="col span4">
                    <img className="movie-details-image" src={props.movie.imageUrl} />
                </div>
                <div className="col space"></div>
                <div className="col span5">
                    <div className="row">
                        <div className="col span0 movie-details-name">
                            <span id='movie-details-name'>{props.movie.name.toUpperCase()}</span>
                        </div>
                        <div className="col space"></div>
                        <div className="col movie-details-number-circle">
                            {props.movie.rating}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col span0 movie-details-genre">
                            <span>{props.movie.relevantGenres.map((genre: string) => capitalize(genre)).join(', ')}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col span0 movie-details-release">
                            <span>{props.movie.releaseYear}</span>
                        </div>
                        <div className="col space"></div>
                        <div className="col span0 movie-details-release">
                            <span>{props.movie.duration}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col span10 movie-details-description">
                            <span>{props.movie.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
}




{/* <div className="movie-details-container">
            <div className="movie-details-image-box">
                <img className="movie-details-image" src={props.movie.imageUrl} />
            </div>

            <div className="movie-details-name">
                <span>{props.movie.name.toUpperCase()}</span>
                <div className="movie-details-name-rating">
                    {props.movie.rating}
                </div>
            </div>
            <div className="movie-details-name">
                {props.movie.relevantGenres.map((genre: string) => capitalize(genre)).join(', ')}
            </div>

            <div className="movie-details-name">
                <span>{props.movie.releaseYear}</span>
            </div>

            <div className="movie-details-name">
                <span>{props.movie.description}</span>
            </div>

        </div> */}