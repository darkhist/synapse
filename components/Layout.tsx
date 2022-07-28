import { ReactNode } from "react";

import Navigation from "./Navigation";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <Navigation />
    {children}
  </>
);

export default Layout;
