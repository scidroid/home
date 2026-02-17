import { Story } from "@/components/sections/about/story";

export function LeftColumn() {
  return (
    <div className="flex flex-col gap-4 flex-1 w-full">
      <Story />
    </div>
  );
}
