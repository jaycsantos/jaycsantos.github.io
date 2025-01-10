import { ProjectProps } from '@/app/ProjectItem';
import { createContext, useContext, useState } from 'react';
import { ExperienceItem } from './ExperienceItem';
import { cn } from '@/utils/cl';
import { TimelineYear } from '@/components/TimelineYear';

export interface TimelineProps {
  id?: string;
  title?: string;
  description?: string | string[];
  entity?: string;
  year_start?: string;
  year_end: string;
  month_start?: string;
  month_end: string;
  type?: 'work' | 'study';
  projects?: { [key: string]: ProjectProps[] };
  color?: string;
  tech?: string[] | { [key: string]: string[] };
}

export function TimelineItem({
  item,
  index,
  list,
}: {
  item: TimelineProps;
  index: number;
  list: TimelineProps[];
}) {
  return (
    <>
      <li
        key={'item' + index}
        className={cn(
          'relative pb-4 bg-clip-border sm:pr-8 sm:border-r print:p-0 print:col-span-2',
          item.type == 'work' ? 'print:order-1' : 'print:order-2',
          item.type
        )}
        style={{
          '--border-start': item.color ?? '#808080',
          '--border-end': list[index + 1]?.color ?? '#808080',
        }}
      >
        <ExperienceItem
          key={item.id}
          item={item}
          className='sticky top-24 pb-4 print:static print:pt-0 print:pb-2 print:pr-4'
        />
      </li>
      <li
        key={'projects' + index}
        className={cn(
          'flex relative flex-col gap-2 pb-4 pl-4 sm:col-span-2 md:col-span-3 sm:px-8',
          'print:px-0 print:col-span-2 print:order-3 print:empty:hidden print:break-inside-avoid',
          index == 0 && 'print:mt-6'
        )}
      >
        {index == 0 && (
          <h2 className='hidden mb-4 text-xl font-medium print:block'>
            Selected Notable Projects
            <hr />
          </h2>
        )}
        <Projects projectsPerYear={item.projects} />
      </li>
    </>
  );
}

function Projects({
  projectsPerYear,
}: {
  projectsPerYear: { [key: string]: ProjectProps[] };
}) {
  const [showAll, setShowAll] = useState(false);

  let hasLowPrio = false;

  return (
    <>
      {Object.keys(projectsPerYear ?? {})
        .toReversed()
        .map((year) => {
          hasLowPrio =
            hasLowPrio ||
            projectsPerYear[year].find((p) => p.priority == 'low') != null;
          const projects = showAll
            ? projectsPerYear[year]
            : projectsPerYear[year].filter((p) => p.priority != 'low');
          return (
            projects.length > 0 && (
              <ul
                key={year}
                className='grid grid-cols-1 gap-2 md:grid-cols-2 print:flex print:flex-col print:gap-3'
              >
                {projects.map((project, pidx) => (
                  <li
                    key={pidx}
                    className={
                      project.priority == 'low' ? 'print:hidden' : undefined
                    }
                  >
                    {pidx == 0 && (
                      <TimelineYear year={year}>
                        <h5 className='px-2 inline-block font-bold border mb-2 text-sm sm:pb-0 rounded-full border-[#808080] sm:absolute sm:left-0 -translate-x-4 sm:translate-x-[-50%] bg-background print:hidden'>
                          {year}
                        </h5>
                      </TimelineYear>
                    )}
                    {project.element}
                  </li>
                ))}
              </ul>
            )
          );
        })}
      {hasLowPrio && (
        <div className='flex justify-start print:hidden'>
          <button
            className='px-4 py-1 text-sm text-gray-700 rounded-md border transition-all duration-300 border-gray-600/10 hover:border-gray-400 dark:text-gray-300 dark:border-gray-400/10 dark:hover:border-gray-400'
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'hide some' : 'show more'}
          </button>
        </div>
      )}
    </>
  );
}
