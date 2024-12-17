import { CgClose } from 'react-icons/cg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Tags } from '../components/Tags';
import { cl } from '@/utils/cl';

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
}

export function ProjectItem({
  project,
  index,
}: {
  project: ProjectProps;
  index: number;
}) {
  const [show, setShow] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  // const { setProject } = useContext(ProjectContext);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShow(false);
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
      <motion.div
        className='flex relative flex-col gap-4 items-stretch p-3 overflow-clip bg-gray-200 rounded-md border transition-all duration-300 dark:bg-gray-800/20 group print:border-0 border-gray-600/10 dark:border-gray-400/10 hover:border-gray-400 dark:hover:border-gray-400 print:gap-0 print:p-0 print:break-inside-avoid sm:h-full'
        tabIndex={0}
        role='button'
        aria-label={project.title}
        aria-expanded={false}
        onClick={() => setShow(true)}
        // TODO: add delay to setProject
        // onMouseEnter={() => setProject(project)}
        // onMouseLeave={() => setProject(null)}
      >
        {project.img && (
          <div
            className='absolute inset-0 w-full h-full z-0 bg-cover bg-bottom grayscale opacity-5 blur-[2px] group-hover:blur-none group-hover:bg-top group-hover:grayscale-0 transition-all group-hover:opacity-100 duration-300'
            style={{
              backgroundImage: `url(${project.img})`,
            }}
          />
        )}
        <motion.h4 className='font-medium text-center underline transition-opacity duration-500 ease-in-out underline-offset-4 print:text-left print:font-bold print:no-underline print:flex print:flex-row print:items-center print:gap-2'>
          <motion.span
            className='print:hidden'
            whileInView={{ scale: [0.9, 1.05, 1], dur: 0.1 }}
          >
            {project.title}
          </motion.span>
          <span className='hidden print:flex print:flex-none'>
            {project.title}
          </span>
          <span className='hidden print:flex print:leading-none'>
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
                className={cl(
                  'justify-center transition-opacity duration-500 ease-in-out',
                  project.img && 'group-hover:opacity-0'
                )}
              />
            )
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {show && (
          <div
            className='flex fixed inset-0 z-10 justify-center items-center p-4 dot-blur'
            ref={overlayRef}
            onClick={e =>
              overlayRef.current === e.target ? setShow(false) : null
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
                  onClick={() => setShow(false)}
                  aria-label='Close overlay'
                >
                  <CgClose className='w-5 h-5' />
                </button>
              </div>

              <div className='flex overflow-y-auto flex-col flex-1 gap-1 items-center p-4'>
                {project.url && (
                  <div className='text-center mb-3 max-w-[100%]'>
                    <a
                      href={project.url}
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
                )}
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
        )}
      </AnimatePresence>
    </>
  );
}
