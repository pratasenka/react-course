import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { MovieItem } from './movie-item';
import '../../index.css';

const meta: Meta<typeof MovieItem> = {
  component: MovieItem,
};

export default meta;
type Story = StoryObj<typeof MovieItem>;

const movie = {
  name: 'Oppenheimer',
  imageUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900',
  releaseYear: 2023,
  duration: '3h 10min',
  relevantGenres: ['DOCUMENTARY', 'HORROR'],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean turpis turpis, mollis ut cursus ac, ultricies sed odio. Duis eleifend elit quam, sed gravida odio pharetra in. Quisque quam est, condimentum nec turpis id, auctor vulputate dui. Vivamus tempus, arcu ultrices tempor congue, odio orci semper nulla, placerat facilisis odio urna id tellus.',
  rating: '8.8',
};

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', backgroundColor: '#232323', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    key: `${1}${movie.name}${movie.releaseYear}`,
    movie,
    setMovieDetails: () => { },
  },
};
