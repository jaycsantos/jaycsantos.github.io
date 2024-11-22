'use client';

import React from 'react';
import { motion } from "motion/react";

export default function Intro() {
  return (
    <motion.section className="flex flex-col gap-4" variants={{
      hidden: {opacity: 0, y:20},
      whileInView: {opacity: 1, y:0}
    }}>
      <h1 className="text-2xl font-bold text-orange-500">
        <span className="print:hidden">Jayc Santos</span>
        <span className="print:block hidden">Jaycee Ross Santos</span>
      </h1>
      <p className="text-md print:hidden">Well seasoned software engineer since 2007, specializing in JavaScript and its ecosystem. Adding a touch of enchantment to user experiences.</p>
      <p className="text-md print:block hidden">With a programming career that began in 2007, I have evolved from indie game development to seasoned web app development, where I have cultivated deep expertise in JavaScript and its ecosystem.</p>
      <p className="text-md print:block hidden">Specializing in JavaScript, I bring advanced skills in vanilla JS, TypeScript, Angular, and ReactJS, complemented by creating responsive, mobile-first designs using a strong command of HTML5, CSS3/SCSS and employing modern development tools and practices. My back-end experience includes proficiency in Node.js, and I am adept at managing a variety of databases including MySQL, NoSQL, CouchDB, MongoDB, and Firebase.</p>
    </motion.section>
  );
}
