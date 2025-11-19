import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import Button from "./Button";

const meta = {
  title: "shared/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: "text" },
  },
  tags: ["autodocs"],
  args: { onClick: fn(), children: "button text" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
