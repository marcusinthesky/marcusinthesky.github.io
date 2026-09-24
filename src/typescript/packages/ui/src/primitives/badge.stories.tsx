import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./badge";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  parameters: { layout: "padded" },
  args: { children: "Optimal transport" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Group: Story = {
  render: () => (
    <div className="flex max-w-md flex-wrap gap-2">
      {["Python", "Lean 4", "LaTeX", "Next.js", "Nix", "DVC", "Representation learning"].map(
        (label) => (
          <Badge key={label}>{label}</Badge>
        ),
      )}
    </div>
  ),
};
