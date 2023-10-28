import React from 'react';

import './movies-sorting.css';
import { Dropdown, DropdownOption } from '../dropdown/dropdown';

export function MoviesSorting(props: any): React.ReactElement {
  const SORT_OPTIONS: DropdownOption[] = [
    {
      id: '1',
      name: 'Title',
      value: 'title',
    },
    {
      id: '2',
      name: 'Release Date',
      value: 'release_date',
    },
  ];

  return (
    <div className="movies-sorting ">
      <span>SORTBY</span>
      <Dropdown
        selected={props.sortBy}
        options={SORT_OPTIONS}
        onClick={props.setSortBy}
      />
    </div>
  );
}
