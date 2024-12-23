import React from 'react';
import { motion } from "motion/react";

export interface WorkProps {
  title?: string;
  company?: string;
  period?: string;
  description?: string;
}

const workHistoryData = require('../data/work_history.json') as WorkProps[];

export default function WorkHistory() {
  return (
    <section className="flex flex-col gap-4">
      <motion.h3 className="text-xl font-bold text-sky-500 print:block" variants={{
        hidden: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 }
      }}>
        experience
      </motion.h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-10">
        {workHistoryData.map((work: WorkProps, index: number) => (
          <React.Fragment key={index}>
            <motion.div className="sm:col-span-3 lg:col-span-2 print:block" variants={{
              hidden: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 }
            }}>
              <span className="uppercase opacity-75">{work.period}</span>
              <div className="text-sm opacity-50">{work.company}</div>
            </motion.div>
            <motion.div className="gap-2 sm:col-span-7 lg:col-span-8 print:block" variants={{
              hidden: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 }
            }}>
              <div className="font-bold">{work.title}</div>
              <p className="mt-2">{work.description}</p>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
