import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { MoviesSorting } from './movies-sorting';

describe('MoviesSorting', () => {
  it("should pass correct option value in 'onClick' callback arguments after a selection value on movies sorting component", () => {
    let selectedOption = '';
    const { getByTestId } = render(
      <MoviesSorting
        sortBy="Title"
        setSortBy={(option: string) => {
          selectedOption = option;
        }}
      />,
    );

    const option = getByTestId('MoviesSortingSelectDropdown');
    fireEvent.change(option, { target: { value: 'release_date' } });

    expect(selectedOption).toEqual('release_date');
  });
});
