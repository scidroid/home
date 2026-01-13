"use client";

import Image from "next/image";
import { projects, type Project } from "@/content/projects";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const bgColors = {
  purple: "bg-violet-50",
  green: "bg-emerald-50",
  orange: "bg-amber-50",
  blue: "bg-sky-50",
} as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const bg = bgColors[project.color as keyof typeof bgColors] || bgColors.blue;

  return (
    <article
      className={`${bg} border border-gray-200 rounded-2xl p-5 sm:p-6 sticky shadow-sm`}
      style={{ top: `${96 + index * 24}px` }}
    >
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
        {/* Image */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="relative aspect-video lg:aspect-4/3 rounded-xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 font-heading flex items-center gap-2">
              <span>{project.icon}</span>
              {project.title}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                project.status === "active"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {project.status === "active" ? "Live" : "Building"}
              </span>
              <span className="text-xs text-gray-400">{project.year}</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            {project.shortDescription}
          </p>

          {/* Highlights */}
          <ul className="space-y-1.5 mb-4">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-gray-300 mt-0.5">→</span>
                {highlight}
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs text-gray-500 bg-white/80 border border-gray-200 px-2.5 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                <span className="underline decoration-gray-300 underline-offset-2">Visit</span>
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section className="px-4 lg:px-8 my-12">
      <div className="text-center lg:text-left mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 font-heading leading-tight">
          Projects
        </h2>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
