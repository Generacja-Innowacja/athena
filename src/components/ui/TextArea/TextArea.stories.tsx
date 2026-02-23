import type { Meta, StoryObj } from "@storybook/react";
import { Textarea, type TextAreaProps } from "./TextArea";
import { useArgs } from "storybook/internal/preview-api";


const meta = {
  title: "TextArea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "hover", "focus", "disabled", "error"],
      value: { control: "text" }
    },
  },
  tags: ["autodocs"],
  args: {
    variant: "default",
    placeholder: "Placeholder",
    characterLimit: 500,
    characterLimitVisibility: true,
    label: "Label",
    isRequired: false,
    isError: false,
    errorText: "Error Text"

  },
  render: (initialArgs) => {
    const [{ value = "" }, updateArgs] = useArgs<TextAreaProps>();

    function handleChange(nextValue: string) {
      updateArgs({ value: nextValue });

      if (typeof initialArgs.onChange === "function") {
        initialArgs.onChange(nextValue);
      }
    }

    return (
      <Textarea
        {...initialArgs}
        value={value}
        onChange={handleChange}
      />
    );
  },

} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};
export const hover: Story = {
  args: {
    variant: "hover",
  },
};
export const focus: Story = {
  args: {
    variant: "focus",
  },
};
export const disabled: Story = {
  args: {
    variant: "disabled",
  },
};
export const error: Story = {
  args: {
    variant: "error",
  },
};
