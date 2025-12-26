"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { projects, type Project } from "@/content/projects";
import { Link04Icon, CodeIcon, ArrowDown01Icon, ArrowUp01Icon, CheckmarkCircle02Icon, Clock01Icon, Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const statusConfig = {
  active: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckmarkCircle02Icon,
    label: "Active"
  },
  development: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Loading03Icon,
    label: "In Development"
  },
  ongoing: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Clock01Icon,
    label: "Ongoing"
  }
} as const;

const colorSchemes = {
  blue: {
    bg: "from-blue-50 to-blue-100",
    accent: "bg-blue-500",
    text: "text-blue-900"
  },
  purple: {
    bg: "from-purple-50 to-purple-100", 
    accent: "bg-purple-500",
    text: "text-purple-900"
  },
  green: {
    bg: "from-green-50 to-green-100",
    accent: "bg-green-500", 
    text: "text-green-900"
  },
  red: {
    bg: "from-red-50 to-red-100",
    accent: "bg-red-500",
    text: "text-red-900"
  },
  orange: {
    bg: "from-orange-50 to-orange-100",
    accent: "bg-orange-500",
    text: "text-orange-900"
  },
  gray: {
    bg: "from-gray-50 to-gray-100",
    accent: "bg-gray-500",
    text: "text-gray-900"
  }
} as const;

type StatusKey = keyof typeof statusConfig;
type ColorKey = keyof typeof colorSchemes;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusInfo = statusConfig[project.status as StatusKey];
  const colorScheme = colorSchemes[project.color as ColorKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`bg-linear-to-br ${colorScheme.bg} border border-gray-200 rounded-xl transition-all duration-500 shadow-lg hover:shadow-xl overflow-hidden group`}
    >
      {/* Header Section */}
      <div 
        className="p-6 cursor-pointer relative"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Icon Animation */}
        <motion.div 
          className="absolute top-4 right-4 text-4xl"
          animate={{ 
            rotate: isExpanded ? 180 : 0,
            scale: isExpanded ? 1.1 : 1 
          }}
          transition={{ duration: 0.3 }}
        >
          {project.icon}
        </motion.div>

        {/* Project Image */}
        {project.image && (
          <div className="w-16 h-16 rounded-lg overflow-hidden mb-4 border-2 border-white shadow-md">
            <Image
              src={project.image}
              alt={project.title}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title and Status */}
        <div className="pr-16">
          <h3 className={`font-bold text-2xl font-heading mb-3 ${colorScheme.text}`}>
            {project.title}
          </h3>
          
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-medium px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${statusInfo.color}`}>
              <HugeiconsIcon icon={statusInfo.icon} className="h-3 w-3" />
              {statusInfo.label}
            </span>
            <span className="text-sm text-gray-600 font-medium">{project.year}</span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            {project.shortDescription}
          </p>

          {/* Tech Preview */}
          <div className="flex flex-wrap gap-1 mb-2">
            {project.tech.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="text-xs bg-white/70 text-gray-700 px-2 py-1 rounded-md font-mono"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{project.tech.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Expand Button */}
        <motion.div 
          className="absolute bottom-4 right-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
            <HugeiconsIcon 
              icon={isExpanded ? ArrowUp01Icon : ArrowDown01Icon} 
              className="h-4 w-4 text-gray-600" 
            />
          </div>
        </motion.div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6">
              {/* Animated Divider */}
              <motion.div 
                className={`h-1 ${colorScheme.accent} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              
              {/* Full Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h4 className={`font-semibold text-lg mb-3 ${colorScheme.text}`}>About this project</h4>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {project.fullDescription}
                </p>
              </motion.div>

              {/* Key Highlights */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h4 className={`font-semibold text-lg mb-3 ${colorScheme.text}`}>Key Features</h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <div className={`w-2 h-2 ${colorScheme.accent} rounded-full shrink-0`} />
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <h4 className={`font-semibold text-lg mb-3 ${colorScheme.text}`}>Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.6 + techIndex * 0.05 }}
                      className="text-xs bg-white/80 text-gray-700 px-3 py-1.5 rounded-lg font-mono border border-gray-200 shadow-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              {(project.link || project.github) && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="flex items-center gap-3 pt-2"
                >
                  {project.link && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 ${colorScheme.accent} text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <HugeiconsIcon icon={Link04Icon} className="h-4 w-4" />
                      Visit Project
                    </motion.a>
                  )}
                  {project.github && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <HugeiconsIcon icon={CodeIcon} className="h-4 w-4" />
                      View Code
                    </motion.a>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section className="px-4 lg:px-8 my-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center xl:text-left mb-12"
      >
        <h2 className="text-4xl xl:text-6xl font-bold text-gray-800 font-heading xl:leading-tight leading-tight mb-4">
          Projects
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto xl:mx-0">
          Explore my work through interactive project cards. Click to dive deeper into the details, technologies, and impact of each project.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}