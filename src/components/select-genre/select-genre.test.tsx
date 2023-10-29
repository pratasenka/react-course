import React from 'react';
import {
  render, fireEvent,
} from '@testing-library/react';

import { SelectGenre } from './select-genre';

describe('SelectGenre', () => {
  it('should render all genres passed in props', () => {
    const genres = ['DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

    const { getByText } = render(
      <SelectGenre
        genres={genres}
        activeGenres={[]}
      />,
    );

    genres.forEach((genre: string) => {
      expect(getByText(genre).textContent).toEqual(genre);
    });
  });

  it('should highlight a selected genre passed in props', () => {
    const genres = ['DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];
    const activeGenres = ['DOCUMENTARY', 'COMEDY', 'CRIME'];

    const { getByText } = render(
      <SelectGenre
        genres={genres}
        activeGenres={activeGenres}
      />,
    );

    genres.forEach((genre: string) => {
      expect(getByText(genre).className).toEqual(activeGenres.includes(genre) ? 'active' : '');
    });
  });

  it("should pass correct genre in 'onChange' callback arguments after a click event on genre button", () => {
    const genres = ['DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];
    let activeGenres = ['DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

    const setActiveGenres = (newActiveGenres: string[]) => {
      activeGenres = newActiveGenres;
    };

    const { getByText } = render(
      <SelectGenre
        genres={genres}
        activeGenres={activeGenres}
        setActiveGenres={setActiveGenres}
      />,
    );

    const newActiveGenre = genres[genres.length - 1];

    const lastGenre = getByText(newActiveGenre);
    fireEvent.click(lastGenre);

    expect(activeGenres).toEqual([newActiveGenre]);
  });
});
