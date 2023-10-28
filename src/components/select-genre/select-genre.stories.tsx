import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SelectGenre } from './select-genre';
import '../../index.css';

const meta: Meta<typeof SelectGenre> = {
  component: SelectGenre,
};

export default meta;
type Story = StoryObj<typeof SelectGenre>;

const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];
const activeGenres = [genres[0]];

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', backgroundColor: '#232323' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    genres,
    activeGenres,
    setActiveGenres: (newActive: string[]) => console.log(newActive),
  },
};
