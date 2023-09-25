import React from "react"
import type { Meta, StoryObj } from '@storybook/react';

import { EditMovieDetails } from './edit-movie-details';
import '../../index.css';
import '../../App.css'

const meta: Meta<typeof EditMovieDetails> = {
    component: EditMovieDetails,
};

export default meta;
type Story = StoryObj<typeof EditMovieDetails>;


export const Default: Story = {
    decorators: [
        (Story) => (
            <div style={{ margin: '3em', backgroundColor: '#232323' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        movie: {
            name: `Oppenheimer`,
            imageUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900',
            releaseYear: 2023,
            duration: '3h 10min',
            relevantGenres: ['DOCUMENTARY', 'HORROR'],
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean turpis turpis, mollis ut cursus ac, ultricies sed odio. Duis eleifend elit quam, sed gravida odio pharetra in. Quisque quam est, condimentum nec turpis id, auctor vulputate dui. Vivamus tempus, arcu ultrices tempor congue, odio orci semper nulla, placerat facilisis odio urna id tellus.`,
            rating: '8.8',
        },
        backToSearch: () => { },
    },
};