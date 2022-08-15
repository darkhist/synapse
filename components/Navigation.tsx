import Link from "next/link";

const Navigation = () => (
  <nav className="px-12 py-4">
    <ul className="flex justify-between">
      <li>
        <Link href="/">
          <a
            className="font-SourceSerifPro font-bold text-2xl hover:text-[#fc5c6a]"
            aria-label="home"
          >
            synapse
          </a>
        </Link>
      </li>

      <li className="mt-1">
        <Link href="/about.txt">
          <a className="hover:text-[#fc5c6a]" aria-label="about">
            ?
          </a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
