import { Achievements } from "@/components/sections/about/profile/achievements";
import { Bio } from "@/components/sections/about/profile/bio";
import { ColombiaFlag } from "@/components/sections/about/profile/colombia-flag";
import { Skills } from "@/components/sections/about/profile/skills";
import { Work } from "@/components/sections/about/profile/work";
import { EarthIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function RightColumn() {
  return (
    <aside className="flex-1 w-full max-w-full lg:min-w-[320px] lg:max-w-lg lg:sticky lg:top-24 lg:self-start mb-8 lg:mb-0 text-center lg:text-left">
      <h2 className="text-3xl font-bold mb-4">
        I'm building <span className="shiny">innovative solutions</span> for
        global challenges in{" "}
        <span className="inline-flex items-center align-middle gap-1.5">
          <ColombiaFlag />
          Colombia
        </span>{" "}
        and the{" "}
        <span className="inline-flex items-center align-middle gap-1.5">
          <HugeiconsIcon
            icon={EarthIcon}
            className="w-8 h-8 inline-block"
            color="#16a34a"
            strokeWidth={2}
          />
          world
        </span>
      </h2>

      <div className="space-y-6">
        <Bio />
        <Work />
        <Achievements />
        <Skills />
      </div>
    </aside>
  );
}
