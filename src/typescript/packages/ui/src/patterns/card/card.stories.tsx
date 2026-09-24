import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Card, CardBody, CardFooter, CardLede, CardLink, CardMeta, CardTitle } from "./card";

const meta = {
  title: "Patterns/Card",
  component: Card,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const anatomy = (
  <>
    <CardMeta>Case study</CardMeta>
    <CardTitle>Pricing Perspective</CardTitle>
    <CardLede>Can information from language models become a measurable object?</CardLede>
    <CardBody>
      Reproducible quantitative research across software, evidence, and formal claims.
    </CardBody>
    <CardFooter>
      <CardLink href="#card">Read the case study</CardLink>
    </CardFooter>
  </>
);

export const Default: Story = { args: { children: anatomy } };

/** Catalogue metadata sits beneath the frame as a museum label, never inside it. */
export const WithCaption: Story = {
  args: { caption: "Python · Lean 4 · LaTeX", children: anatomy },
};

export const LongContent: Story = {
  args: {
    caption: "Python · Jupyter · Econometrics · Graph theory",
    children: (
      <>
        <CardTitle>
          A deliberately long project title that has to wrap across several lines without shrinking
        </CardTitle>
        <CardBody>
          An empirical investigation of offshore entities, leaked disclosures, network structure,
          and market pricing, combining event studies, graph theory, and reproducible analysis. The
          text runs long so the frame can be judged at length.
        </CardBody>
      </>
    ),
  },
};

/** One destination: the stretched link makes the whole frame its hit area. */
export const Interactive: Story = {
  args: {
    children: (
      <>
        <CardTitle>Precarious Papers</CardTitle>
        <CardBody>What does the market learn from public financial-data breaches?</CardBody>
        <CardFooter>
          <CardLink href="#card" stretched>
            Read the case study
          </CardLink>
        </CardFooter>
      </>
    ),
  },
};

/** Keyboard focus reaches the link; focus-within takes the chapter colour on the top edge. */
export const Focused: Story = {
  ...Interactive,
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getByRole("link")).toHaveFocus();
  },
};

export const ChapterColour: Story = {
  ...Interactive,
  decorators: [(Story) => <div data-chapter="lotus">{Story()}</div>],
};
