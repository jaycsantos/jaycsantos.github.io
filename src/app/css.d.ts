import type * as CSS from 'csstype';

// https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors

declare module 'csstype' {
  interface Properties {
    // Add a CSS Custom Property
    '--border-start'?: string;
    '--border-end'?: string;

    // Allow namespaced CSS Custom Properties
    [index: `--theme-${string}`]: any;

    // Allow any CSS Custom Properties
    [index: `--${string}`]: any;

    // ...or allow any other property
    [index: string]: any;
  }
}