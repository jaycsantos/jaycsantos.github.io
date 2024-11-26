export default function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1 print:gap-0 print:block">
      {tags.map((tag, tagIndex) => (
        <li key={tagIndex} className="print:inline">
          <code className="px-2 py-1 text-xs lowercase rounded-full print:px-0 print:py-0 print:bg-transparent bg-gray-400/25">
            {tag}<span className="hidden print:inline">,&nbsp;</span>
          </code>
        </li>
      ))}
    </ul>
  );
}