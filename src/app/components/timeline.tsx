'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import { motion, MotionConfig } from 'framer-motion'
import { useTheme } from 'next-themes'
import React, { useMemo, useState } from 'react'
import Moment from 'react-moment'
import { generateColors } from '../utils/color-generator'
import Tags from './tags'
import { BoltIcon, LinkIcon } from '@heroicons/react/24/outline'

interface TimelineProps {
  id?: string;
  title?: string;
  description?: string;
  entity?: string;
  year_start: string;
  year_end: string;
  month_start: string;
  month_end: string;
  projects?: ProjectProps[];
  color?: string;
  tech?: string[];
}

interface ProjectProps {
  title: string;
  year_end: string;
  month_end: string;
  description: string;
  ref_id: string;
  tech?: string[];
  url?: string;
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
    <MotionConfig reducedMotion={'user'}>
      <motion.section className="relative print:block print:opacity-100"
        initial={isPrint ? 'whileInView' : 'hidden'}
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={{
          hidden: { y: 20, opacity: 0 },
          whileInView: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              bounce: 0.4,
              duration: 1,
              delayChildren: 0.3,
              staggerChildren: 0.2
            }
          }
        }}
      >
        {/* <motion.h2
        className="mb-8 text-xl font-bold text-yellow-400"
        variants={{
          hidden: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 }
        }}
      >
        timeline
      </motion.h2> */}

        <ul key="timeline" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 print:sm:grid-cols-3">
          {coloredData.map((item, index) => (
            <React.Fragment key={'row-' + index}>
              <li key={'item-' + index}
                className="ml-8 pl-[4px] sm:ml-0 sm:pl-0 print:m-0 print:p-0"
                style={isPrint ? {} : { background: `linear-gradient(to bottom, ${item.color ?? '#808080'} 90%, ${coloredData[index + 1]?.color ?? '#808080'})` }}
              >
                <div className="relative h-full col-span-1 px-4 py-8 sm:pl-4 sm:pt-0 sm:pb-12 sm:pr-12 sm:text-right print:pr-2 print:sm:py-0 bg-background">
                  {'id' in item && <TimelineItem item={item} className="sticky pt-8 pb-4 print:static top-24 print:pt-0 print:pb-2" />}
                </div>
              </li>
              <li key={'work-' + index + '-projects'}
                className="relative flex flex-col ml-8 sm:ml-0 pl-[4px] print:bg-none print:pl-0 print:ml-0 print:sm:col-span-2 lg:col-span-2"
                style={isPrint ? {} : { background: `linear-gradient(to bottom, ${item.color ?? '#808080'} 90%, ${coloredData[index + 1]?.color ?? '#808080'})` }}
              >
                <ul className="flex flex-col h-full gap-2 pb-2 pl-10 sm:gap-8 sm:pb-12 sm:pl-12 print:pl-2 print:sm:gap-2 print:sm:pb-2 bg-background">
                  {item.projects?.map((project, projectIndex) => (
                    <React.Fragment key={'project-' + projectIndex}>
                      {project.year_end != lastYear && (lastYear = project.year_end) &&
                        <li key={lastYear} className="print:hidden">
                          <span
                            className="absolute left-0 flex items-center justify-center px-1 font-bold -translate-x-1/2 border-2 rounded-full bg-background"
                            style={{ borderColor: item.color }}
                          >
                            {project.year_end}
                          </span>
                        </li>
                      }
                      <li key={'work-' + index + '-project-' + projectIndex}>
                        {!project.ref_id &&
                          <BoltIcon fill={item.color} className="absolute left-0 w-8 h-8 translate-x-[calc(1px-50%)] -rotate-12 print:hidden"
                            style={{ color: item.color }} />}
                        <ProjectItem project={project} />
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </motion.section>
    </MotionConfig>
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
    data.push({ ...current, projects: [] });

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
          projects: [],
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
    if (timelineItem) timelineItem.projects.push(project);
  });

  return data.filter((v) => !!v.id || v.projects?.length);
}

function TimelineItem({ item, className }: { item: TimelineProps, className?: string }) {
  const isPrint = useMediaQuery('print');

  return (
    <motion.div className={`print:block print:opacity-100 ${className}`}
      variants={{
        hidden: { opacity: 0, x: -10 },
        whileInView: { opacity: 1, x: 0 }
      }}
    >
      <h3>
        <span
          className="font-bold print:text-[var(--foreground)]"
          style={isPrint ? {} : { color: item.color }}
        >
          {item.title}
        </span>
        <span className="inline-block text-sm opacity-50">&nbsp;- {item.entity}</span>
      </h3>
      <span className="text-sm">
        <Moment parse="YYYYMM" format="MMM YYYY" date={item.year_start + item.month_start} />
        &nbsp;-&nbsp;<Moment parse="YYYYMM" format="MMM YYYY" date={item.year_end + item.month_end} />
      </span>
      <p className="mt-2 opacity-75">{item.description}</p>
      {item.tech && <Tags tags={item.tech} />}
    </motion.div>
  );
}

function ProjectItem({ project, className }: { project: ProjectProps, className?: string }) {
  return (
    <motion.div
      className={`flex flex-col gap-1 print:gap-0 print:block print:opacity-100 ${className} ${!project.ref_id && 'md:-translate-x-4 print:translate-x-0'}`}
      variants={{
        hidden: { opacity: 0, x: 10 },
        whileInView: { opacity: 1, x: 0 }
      }}
    >
      <h3 className={`font-bold ${!project.ref_id && 'italic'}`}>
        {project.title}
        {project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-sky-500 print:hidden">
            <span className="sr-only">link to {project.title}</span>
            <LinkIcon className="inline w-4 h-4" />
          </a>
        )}
      </h3>
      <p className="opacity-75">{project.description}</p>
      {project.tech && <Tags tags={project.tech} />}
    </motion.div>
  );
}
