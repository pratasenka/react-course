import React from 'react';

import './delete-movie.css';
import { Button } from '../button/button';

export function DeleteMovie(props: any): React.ReactElement {
  return (
    <div className="edit-movie-details">
      <div className="">
        <span>Are you sure you vant to delete this movie?</span>
      </div>
      <div className="event-movie-details-action-buttons">
        <Button
          className="event-movie-details-submit-button"
          onClick={() => props.action(props.movie)}
        >
          CONFIRM
        </Button>
      </div>
    </div>
  );
}
