import type { Meta, StoryObj } from "@storybook/react-vite";
import { Star } from "lucide-react";
import { fn } from "storybook/test";

import { Badge } from "./Badge";

const meta = {
  title: "Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: "text" },
    type: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "outlined", "ghost"],
    },
    size: {
      control: "select",
      options: ["regular", "small", "big"],
    },
    LeftIcon: { control: false },
    isDismissible: { control: "boolean" },
    onDismiss: { action: "dismissed" },
    dataTestId: { control: "text" },
  },
  tags: ["autodocs"],
  args: {
    children: "Badge",
    onDismiss: fn(),
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "default",
    variant: "secondary",
    size: "regular",
  },
};

export const Types: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge type="default">Default</Badge>
      <Badge type="info">Info</Badge>
      <Badge type="success">Success</Badge>
      <Badge type="warning">Warning</Badge>
      <Badge type="error">Error</Badge>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge type="info" variant="primary">
        Primary
      </Badge>
      <Badge type="info" variant="secondary">
        Secondary
      </Badge>
      <Badge type="info" variant="outlined">
        Outlined
      </Badge>
      <Badge type="info" variant="ghost">
        Ghost
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge type="info" size="small">
        Small
      </Badge>
      <Badge type="info" size="regular">
        Regular
      </Badge>
      <Badge type="info" size="big">
        Big
      </Badge>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge type="info" LeftIcon={<Star />}>
        Custom icon
      </Badge>
      <Badge type="success" LeftIcon={<Star />}>
        Replaces default
      </Badge>
    </div>
  ),
};

export const Dismissible: Story = {
  args: {
    type: "info",
    isDismissible: true,
    onDismiss: fn(),
  },
};

export const DismissibleAllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge type="default" isDismissible onDismiss={fn()}>
        Default
      </Badge>
      <Badge type="info" isDismissible onDismiss={fn()}>
        Info
      </Badge>
      <Badge type="success" isDismissible onDismiss={fn()}>
        Success
      </Badge>
      <Badge type="warning" isDismissible onDismiss={fn()}>
        Warning
      </Badge>
      <Badge type="error" isDismissible onDismiss={fn()}>
        Error
      </Badge>
    </div>
  ),
};

export const FullMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Types × Variants</h3>
        <div className="flex flex-wrap gap-2">
          {(["default", "info", "success", "warning", "error"] as const).map(
            (type) =>
              (["primary", "secondary", "outlined", "ghost"] as const).map(
                (variant) => (
                  <Badge
                    key={`${type}-${variant}`}
                    type={type}
                    variant={variant}
                  >
                    {type}-{variant}
                  </Badge>
                ),
              ),
          )}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Sizes</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge type="success" size="small">
            Small
          </Badge>
          <Badge type="success" size="regular">
            Regular
          </Badge>
          <Badge type="success" size="big">
            Big
          </Badge>
        </div>
      </div>
    </div>
  ),
};
