/* eslint-disable @next/next/no-img-element */
import { CgClose } from 'react-icons/cg';
import { motion, AnimatePresence } from 'framer-motion';
import {
  JSX,
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  memo,
} from 'react';
import { createPortal } from 'react-dom';
import { Tags } from '../components/Tags';
import { cn } from '@/utils/cl';
import Image from 'next/image';

export const ProjectContext = createContext<{
  project: ProjectProps | null;
  setProject: (value: ProjectProps) => void;
}>(null);

export interface ProjectProps {
  title: string;
  year_end: string;
  month_end: string;
  description: string | string[];
  ref_id: string;
  tech?: { [key: string]: string[] };
  url?: string;
  img?: string;
  priority?: 'low' | 'normal' | 'high';
  element?: JSX.Element;
}

export const ProjectItem = memo(function ProjectItem({
  project,
}: {
  project: ProjectProps;
}) {
  const [showModal, setShowModal] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowModal(false);
      };
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  return (
    <>
      <motion.div
        className={cn(
          'flex relative flex-col gap-4 items-stretch p-3 overflow-clip bg-gray-200 rounded-md border transition-all duration-300 border-gray-600/10 sm:h-full hover:border-gray-400',
          'dark:bg-gray-800/20 group dark:border-gray-400/10 dark:hover:border-gray-400',
          'print:border-0 print:gap-0 print:p-0 print:break-inside-avoid'
        )}
        tabIndex={0}
        role='button'
        aria-label={project.title}
        aria-expanded={false}
        onClick={() => setShowModal(true)}
        // TODO: add delay to setProject
        // onMouseEnter={() => setProject(project)}
        // onMouseLeave={() => setProject(null)}
      >
        {project.img && (
          <img
            loading='lazy'
            className={cn(
              'object-cover object-bottom absolute inset-0 z-0 w-full h-full opacity-5 grayscale transition-all duration-300 blur-[2px]',
              'group-hover:blur-none group-hover:object-top group-hover:grayscale-0 group-hover:opacity-100 print:hidden'
            )}
            src={project.img}
            alt={project.title}
          />
        )}
        <motion.h4 className='font-medium text-center underline transition-opacity duration-500 ease-in-out underline-offset-4 print:text-left print:font-bold print:no-underline print:flex print:flex-row print:items-center print:gap-2'>
          <motion.span
            className='print:!transform-none shrink-0'
            whileInView={{ scale: [0.9, 1.05, 1], dur: 0.1 }}
          >
            {project.title}
            <span className='font-light hidden print:inline'>
              &nbsp;{project.year_end}
            </span>
          </motion.span>
          <span className='hidden print:flex print:leading-none font-light'>
            <Tags
              tags={Object.values(project.tech).flat()}
              className='print:inline'
            />
          </span>
        </motion.h4>
        <ul className='hidden pl-6 list-circle print:block'>
          {[project.description]
            .flat()
            .map((description: string, i: number) => (
              <li key={i}>{description}</li>
            ))}
        </ul>
        <div className='flex flex-col gap-1 justify-center print:hidden'>
          {Object.values(project.tech ?? {}).map(
            (tech: string[], i: number) => (
              <Tags
                key={i}
                tags={tech}
                className={cn(
                  'justify-center transition-opacity duration-500 ease-in-out',
                  project.img && 'group-hover:opacity-0'
                )}
              />
            )
          )}
        </div>
      </motion.div>
      {showModal &&
        createPortal(
          <AnimatePresence>
            <div
              className='grid fixed inset-0 z-10 place-items-center p-4 dot-blur'
              ref={overlayRef}
              onClick={(e) =>
                overlayRef.current == e.target ? setShowModal(false) : null
              }
            >
              <motion.div
                className='w-full max-w-screen-sm max-h-[80vh] rounded-lg bg-gray-50 dark:bg-gray-900 flex flex-col shadow-xl'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className='flex flex-row flex-none items-center py-2 pr-2 pl-4 border-b'>
                  <h3 className='flex-1 text-xl font-bold'>{project.title}</h3>
                  <button
                    className='p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700'
                    onClick={() => setShowModal(false)}
                    aria-label='Close overlay'
                  >
                    <CgClose className='w-5 h-5' />
                  </button>
                </div>

                <div className='flex overflow-y-auto flex-col flex-1 gap-1 items-center p-4'>
                  {project.url || project.img ? (
                    <div className='text-center mb-3 max-w-[100%]'>
                      <a
                        href={project.url || null}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {project.img && (
                          <img
                            src={project.img}
                            alt={project.title}
                            className='max-h-[50dvh] rounded-md shadow-sm'
                          />
                        )}
                        {project.url?.startsWith('http') && (
                          <span className='text-xs truncate max-w-[50%] opacity-35'>
                            {project.url}
                          </span>
                        )}
                      </a>
                    </div>
                  ) : null}
                  <ul className='px-8 list-circle'>
                    {[project.description]
                      .flat()
                      .map((description: string, i: number) => (
                        <li key={i}>{description}</li>
                      ))}
                  </ul>
                  {Object.values(project.tech ?? {}).map(
                    (tech: string[], i: number) => (
                      <Tags key={i} tags={tech} className='justify-center' />
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
});
