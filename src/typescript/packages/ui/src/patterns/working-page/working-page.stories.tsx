import type { Meta, StoryObj } from "@storybook/react-vite";

import { Annotated, MarginNote, WorkingPage } from "./working-page";

const meta = {
  title: "Patterns/Working page",
  component: WorkingPage,
  parameters: { layout: "padded" },
} satisfies Meta<typeof WorkingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Notes sit in the margin on wide screens and follow their paragraph on narrow ones. */
export const WithMarginNotes: Story = {
  args: {
    className: "typeset",
    children: (
      <>
        <p>A paragraph without a note sits in the prose column.</p>
        <Annotated note="A limitation: where this interpretation stops.">
          <p>
            A paragraph with a margin note. Resize the viewport: below the large breakpoint the note
            moves directly after this paragraph rather than floating or disappearing.
          </p>
        </Annotated>
        <p>Prose continues at a readable measure.</p>
        <Annotated note="Source: where the claim can be checked.">
          <p>A second annotated paragraph.</p>
        </Annotated>
      </>
    ),
  },
};

export const NoteAlone: Story = {
  args: { children: null },
  render: () => <MarginNote>A margin note, set as annotation.</MarginNote>,
};
