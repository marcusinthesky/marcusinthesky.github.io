import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  ArchivalSeal,
  DotField,
  FloraDivider,
  MotifRule,
  PalmCorner,
  ShuttleDivider,
  TableMountainLine,
} from "./ornaments";

const meta = {
  title: "Heritage/Ornaments",
  component: MotifRule,
  parameters: { layout: "padded" },
} satisfies Meta<typeof MotifRule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rules: Story = {
  render: () => (
    <div className="max-w-3xl space-y-10">
      <MotifRule />
      <MotifRule motif="rose" size="md" />
      <MotifRule motif="anchor" motion="none" />
    </div>
  ),
};

export const Dividers: Story = {
  render: () => (
    <div className="max-w-3xl space-y-10">
      <ShuttleDivider />
      <FloraDivider />
      <DotField />
      <DotField columns={24} rows={2} tone="ink" />
    </div>
  ),
};

export const Corners: Story = {
  render: () => (
    <div className="flex gap-6">
      <PalmCorner className="size-40" />
      <PalmCorner className="size-40" side="right" />
    </div>
  ),
};

export const Seal: Story = {
  render: () => <ArchivalSeal className="size-40" />,
};

export const Mountain: Story = {
  render: () => <TableMountainLine className="max-w-xl" />,
};
