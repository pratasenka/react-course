import React from "react"
import { useState } from "react"
import { nanoid } from "nanoid";

import "./edit-movie-details.css";
import { LabeledInput } from "../input/labeled-input";
import { Button } from "../button/button";
import { MovieData } from "../movie-list-page/movie-list-page";



export function EditMovieDetails(props: any): React.ReactElement {
    const [title, setTitle] = useState(props.movie?.name ?? '');
    const [release, setRelease] = useState(props.movie?.releaseYear ?? '');
    const [url, setUrl] = useState(props.movie?.imageUrl ?? '');
    const [rating, setRating] = useState(props.movie?.rating ?? '');
    const [genres, setGenres] = useState(props.movie?.relevantGenres ?? []);
    const [runtime, setRuntime] = useState(props.movie?.duration ?? '');
    const [description, setDescription] = useState(props.movie?.description ?? '');

    const reset = () => {
        setTitle(props.movie?.name ?? '');
        setRelease(props.movie?.releaseYear ?? '');
        setUrl(props.movie?.imageUrl ?? '');
        setRating(props.movie?.rating ?? '');
        setGenres(props.movie?.relevantGenres ?? []);
        setRuntime(props.movie?.duration ?? '');
        setDescription(props.movie?.description ?? '');
    }

    const triggerAction = () => {
        console.log(title)
        props.action({
            id: props.movie?.id || nanoid(),
            name: title,
            imageUrl: url,
            rating: rating,
            description: description,
            releaseYear: release,
            relevantGenres: genres,
            duration: runtime,
        } as MovieData)
    }

    return <>
        <div className="edit-movie-details">
            <div className="event-movie-details-row">
                <div className="event-movie-details-col-left">
                    <LabeledInput
                        label='TITLE'
                        movieDetailsElementId={'movie-details-title'}
                        labelClassName='edit-movie-details-label'
                        inputClassName='edit-movie-details-input'
                        value={title}
                        onChange={setTitle}
                        placeholder='Movie Name' />
                </div>
                <div className="event-movie-details-col-right">
                    <LabeledInput
                        label='RELEASE DATE'
                        movieDetailsElementId={'movie-details-release'}
                        labelClassName='edit-movie-details-label'
                        inputClassName='edit-movie-details-input'
                        value={release}
                        onChange={setRelease}
                        placeholder='Select Date' />
                </div>
            </div>

            <div className="event-movie-details-row">
                <div className="event-movie-details-col-left">
                    <LabeledInput
                        label='MOVIE URL'
                        movieDetailsElementId={'movie-details-url'}
                        labelClassName='edit-movie-details-label'
                        inputClassName='edit-movie-details-input'
                        value={url}
                        onChange={setUrl}
                        placeholder='http://' />
                </div>
                <div className="event-movie-details-col-right">
                    <LabeledInput
                        label='RATING'
                        movieDetailsElementId={'movie-details-rating'}
                        labelClassName='edit-movie-details-label'
                        inputClassName='edit-movie-details-input'
                        value={rating}
                        onChange={setRating}
                        placeholder='7.8' />
                </div>
            </div>

            <div className="event-movie-details-row">
                <div className="event-movie-details-col-left">
                    <LabeledInput
                        label='GENRE'
                        movieDetailsElementId={'movie-details-genre'}
                        labelClassName='edit-movie-details-label'
                        inputClassName='edit-movie-details-input'
                        value={genres.join(',')}
                        onChange={setGenres}
                        placeholder='Select Genre' />
                </div>
                <div className="event-movie-details-col-right">
                    <LabeledInput
                        label='RUNTIME'
                        movieDetailsElementId={'movie-details-duration'}
                        labelClassName='edit-movie-details-label'
                        inputClassName='edit-movie-details-input'
                        value={runtime}
                        onChange={setRuntime}
                        placeholder='minutes' />
                </div>
            </div>

            <div className="event-movie-details-row">
                <div className="event-movie-details-col-full">
                    <LabeledInput
                        label='OVERVIEW'
                        movieDetailsElementId={'movie-details-genre'}
                        labelClassName='edit-movie-details-label'
                        inputClassName='edit-movie-details-input'
                        value={description}
                        onChange={setDescription}
                        placeholder='Movie Description' />
                </div>
            </div>

            <div className="event-movie-details-action-buttons">
                <Button
                    className='event-movie-details-reset-button'
                    onClick={() => reset()}
                >
                    RESET
                </Button>
                <Button
                    className='event-movie-details-submit-button'
                    onClick={() => triggerAction()}
                >
                    SUBMIT
                </Button>
            </div>
        </div>
    </>
}