import { ProjectProps } from '@/app/ProjectItem';
import { useState } from 'react';
import { ExperienceItem } from './ExperienceItem';
import { cl } from '@/utils/cl';

export interface TimelineProps {
  id?: string;
  title?: string;
  description?: string | string[];
  entity?: string;
  year_start: string;
  year_end: string;
  month_start: string;
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
  showYear,
}: {
  item: TimelineProps;
  index: number;
  list: TimelineProps[];
  showYear: (year: string) => JSX.Element;
}) {
  const [showAll, setShowAll] = useState(false);

  let hasLowPrio = false;

  return (
    <>
      <li
        key={'item' + index}
        className={cl(
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
        className={cl(
          'flex relative flex-col gap-2 pb-4 pl-4 sm:col-span-2 md:col-span-3 sm:px-8',
          'print:px-0 print:col-span-2 print:order-3',
          index == 0 && 'print:mt-6'
        )}
      >
        {Object.keys(item.projects ?? {})
          .toReversed()
          .map(year => {
            hasLowPrio =
              hasLowPrio ||
              item.projects[year].find(p => p.priority == 'low') != null;
            const projects = item.projects[year].filter(
              project => project.priority != 'low' || showAll
            );

            return (
              projects.length > 0 && (
                <ul
                  key={year}
                  className='grid grid-cols-1 gap-2 md:grid-cols-2 print:flex print:flex-col print:gap-3'
                >
                  {projects.map((project, pid) => (
                    <li
                      key={'project' + pid}
                      className={project.priority == 'low' && 'print:hidden'}
                    >
                      {showYear(project.year_end)}
                      {project.element}
                    </li>
                  ))}
                </ul>
              )
            );
          })}
        {hasLowPrio && (
          <div className='flex justify-center print:hidden'>
            <button
              className='px-4 py-1 text-sm text-gray-700 rounded-md border transition-all duration-300 border-gray-600/10 hover:border-gray-400 dark:text-gray-300 dark:border-gray-400/10 dark:hover:border-gray-400'
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'hide some' : 'show more'}
            </button>
          </div>
        )}
      </li>
    </>
  );
}
