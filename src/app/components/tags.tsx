export default function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="inline-flex flex-wrap gap-1 print:gap-0 print:block">
      {tags.map((tag, tagIndex) => (
        <li key={tagIndex} className="relative flex flex-row gap-0 text-xs print:inline ">
          <div className="flex flex-none w-0 h-0 print:hidden
            border-t-[.75rem] border-t-transparent
            border-r-[.25rem] border-gray-400/20
            border-b-[.75rem] border-b-transparent">
          </div>
          <code className="flex-1 px-1 py-1 lowercase print:px-0 print:py-0 print:bg-transparent bg-gray-400/20">
            {tag}<span className="hidden print:inline">,&nbsp;</span>
          </code>
          <div className="absolute -right-[0.25rem] w-0 h-0 print:hidden 
            border-t-[.75rem] border-t-gray-400/20
            border-r-[.25rem] border-transparent
            border-b-[.75rem] border-b-gray-400/20">
          </div>
        </li>
      ))}
    </ul>
  );
}