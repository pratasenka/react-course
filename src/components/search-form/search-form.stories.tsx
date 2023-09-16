import React from "react"
import type { Meta, StoryObj } from '@storybook/react';

import { SearchForm } from './search-form';
import '../../index.css';

const meta: Meta<typeof SearchForm> = {
    component: SearchForm,
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {
    decorators: [
        (Story) => (
            <div style={{ margin: '3em', backgroundColor: '#232323' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        searchText: 'Search Text Is Here',
        search: (value: string) => console.log(value)
    },
};