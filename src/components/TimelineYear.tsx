import { createContext, useContext, useMemo } from 'react';

const YearContext = createContext<{
  getYear: () => string;
  shouldShow: (year: string) => boolean;
}>(null);

export function TimelineYearProvider({
  lastYear,
  children,
}: {
  lastYear?: string;
  children: React.ReactNode;
}) {
  const shouldShow = (year: string) => {
    if (year != lastYear) {
      console.log(lastYear, year);
      lastYear = year;
      return true;
    }
    return false;
  };
  const getYear = () => lastYear;

  return (
    <YearContext.Provider value={{ getYear, shouldShow }}>
      {children}
    </YearContext.Provider>
  );
}

export function TimelineYear({
  year,
  children,
}: {
  year: string;
  children: React.ReactNode;
}) {
  const { shouldShow } = useContext(YearContext);
  const isShown = useMemo(() => shouldShow(year), [year]);
  return isShown && children;
}
