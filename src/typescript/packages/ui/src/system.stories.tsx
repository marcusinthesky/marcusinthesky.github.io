import type { Meta, StoryObj } from "@storybook/react-vite";

import { EmblemPlate } from "./heritage/compositions/emblem-plate";
import { HeritageMark } from "./heritage/heritage-mark";
import { Card, CardBody, CardFooter, CardLede, CardLink, CardTitle } from "./patterns/card/card";
import { Record, RecordAttribution, RecordNote, RecordTitle } from "./patterns/record/record";
import { SectionHeader } from "./patterns/section-header";
import { ButtonLink } from "./primitives/action/button-link";

const meta = {
  title: "System/Overview",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A demonstration, not a contract: the three compositions in rhythm. A mounted
 * plate beside compact records, then a card for a destination with a case study.
 */
export const Composition: Story = {
  render: () => (
    <div className="max-w-5xl space-y-12" data-chapter="lotus">
      <SectionHeader
        description="A small semantic layer for long-form research and engineering work."
        eyebrow="Research"
        index={3}
        motif={<HeritageMark motif="lotus" size="lg" />}
        title="Questions I am working on"
      />
      <div className="grid items-start gap-8 md:grid-cols-[10rem_minmax(0,1fr)]">
        <EmblemPlate className="max-w-40" motif="lotus" name="Lotus" note="Nelumbo nucifera." />
        <div className="border-b border-border">
          <Record meta="2026 · Under review">
            <RecordTitle>Wasserstein-Barycentric Interaction Fields</RecordTitle>
            <RecordAttribution>Marcus Gawronsky · Chun-Sung Huang</RecordAttribution>
            <RecordNote term="The question">
              Can distributional similarity define economically meaningful interaction fields?
            </RecordNote>
          </Record>
          <Record meta="2024 · Under review">
            <RecordTitle>Systematic Covariance Envelopes from Wasserstein Geometry</RecordTitle>
            <RecordAttribution>Marcus Gawronsky · Chun-Sung Huang</RecordAttribution>
          </Record>
        </div>
      </div>
      <div className="max-w-md">
        <Card caption="Python · Lean 4 · LaTeX">
          <CardTitle>Pricing Perspective</CardTitle>
          <CardLede>Reproducible quantitative research across software and formal claims.</CardLede>
          <CardBody>Manuscripts, pipelines, proofs and a site that evolve together.</CardBody>
          <CardFooter>
            <CardLink href="#overview" stretched>
              Read the case study
            </CardLink>
          </CardFooter>
        </Card>
      </div>
      <ButtonLink href="#overview" variant="secondary">
        View all research
      </ButtonLink>
    </div>
  ),
};
