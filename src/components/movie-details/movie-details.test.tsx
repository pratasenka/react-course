import React from 'react';
import { render } from '@testing-library/react';

import { MovieDetails } from './movie-details';

describe(MovieDetails, () => {
  const movie = {
    name: 'Oppenheimer',
    imageUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900',
    releaseYear: 2023,
    duration: '3h 10min',
    relevantGenres: ['DOCUMENTARY', 'HORROR'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean turpis turpis, mollis ut cursus ac, ultricies sed odio. Duis eleifend elit quam, sed gravida odio pharetra in. Quisque quam est, condimentum nec turpis id, auctor vulputate dui. Vivamus tempus, arcu ultrices tempor congue, odio orci semper nulla, placerat facilisis odio urna id tellus.',
    rating: '8.8',
  };

  const capitalize = (word: string): string => word
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());

  it('should display correct movie information', () => {
    const { container } = render(
      <MovieDetails
        movie={movie}
      />,
    );

    expect(container.getElementsByClassName('movie-details-image').length).toEqual(1);

    expect(container.getElementsByClassName('movie-details-name').length).toEqual(1);
    expect(container.getElementsByClassName('movie-details-name')[0].textContent).toEqual(movie.name.toUpperCase());

    expect(container.getElementsByClassName('movie-details-number-circle').length).toEqual(1);
    expect(container.getElementsByClassName('movie-details-number-circle')[0].textContent).toEqual(movie.rating);

    expect(container.getElementsByClassName('movie-details-genre').length).toEqual(1);
    expect(container.getElementsByClassName('movie-details-genre')[0].textContent).toEqual(movie.relevantGenres.map((genre: string) => capitalize(genre)).join(', '));

    expect(container.getElementsByClassName('movie-details-description').length).toEqual(1);
    expect(container.getElementsByClassName('movie-details-description')[0].textContent).toEqual(movie.description);
  });
});
