import type { Meta, StoryObj } from "@storybook/react-vite";

import { InfoMessage } from "./InfoMessage";

const meta = {
  title: "InfoMessage",
  component: InfoMessage,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: "text" },
    variant: {
      control: "select",
      options: ["default", "info", "error", "warning", "success"],
    },
  },
  tags: ["autodocs"],
  args: { children: "Info Message" },
} satisfies Meta<typeof InfoMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
  },
};

export const success: Story = {
  args: {
    variant: "success",
  },
};
