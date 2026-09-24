import type { Meta, StoryObj } from "@storybook/react-vite";

import { Motif } from "../../heritage/motif";
import { Lotus, Shuttle } from "../../heritage/parts/prain";
import { Specimen, SpecimenCaption, SpecimenFrame, SpecimenLabel } from "./specimen";

const meta = {
  title: "Patterns/Specimen",
  component: Specimen,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof Specimen>;

export default meta;
type Story = StoryObj<typeof meta>;

const lotus = (
  <Motif className="mx-auto block w-4/5" detail="study" viewBox="0 0 256 256">
    <Lotus />
  </Motif>
);

export const Square: Story = {
  args: {
    children: (
      <>
        <SpecimenFrame aspect="square">{lotus}</SpecimenFrame>
        <SpecimenCaption name="Lotus" note="Nelumbo nucifera." />
      </>
    ),
  },
};

export const Wide: Story = {
  args: {
    children: (
      <>
        <SpecimenFrame aspect="wide">
          <Motif className="mx-auto block w-4/5" viewBox="12 84 232 88">
            <Shuttle />
          </Motif>
        </SpecimenFrame>
        <SpecimenCaption name="Shuttle" note="A weaver's shuttle" />
      </>
    ),
  },
};

export const LongCaption: Story = {
  args: {
    children: (
      <>
        <SpecimenFrame aspect="square">{lotus}</SpecimenFrame>
        <SpecimenCaption
          name="A specimen with a long name that wraps"
          note="A caption long enough to wrap across two or three lines beneath the frame."
        />
      </>
    ),
  },
};

/** The full record: the same five questions for every piece of evidence, in the same order. */
export const WithLabel: Story = {
  args: { children: null },
  decorators: [
    (Story) => <div className="grid max-w-3xl gap-8 sm:grid-cols-[1fr_14rem]">{Story()}</div>,
  ],
  render: () => (
    <>
      <Specimen>
        <SpecimenFrame aspect="square">{lotus}</SpecimenFrame>
        <SpecimenCaption name="Lotus" note="Nelumbo nucifera." />
      </Specimen>
      <SpecimenLabel
        kind="Method demonstration"
        limitation="Where the interpretation stops."
        method="How the object was produced or examined."
        observation="What the reader should notice."
        question="Why the investigation exists."
        source={<a href="#specimen">Where it can be inspected</a>}
      />
    </>
  ),
};

/** Unknown fields are omitted rather than invented. */
export const PartialLabel: Story = {
  args: { children: null },
  render: () => (
    <SpecimenLabel observation="Only what is known is recorded." question="A question." />
  ),
};

/** Reduced motion and print: the finished drawing, no animation. */
export const Static: Story = {
  args: {
    children: (
      <>
        <SpecimenFrame aspect="square">
          <Motif className="mx-auto block w-4/5" detail="study" motion="none" viewBox="0 0 256 256">
            <Lotus />
          </Motif>
        </SpecimenFrame>
        <SpecimenCaption name="Lotus" />
      </>
    ),
  },
};
