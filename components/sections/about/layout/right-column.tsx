import { Achievements } from "@/components/sections/about/profile/achievements";
import { Bio } from "@/components/sections/about/profile/bio";
import { Research } from "@/components/sections/about/profile/research";
import { Skills } from "@/components/sections/about/profile/skills";
import { Work } from "@/components/sections/about/profile/work";
import { Emoji } from "@/components/ui/emoji";
import { Sparkles } from "@/components/ui/sparkles";
import { SpinningEarth } from "@/components/ui/spinning-earth";

export function RightColumn() {
  return (
    <div className="relative z-10 flex-1 w-full max-w-full lg:min-w-[320px] lg:max-w-lg lg:sticky lg:top-24 lg:self-start mb-8 lg:mb-0 text-left order-1 lg:order-2 rounded-2xl bg-linear-to-br from-amber-50/90 via-yellow-50/80 to-orange-50/70 p-4 sm:p-6 md:p-8 border border-amber-200/50 shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">
        I'm building{" "}
        <Sparkles>
          <span>innovative solutions</span>
        </Sparkles>{" "}
        for global challenges in{" "}
        <span className="inline-flex items-center align-middle gap-1.5">
          <Emoji symbol="🇨🇴" className="w-8 h-8" />
          Colombia
        </span>{" "}
        and the{" "}
        <span className="inline-flex items-center align-middle gap-1.5">
          <SpinningEarth className="w-8 h-8" />
          world
        </span>
      </h2>

      <div className="space-y-6">
        <Bio />
        <Work />
        <Research />
        <Achievements />
        <Skills />
      </div>
    </div>
  );
}
