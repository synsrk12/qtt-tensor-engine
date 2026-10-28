declare module 'react-katex' {
  import * as React from 'react';

  export interface InlineMathProps {
    math: string;
    format?: string;
    displayMode?: boolean;
    errorColor?: string;
    output?: 'html' | 'mathml';
    strict?: boolean | 'ignore';
    trust?: boolean;
    macros?: Record<string, string>;
    throwOnError?: boolean;
    delimiter?: string;
  }

  export interface BlockMathProps extends InlineMathProps {}

  export class InlineMath extends React.Component<InlineMathProps> {}
  export class BlockMath extends React.Component<BlockMathProps> {}
}
