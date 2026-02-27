import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import Crown from "@/assets/icons/crown.svg";
import { Button } from "./Button";

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: "text" },

    isLoading: { control: "boolean" },

    leftIcon: { control: false },
    rightIcon: { control: false },

    variant: {
      control: "select",
      options: ["default", "danger", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    asChild: { control: "boolean" },
  },
  tags: ["autodocs"],
  args: { onClick: fn(), children: "Button" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const LeftIcon: Story = {
  args: {
    variant: "default",
    children: "Primary",
    leftIcon: <Crown />,
  },
};

export const RightIcon: Story = {
  args: {
    variant: "default",
    children: "Primary",
    rightIcon: <Crown />,
  },
};

export const Loading: Story = {
  args: {
    variant: "default",
    children: "Primary",
    isLoading: true,
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    children: "🚀",
  },
};
