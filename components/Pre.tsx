import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Pre = ({ children }: Props) => (
  <pre tabIndex={0} className="whitespace-pre-wrap">
    {children}
  </pre>
);

export default Pre;
