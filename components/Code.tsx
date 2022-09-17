import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Code = ({ children }: Props) => (
  <pre tabIndex={0}>
    <code>{children}</code>
  </pre>
);

export default Code;
