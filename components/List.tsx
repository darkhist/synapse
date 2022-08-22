import Link from "next/link";

import { Props } from "../pages";

const List = ({ thoughts }: Props) => (
  <ul className="flex flex-col mx-4 my-2">
    {thoughts
      .map(
        ({ slug, frontmatter: { title, date, hidden } }) =>
          !hidden && (
            <li
              key={slug}
              className="flex flex-col md:px-10 py-5 hover:bg-[#ffffff0f] hover:translate-x-1"
            >
              <article>
                <p className="text-l text-gray-400 mx-5">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                  }).format(new Date(date))}
                </p>
                <Link href={`/thoughts/${slug}`}>
                  <a className="px-5 py-2 text-xl md:text-2xl text-left font-bold underline">
                    {title}
                  </a>
                </Link>
              </article>
            </li>
          )
      )
      .reverse()}
  </ul>
);

export default List;
