import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardBody, CardTitle } from "../patterns/card/card";
import { SectionHeader } from "../patterns/section-header";

const meta = {
  title: "Foundation/Chapters",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const chapters = [
  ["ink", "Projects, CV, contact"],
  ["lotus", "Research, publications"],
  ["rose", "Writing"],
  ["palm", "About, heritage"],
] as const;

/** One thread per chapter: the section rule, card top edge (hover/focus) and prose underlines. */
export const Threads: Story = {
  render: () => (
    <div className="grid max-w-5xl gap-10 md:grid-cols-2">
      {chapters.map(([chapter, use]) => (
        <section className="space-y-6" data-chapter={chapter} key={chapter}>
          <SectionHeader eyebrow={chapter} title={use} />
          <Card>
            <CardTitle>Chapter {chapter}</CardTitle>
            <CardBody>
              <div className="typeset">
                <p>
                  Ink text keeps its contrast; the{" "}
                  <a href="#example">underline carries the thread</a>. Hover or focus the card to
                  see its top edge take the chapter colour.
                </p>
              </div>
            </CardBody>
          </Card>
        </section>
      ))}
    </div>
  ),
};
