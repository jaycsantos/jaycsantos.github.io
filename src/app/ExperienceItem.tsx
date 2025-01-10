import { cn } from '@/utils/cl';
import { useMediaQuery } from '@uidotdev/usehooks';
import { AnimatePresence, motion, useAnimate } from 'motion/react';
import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import Moment from 'react-moment';
import { TimelineProps } from './TimelineItem';

export function ExperienceItem({
  item,
  className,
}: {
  item: TimelineProps;
  className?: string;
}) {
  const isPrint = useMediaQuery('print');
  const [shown, setShown] = useState(false);
  const [scope, animate] = useAnimate();

  const show = function (value: boolean) {
    if (scope.current) {
      animate(
        scope.current,
        {
          display: 'block',
          opacity: value ? 1 : 0,
          height: value ? ['0px', 'auto'] : ['auto', '0px'],
        },
        { duration: 0.3 }
      ).then(() => scope.current.classList.toggle('hidden', !value));
    }
    setShown(value);
  };

  return (
    <>
      <AnimatePresence>
        {shown && item.description && !isPrint && (
          <motion.div
            className='fixed top-0 left-0 right-0 -bottom-8 translate-y-[-1.5rem] z-10 dot-blur'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <div
        className={cn(
          'relative flex-col pt-2 pr-4 pl-2 rounded-md transition-all duration-300 print:px-0 print:break-inside-avoid',
          shown && 'z-20 sm:pl-4 sm:pr-2',
          className
        )}
        onMouseOver={() => show(true)}
        onMouseLeave={() => show(false)}
        onClick={() => show(!shown)}
        tabIndex={0}
        role='button'
        aria-label={`More details about ${item.title}`}
        aria-expanded={shown}
      >
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col print:flex-row print:items-center print:gap-2'>
            <h3
              className='text-lg font-bold shrink-0'
              style={{ color: item.color }}
            >
              {item.title}
            </h3>
            <div className='text-sm'>
              {item.month_start && (
                <>
                  <Moment
                    className='inline-block'
                    parse='YYYYMM'
                    format='MMM YYYY'
                    date={item.year_start + item.month_start}
                  />
                  &nbsp;-&nbsp;
                </>
              )}
              <Moment
                className='inline-block'
                parse='YYYYMM'
                format='MMM YYYY'
                date={item.year_end + item.month_end}
              />
              &nbsp;
              <em className='inline-block'>{item.entity}</em>
            </div>
          </div>
          <BsChevronDown
            className={cn(
              'w-5 h-5 sm:hidden transition-transform duration-300',
              shown && 'rotate-180',
              item.description ? undefined : 'hidden'
            )}
          />
        </div>
        {item.description && (
          <div
            ref={scope}
            className={cn(
              'z-30 mt-2 pl-2 sm:absolute sm:w-[200%] md:w-[300%] sm:left-[-2px] sm:pl-4 bg-gray-100 hidden overflow-hidden rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5',
              'print:m-0 print:static print:block print:border-none'
            )}
          >
            <ul className='m-4 text-justify list-square print:text-left print:my-0'>
              {item.description &&
                [item.description].flat().map((v, i) => <li key={i}>{v}</li>)}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
