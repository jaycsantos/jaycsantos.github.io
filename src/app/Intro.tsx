import { tagListItemVariant, Tags } from '@/components/Tags';
import { cn } from '@/utils/cl';
import { motion } from 'motion/react';
import {
  PiStarBold,
  PiMonitor,
  PiHardDrive,
  PiDatabase,
  PiCloud,
  PiFlask,
  PiGear,
  PiLockKey,
  PiPencilLine,
  PiCpu,
  PiGlobeHemisphereEast,
} from 'react-icons/pi';

const techStacks = {
  Front: [
    'react',
    'redux',
    'nextjs',
    'vue',
    'angular',
    'flutter',
    'tailwind',
    'bootstrap',
    'material',
  ],
  Back: ['node', 'express', 'php', 'nginx', 'docker'],
  Data: ['mongodb', 'mysql', 'firestore', 'couchdb'],
  Cloud: ['firebase', 'GCP', 'rest API'],
  Test: ['jest', 'mocha', 'chai'],
};
const devConcepts = {
  Engineering: ['oop', 'functional', 'async', 'realtime', 'offline', 'TDD/BDD'],
  Security: [
    'jwt',
    'sso',
    'auth',
    'validation',
    'encryption',
    'access control',
  ],
  UX: ['Analytics', 'User Research', 'Wireframing', 'Prototyping'],
  Optimization: [
    'Compression',
    'Cache',
    'SSR',
    'SSG',
    'Responsive Mobile First',
    'WCAG',
  ],
};

const Icons = {
  Favorites: (
    <PiStarBold
      className='inline w-5 h-5 text-green-500 print:hidden'
      title='Favorites'
    />
  ),
  Front: (
    <PiMonitor
      className='inline w-5 h-5 text-green-500 print:hidden'
      title='Front-end'
    />
  ),
  Back: (
    <PiHardDrive
      className='inline w-5 h-5 text-green-500 print:hidden'
      title='Back-end'
    />
  ),
  Data: (
    <PiDatabase
      className='inline w-5 h-5 text-green-500 print:hidden'
      title='Database'
    />
  ),
  Cloud: (
    <PiCloud
      className='inline w-5 h-5 text-green-500 print:hidden'
      title='Cloud'
    />
  ),
  Test: (
    <PiFlask
      className='inline w-5 h-5 text-green-500 print:hidden'
      title='Test'
    />
  ),
  Engineering: (
    <PiGear
      className='inline w-5 h-5 text-blue-400 print:hidden'
      title='Engineering'
    />
  ),
  Security: (
    <PiLockKey
      className='inline w-5 h-5 text-blue-400 print:hidden'
      title='Security'
    />
  ),
  UX: (
    <PiPencilLine
      className='inline w-5 h-5 text-blue-400 print:hidden'
      title='User Experience'
    />
  ),
  Optimization: (
    <PiCpu
      className='inline w-5 h-5 text-blue-400 print:hidden'
      title='Optimization'
    />
  ),
};

export default function Intro({ className }: { className?: string }) {
  return (
    <motion.div
      className='min-h-[calc(70vh)] print:min-h-min print:mb-4 print:h-auto print:my-0 -mt-2 sm:-mt-4 md:-mt-8 lg:-mt-16 bg-cover bg-center timeline-grid gap-2 sm:gap-0 print:gap-3 print:grid-cols-2'
      initial='hidden'
      animate='visible'
      variants={{
        visible: {
          dur: 0.25,
          transition: {
            staggerChildren: 0.05,
            easings: 'spring',
            type: 'bounce',
          },
        },
      }}
      style={{
        '--border-start': '#fb923c',
        '--border-end': '#fb923c',
      }}
    >
      <div className='flex flex-row gap-1 items-start pl-4 mx-2 sm:justify-end sm:mx-0 sm:pl-0 sm:px-8 print:hidden'>
        <PiGlobeHemisphereEast
          className='inline mt-1 w-5 h-5 text-orange-500 print:hidden'
          title='Location'
        />
        <sub className='text-sm text-right opacity-50'>Makati, Philippines</sub>
      </div>
      <div className='flex-1 pl-4 sm:px-8 sm:col-span-2 md:col-span-3 print:px-0 print:col-span-2'>
        <h4 className='md:w-[400px] print:hidden'>
          {
            'Seasoned software engineer since 2007, specializing in Javascript and its ecosystem.'
          }
        </h4>
        <p className='hidden mt-4 print:block print:mt-0'>
          {
            "With almost 2 decades of development experience, I've honed my skills as a software engineer. From my early days in indie game development to today's sophisticated web applications, I've consistently delivered innovative solutions. I'm committed to creating user-centric experiences, employing best practices, and leveraging modern development tools and techniques."
          }
        </p>
      </div>
      <div className='print:hidden' />
      <ul
        className={cn(
          'flex flex-col flex-1 gap-2 pl-4 text-sm lowercase',
          'sm:px-8 sm:col-span-2 md:col-span-3',
          'print:ml-0 print:px-0 print:gap-0 print:col-span-1'
        )}
      >
        {Object.entries(devConcepts).map(([key, value]) => (
          <li key={key}>
            <Tags tags={value} className='print:ml-2'>
              <motion.li className='print:inline' variants={tagListItemVariant}>
                {Icons[key as keyof typeof Icons]}
                <span className='hidden print:inline'>{key}: </span>
              </motion.li>
            </Tags>
          </li>
        ))}
      </ul>
      <div
        className={cn(
          'flex flex-col gap-2 pl-4 mx-2 text-sm lowercase',
          'sm:mx-0 sm:pl-0 sm:px-8 sm:items-end',
          'print:gap-0 print:hidden'
        )}
      >
        <Tags
          tags={['typescript', 'react']}
          className='print:ml-8 print:hidden'
        >
          <motion.li
            className='print:inline'
            variants={{
              hidden: { x: -10, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
          >
            <PiStarBold
              className='inline w-5 h-5 text-yellow-500 print:hidden'
              title='Likes'
            />
            <span className='hidden print:inline'>Likes: </span>
          </motion.li>
        </Tags>
      </div>
      <ul
        className={cn(
          'flex flex-col flex-1 gap-2 pl-4 text-sm lowercase',
          'sm:px-8 sm:col-span-2 md:col-span-3',
          'print:ml-0 print:px-0 print:justify-end print:gap-0 print:col-span-1'
        )}
      >
        {Object.entries(techStacks).map(([key, value]) => (
          <li key={key}>
            <Tags tags={value} className='print:ml-2'>
              <motion.li
                className='print:inline'
                variants={{
                  hidden: { x: -10, opacity: 0 },
                  visible: { x: 0, opacity: 1 },
                }}
              >
                {Icons[key as keyof typeof Icons]}
                <span className='hidden print:inline'>{key}: </span>
              </motion.li>
            </Tags>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
