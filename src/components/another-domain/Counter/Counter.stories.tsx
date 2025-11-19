import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import Counter from "./Counter";

const meta = {
  title: "another-domain/Counter",
  component: Counter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn(), children: <></> },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
