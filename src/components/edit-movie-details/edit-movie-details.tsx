import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './edit-movie-details.css';
import { LabeledInput } from '../input/labeled-input';
import { Button } from '../button/button';
import { getEmptyMovieData } from '../../utils';
import { apiRequest } from '../../api-requests';
import { MovieData } from '../../types';

export function EditMovieDetails(): React.ReactElement {
  const [defaultMovie, setDefaultMovie] = useState<MovieData>(getEmptyMovieData());
  const {
    register, handleSubmit, formState, reset,
  } = useForm<MovieData>({
    defaultValues: defaultMovie,
  });

  const navigate = useNavigate();
  const { movieId } = useParams();

  const fetchMovieData = async (id: string, signal: AbortSignal) => {
    const movie: MovieData | null = await apiRequest.findMovieById(id, signal);
    if (movie) {
      reset({ ...movie });
      setDefaultMovie({ ...movie });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (movieId) fetchMovieData(movieId, abortController.signal);

    return () => abortController.abort();
  }, [movieId]);

  const onReset = async () => {
    reset(defaultMovie);
  };

  const onSubmit = async (movie: MovieData) => {
    const newMovie: MovieData | null = movieId
      ? await apiRequest.updateMovieById({ ...movie })
      : await apiRequest.addMovie({ ...movie });

    if (newMovie) navigate(`/${newMovie.id}`);
  };

  return (
    <div className="edit-movie-details">
      <form id="edit-movie-details" onSubmit={handleSubmit(onSubmit)}>
        <div className="event-movie-details-row">
          <div className="event-movie-details-col-left">
            <LabeledInput
              inputSettings={{
                field: 'name',
                register,
                error: formState.errors,
                options: {
                  required: true,
                },
              }}
              label="TITLE"
              movieDetailsElementId="movie-details-title"
              labelClassName="edit-movie-details-label"
              inputClassName="edit-movie-details-input"
              placeholder="Movie Name"
            />
          </div>
          <div className="event-movie-details-col-right">
            <LabeledInput
              inputSettings={{
                field: 'releaseYear',
                register,
                error: formState.errors,
                options: {
                  required: true,
                  min: 1895,
                  max: new Date().getFullYear(),
                  pattern: /^[0-9\\-]+$/i,
                },
              }}
              label="RELEASE DATE"
              movieDetailsElementId="movie-details-release"
              labelClassName="edit-movie-details-label"
              inputClassName="edit-movie-details-input"
              placeholder="Select Date"
            />
          </div>
        </div>

        <div className="event-movie-details-row">
          <div className="event-movie-details-col-left">
            <LabeledInput
              inputSettings={{
                field: 'imageUrl',
                register,
                error: formState.errors,
                options: {
                  required: true,
                },
              }}
              label="MOVIE URL"
              movieDetailsElementId="movie-details-url"
              labelClassName="edit-movie-details-label"
              inputClassName="edit-movie-details-input"
              placeholder="http://"
            />
          </div>
          <div className="event-movie-details-col-right">
            <LabeledInput
              inputSettings={{
                field: 'rating',
                register,
                error: formState.errors,
                options: {
                  required: true,
                  min: 0,
                  max: 10,
                  pattern: /^[0-9\\.]+$/i,
                },
              }}
              label="RATING"
              movieDetailsElementId="movie-details-rating"
              labelClassName="edit-movie-details-label"
              inputClassName="edit-movie-details-input"
              placeholder="7.8"
            />
          </div>
        </div>

        <div className="event-movie-details-row">
          <div className="event-movie-details-col-left">
            <LabeledInput
              inputSettings={{
                field: 'relevantGenres',
                register,
                error: formState.errors,
                options: {
                  required: false,
                },
              }}
              label="GENRE"
              movieDetailsElementId="movie-details-genre"
              labelClassName="edit-movie-details-label"
              inputClassName="edit-movie-details-input"
              placeholder="Select Genre"
            />
          </div>
          <div className="event-movie-details-col-right">
            <LabeledInput
              inputSettings={{
                field: 'duration',
                register,
                error: formState.errors,
                options: {
                  required: true,
                  pattern: /^[0-9]+$/i,
                },
              }}
              label="RUNTIME"
              movieDetailsElementId="movie-details-duration"
              labelClassName="edit-movie-details-label"
              inputClassName="edit-movie-details-input"
              placeholder="minutes"
            />
          </div>
        </div>

        <div className="event-movie-details-row">
          <div className="event-movie-details-col-full">
            <LabeledInput
              inputSettings={{
                field: 'description',
                register,
                error: formState.errors,
                options: {
                  required: true,
                },
              }}
              label="OVERVIEW"
              movieDetailsElementId="movie-details-genre"
              labelClassName="edit-movie-details-label"
              inputClassName="edit-movie-details-input"
              placeholder="Movie Description"
            />
          </div>
        </div>

        <div className="event-movie-details-action-buttons">
          <Button
            className="event-movie-details-reset-button"
            onClick={(e: any) => {
              e.preventDefault();
              onReset();
            }}
          >
            RESET
          </Button>
          <Button
            className="event-movie-details-submit-button"
            form="edit-movie-details"
            type="submit"
          >
            SUBMIT
          </Button>
        </div>
      </form>
    </div>
  );
}
