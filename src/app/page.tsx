'use client';

import React from "react";
import WorkHistory from "./components/work_history";
import Projects from "./components/projects";
import Intro from "./components/intro";
import { motion, MotionConfig } from "motion/react";

export default function Home(): JSX.Element {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <motion.main 
        className="container max-w-screen-lg flex flex-col gap-12"
        initial="hidden"
        whileInView="whileInView"
        viewport={{once: true}}
        variants={{
          whileInView: {transition: {delay: 0.5, duration: 0.5, staggerChildren: 0.05}}
        }}
      >
        <Intro />
        <WorkHistory />
        <Projects />
      </motion.main>
    </div>
  );
}
