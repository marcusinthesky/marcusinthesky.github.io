import type { Metadata } from "next";

import { writing } from "@marcusinthesky/content";

import { PageHeader } from "@marcusinthesky/ui/patterns";

import { WritingRecord } from "@/components/domain/writing-record";
import { KalmanFilter } from "@/components/figures/kalman-filter/kalman-filter";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Writing",
  description: "Selected technical and research writing by Marcus Gawronsky.",
  path: "/blog/",
});

export default function BlogPage() {
  const orderedWriting = [...writing].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <div className="page-shell" data-chapter="rose" data-nav="writing">
      <PageHeader
        motif="rose"
        description="The machinery around the research: reproducibility, computational provenance, research infrastructure, modelling choices, and the consequences of treating analysis as software. Some essays are published elsewhere; this site keeps a durable index."
        eyebrow="Writing"
        title="Working notes on research, software, and evidence"
        figure={{
          name: "Kalman filter",
          note: "Noisy observations → a filtered estimate of the latent state",
          content: <KalmanFilter />,
        }}
      />
      <section className="mb-14 border-b border-border">
        {orderedWriting.map((entry) => (
          <WritingRecord entry={entry} key={entry.slug} />
        ))}
      </section>
    </div>
  );
}
