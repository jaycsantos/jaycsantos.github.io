import { motion } from "motion/react";

export default function Tags({ tags, className, children }: { tags: string[], className?: string, children?: React.ReactNode }) {
  return (
    <motion.ul className={"inline-flex flex-wrap gap-1 print:gap-0 print:block " + className}
      initial="hidden"
      whileInView="visible"
      variants={{
        visible: { dur: 0.25, transition: { delay: 0.1, staggerChildren: 0.05, easings: 'spring', type: 'bounce' } },
      }}
    >
      {children}
      {tags.map((tag, tagIndex) => (
        <motion.li key={tagIndex}
          className="relative flex flex-row gap-0 text-xs print:inline"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="flex flex-none w-0 h-0 print:hidden
            border-t-[.75rem] border-t-transparent
            border-r-[.25rem] border-r-gray-100/70 dark:border-r-gray-800/70
            border-b-[.75rem] border-b-transparent">
          </div>
          <code className="flex-1 px-1 py-1 lowercase bg-gray-100/70 dark:bg-gray-800/70 print:px-0 print:py-0 print:bg-transparent print:inline-block">
            <span className="opacity-75">{tag}</span>
            <span className="hidden print:inline">,&nbsp;</span>
          </code>
          <div className="absolute -right-[0.25rem] w-0 h-0 print:hidden 
            border-t-[.75rem] border-t-gray-100/70 dark:border-t-gray-800/70
            border-r-[.25rem] border-transparent
            border-b-[.75rem] border-b-gray-100/70 dark:border-b-gray-800/70">
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}