import { EducationArticle } from "@/components/sections/about/articles/education";
import { HealthArticle } from "@/components/sections/about/articles/health";
import { ProductivityArticle } from "@/components/sections/about/articles/productivity";

export function LeftColumn() {
  return (
    <div className="flex flex-col gap-4 flex-1 w-full">
      <HealthArticle />
      <ProductivityArticle />
      <EducationArticle />
    </div>
  );
}
