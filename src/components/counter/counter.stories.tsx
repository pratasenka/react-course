import React from "react"
import type { Meta, StoryObj } from '@storybook/react';

import { Counter } from './counter';
import '../../index.css';

const meta: Meta<typeof Counter> = {
    component: Counter,
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {
    args: {
        initValue: 0,
    },
};