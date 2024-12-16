import { cl } from '@/utils/cl';
import { motion } from 'motion/react';

export function Tags({
  tags,
  className,
  children,
}: {
  tags: string[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.ul
      className={cl(
        'inline-flex flex-wrap gap-1 print:gap-0 print:block',
        className
      )}
      initial='hidden'
      whileInView='visible'
      variants={{
        visible: {
          dur: 0.25,
          transition: {
            delay: 0.1,
            staggerChildren: 0.05,
            easings: 'spring',
            type: 'bounce',
          },
        },
      }}
    >
      {children}
      {tags.map((tag, tagIndex) => (
        <motion.li
          key={tagIndex}
          className='text-xs tech-tag print:inline'
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <code>{tag}</code>
        </motion.li>
      ))}
    </motion.ul>
  );
}