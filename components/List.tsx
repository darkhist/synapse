import Link from "next/link";

import { Props } from "../pages";

const List = ({ thoughts }: Props) => (
  <ul className="flex flex-col m-4">
    {thoughts
      .map(
        ({ slug, frontmatter: { title, date, hidden } }) =>
          !hidden && (
            <li
              key={slug}
              className="flex flex-col p-5 hover:bg-[#ffffff0f] hover:translate-x-1"
            >
              <article>
                <p className="text-l text-gray-400">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                  }).format(new Date(date))}
                </p>
                <Link href={`/thoughts/${slug}`}>
                  <a className="py-2 text-xl md:text-2xl text-left font-bold underline">
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
