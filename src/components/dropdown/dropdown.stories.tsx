import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Dropdown } from "./dropdown";
import "../../index.css";

const meta: Meta<typeof Dropdown> = {
    component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
    decorators: [
        (Story) => (
            <div style={{ marginLeft: "5vh" }}>
                <Story />
            </div>
        ),
    ],
    args: {
        options: ['1', '2', '3', '4', '5'],
        onClick: () => { },
    },
};
