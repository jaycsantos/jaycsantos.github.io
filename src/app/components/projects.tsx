'use client';

import { motion } from 'motion/react';
import React from 'react';

interface ProjectProps {
  title: string;
  year: string;
  description: string;
  tech: string[];
  url?: string;
}

const projectsData = require('../data/projects.json') as ProjectProps[];

export default function Projects() {
  return (
    <section className="flex flex-col gap-4">
      <motion.h2 className="text-xl font-bold text-green-500 print:block" variants={{
        hidden: {opacity: 0, y:10},
        whileInView: {opacity: 1, y:0}
      }}>
        projects
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-10 gap-6">
        {projectsData.map((project: ProjectProps, index: number) => (
          <React.Fragment key={index}>
            <motion.div className="col-span-1 print:block" variants={{
              hidden: {opacity: 0, y:10},
              whileInView: {opacity: 1, y:0}
            }}> 
              {project.year == projectsData[index - 1]?.year 
                ? null 
                : <span className="opacity-75">{project.year}</span>}
            </motion.div>
            <motion.div className="col-span-9 gap-2 print:block" variants={{
              hidden: {opacity: 0, y:10},
              whileInView: {opacity: 1, y:0}
            }}>
              <div className="font-bold">
                {project.title} &nbsp;
                {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sky-500">
                  <span className="print:hidden sr-only">link to {project.title}</span>
                  <span className="print:hidden">🔗</span> 
                </a>}
              </div>
              <p className="mt-2">{project.description}</p>
              <ul className="text-xs flex flex-wrap gap-1 mt-1">
                {
                  project.tech.map((tech, techIndex) => (
                    <li key={techIndex} className="mt-2">
                      <code className="rounded-full bg-gray-400/25 px-2 py-1 lowercase">{tech}</code>
                    </li>
                  ))
                }
              </ul>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
