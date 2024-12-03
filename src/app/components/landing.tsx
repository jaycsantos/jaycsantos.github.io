import { useMediaQuery } from "@uidotdev/usehooks";
import Header from "./header";
import Intro from "./intro";
import Timeline from "./timeline";
import Waves from "./waves";
import { MotionConfig } from "motion/react";
import Footer from "./footer";


export default function Landing({ className }: { className?: string }) {
  const isPrint = useMediaQuery('print');

  return (
    <MotionConfig reducedMotion={isPrint ? 'always' : 'user'}>
      <Header className="mt-[30vh] print:mt-0" />
      <Waves className="absolute top-0 left-0 w-full h-dvh bg-backgroundSky print:hidden" color="var(--background)" />

      <main className={`container relative flex flex-col self-center max-w-screen-lg min-h-full mb-16 p-2 sm:p-4 md:p-8 lg:p-16 print:max-w-none print:p-0 ${className}`}>
        <Intro />
        <Timeline />
      </main >
      <Footer />
    </MotionConfig >
  );
}
