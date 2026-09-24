import type { Meta, StoryObj } from "@storybook/react-vite";

import { InstitutionalDevice } from "./institutional-device";
import type { MotifTone } from "./motif";
import { MottoCallout } from "./motto-callout";

const meta = {
  title: "Heritage/Institutional",
  component: InstitutionalDevice,
  parameters: { layout: "padded" },
} satisfies Meta<typeof InstitutionalDevice>;

export default meta;
type Story = StoryObj<typeof meta>;

const TONES: MotifTone[] = ["heritage", "ink", "sacs", "uct"];

export const Devices: Story = {
  render: () => (
    <div className="flex gap-8">
      {TONES.map((tone) => (
        <InstitutionalDevice
          className="h-40"
          key={tone}
          title={`Device, ${tone} tone`}
          tone={tone}
        />
      ))}
    </div>
  ),
};

export const Mottos: Story = {
  render: () => (
    <div className="max-w-xl space-y-10">
      <MottoCallout institution="sacs" />
      <MottoCallout institution="uct" />
    </div>
  ),
};
