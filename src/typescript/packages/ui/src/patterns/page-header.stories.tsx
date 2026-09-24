import type { Meta, StoryObj } from "@storybook/react-vite";

import { Motif } from "../heritage/motif";
import { Rose } from "../heritage/parts/prain";
import { PageHeader } from "./page-header";

const meta = {
  title: "Patterns/Page header",
  component: PageHeader,
  parameters: { layout: "padded" },
  args: {
    eyebrow: "Writing",
    title: "Working notes on research, software, and evidence",
    description:
      "The machinery around the research: reproducibility, provenance and modelling choices.",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMotif: Story = { args: { motif: "rose" } };

export const WithFigure: Story = {
  args: {
    motif: "rose",
    figure: {
      name: "Rose",
      note: "Hulthemia. Rosa persica.",
      content: (
        <Motif className="mx-auto block w-4/5" detail="study" viewBox="0 0 256 256">
          <Rose />
        </Motif>
      ),
    },
  },
  decorators: [(Story) => <div data-chapter="rose">{Story()}</div>],
};
