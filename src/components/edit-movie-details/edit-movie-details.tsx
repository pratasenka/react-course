import React, { useEffect } from "react"
import { useState } from "react"
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";

import "./edit-movie-details.css";
import { LabeledInput } from "../input/labeled-input";
import { Button } from "../button/button";
import { MovieData } from "../movie-list-page/movie-list-page";
import { request } from '../../requests';

const emptyMovieData: MovieData = {
    id: '',
    name: '',
    imageUrl: '',
    releaseYear: '',
    duration: '',
    relevantGenres: [],
    description: '',
    rating: '',
}

export function EditMovieDetails(): React.ReactElement {
    const navigate = useNavigate();
    const { movieId } = useParams();

    const [originalMovie, setOriginalMovie] = useState<MovieData>({ ...emptyMovieData });
    const [movie, setMovie] = useState<MovieData>({ ...emptyMovieData });


    const fetchMovieData = async (movieId: string, signal: AbortSignal) => {
        const movie: MovieData | null = await request.findMovieById(movieId, signal);
        if (movie) {
            setMovie({ ...movie });
            setOriginalMovie({ ...movie })
        }
    }

    const reset = () => {
        setMovie({ ...originalMovie });
    }

    const onUpdate = (update: { key: string, value: string }) => {
        setMovie({
            ...movie,
            [update.key]: update.value
        })
    }

    useEffect(() => {
        const abortController = new AbortController();

        if (movieId) fetchMovieData(movieId, abortController.signal);

        return () => abortController.abort();
    }, [movieId]);

    const triggerAction = async () => {
        const newMovie: MovieData | null = movieId ?
            await request.updateMovieById({ ...movie }) :
            await request.addMovie({ ...movie });

        if (newMovie) navigate(`/${newMovie.id}`,)
        console.log(newMovie);
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
                        value={movie?.name || ''}
                        onChange={(newValue: string) => onUpdate({ key: 'name', value: newValue })}
                        placeholder='Movie Name' />
                </div>
                <div className="event-movie-details-col-right">
                    <LabeledInput
                        label='RELEASE DATE'
                        movieDetailsElementId={'movie-details-release'}
                        labelClassName='edit-movie-details-label'
                        inputClassName='edit-movie-details-input'
                        value={movie?.releaseYear || ''}
                        onChange={(newValue: string) => onUpdate({ key: 'releaseYear', value: newValue })}
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
                        value={movie?.imageUrl || ''}
                        onChange={(newValue: string) => onUpdate({ key: 'imageUrl', value: newValue })}
                        placeholder='http://' />
                </div>
                <div className="event-movie-details-col-right">
                    <LabeledInput
                        label='RATING'
                        movieDetailsElementId={'movie-details-rating'}
                        labelClassName='edit-movie-details-label'
                        inputClassName='edit-movie-details-input'
                        value={movie?.rating || ''}
                        onChange={(newValue: string) => onUpdate({ key: 'rating', value: newValue })}
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
                        value={movie?.relevantGenres || ''}
                        onChange={(newValue: string) => onUpdate({ key: 'relevantGenres', value: newValue })}
                        placeholder='Select Genre' />
                </div>
                <div className="event-movie-details-col-right">
                    <LabeledInput
                        label='RUNTIME'
                        movieDetailsElementId={'movie-details-duration'}
                        labelClassName='edit-movie-details-label'
                        inputClassName='edit-movie-details-input'
                        value={movie?.duration || ''}
                        onChange={(newValue: string) => onUpdate({ key: 'duration', value: newValue })}
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
                        value={movie?.description || ''}
                        onChange={(newValue: string) => onUpdate({ key: 'description', value: newValue })}
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