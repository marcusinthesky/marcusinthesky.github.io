import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Record, RecordAttribution, RecordLinks, RecordNote, RecordTitle } from "./record";

const meta = {
  title: "Patterns/Record",
  component: Record,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-4xl border-b border-border">{Story()}</div>],
} satisfies Meta<typeof Record>;

export default meta;
type Story = StoryObj<typeof meta>;

const meta2026 = (
  <>
    <span className="tabular-nums">2026</span>
    <span>Submitted / under review</span>
  </>
);

export const Default: Story = {
  args: {
    meta: meta2026,
    children: (
      <>
        <RecordTitle>Portfolio Risk Bounds without Cross-Asset Return Covariances</RecordTitle>
        <RecordAttribution>Marcus Gawronsky · Chun-Sung Huang</RecordAttribution>
        <RecordLinks>
          <a className="label-md" href="#record">
            arXiv
          </a>
        </RecordLinks>
      </>
    ),
  },
};

/** Two reading speeds: the scholarly record, then an interpretation that is clearly separate. */
export const WithNote: Story = {
  args: {
    meta: meta2026,
    children: (
      <>
        <RecordTitle>
          Wasserstein-Barycentric Interaction Fields for Spatial Factor Models
        </RecordTitle>
        <RecordAttribution>Marcus Gawronsky · Chun-Sung Huang</RecordAttribution>
        <RecordNote term="The question">
          Can distributional similarity define economically meaningful interaction fields?
        </RecordNote>
      </>
    ),
  },
};

/** Long titles wrap naturally; they are never shrunk to make records look tidy. */
export const LongTitle: Story = {
  args: {
    meta: meta2026,
    children: (
      <RecordTitle>
        Systematic Covariance Envelopes from Wasserstein Geometry: Evidence from Language-Model
        Representations, with a Deliberately Extended Subtitle for Wrapping
      </RecordTitle>
    ),
  },
};

export const WithoutMeta: Story = {
  args: { children: <RecordTitle>A record with an empty rail</RecordTitle> },
};

export const Focused: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getByRole("link")).toHaveFocus();
  },
};
