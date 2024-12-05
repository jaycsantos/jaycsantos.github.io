'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import { useTheme } from 'next-themes'
import React, { useMemo, useState } from 'react'
import Moment from 'react-moment'
import { generateColors } from '../utils/color-generator'
import Tags from './tags'
import { BsChevronDown } from "react-icons/bs";
import { AnimatePresence, motion, useAnimate } from 'motion/react'
import ProjectItem, { ProjectProps } from './project_item'

export interface TimelineProps {
  id?: string;
  title?: string;
  description?: string[];
  entity?: string;
  year_start: string;
  year_end: string;
  month_start: string;
  month_end: string;
  projects?: { [key: string]: ProjectProps[] };
  color?: string;
  tech?: string[];
}

export default function Timeline() {
  const isPrint = useMediaQuery('print');
  const { resolvedTheme } = useTheme();

  const data = useMemo(() => getData(), []);
  console.log('data', data);

  const coloredData = useMemo(() => {
    const colors = generateColors(data.length, resolvedTheme == 'dark');
    const coloredData = [...data];
    coloredData.forEach((work, index) => work.color = colors[index]);
    return coloredData;
  }, [data, resolvedTheme]);

  let lastYear: string | undefined;

  return (
    <ul className="flex-grow-0 timeline-grid">
      {coloredData.map((item, index) => (
        <React.Fragment key={'d' + index}>
          <li key={'item' + index}
            className="relative pb-4 sm:pr-8 bg-clip-border sm:border-r print:px-0"
            style={{
              '--border-start': item.color ?? '#808080',
              '--border-end': coloredData[index + 1]?.color ?? '#808080'
            }}
          >
            <TimelineItem key={item.id} item={item} className="sticky pb-4 print:static top-24 print:pt-0 print:pb-2" />
          </li>
          <li className="relative flex flex-col gap-2 pb-4 pl-4 sm:px-8 print:px-4">
            {Object.keys(item.projects ?? {}).toReversed().map((year) => {
              return (
                <ul key={year} className="grid grid-cols-1 gap-2 md:grid-cols-2 print:flex print:flex-col print:gap-3" >
                  {item.projects[year].map((project, pid) => (
                    <li key={'project' + pid}>
                      {project.year_end != lastYear && (lastYear = project.year_end) &&
                        <h5 className="px-2 inline-block font-bold border mb-2 text-sm sm:pb-0 rounded-full sm:absolute sm:left-0 -translate-x-4 sm:translate-x-[-50%] bg-background print:static print:border-none print:translate-x-0"
                          style={{ borderColor: item.color }}
                        >
                          {project.year_end}
                        </h5>
                      }
                      <ProjectItem key={'p' + pid} project={project} index={0} />
                    </li>
                  ))}
                </ul>
              )
            })}
          </li>
        </React.Fragment>
      ))
      }
    </ul >
  )
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

function TimelineItem({ item, className }: { item: TimelineProps, className?: string }) {
  const isPrint = useMediaQuery('print');
  const [shown, setShown] = useState(false);
  const [scope, animate] = useAnimate();

  const show = function (value: boolean) {
    if (scope.current) {
      animate(scope.current, {
        display: 'block',
        opacity: value ? 1 : 0,
        height: value ? ['0px', 'auto'] : ['auto', '0px'],
      }, { duration: 0.3 })
        .then(() => scope.current.classList.toggle('hidden', !value));
    }
    setShown(value);
  }

  return (
    <>
      <AnimatePresence>
        {shown && item.description && !isPrint &&
          <motion.div className="fixed top-0 left-0 right-0 -bottom-8 translate-y-[-1.5rem] z-10 dot-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />}
      </AnimatePresence>
      <div className={[
        'relative flex-col pt-2 rounded-md transition-all duration-300 pl-2 pr-4 print:px-0 print:break-inside-avoid',
        (shown ? 'sm:pl-4 sm:pr-2 z-20' : ''),
        className
      ].join(' ')}
        onMouseOver={() => show(true)}
        onMouseLeave={() => show(false)}
        onClick={() => show(!shown)}
        tabIndex={0}
        role="button"
        aria-label={`More details about ${item.title}`}
        aria-expanded={shown}
      >
        <div className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-bold"
              style={{ color: item.color }}
            >
              {item.title}
            </h3>
            <div className="text-sm">
              <Moment className="inline-block" parse="YYYYMM" format="MMM YYYY" date={item.year_start + item.month_start} />
              &nbsp;-&nbsp;<Moment className="inline-block" parse="YYYYMM" format="MMM YYYY" date={item.year_end + item.month_end} />&nbsp;
              <span className="inline-block">{item.entity}</span>
            </div>
          </div>
          <BsChevronDown className={`w-5 h-5 sm:hidden transition-transform duration-300 ${shown ? 'rotate-180' : ''} ${item.description ? '' : 'hidden'}`} />
        </div>
        {item.description && <div ref={scope} className="z-30 mt-2 pl-2 sm:absolute sm:w-[200%] md:w-[300%] sm:left-[-2px] sm:pl-4 bg-gray-100 hidden overflow-hidden rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 print:static print:block print:border-none">
          <ul className="m-4 text-justify list-disc print:text-left">
            {item.description?.map((v, i) => <li key={i}>{v}</li>)}
          </ul>
        </div>}
      </div >
    </>
  );
}
