'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

interface ProjectProps {
  title: string;
  year: string;
  description: string;
  tech: string[];
  url?: string;
}

const projectsData = require('../data/projects.json') as ProjectProps[];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showAll) {
      document.body.style.overflow = 'hidden';

      // Add event listener for escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape')
          setShowAll(false);
      };
      document.addEventListener('keydown', handleEscape);

      // Cleanup
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showAll]);

  return (
    <section className="relative flex flex-col gap-4">
      <motion.h2 className="text-xl font-bold text-green-500 print:block" variants={{
        hidden: {opacity: 0, y:10},
        whileInView: {opacity: 1, y:0}
      }}>
        projects
      </motion.h2>

      <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-10">

        {projectsData.slice(0, 4).map((project: ProjectProps, index: number) => (
          <React.Fragment key={index}>
            <motion.div className="col-span-1 print:block" variants={{
              hidden: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 }
            }}>
              {project.year == projectsData[index - 1]?.year
                ? null
                : <span className="opacity-75">{project.year}</span>}
            </motion.div>
            <motion.div className="col-span-9 gap-2 print:block" variants={{
              hidden: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 }
            }}>
              <div className="font-bold">
                {project.title} &nbsp;
                {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sky-500">
                  <span className="sr-only print:hidden">link to {project.title}</span>
                  <span className="print:hidden">🔗</span>
                </a>}
              </div>
              <p className="mt-2">{project.description}</p>
              <ul className="flex flex-wrap gap-1 mt-1 text-xs">
                {
                  project.tech.map((tech, techIndex) => (
                    <li key={techIndex} className="mt-2">
                      <code className="px-2 py-1 lowercase rounded-full bg-gray-400/25">{tech}</code>
                    </li>
                  ))
                }
              </ul>
            </motion.div>
          </React.Fragment>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
        <button className="absolute bottom-0 px-4 py-2 text-white transition-colors -translate-x-1/2 bg-green-500 rounded-full left-1/2 hover:bg-green-600"
          onClick={() => setShowAll(true)}
        >
          See More
        </button>

        <AnimatePresence>
          {showAll && (
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                ref={overlayRef}
                onClick={(e) => {
                  if (overlayRef.current === e.target)
                    setShowAll(false);
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="w-full max-w-screen-md max-h-[80vh] rounded-lg bg-background flex flex-col"
                >
                  <div className="flex flex-row items-center justify-between flex-none p-4 border-b bg-background ">
                    <h3 className="text-xl font-semibold">all projects</h3>
                    <button
                      onClick={() => setShowAll(false)}
                      className="p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                      aria-label="Close overlay"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto ">
                    <div className="grid grid-cols-1 gap-6 p-6">
                      {Object.entries(
                        projectsData.reduce((acc, project) => {
                          (acc[project.year] = acc[project.year] || []).push(project);
                          return acc;
                        }, {} as Record<string, ProjectProps[]>)
                      ).map(([year, projects]) => (
                        <div key={year} className="relative">
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-10">
                            <motion.div
                              className="col-span-1 print:block sticky top-[72px]"
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                whileInView: { opacity: 1, y: 0 }
                              }}
                            >
                              <span className="block pt-4 bg-white opacity-75 dark:bg-gray-900">{year}</span>
                            </motion.div>
                            <div className="col-span-9">
                              {projects.map((project, index) => (
                                <motion.div
                                  key={index}
                                  className="mb-6 last:mb-0"
                                  variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    whileInView: { opacity: 1, y: 0 }
                                  }}
                                >
                                  <div className="font-bold">
                                    {project.title} &nbsp;
                                    {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sky-500">
                                      <span className="sr-only print:hidden">link to {project.title}</span>
                                      <span className="print:hidden">🔗</span>
                                    </a>}
                                  </div>
                                  <p className="mt-2">{project.description}</p>
                                  <ul className="flex flex-wrap gap-1 mt-1 text-xs">
                                    {project.tech.map((tech, techIndex) => (
                                      <li key={techIndex} className="mt-2">
                                        <code className="px-2 py-1 lowercase rounded-full bg-gray-400/25">{tech}</code>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
