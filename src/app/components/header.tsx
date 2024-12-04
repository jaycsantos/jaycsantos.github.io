import { motion } from "motion/react";
import ThemeSwitcher from "./theme-switcher";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Header({ className }: { className?: string }) {
  return (
    <motion.div className={"sticky top-0 z-50 flex flex-row align-bottom print:static " + className} variants={{
        hidden: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 }
      }}>
      <div className="fixed top-0 left-0 right-0 h-16 dot-blur dot-blur-fade-b print:hidden" />

      <h1 className="z-20 flex-1 gap-4 pt-2 pb-6 pl-8 text-4xl font-bold text-orange-600 print:py-6 print:pl-0 dark:text-orange-400">
        <span className="print:hidden">
          Jayc Santos
        </span>
        <span className="hidden print:block">
          Jaycee Ross Santos
        </span>
      </h1>

      <div className="fixed z-30 sm:grid-cols-3 sm:gap-1 top-2 right-2 sm:grid print:hidden">
        <ThemeSwitcher />
        <a href="https://github.com/jaycsantos" target="" className="items-center justify-center hidden w-10 h-10 transition-colors rounded-lg sm:flex hover:bg-gray-100 dark:hover:bg-gray-700" title="GitHub">
          <FaGithub className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/jaycsantos/" target="_blank" className="items-center justify-center hidden w-10 h-10 transition-colors rounded-lg sm:flex hover:bg-gray-100 dark:hover:bg-gray-700" title="LinkedIn">
          <FaLinkedin className="w-5 h-5" />
        </a>
      </div>
      <p className="flex-col justify-center flex-none hidden text-sm text-right print:flex">
        <span>Makati, Philippines</span>
        <a href="mailto:hello@jaycsantos.com" className="text-blue-600 underline ">hello@jaycsantos.com</a>
      </p>
    </motion.div >
  );
}