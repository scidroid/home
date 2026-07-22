import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | null | undefined | false)[]) {
  return twMerge(...inputs);
}
