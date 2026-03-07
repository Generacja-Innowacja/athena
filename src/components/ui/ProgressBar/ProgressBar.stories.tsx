import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: "number",
      min: 0,
      max: 100,
      step: 1,
    },
    size: {
      control: "select",
      options: ["small", "regular"],
    },
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
    },
    dataTestId: { control: "text" },
  },
  tags: ["autodocs"],
  args: { value: 50 },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Zero: Story = {
  args: {
    value: 0,
  },
};

export const Quarter: Story = {
  args: {
    value: 25,
  },
};

export const Half: Story = {
  args: {
    value: 50,
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const ClampedBelowZero: Story = {
  args: {
    value: -10,
  },
};

export const ClampedAboveHundred: Story = {
  args: {
    value: 150,
  },
};

export const Small: Story = {
  args: {
    value: 60,
    size: "small",
  },
};

export const Regular: Story = {
  args: {
    value: 60,
    size: "regular",
  },
};

export const InfoVariant: Story = {
  args: {
    value: 65,
    variant: "info",
  },
};

export const SuccessVariant: Story = {
  args: {
    value: 80,
    variant: "success",
  },
};

export const WarningVariant: Story = {
  args: {
    value: 45,
    variant: "warning",
  },
};

export const ErrorVariant: Story = {
  args: {
    value: 30,
    variant: "error",
  },
};

export const WithDataTestId: Story = {
  args: {
    value: 55,
    dataTestId: "progress-bar-test",
  },
};

export const WithCustomClass: Story = {
  args: {
    value: 70,
    className: "max-w-sm",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div className="space-y-2">
        <p className="text-sm font-medium">Default</p>
        <ProgressBar value={75} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Info</p>
        <ProgressBar value={75} variant="info" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Success</p>
        <ProgressBar value={75} variant="success" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Warning</p>
        <ProgressBar value={75} variant="warning" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Error</p>
        <ProgressBar value={75} variant="error" />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div className="space-y-2">
        <p className="text-sm font-medium">Small</p>
        <ProgressBar value={60} size="small" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Regular</p>
        <ProgressBar value={60} size="regular" />
      </div>
    </div>
  ),
};
