'use client';

import { CgClose } from 'react-icons/cg';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import Tags from './tags';

export interface ProjectProps {
  title: string;
  year_end: string;
  month_end: string;
  description: string;
  ref_id: string;
  tech?: string[];
  url?: string;
  img?: string;
}

export default function ProjectItem({ project, index }: { project: ProjectProps, index: number }) {
  const [show, setShow] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape')
          setShow(false);
      };
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [show]);

  return (
    <>
      <motion.div className="relative flex flex-col items-stretch gap-4 p-3 transition-all duration-300 bg-gray-200 border rounded-md dark:bg-gray-800/20 group print:border-0 border-gray-600/10 dark:border-gray-400/10 hover:border-gray-400 dark:hover:border-gray-400 print:gap-0 print:p-0 print:break-inside-avoid sm:h-full"
        tabIndex={0}
        role="button"
        aria-label={`More details about ${project.title}`}
        aria-expanded={false}
        onClick={() => setShow(true)}
      >
        {project.img &&
          <div className="absolute inset-0 w-full h-full z-0 bg-cover bg-top grayscale opacity-15 blur-[2px] group-hover:blur-none group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            style={{ backgroundImage: `url(${project.img})` }}
          />}
        <motion.h4 className={`text-center font-medium underline transition-opacity duration-500 ease-in-out underline-offset-4 print:text-left ${project.img && 'group-hover:opacity-0'}`}
          whileInView={{ scale: [0.9, 1.05, 1], dur: 0.1 }}
        >
          {project.title}
        </motion.h4>
        <p className="hidden print:block">{project.description}</p>
        {project.tech &&
          <Tags tags={project.tech} className={`justify-center transition-opacity duration-500 ease-in-out ${project.img && 'group-hover:opacity-0'}`} />}
      </motion.div>

      <AnimatePresence>
        {show && (
          <div className="fixed inset-0 z-10 flex items-center justify-center p-4 dot-blur"
            ref={overlayRef}
            onClick={(e) => overlayRef.current === e.target ? setShow(false) : null}
          >
            <motion.div className="w-full max-w-screen-sm max-h-[80vh] rounded-lg bg-gray-50 dark:bg-gray-900 flex flex-col shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="flex flex-row items-center flex-none py-2 pl-4 pr-2 border-b">
                <h3 className="flex-1 text-xl font-bold">{project.title}</h3>
                <button className="p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShow(false)}
                  aria-label="Close overlay"
                >
                  <CgClose className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center flex-1 gap-4 p-4 overflow-y-auto">
                {project.url &&
                  <a className="flex flex-col items-center max-h-[50dvh] max-w-[100%]" href={project.url} target="_blank" rel="noopener noreferrer">
                    {project.img && <img src={project.img} alt={project.title} className="rounded-md shadow-sm" />}
                    {project.url?.startsWith('http') && <span className="text-xs truncate max-w-[50%] opacity-35">
                      {project.url}
                    </span>}
                  </a>}
                <p>{project.description}</p>
                {project.tech && <Tags tags={project.tech} className="justify-center" />}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
