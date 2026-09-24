import type { Metadata } from "next";

import { profile } from "@marcusinthesky/content";
import { Card, CardBody, CardFooter, CardTitle, PageHeader } from "@marcusinthesky/ui/patterns";
import { ButtonLink } from "@marcusinthesky/ui/primitives";

import { BrandIcon } from "@/components/integrations/brand-icon";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Public channels for contacting Marcus Gawronsky.",
  path: "/contact/",
});

export default function ContactPage() {
  const links = profile.links.filter(({ label }) => ["GitHub", "LinkedIn"].includes(label));
  return (
    <div className="page-shell">
      <PageHeader
        description="For professional, research, and open-source conversations, use one of the public channels below. Direct personal contact details are intentionally not published."
        eyebrow="Contact"
        title="Start with public context"
      />
      <section className="grid max-w-3xl gap-5 border-t border-border py-14 sm:grid-cols-2">
        {links.map((link) => (
          <Card key={link.url}>
            <CardTitle level={2}>{link.label}</CardTitle>
            <CardBody>
              {link.label === "LinkedIn"
                ? "Professional introductions and collaboration."
                : "Open-source work, technical context, and repository discussions."}
            </CardBody>
            <CardFooter>
              <ButtonLink href={link.url}>
                <BrandIcon className="size-4" label={link.label} />
                Open {link.label}
              </ButtonLink>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
