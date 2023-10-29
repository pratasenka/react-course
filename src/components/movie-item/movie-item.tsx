/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import './movie-item.css';

export function MovieItem(props: any): React.ReactElement {
  const capitalize = (word: string): string => word
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="movie-item" onClick={() => props.setMovieDetails(props.movie)}>
      <div className="movie-item-image-container">
        <div className="dropdown dropdown-position">
          <button className="dropbtn">x</button>
          <div className="dropdown-content">
            <button
              type="button"
              onClick={(e) => {
              e.stopPropagation();
              props.edit(props.movie.id);
            }}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={(e) => {
              e.stopPropagation();
              props.delete(props.movie.id);
            }}
            >
              Delete
            </button>
          </div>
        </div>
        <img
          className="movie-item-image"
          src={props.movie.imageUrl}
          alt={props.movie.name}
        />
      </div>

      <div className="movie-item-detail">
        <div className="movie-item-detail-row">
          <span className="movie-item-name">{props.movie.name}</span>
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
  );
}
