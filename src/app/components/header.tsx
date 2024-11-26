import { motion } from "motion/react";
import ThemeSwitcher from "./theme-switcher";

export default function Header() {
  return (
    <>
      <div className="fixed print:hidden top-0 z-10 h-[6em] w-full dot-blur">
      </div>
      <motion.div className="sticky top-0 z-20 flex flex-row justify-between mx-2 print:static" variants={{
        hidden: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 }
      }}>
        <h1 className="pt-2 pb-8 text-3xl font-bold text-orange-600 print:py-0 dark:text-orange-400">
          <span className="print:hidden"
            style={{ textShadow: '3px 3px 0 var(--background),-1px -1px 0 var(--background),1px -1px 0 var(--background),-1px 1px 0 var(--background),1px 1px 0 var(--background)' }}
          >
            Jayc Santos
          </span>
          <span className="hidden print:block">
            Jaycee Ross Santos
          </span>
        </h1>
        <ThemeSwitcher className="print:hidden" />
        <p className="hidden text-sm print:block">
          <a href="mailto:hello@jaycsantos.com" className="text-blue-600 underline ">hello@jaycsantos.com</a><br />
          <span>(+63) 977 2889397</span>

        </p>
      </motion.div>
    </>
  );
}