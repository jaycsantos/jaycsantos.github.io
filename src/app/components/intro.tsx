'use client';

import React from 'react';
import { motion } from "motion/react";

const texts = {
  intro: 'Well seasoned software engineer since 2007, specializing in JavaScript and its ecosystem. Adding a touch of enchantment to user experiences.',
  print: 'With almost 2 decades of development experience, I\'ve honed my skills as a software engineer, now focusing on JavaScript and its rich ecosystem. From my early days in indie game development to today\'s sophisticated web applications, I\'ve consistently delivered innovative solutions. I\'m committed to creating user-centric experiences, employing best practices, and leveraging modern development tools and techniques.',
  tech: {
    'engineering': ['object-oriented', 'functional', 'async', 'test/behavioral', 'integrations', 'real-time/offline'],
    'security': ['Authentication', 'Authorization', 'Encryption', 'roles', 'permissions'],
    'ux/ui': ['User Research', 'Wireframing', 'Prototyping', 'Analytics'],
    'optimization': ['Performance', 'Compression', 'Caching', 'Accessibility', 'SEO', 'Responsive Design', 'WCAG compliance', 'SSR', 'PWA']
  }
}

export default function Intro() {
  return (
    <motion.section className="flex flex-col gap-4 px-8 text-md"
      variants={{
        hidden: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 }
      }}>
      <p className="italic">&quot;{texts.intro}&quot;</p>
      <p className="hidden print:block">{texts.print}</p>
      <ul className="mx-12 list-disc">
        {Object.entries(texts.tech).map(([key, value]) => (
          <li key={key}>
            <span className="opacity-60">{key}:</span>
            &nbsp;
            <code className="text-xs lowercase">{value.join(', ')}</code>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
