'use client';

import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { generateColors } from '../utils/color-generator';
import { ProjectItem, ProjectProps } from './ProjectItem';
import { TimelineItem, TimelineProps } from './TimelineItem';
import { TimelineYearProvider } from '@/components/TimelineYear';

export default function Timeline() {
  const { resolvedTheme } = useTheme();

  const data = useMemo(() => getData(), []);

  const coloredData = useMemo(() => {
    const colors = generateColors(data.length, resolvedTheme == 'dark');
    const coloredData = [...data];
    coloredData.forEach((work, index) => (work.color = colors[index]));
    return coloredData;
  }, [data, resolvedTheme]);

  return (
    <>
      <h2 className='hidden mb-4 text-xl font-medium print:block print:mb-1'>
        Experience / Education
        <hr />
      </h2>
      <ul className='flex-grow-0 bg-fixed bg-center bg-no-repeat transition-all duration-500 delay-200 timeline-grid'>
        <TimelineYearProvider>
          {coloredData.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              list={coloredData}
            />
          ))}
        </TimelineYearProvider>
      </ul>
    </>
  );
}

function getData() {
  const data: TimelineProps[] = [];

  const employments: TimelineProps[] = require('../data/employment.json').map(
    (v: TimelineProps) => ({ ...v, type: 'work' })
  );
  const studies: TimelineProps[] = require('../data/studies.json').map(
    (v: TimelineProps) => ({
      ...v,
      type: 'study',
    })
  );
  const items: TimelineProps[] = [...studies, ...employments];
  items.sort(
    (a, b) =>
      parseInt(b.year_end + b.month_end) - parseInt(a.year_end + a.month_end)
  );

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
  projects.sort(
    (a, b) =>
      parseInt(b.year_end + b.month_end) - parseInt(a.year_end + a.month_end)
  );

  projects.forEach((project: ProjectProps) => {
    project.element = <ProjectItem key={project.title} project={project} />;
    const timelineItem = data.find((timelineItem) => {
      const ym = project.year_end + project.month_end;
      return (
        ym >= timelineItem.year_start + timelineItem.month_start &&
        ym <= timelineItem.year_end + timelineItem.month_end
      );
    });
    if (timelineItem) {
      (timelineItem.projects[project.year_end] ??= []).push(project);
    }
  });

  return data.filter((v) => !!v.id || v.projects?.length);
}
