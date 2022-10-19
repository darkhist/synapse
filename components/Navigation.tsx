import Link from "next/link";
import SkipLink from "./SkipLink";

const Navigation = () => (
  <>
    <SkipLink />
    <nav className="px-12 py-4">
      <ul className="flex justify-between items-center">
        <li>
          <h1 className="font-SourceSerifPro font-bold text-2xl hover:text-[#fc5c6a] focus-within:text-[#fc5c6a]">
            <Link href="/">
              <a aria-label="home">synapse</a>
            </Link>
          </h1>
        </li>
        <li className="pt-[2px]">
          <Link href="/about.txt">
            <a
              className="font-semibold hover:text-[#fc5c6a] focus-within:text-[#fc5c6a]"
              aria-label="about"
            >
              ?
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  </>
);

export default Navigation;
