import { HiOutlineMail, HiOutlinePrinter } from 'react-icons/hi'

export default function Footer(): JSX.Element {
  return (
    <div className="flex flex-row justify-end w-full gap-4 px-2 pt-4 mb-16 border-t-2 print:hidden border-gray-400/20">
      <a
        href="mailto:hello@jaycsantos.com"
        target="_blank"
        className="text-sm text-blue-500 transition-colors hover:text-blue-600 "
      >
        <HiOutlineMail className="inline w-4 h-4" /> email
      </a>
      <button
        onClick={() => window.print()}
        className="text-sm text-green-500 transition-colors hover:text-green-600 "
        aria-label="Print Résumé"
      >
        <HiOutlinePrinter className="inline w-4 h-4" /> cv
      </button>

    </div>
  );
}
