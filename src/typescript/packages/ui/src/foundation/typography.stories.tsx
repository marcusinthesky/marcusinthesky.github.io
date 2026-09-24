import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundation/Typography",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Fraunces for the written hand; Inter for methods, controls, metadata and dense explanation. */
export const Scale: Story = {
  render: () => (
    <div className="max-w-4xl space-y-4">
      <p className="font-serif text-display-xl">Display extra large</p>
      <p className="font-serif text-display-lg">Display large</p>
      <p className="font-serif text-headline-lg">Headline large</p>
      <p className="font-serif text-headline-md">Headline medium</p>
      <p className="font-serif text-headline-sm">Headline small</p>
      <p className="metric-lg">1,024</p>
    </div>
  ),
};

/** Spaced capitals are for short identifiers only; anything people need to read uses caption. */
export const LabelsAndCaptions: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <p className="label-lg">01 / Label large</p>
      <p className="label-md">Label medium · 2026</p>
      <p className="label-sm">Label small · Submitted</p>
      <p className="caption text-muted-foreground">
        Caption: sentence-case annotation for specimen notes, label values, record notes and margin
        notes. Long enough to wrap, so its measure and leading can be judged.
      </p>
    </div>
  ),
};

export const Prose: Story = {
  render: () => (
    <div className="typeset max-w-2xl" data-chapter="lotus">
      <h2>A working page</h2>
      <p>
        Body copy in Inter at a readable measure, with{" "}
        <a href="#prose">a link whose underline carries the chapter colour</a> and{" "}
        <code>inline code</code>.
      </p>
      <blockquote>A quotation set off by a rule.</blockquote>
    </div>
  ),
};
