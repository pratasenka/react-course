import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { DeleteMovie } from './delete-movie';
import { MovieData } from '../../types';

describe(DeleteMovie, () => {
  const movie = {
    name: 'Oppenheimer',
    imageUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900',
    releaseYear: 2023,
    duration: '3h 10min',
    relevantGenres: ['DOCUMENTARY', 'HORROR'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean turpis turpis, mollis ut cursus ac, ultricies sed odio. Duis eleifend elit quam, sed gravida odio pharetra in. Quisque quam est, condimentum nec turpis id, auctor vulputate dui. Vivamus tempus, arcu ultrices tempor congue, odio orci semper nulla, placerat facilisis odio urna id tellus.',
    rating: '8.8',
  };

  it("should pass correct movie data in 'action' callback arguments after a click CONFIRM button", () => {
    let clickResult = null;
    const { getByText } = render(
      <DeleteMovie
        movie={movie}
        action={(movieInfo: MovieData) => clickResult = movieInfo}
      />,
    );

    const movieTitle = getByText('CONFIRM');
    fireEvent.click(movieTitle);

    expect(JSON.stringify(clickResult)).toEqual(JSON.stringify(movie));
  });
});
