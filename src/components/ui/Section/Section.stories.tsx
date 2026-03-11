import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../Button/Button";
import { Section } from "./Section";

const meta = {
  title: "Section",
  component: Section,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: { control: "text" },
    actions: { control: false },
    actionsPosition: {
      control: "inline-radio",
      options: ["right", "bottom"],
    },
    children: { control: "text" },
    dataTestId: { control: "text" },
  },
  args: {
    title: "Section title",
    children: "This is the content of the section.",
    actionsPosition: "right",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRightActions: Story = {
  args: {
    actions: (
      <>
        <Button size="sm" variant="outline">
          Secondary
        </Button>
        <Button size="sm">Primary</Button>
      </>
    ),
    actionsPosition: "right",
  },
};

export const WithBottomActions: Story = {
  args: {
    actions: (
      <>
        <Button size="sm" variant="outline">
          Secondary
        </Button>
        <Button size="sm">Primary</Button>
      </>
    ),
    actionsPosition: "bottom",
  },
};

export const WithCustomContent: Story = {
  args: {
    title: (
      <div className="flex flex-col">
        <span className="text-base font-semibold">Billing details</span>
        <span className="text-xs text-muted-foreground">
          Manage your billing and subscription.
        </span>
      </div>
    ),
    actions: (
      <Button size="sm" variant="outline">
        Edit
      </Button>
    ),
    children: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Current plan: Pro</li>
        <li>Next billing date: 15th of every month</li>
        <li>Payment method: Visa ending in 1234</li>
      </ul>
    ),
  },
};
