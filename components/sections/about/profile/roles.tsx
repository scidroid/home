import Image from "next/image";
import type { StaticImageData } from "next/image";

import { Emoji } from "@/components/ui/emoji";

export type Role = {
  role: string;
  company: string;
  description: string;
  url: string;
  logo?: StaticImageData;
  emoji?: string;
  squared?: boolean;
};

export function Roles({ roles }: { roles: Role[] }) {
  return (
    <div className="space-y-3 lg:space-y-4">
      {roles.map(role => (
        <a
          key={role.url}
          href={role.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gray-50 rounded-lg p-3 sm:p-4 lg:p-0 lg:bg-transparent lg:rounded-none group"
        >
          <div className="flex flex-row items-center gap-2 sm:gap-3 lg:gap-4 text-left">
            {role.logo ? (
              <Image
                src={role.logo}
                alt=""
                className={
                  role.squared
                    ? "h-8 w-8 object-cover rounded shrink-0"
                    : "h-auto w-6 object-contain shrink-0"
                }
              />
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                <Emoji symbol={role.emoji!} className="h-6 w-6" />
              </span>
            )}
            <div>
              <h4 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                {role.role} <span className="font-normal">at</span>{" "}
                <span className="underline decoration-gray-300 group-hover:no-underline">
                  {role.company}
                </span>
              </h4>
              <p className="text-sm text-gray-500">{role.description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
