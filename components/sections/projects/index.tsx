"use client";

import Image from "next/image";

import pulpooLogo from "@/components/sections/about/images/pulpoo.webp";
import { ColOvoAnimation } from "@/components/sections/projects/animations/col-ovo";
import { PulpooAnimation } from "@/components/sections/projects/animations/pulpoo";
import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { Emoji } from "@/components/ui/emoji";
import { SectionTitle } from "@/components/ui/section-title";
import { projects } from "@/content/projects";

const colors = {
  purple: {
    bg: "bg-violet-50",
    accent: "text-violet-700"
  },
  green: {
    bg: "bg-emerald-50",
    accent: "text-emerald-700"
  },
  orange: {
    bg: "bg-amber-50",
    accent: "text-amber-700"
  },
  blue: {
    bg: "bg-sky-50",
    accent: "text-sky-700"
  }
} as const;

function ProjectModalContent({
  project,
  isPulpoo,
  isColOvo,
  c
}: {
  project: (typeof projects)[0];
  isPulpoo: boolean;
  isColOvo: boolean;
  c: { bg: string; accent: string };
}) {
  return (
    <div className="max-h-[85vh] overflow-y-auto md:overflow-hidden md:flex md:flex-row">
      {/* Left panel — identity & visual */}
      <div
        className={`${c.bg} p-4 md:p-6 md:w-[45%] md:overflow-y-auto flex flex-col items-center justify-center text-center shrink-0`}
      >
        <div className="py-4 md:py-8 space-y-4 w-full">
          {isPulpoo ? (
            <Image
              src={pulpooLogo}
              alt="Pulpoo logo"
              width={56}
              height={56}
              className="rounded-xl mx-auto"
            />
          ) : (
            <Emoji symbol={project.icon} className="w-12 h-12 block mx-auto" />
          )}

          <div>
            <h3 className="text-2xl font-bold text-gray-800 font-heading leading-tight">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{project.subtitle}</p>
          </div>

          <div className="w-full">
            {isPulpoo ? (
              <div onClick={e => e.stopPropagation()}>
                <PulpooAnimation />
              </div>
            ) : isColOvo ? (
              <div onClick={e => e.stopPropagation()}>
                <ColOvoAnimation />
              </div>
            ) : project.image ? (
              <div className="aspect-video rounded-xl bg-white/50 text-gray-600 flex items-center justify-center">
                <span className="text-sm">Screenshot</span>
              </div>
            ) : null}
          </div>

          <div className="pt-2">
            {isPulpoo ? (
              <a
                href="https://pulpoo.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Try Pulpoo
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className={`text-sm font-medium ${c.accent}`}>
                {project.status === "active" ? "Active" : "In Development"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right panel — information */}
      <div className="p-4 md:p-6 md:w-[55%] md:overflow-y-auto space-y-4">
        <p className="text-base text-gray-600 leading-relaxed">
          {project.fullDescription}
        </p>

        <ul className="space-y-2">
          {project.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-base text-gray-600"
            >
              <span className="text-gray-500 mt-0.5">→</span>
              {highlight}
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-500">{project.tech.join(" · ")}</p>

        {project.link && (
          <div className="pt-2">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <span className="underline decoration-gray-300 underline-offset-2">
                Visit project
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section className="px-4 lg:px-8 my-12">
      <div className="text-center lg:text-left mb-12">
        <SectionTitle>Projects</SectionTitle>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map(project => {
          const c = colors[project.color as keyof typeof colors] || colors.blue;
          const isPulpoo = project.id === "pulpoo";
          const isColOvo = project.id === "col-ovo";

          return (
            <div key={project.id}>
              <Dialog
                transition={{
                  type: "spring",
                  bounce: 0.05,
                  duration: 0.5
                }}
              >
                <DialogTrigger
                  className={`${c.bg} rounded-2xl w-full h-full text-left shadow-lg shadow-black/[0.08] block`}
                  style={{ borderRadius: 16 }}
                >
                  <div className="p-5 flex flex-col h-full">
                    {/* Zone A: Identity */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2.5">
                        {isPulpoo ? (
                          <Image
                            src={pulpooLogo}
                            alt="Pulpoo logo"
                            width={28}
                            height={28}
                            className="rounded-lg"
                          />
                        ) : (
                          <Emoji symbol={project.icon} className="w-6 h-6" />
                        )}
                        <h3 className="text-lg font-bold text-gray-800 font-heading leading-tight">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Zone B: Visual */}
                    <div className="mb-4">
                      {isPulpoo ? (
                        <div onClick={e => e.stopPropagation()}>
                          <PulpooAnimation />
                        </div>
                      ) : isColOvo ? (
                        <div onClick={e => e.stopPropagation()}>
                          <ColOvoAnimation />
                        </div>
                      ) : (
                        <div className="aspect-video rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                          <span className="text-xs">Screenshot</span>
                        </div>
                      )}
                    </div>

                    {/* Zone C: Description */}
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>

                    {/* Zone D: Tech Tags */}
                    <p className="text-xs text-gray-600 mb-3">
                      {project.tech.slice(0, 4).join(" · ")}
                    </p>

                    {/* Zone E: Footer */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200/40">
                      {isPulpoo ? (
                        <a
                          href="https://pulpoo.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors"
                        >
                          Try Pulpoo
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span className={`text-xs font-medium ${c.accent}`}>
                          {project.status === "active"
                            ? "Active"
                            : "In Development"}
                        </span>
                      )}
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        aria-label={`View ${project.title} details`}
                        className="text-xs text-gray-600 hover:text-gray-800 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContainer>
                  <DialogContent
                    className="relative max-w-4xl w-full mx-auto bg-white shadow-2xl"
                    style={{ borderRadius: 16 }}
                  >
                    <ProjectModalContent
                      project={project}
                      isPulpoo={isPulpoo}
                      isColOvo={isColOvo}
                      c={c}
                    />
                    <DialogClose className="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm text-gray-500 hover:text-gray-700 flex items-center justify-center transition-colors" />
                  </DialogContent>
                </DialogContainer>
              </Dialog>
            </div>
          );
        })}
      </div>
    </section>
  );
}
