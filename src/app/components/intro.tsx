'use client';

import React, { useState } from 'react';
import { motion, useAnimate } from "motion/react";
import { PiCpu, PiGear, PiGlobeHemisphereEast, PiLockKey, PiPencilLine, PiStarBold } from 'react-icons/pi';
import Tags from './tags';

const texts = {
  intro: 'Well seasoned software engineer since 2007, specializing in JavaScript and its ecosystem.',
  print: 'With almost 2 decades of development experience, I\'ve honed my skills as a software engineer, now focusing on JavaScript and its rich ecosystem. From my early days in indie game development to today\'s sophisticated web applications, I\'ve consistently delivered innovative solutions. I\'m committed to creating user-centric experiences, employing best practices, and leveraging modern development tools and techniques.',
  tech: {
    'engineering': ['oop', 'functional', 'async', 'realtime', 'offline'],
    'security': ['auth', 'validation', 'encryption', 'access control'],
    'ux/ui': ['Analytics', 'User Research', 'Wireframing', 'Prototyping'],
    'optimization': ['Compress', 'Cache', 'Responsive Design', 'WCAG']
  }
}

export default function Intro({ className }: { className?: string }) {

  return (
    <motion.div className="h-[calc(70vh)] print:h-auto print:mt-0 -mt-2 sm:-mt-4 md:-mt-8 lg:-mt-16 bg-cover bg-center timeline-grid gap-2 sm:gap-0 print:gap-3 print:mb-8 print:grid-cols-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          dur: 0.25,
          transition: { delay: 0.1, staggerChildren: 0.05, easings: 'spring', type: 'bounce' }
        },
      }}
      viewport={{ once: true }}
      style={{
        '--border-start': '#fb923c',
        '--border-end': '#fb923c'
      }}
    >
      <div className="flex flex-row items-start gap-1 pl-4 mx-2 sm:justify-end sm:mx-0 sm:pl-0 sm:px-8 print:hidden">
        <motion.span variants={{ hidden: { x: -10, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
          <PiGlobeHemisphereEast className="inline w-5 h-5 mt-1 text-orange-500 print:hidden" title="Location" />
        </motion.span>
        <motion.span variants={{ hidden: { x: -10, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
          <sub className="text-sm text-right opacity-50">Makati, Philippines</sub>
        </motion.span>
      </div>
      <div className="flex-1 pl-4 sm:px-8">
        <h4 className="md:w-[400px]">
          Seasoned software engineer since 2007, specializing in JavaScript and its ecosystem.
        </h4>
        <p className="hidden mt-4 print:block">
          {'With almost 2 decades of development experience, I\'ve honed my skills as a software engineer, now focusing on JavaScript and its rich ecosystem. From my early days in indie game development to today\'s sophisticated web applications, I\'ve consistently delivered innovative solutions. I\'m committed to creating user-centric experiences, employing best practices, and leveraging modern development tools and techniques.'}
        </p>
      </div>
      <div className="flex flex-row items-start gap-1 pl-4 mx-2 text-sm lowercase sm:justify-end sm:mx-0 sm:pl-0 sm:px-8 print:justify-start print:ml-1 print:hidden">
        <Tags tags={['typescript', 'react', 'nextjs']} className="justify-end print:ml-8">
          <motion.span variants={{ hidden: { x: -10, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
            <PiStarBold className="inline w-5 h-5 text-green-500 print:hidden" title="Favorites" />
            <span className="hidden print:inline">Favorites: </span>
          </motion.span>
        </Tags>
      </div>
      <ul className="flex flex-col flex-1 gap-2 pl-4 text-sm lowercase sm:px-8 print:justify-end">
        <li className="print:ml-8">
          <Tags tags={texts.tech.engineering}>
            <PiGear className="inline w-5 h-5 text-blue-400 print:hidden" title="Engineering" />
            <span className="hidden print:inline">Engineering: </span>
          </Tags>
        </li>
        <li className="print:ml-8">
          <Tags tags={texts.tech.security}>
            <PiLockKey className="inline w-5 h-5 text-blue-400 print:hidden" title="Security" />
            <span className="hidden print:inline">Security: </span>
          </Tags>
        </li>
        <li className="print:ml-8">
          <Tags tags={texts.tech['ux/ui']}>
            <PiPencilLine className="inline w-5 h-5 text-blue-400 print:hidden" title="UX/UI" />
            <span className="hidden print:inline">UX/UI: </span>
          </Tags>
        </li>
        <li className="print:ml-8">
          <Tags tags={texts.tech.optimization}>
            <PiCpu className="inline w-5 h-5 text-blue-400 print:hidden" title="Optimization" />
            <span className="hidden print:inline">Optimization: </span>
          </Tags>
        </li>
      </ul>
    </motion.div>
  );
}
