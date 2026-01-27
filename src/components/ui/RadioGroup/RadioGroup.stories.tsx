import type { Meta, StoryObj } from "@storybook/react-vite";

import { RadioGroup } from "./RadioGroup";
import { RadioGroupItem } from "./RadioGroupItem/RadioGroupItem";

const meta = {
  title: "Radio Group",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    name: { control: "text" },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical", undefined],
      description: "The orientation of the radio group",
      defaultValue: undefined,
    },
    dir: {
      control: "radio",
      options: ["ltr", "rtl"],
      description: "The reading direction of the radio group",
    },
    loop: {
      control: "boolean",
      description:
        "When true, keyboard navigation will loop from last to first, and vice versa.",
      default: true,
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "item-1",
    orientation: "vertical",
  },

  render: (args) => (
    <RadioGroup defaultValue="option-one" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <label
          htmlFor="option-one"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Option One
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <label
          htmlFor="option-two"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Option Two
        </label>
      </div>
    </RadioGroup>
  ),
};
