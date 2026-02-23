import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "lucide-react";
import * as React from "react";

import { TextInput } from "./TextInput";

const meta = {
  title: "TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helper: { control: "text" },
    errorText: { control: "text" },
    isError: { control: "boolean" },
    isRequired: { control: "boolean" },
    isDisabled: { control: "boolean" },
    prefix: { control: "text" },
    suffix: { control: "text" },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledTemplate(args: React.ComponentProps<typeof TextInput>) {
  const [value, setValue] = React.useState(args.value ?? "");

  return (
    <TextInput
      {...args}
      value={value}
      onChange={setValue}
      dataTestId={args.dataTestId ?? "text-input"}
    />
  );
}

export const Default: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    value: "",
    onChange: () => {},
    label: "Label",
    placeholder: "Enter text",
    helper: "Helper text goes here",
  },
};

export const WithPrefixAndSuffix: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    value: "",
    onChange: () => {},
    label: "Amount",
    placeholder: "0.00",
    prefix: "$",
    suffix: "USD",
    helper: "Enter the amount in USD",
  },
};

export const WithIcons: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    value: "",
    onChange: () => {},
    label: "Search",
    placeholder: "Search...",
    LeftIcon: <Search className="size-4" />,
    helper: "Type to search",
  },
};

export const Error: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    value: "",
    onChange: () => {},
    label: "Email",
    placeholder: "you@example.com",
    errorText: "This field is required",
    isError: true,
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    value: "",
    onChange: () => {},
    label: "Disabled field",
    placeholder: "Cannot edit",
    helper: "This field is disabled",
    isDisabled: true,
  },
};

export const Required: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    value: "",
    onChange: () => {},
    label: "Required field",
    placeholder: "Enter value",
    helper: "This field is required",
    isRequired: true,
  },
};
