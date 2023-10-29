import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ModalDialog } from './modal-dialog';
import { EditMovieDetails } from '../edit-movie-details/edit-movie-details';
import { DeleteMovie } from '../delete-movie/delete-movie';
import '../../index.css';
import '../../App.css';

const meta: Meta<typeof ModalDialog> = {
  component: ModalDialog,
};

export default meta;
type Story = StoryObj<typeof ModalDialog>;

export const AddMovie: Story = {
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', backgroundColor: '#232323' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'ADD',
    children: <EditMovieDetails />,
    movie: {
      name: 'Oppenheimer',
      imageUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900',
      releaseYear: 2023,
      duration: '3h 10min',
      relevantGenres: ['DOCUMENTARY', 'HORROR'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean turpis turpis, mollis ut cursus ac, ultricies sed odio. Duis eleifend elit quam, sed gravida odio pharetra in. Quisque quam est, condimentum nec turpis id, auctor vulputate dui. Vivamus tempus, arcu ultrices tempor congue, odio orci semper nulla, placerat facilisis odio urna id tellus.',
      rating: '8.8',
    },
    backToSearch: () => { },
  },
};

export const Edit: Story = {
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', backgroundColor: '#232323' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'EDIT MOVIE',
    children: <EditMovieDetails />,
    backToSearch: () => { },
  },
};

export const Delete: Story = {
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', backgroundColor: '#232323' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'DELETE MOVIE',
    children: <DeleteMovie />,
    backToSearch: () => { },
  },
};
