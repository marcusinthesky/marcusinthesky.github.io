import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { actionClass } from "./action-class";
import { ButtonLink } from "./button-link";

const meta = {
  title: "Primitives/Action",
  component: ButtonLink,
  parameters: { layout: "padded" },
  args: { href: "#action", children: "Explore the research" },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: "secondary" } };

export const Text: Story = { args: { variant: "text", children: "See the systems" } };

export const WithArrow: Story = { args: { arrow: true, variant: "text", children: "All writing" } };

export const LongLabel: Story = {
  args: { children: "Read the complete replication record for the three connected papers" },
  decorators: [(Story) => <div className="max-w-xs">{Story()}</div>],
};

/** Keyboard focus shows the ring and draws the chapter thread along the bottom edge. */
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getByRole("link")).toHaveFocus();
  },
};

/**
 * The same recipe on a label: a CSS-only control such as a figure's Pause or
 * Replay, where a checkbox holds the state and no script runs.
 */
export const LabelControl: Story = {
  render: () => (
    <span>
      <input className="peer sr-only" id="action-toggle" type="checkbox" />
      <label className={actionClass("text")} htmlFor="action-toggle">
        Replay
      </label>
    </span>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Replay"));
    await expect(canvas.getByRole("checkbox", { name: "Replay" })).toBeChecked();
  },
};
