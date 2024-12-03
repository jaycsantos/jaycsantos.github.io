'use client';

import React from "react";
import { ClientOnly } from "./components/client-only";
import Landing from "./components/landing";

export default function Home(): JSX.Element {
  return (
    <ClientOnly>
      <Landing />
    </ClientOnly>
  )
}
