import { Achievements } from "@/components/sections/about/profile/achievements";
import { Bio } from "@/components/sections/about/profile/bio";
import { ColombiaFlag } from "@/components/sections/about/profile/colombia-flag";
import { Skills } from "@/components/sections/about/profile/skills";
import { Work } from "@/components/sections/about/profile/work";
import { EarthIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function RightColumn() {
  return (
    <div className="flex-1 w-full max-w-full lg:min-w-[320px] lg:max-w-lg lg:sticky lg:top-24 lg:self-start mb-8 lg:mb-0">
      <h2 className="text-3xl font-bold mb-4">
        Building <span className="shiny">innovative solutions</span> for
        global challenges from <span className="inline-flex items-center align-middle gap-1.5">
          <ColombiaFlag />
          Colombia
        </span> to the <span className="inline-flex items-center align-middle gap-1.5">
          <HugeiconsIcon
            icon={EarthIcon}
            className="w-6 h-6 inline-block"
            color="green"
            strokeWidth={2}
          />
          world
        </span>
      </h2>

      <div className="space-y-4">
        <Bio />
        <Work />
        <Achievements />
        <Skills />
      </div>
    </div>
  );
}
