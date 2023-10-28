import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { MoviesSorting } from './movies-sorting';
import '../../index.css';

const meta: Meta<typeof MoviesSorting> = {
  component: MoviesSorting,
};

export default meta;
type Story = StoryObj<typeof MoviesSorting>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ marginLeft: '5vh' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    options: ['1', '2', '3', '4', '5'],
    onClick: () => { },
  },
};
