import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";
import { TextArea, type TextAreaProps } from "./TextArea";

const meta = {
  title: "TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    helper: {
      control: "text",
    },
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Placeholder",
    helper: "Helper text",
    value: "Test text",
    characterLimit: 500,
    characterLimitVisibility: true,
    label: "Label",
    isRequired: false,
    isError: false,
    disabled: false,
    errorText: "Error Text",
  },
  render: (initialArgs) => {
    const [{ value = "" }, updateArgs] = useArgs<TextAreaProps>();

    function handleChange(nextValue: string) {
      updateArgs({ value: nextValue });

      if (typeof initialArgs.onChange === "function") {
        initialArgs.onChange(nextValue);
      }
    }

    return <TextArea {...initialArgs} value={value} onChange={handleChange} />;
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {},
};
export const disabled: Story = {
  args: {
    disabled: true,
  },
};
export const error: Story = {
  args: {
    isError: true,
  },
};
