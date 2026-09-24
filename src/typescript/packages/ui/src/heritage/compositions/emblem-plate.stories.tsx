import type { Meta, StoryObj } from "@storybook/react-vite";

import { EmblemPlate } from "./emblem-plate";

const meta = {
  title: "Compositions/Emblem plate",
  component: EmblemPlate,
  parameters: { layout: "padded" },
  args: { motif: "lotus", name: "Lotus", note: "Nelumbo nucifera." },
  decorators: [(Story) => <div className="max-w-56">{Story()}</div>],
} satisfies Meta<typeof EmblemPlate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lotus: Story = {};

export const Rose: Story = {
  args: { motif: "rose", name: "Rose", note: "Hulthemia. Rosa persica." },
};

export const Palm: Story = {
  args: { motif: "palm", name: "Palm fronds", note: "Phoenix dactylifera" },
};

/** A wide field for the shuttle's long silhouette. */
export const Wide: Story = {
  args: { motif: "shuttle", name: "Shuttle", note: "A weaver's shuttle" },
};

export const WithoutNote: Story = { args: { motif: "rook", name: "Rook", note: undefined } };
