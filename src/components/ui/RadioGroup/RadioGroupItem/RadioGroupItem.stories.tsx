import type { Meta, StoryObj } from "@storybook/react-vite";

import { RadioGroup } from "../RadioGroup";
import { RadioGroupItem } from "./RadioGroupItem";

const meta = {
  title: "Radio Group Item",
  component: RadioGroupItem,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <RadioGroup defaultValue="item-1">
        <div className="flex items-center space-x-2">
          <Story />
          <label
            htmlFor="item-1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Item Text
          </label>
        </div>
      </RadioGroup>
    ),
  ],
} satisfies Meta<typeof RadioGroupItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "item-1",
    id: "item-1",
  },
};

export const Disabled: Story = {
  args: {
    value: "item-1",
    id: "item-1",
    disabled: true,
  },
};
