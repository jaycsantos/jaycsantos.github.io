'use client'

import { useTheme } from 'next-themes'
import React, { useMemo, useState } from 'react'
import { generateColors } from '../utils/color-generator'
import { ProjectItem, ProjectContext, ProjectProps } from './ProjectItem';
import { TimelineItem, TimelineProps } from './TimelineItem';

export default function Timeline() {
  const [project, setProject] = useState<ProjectProps | null>(null);
  const { resolvedTheme } = useTheme();

  const data = useMemo(() => getData(), []);

  const coloredData = useMemo(() => {
    const colors = generateColors(data.length, resolvedTheme == 'dark');
    const coloredData = [...data];
    coloredData.forEach((work, index) => (work.color = colors[index]));
    return coloredData;
  }, [data, resolvedTheme]);

  let lastYear: string | undefined;

  console.log('coloredData', coloredData);

  // TODO: maybe use project context as background somehow

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      <h2 className='hidden mb-4 text-xl font-medium print:block'>
        Experience / Notable Projects
        <hr />
      </h2>
      <ul className='flex-grow-0 bg-fixed bg-center bg-no-repeat transition-all duration-500 delay-200 content-visibility timeline-grid'>
        {coloredData.map((item, index) => (
          <React.Fragment key={'d' + index}>
            <li
              key={'item' + index}
              className='relative pb-4 bg-clip-border sm:pr-8 sm:border-r print:p-0 print:col-span-2'
              style={{
                '--border-start': item.color ?? '#808080',
                '--border-end': coloredData[index + 1]?.color ?? '#808080',
              }}
            >
              <TimelineItem
                key={item.id}
                item={item}
                className='sticky top-24 pb-4 print:static print:pt-0 print:pb-2 print:pr-4'
              />
            </li>
            <li className='flex relative flex-col gap-2 pb-4 pl-4 sm:col-span-2 md:col-span-3 sm:px-8 print:pl-10 print:pr-0 print:col-span-2'>
              {Object.keys(item.projects ?? {})
                .toReversed()
                .map(year => {
                  return (
                    <ul
                      key={year}
                      className='grid grid-cols-1 gap-2 md:grid-cols-2 print:flex print:flex-col print:gap-3'
                    >
                      {item.projects[year].map((project, pid) => (
                        <li key={'project' + pid}>
                          {project.year_end != lastYear &&
                            (lastYear = project.year_end) && (
                              <h5
                                className='px-2 inline-block font-bold border mb-2 text-sm sm:pb-0 rounded-full sm:absolute sm:left-0 -translate-x-4 sm:translate-x-[-50%] bg-background print:hidden'
                                style={{ borderColor: item.color }}
                              >
                                {project.year_end}
                              </h5>
                            )}
                          <ProjectItem
                            key={'p' + pid}
                            project={project}
                            index={0}
                          />
                        </li>
                      ))}
                    </ul>
                  );
                })}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </ProjectContext.Provider>
  );
}

function getData() {
  const data: TimelineProps[] = [];

  const employments: TimelineProps[] = require('../data/employment.json');
  const studies: TimelineProps[] = require('../data/studies.json');
  const items: TimelineProps[] = [...employments, ...studies];
  items.sort((a, b) => parseInt(b.year_end + b.month_end) - parseInt(a.year_end + a.month_end));

  for (let i = 0; i < items.length; i++) {
    const current = items[i];
    data.push({ ...current, projects: {} });

    if (i < items.length - 1) {
      const next = items[i + 1];
      const currentStart = parseInt(current.year_start + current.month_start);
      const nextEnd = parseInt(next.year_end + next.month_end);

      if (currentStart - nextEnd > 1) {
        // There's a gap, create a DateSpan object
        data.push({
          year_start: next.year_end,
          year_end: current.year_start,
          month_start: next.month_end,
          month_end: current.month_start,
          projects: {},
        });
      }
    }
  }

  const projects: ProjectProps[] = require('../data/projects.json');
  projects.sort((a, b) => parseInt(b.year_end + b.month_end) - parseInt(a.year_end + a.month_end));

  projects.forEach((project: ProjectProps) => {
    const timelineItem = data.find((timelineItem) => {
      const ym = project.year_end + project.month_end;
      return ym >= timelineItem.year_start + timelineItem.month_start && ym <= timelineItem.year_end + timelineItem.month_end;
    });
    if (timelineItem) {
      (timelineItem.projects[project.year_end] ??= []).push(project);
    }
  });

  return data.filter((v) => !!v.id || v.projects?.length);
}
