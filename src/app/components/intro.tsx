'use client';

import React from 'react';
import { motion } from "motion/react";

export default function Intro() {
  return (
    <motion.section className="flex flex-col gap-4 text-md"
      variants={{
        hidden: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 }
      }}>
      <p className="italic">
        Well seasoned software engineer since 2007, specializing in JavaScript and its ecosystem. Adding a touch of enchantment to user experiences.
      </p>
      <p className="hidden print:block">
        With almost 2 decades of development experience, I&apos;ve honed my skills as a software engineer, now focusing on JavaScript and its rich ecosystem. From my early days in indie game development to today&apos;s sophisticated web applications, I&apos;ve consistently delivered innovative solutions. I&apos;m committed to creating user-centric experiences, employing best practices, and leveraging modern development tools and techniques.
      </p>
    </motion.section>
  );
}
