// React's JSX types do not declare MathML elements yet, so declare the subset
// the story uses. Browsers render MathML natively, which avoids pulling in a
// formula library just to show a few equations.
import type { HTMLAttributes, Key } from "react";

type MathMLProps = HTMLAttributes<HTMLElement> & {
  key?: Key | null;
  display?: "block" | "inline";
  linethickness?: string;
  stretchy?: "true" | "false";
  width?: string;
  accent?: "true" | "false";
  xmlns?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      math: MathMLProps;
      mrow: MathMLProps;
      mi: MathMLProps;
      mn: MathMLProps;
      mo: MathMLProps;
      mfrac: MathMLProps;
      msqrt: MathMLProps;
      msub: MathMLProps;
      msup: MathMLProps;
      mover: MathMLProps;
      munder: MathMLProps;
      mtext: MathMLProps;
      mspace: MathMLProps;
    }
  }
}
