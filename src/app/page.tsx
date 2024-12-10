'use client';

import Timeline from "@/app/Timeline";
import { ClientOnly } from "@/components/ClientOnly";
import { Tags } from "@/components/Tags";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Waves } from "@/components/Waves";
import { useMediaQuery } from "@uidotdev/usehooks";
import { motion, MotionConfig } from "motion/react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePrinter } from 'react-icons/hi';
import { PiCpu, PiGear, PiGlobeHemisphereEast, PiLockKey, PiPencilLine, PiStarBold } from "react-icons/pi";
import Moment from 'react-moment';

export default function Home(): JSX.Element {
  return (
    <MotionConfig reducedMotion="user">
      <Header className="mt-[30vh] print:mt-0" />
      <Waves className="absolute top-0 left-0 w-full h-dvh bg-backgroundSky print:hidden" color="var(--background)" />

      <main className="container flex relative flex-col self-center p-2 max-w-screen-lg min-h-full sm:p-4 md:p-8 lg:p-16 print:max-w-none print:p-0">
        <Intro />
        <ClientOnly>
          <Timeline />
        </ClientOnly>
      </main >
      <Footer />
    </MotionConfig >
  );
}


function Header({ className }: { className?: string }) {
  return (
    <motion.div className={"sticky top-0 z-50 flex flex-row align-bottom print:static " + className} variants={{
      hidden: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 }
    }}>
      <div className="fixed top-0 right-0 left-0 h-16 dot-blur dot-blur-fade-b print:hidden" />

      <h1 className="z-20 flex-1 gap-4 pt-2 pb-6 pl-8 text-4xl font-bold text-orange-600 print:py-6 print:pl-0 dark:text-orange-400">
        <span className="print:hidden">
          Jayc Santos
        </span>
        <span className="hidden print:block">
          Jaycee Ross Santos
        </span>
      </h1>

      <div className="fixed top-2 right-2 z-30 sm:grid-cols-3 sm:gap-1 sm:grid print:hidden">
        <ThemeSwitcher />
        <a href="https://github.com/jaycsantos" target="" className="hidden justify-center items-center w-10 h-10 rounded-lg transition-colors sm:flex hover:bg-gray-100 dark:hover:bg-gray-700" title="GitHub">
          <FaGithub className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/jaycsantos/" target="_blank" className="hidden justify-center items-center w-10 h-10 rounded-lg transition-colors sm:flex hover:bg-gray-100 dark:hover:bg-gray-700" title="LinkedIn">
          <FaLinkedin className="w-5 h-5" />
        </a>
      </div>
      <p className="hidden flex-col flex-none justify-center text-sm text-right print:flex">
        <span>Makati, Philippines</span>
        <a href="mailto:hello@jaycsantos.com" className="text-blue-600 underline">hello@jaycsantos.com</a>
      </p>
    </motion.div >
  );
}

function Footer(): JSX.Element {
  return (
    <div className="flex flex-row gap-2 items-center px-2 pt-4 mb-16 w-full border-t print:hidden border-gray-400/20">
      <a className="px-2 text-blue-500 transition-colors button-link hover:text-blue-600"
        href="mailto:hello@jaycsantos.com"
        target="_blank"
        rel="noopener noreferrer">
        <HiOutlineMail className="inline mr-1 w-5 h-5" /> email
      </a>
      <button className="px-2 text-green-500 transition-colors button-link hover:text-green-600"
        onClick={() => window.print()}
        title="Print résumé">
        <HiOutlinePrinter className="inline mr-1 w-5 h-5" /> résumé
      </button>
      <span className="flex-1 text-xs text-center opacity-20 print:hidden">
        &copy; 2024 Jaycee Santos
      </span>

      <a className="button-link print:hidden sm:hidden"
        href="https://github.com/jaycsantos"
        title="GitHub"
        rel="noopener noreferrer">
        <FaGithub className="w-5 h-5" title="GitHub" />
      </a>
      <a className="button-link print:hidden sm:hidden"
        href="https://www.linkedin.com/in/jaycsantos/"
        title="LinkedIn"
        rel="noopener noreferrer">
        <FaLinkedin className="w-5 h-5" title="LinkedIn" />
      </a>
    </div>
  );
}

function Intro({ className }: { className?: string }) {
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
      <div className="flex flex-row gap-1 items-start pl-4 mx-2 sm:justify-end sm:mx-0 sm:pl-0 sm:px-8 print:hidden">
        <motion.span variants={{ hidden: { x: -10, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
          <PiGlobeHemisphereEast className="inline mt-1 w-5 h-5 text-orange-500 print:hidden" title="Location" />
        </motion.span>
        <motion.span variants={{ hidden: { x: -10, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
          <sub className="text-sm text-right opacity-50">Makati, Philippines</sub>
        </motion.span>
      </div>
      <div className="flex-1 pl-4 sm:px-8">
        <h4 className="md:w-[400px]">
          Seasoned software engineer since 2007, specializing in JavaScript and its ecosystem. Solving tomorrow's problems.
        </h4>
        <p className="hidden mt-4 print:block">
          {'With almost 2 decades of development experience, I\'ve honed my skills as a software engineer. From my early days in indie game development to today\'s sophisticated web applications, I\'ve consistently delivered innovative solutions. I\'m committed to creating user-centric experiences, employing best practices, and leveraging modern development tools and techniques.'}
        </p>
      </div>
      <div className="flex flex-row gap-1 items-start pl-4 mx-2 text-sm lowercase sm:justify-end sm:mx-0 sm:pl-0 sm:px-8 print:justify-start print:ml-1 print:hidden">
        <Tags tags={['typescript', 'react', 'nextjs']} className="justify-end print:ml-8">
          <motion.li variants={{ hidden: { x: -10, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
            <PiStarBold className="inline w-5 h-5 text-green-500 print:hidden" title="Favorites" />
            <span className="hidden print:inline">Favorites: </span>
          </motion.li>
        </Tags>
      </div>
      <ul className="flex flex-col flex-1 gap-2 pl-4 text-sm lowercase sm:px-8 print:justify-end">
        <li className="print:ml-8">
          <Tags tags={['oop', 'functional', 'async', 'realtime', 'offline']}>
            <li className="print:inline">
              <PiGear className="inline w-5 h-5 text-blue-400 print:hidden" title="Engineering" />
              <span className="hidden print:inline">Engineering: </span>
            </li>
          </Tags>
        </li>
        <li className="print:ml-8">
          <Tags tags={['auth', 'validation', 'encryption', 'access control']}>
            <li className="print:inline">
              <PiLockKey className="inline w-5 h-5 text-blue-400 print:hidden" title="Security" />
              <span className="hidden print:inline">Security: </span>
            </li>
          </Tags>
        </li>
        <li className="print:ml-8">
          <Tags tags={['Analytics', 'User Research', 'Wireframing', 'Prototyping']}>
            <li className="print:inline">
              <PiPencilLine className="inline w-5 h-5 text-blue-400 print:hidden" title="UX/UI" />
              <span className="hidden print:inline">UX/UI: </span>
            </li>
          </Tags>
        </li>
        <li className="print:ml-8">
          <Tags tags={['Compress', 'Cache', 'Responsive Design', 'WCAG']}>
            <li className="print:inline">
              <PiCpu className="inline w-5 h-5 text-blue-400 print:hidden" title="Optimization" />
              <span className="hidden print:inline">Optimization: </span>
            </li>
          </Tags>
        </li>
      </ul>
    </motion.div>
  );
}
