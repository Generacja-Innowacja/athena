import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./TextArea";

const meta: Meta<typeof Textarea> = {
  title: "TextArea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    placeholder: "Type your message here.",
  },
  argTypes: {},
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Hello world",
  },
};

export const LongText: Story = {
  args: {
    defaultValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};
