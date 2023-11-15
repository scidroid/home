"use client";

import Image from "next/image";

import { allProjects } from "@/.contentlayer/generated";
import { useModal } from "@/hooks/modal";
import { AnimatePresence } from "framer-motion";

import { ModalContent } from "./ModalContent";
import { MotionCard } from "./MotionCard";

export function Projects() {
  const { selected, setSelected, ref } = useModal();

  return (
    <section className="mx-4 my-8">
      <h2 className="font-semibold text-xl lg:text-2xl uppercase my-2">
        Projects
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8">
        {allProjects.map((project, key) => (
          <MotionCard
            hover
            key={key}
            onClick={() => {
              setSelected(project);
            }}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") setSelected(project);
            }}
            layoutId={project.id}
          >
            <Image
              src={project.image}
              alt={project.alt}
              width={500}
              height={375}
              quality={100}
              className="m-auto"
            />
            <h3 className="text-xl lg:text-2xl font-semibold">
              {project.title}
            </h3>
            <p className="text-lg">{project.summary}</p>
          </MotionCard>
        ))}
      </div>
      {selected != null && (
        <AnimatePresence mode="wait">
          <div
            className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/90"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <div className="flex items-center justify-center p-8">
              <MotionCard layoutId={selected.id} ref={ref}>
                <Image
                  src={selected.image}
                  alt={selected.alt}
                  height={450}
                  width={600}
                  quality={100}
                  className="m-auto"
                />
                <div className="text-xl modal-content">
                  <h3
                    id="dialog-title"
                    className="text-2xl lg:text-4xl font-bold"
                  >
                    {selected.title}
                  </h3>
                  <p className="font-semibold text-xl lg:text-2xl">
                    {selected.summary}
                  </p>
                  <ModalContent content={selected.body.code} />
                </div>
              </MotionCard>
            </div>
          </div>
        </AnimatePresence>
      )}
    </section>
  );
}
