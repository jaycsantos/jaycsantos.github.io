import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePrinter } from 'react-icons/hi'
import Moment from 'react-moment';

export default function Footer(): JSX.Element {
  return (
    <div className="flex flex-row items-center w-full gap-2 px-2 pt-4 mb-16 border-t print:hidden border-gray-400/20">
      <a className="px-2 text-blue-500 transition-colors button-link hover:text-blue-600 "
        href="mailto:hello@jaycsantos.com"
        target="_blank"
        rel="noopener noreferrer">
        <HiOutlineMail className="inline w-5 h-5 mr-1" /> email
      </a>
      <button className="px-2 text-green-500 transition-colors button-link hover:text-green-600"
        onClick={() => window.print()}
        title="Print résumé">
        <HiOutlinePrinter className="inline w-5 h-5 mr-1" /> résumé
      </button>
      <span className="flex-1 text-xs text-center opacity-20 print:hidden">
        &copy; <Moment format="YYYY" /> Jaycee Santos
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
