import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <div className="w-[512px] h-[512px]">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isOpen: { control: "boolean" },

    title: { control: "text" },
    description: { control: "text" },
    children: { control: "text" },

    actions: {
      control: "boolean",
    },

    actionVariant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Are you sure absolutely sure?",
    description:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    children: "Are you sure you want to delete this item?",

    actions: true,
    actionVariant: "default",
  },

  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs();

    return (
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => updateArgs({ isOpen: false })}
      />
    );
  },
};