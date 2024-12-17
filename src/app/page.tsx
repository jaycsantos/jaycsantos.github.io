'use client';

import { ClientOnly } from '@/components/ClientOnly';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Waves } from '@/components/Waves';
import { cl } from '@/utils/cl';
import { MotionConfig } from 'motion/react';
import { Suspense } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePrinter } from 'react-icons/hi';
import Timeline from './Timeline';
import Intro from './Intro';

export default function Home(): JSX.Element {
  return (
    <MotionConfig reducedMotion='user'>
      <Header className='mt-[30vh] print:mt-0' />
      <Waves
        className='absolute top-0 left-0 w-full h-dvh bg-backgroundSky print:hidden'
        color='var(--background)'
      />

      <main className='container flex relative flex-col self-center p-2 max-w-screen-lg min-h-full sm:p-4 md:p-8 lg:p-16 print:max-w-none print:p-0'>
        <Intro />
        <ClientOnly>
          <Timeline />
        </ClientOnly>
      </main>
      <Footer />
    </MotionConfig>
  );
}

function Header({ className }: { className?: string }) {
  return (
    <div
      className={cl(
        'flex sticky top-0 z-50 flex-row align-bottom print:static',
        className
      )}
    >
      <div className='fixed top-0 right-0 left-0 h-16 dot-blur dot-blur-fade-b print:hidden' />

      <h1 className='z-20 flex-1 gap-4 pt-2 pb-6 pl-8 text-4xl font-bold text-orange-600 print:py-6 print:pl-0 dark:text-orange-400'>
        <span className='print:hidden'>Jayc Santos</span>
        <span className='hidden print:block'>Jaycee Ross Santos</span>
      </h1>

      <div className='fixed top-2 right-2 z-30 sm:grid-cols-3 sm:gap-1 sm:grid print:hidden'>
        <ThemeSwitcher />
        <a
          href='https://github.com/jaycsantos'
          target=''
          className='hidden justify-center items-center w-10 h-10 rounded-lg transition-colors sm:flex hover:bg-gray-100 dark:hover:bg-gray-700'
          title='GitHub'
        >
          <FaGithub className='w-5 h-5' />
        </a>
        <a
          href='https://www.linkedin.com/in/jaycsantos/'
          target='_blank'
          className='hidden justify-center items-center w-10 h-10 rounded-lg transition-colors sm:flex hover:bg-gray-100 dark:hover:bg-gray-700'
          title='LinkedIn'
        >
          <FaLinkedin className='w-5 h-5' />
        </a>
      </div>
      <p className='hidden flex-col flex-none justify-center text-sm text-right print:flex'>
        <span>Makati, Philippines</span>
        <a
          href='mailto:hello@jaycsantos.com'
          className='text-blue-600 underline'
        >
          hello@jaycsantos.com
        </a>
      </p>
    </div>
  );
}

function Footer(): JSX.Element {
  return (
    <>
      <div className='flex flex-row gap-2 items-center px-2 pt-4 mb-16 w-full border-t print:hidden border-gray-400/20'>
        <a
          className='px-2 text-blue-500 transition-colors button-link hover:text-blue-600'
          href='mailto:hello@jaycsantos.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <HiOutlineMail className='inline mr-1 w-5 h-5' /> email
        </a>
        <button
          className='px-2 text-green-500 transition-colors button-link hover:text-green-600'
          onClick={() => window.print()}
          title='Print résumé'
        >
          <HiOutlinePrinter className='inline mr-1 w-5 h-5' /> résumé
        </button>
        <span className='flex-1 text-xs text-center opacity-20 print:hidden'>
          &copy; 2024 Jaycee Santos
        </span>

        <a
          className='button-link print:hidden sm:hidden'
          href='https://github.com/jaycsantos'
          title='GitHub'
          rel='noopener noreferrer'
        >
          <FaGithub className='w-5 h-5' title='GitHub' />
        </a>
        <a
          className='button-link print:hidden sm:hidden'
          href='https://www.linkedin.com/in/jaycsantos/'
          title='LinkedIn'
          rel='noopener noreferrer'
        >
          <FaLinkedin className='w-5 h-5' title='LinkedIn' />
        </a>
      </div>
      <div className='hidden text-xs text-right text-gray-400 print:block'>
        cv printed from jaycsantos.com
      </div>
    </>
  );
}
