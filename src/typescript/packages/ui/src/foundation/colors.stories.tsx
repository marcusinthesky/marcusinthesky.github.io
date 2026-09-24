import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundation/Colors",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const swatches = [
  ["Paper", "bg-background", "Default page"],
  ["Ink", "bg-foreground", "Text, rules and filled controls"],
  ["White", "bg-card", "Specimen fields and card frames"],
  ["Silver paper", "bg-muted", "Quiet grouping and chips"],
  ["Hairline", "bg-border", "Rules and frames"],
  ["Lotus blue", "bg-lotus-blue", "Research thread; estimates in charts; focus"],
  ["Heraldic red", "bg-heritage-red", "Writing thread; decisions in charts"],
  ["Palm green", "bg-palm-green", "About thread"],
  ["Muted gold", "bg-muted-gold", "Mottos and the highlighter"],
] as const;

export const Palette: Story = {
  render: () => (
    <ul className="grid max-w-4xl list-none gap-4 p-0 sm:grid-cols-3">
      {swatches.map(([name, swatch, use]) => (
        <li key={name}>
          <span aria-hidden="true" className={`block h-16 border border-border ${swatch}`} />
          <p className="mt-2 label-sm">{name}</p>
          <p className="caption text-muted-foreground">{use}</p>
        </li>
      ))}
    </ul>
  ),
};
