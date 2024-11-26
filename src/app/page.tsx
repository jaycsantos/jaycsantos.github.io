'use client';

import React from "react";
import Intro from "./components/intro";
import { motion } from "motion/react";
import Timeline from "./components/timeline";
import Header from "./components/header";
import { ClientOnly } from "./components/client-only";
import Footer from "./components/footer";

export default function Home(): JSX.Element {
  return (
    <div className="items-center min-h-screen p-6 pb-20 print:p-4 print:pb-10 justify-items-center sm:p-8 md:p-12 lg:p-20">
      <ClientOnly>
        <motion.main
          className="container flex flex-col max-w-screen-lg gap-8 print:max-w-none"
          initial="hidden"
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
                staggerChildren: 0.1
              }
            }
          }}
        >
          <Header />
          <Intro />
          <Timeline />
        </motion.main>
        <Footer />
      </ClientOnly>
    </div>
  );
}
