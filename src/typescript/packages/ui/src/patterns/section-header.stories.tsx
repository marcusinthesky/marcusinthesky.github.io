import type { Meta, StoryObj } from "@storybook/react-vite";

import { HeritageMark } from "../heritage/heritage-mark";
import { SectionHeader } from "./section-header";

const meta = {
  title: "Patterns/Section header",
  component: SectionHeader,
  parameters: { layout: "padded" },
  args: { eyebrow: "Selected work", index: 2, title: "Research, systems, and tools" },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description:
      "Each project pairs a research question with the computational machinery needed to test it.",
  },
};

/** A section's ornament sits in its label, not in a slot beside the work. */
export const WithMotif: Story = {
  args: { motif: <HeritageMark motif="shuttle" size="lg" /> },
};

export const TitleOnly: Story = { args: { eyebrow: undefined, index: undefined } };
