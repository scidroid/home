import { Achievements } from "@/components/sections/about/profile/achievements";
import { Bio } from "@/components/sections/about/profile/bio";
import { Skills } from "@/components/sections/about/profile/skills";
import { Work } from "@/components/sections/about/profile/work";
import { Emoji } from "@/components/ui/emoji";

export function RightColumn() {
  return (
    <div className="flex-1 w-full max-w-full lg:min-w-[320px] lg:max-w-lg lg:sticky lg:top-24 lg:self-start mb-8 lg:mb-0 text-left order-1 lg:order-2">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">
        I'm building <span className="shiny">innovative solutions</span> for
        global challenges in{" "}
        <span className="inline-flex items-center align-middle gap-1.5">
          <Emoji symbol="🇨🇴" className="w-8 h-8" />
          Colombia
        </span>{" "}
        and the{" "}
        <span className="inline-flex items-center align-middle gap-1.5">
          <Emoji symbol="🌍" className="w-8 h-8" />
          world
        </span>
      </h2>

      <div className="space-y-6">
        <Bio />
        <Work />
        <Achievements />
        <Skills />
      </div>
    </div>
  );
}
