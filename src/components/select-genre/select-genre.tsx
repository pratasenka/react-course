/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';

import { MoviesSorting } from '../movies-sorting/movies-sorting';
import './select-genre.css';

export function SelectGenre(props: any): React.ReactElement {
  const [active, setActive] = useState(props.activeGenres);

  const updateActive = (newActiveGenre: string) => {
    if (newActiveGenre === 'All') {
      setActive(props.genres);
      props.setActiveGenres(props.genres);
      return;
    }

    if (active.includes(newActiveGenre) && props.genres.length === active.length) {
      // active.splice(active.indexOf(newActiveGenre), 1);
      setActive([newActiveGenre]);
      props.setActiveGenres([newActiveGenre]);
      return;
    }

    if (!active.includes(newActiveGenre)) {
      setActive([...active, newActiveGenre]);
      props.setActiveGenres([...active, newActiveGenre]);
    } else {
      active.splice(active.indexOf(newActiveGenre), 1);
      setActive([...active]);
      props.setActiveGenres([...active]);
    }
  };

  return (
    <div className="selectGenre">
      {
            [
              <a
                key="All"
                id="All"
                className={(props.genres.length === active.length || active.length === 0) ? 'active' : ''}
                onClick={() => updateActive('All')}
              >
                ALL
              </a>,
              ...props.genres?.map((genre: string) => (
                <a
                  key={genre}
                  id={`${genre}-genre-item`}
                  className={active.includes(genre) && props.genres.length !== active.length ? 'active' : ''}
                  onClick={() => updateActive(genre)}
                >
                  {genre.toUpperCase()}
                </a>
              )),
            ]
        }
      <span />
      <MoviesSorting
        sortBy={props.sortBy}
        setSortBy={props.setSortBy}
      />
    </div>
  );
}
