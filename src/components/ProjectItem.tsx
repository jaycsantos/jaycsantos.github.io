import { CgClose } from 'react-icons/cg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Tags } from './Tags';

export const ProjectContext = createContext<{ project: ProjectProps | null, setProject: (value: ProjectProps) => void }>(null);

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

export function ProjectItem({ project, index }: { project: ProjectProps, index: number }) {
  const [show, setShow] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  // const { setProject } = useContext(ProjectContext);

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
      <motion.div className="flex relative flex-col gap-4 items-stretch p-3 bg-gray-200 rounded-md border transition-all duration-300 dark:bg-gray-800/20 group print:border-0 border-gray-600/10 dark:border-gray-400/10 hover:border-gray-400 dark:hover:border-gray-400 print:gap-0 print:p-0 print:break-inside-avoid sm:h-full"
        tabIndex={0}
        role="button"
        aria-label={`More details about ${project.title}`}
        aria-expanded={false}
        onClick={() => setShow(true)}
      // TODO: add delay to setProject
      // onMouseEnter={() => setProject(project)}
      // onMouseLeave={() => setProject(null)}
      >
        {project.img &&
          <div className="absolute inset-0 w-full h-full z-0 bg-cover bg-top grayscale opacity-10 blur-[2px] group-hover:blur-none group-hover:rounded-md group-hover:grayscale-0 transition-all group-hover:opacity-100 duration-300"
            style={{
              backgroundImage: `url(${project.img})`,
            }}
          />}
        <motion.h4 className="font-medium text-center underline transition-opacity duration-500 ease-in-out underline-offset-4 print:text-left">
          <motion.span className="print:hidden" whileInView={{ scale: [0.9, 1.05, 1], dur: 0.1 }}>
            {project.title}
          </motion.span>
          <span className="hidden print:block">{project.title}</span>
        </motion.h4>
        <p className="hidden print:block">{project.description}</p>
        {project.tech &&
          <Tags tags={project.tech} className={`justify-center transition-opacity duration-500 ease-in-out ${project.img && 'group-hover:opacity-0'}`} />}
      </motion.div>

      <AnimatePresence>
        {show && (
          <div className="flex fixed inset-0 z-10 justify-center items-center p-4 dot-blur"
            ref={overlayRef}
            onClick={(e) => overlayRef.current === e.target ? setShow(false) : null}
          >
            <motion.div className="w-full max-w-screen-sm max-h-[80vh] rounded-lg bg-gray-50 dark:bg-gray-900 flex flex-col shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="flex flex-row flex-none items-center py-2 pr-2 pl-4 border-b">
                <h3 className="flex-1 text-xl font-bold">{project.title}</h3>
                <button className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShow(false)}
                  aria-label="Close overlay"
                >
                  <CgClose className="w-5 h-5" />
                </button>
              </div>

              <div className="flex overflow-y-auto flex-col flex-1 gap-4 items-center p-4">
                {project.url &&
                  <div className="text-center max-w-[100%]">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      {project.img && <img src={project.img} alt={project.title} className="max-h-[50dvh] rounded-md shadow-sm" />}
                      {project.url?.startsWith('http') && <span className="text-xs truncate max-w-[50%] opacity-35">
                        {project.url}
                      </span>}
                    </a>
                  </div>}
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
