import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    checked: false,
    id: "item-1",
  },
};

export const Disabled: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    checked: true,
    disabled: true,
    id: "item-1",
  },
};
