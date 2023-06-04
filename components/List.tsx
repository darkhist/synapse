import React from "react";
import Link from "next/link";

import { Props } from "../pages";

const List = ({ thoughts }: Props) => (
  <div className="flex justify-center py-4">
    <div className="flex flex-col">
      {thoughts
        .map(
          ({ slug, frontmatter: { title, date, hidden } }) =>
            !hidden && (
              <article
                key={slug}
                className="flex gap-12 md:gap-48 lg:gap-72 justify-between items-baseline p-4"
              >
                <h2>
                  <Link
                    href={`/thoughts/${slug}`}
                    title={title}
                    className="text-[#fc5c6a] text-base lg:text-lg font-bold underline"
                  >
                    {title}
                  </Link>
                </h2>
                <span className="text-gray-100 text-sm lg:text-base font-mono">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "2-digit",
                  })
                    .format(new Date(date))
                    .toUpperCase()
                    .replace(",", " ")}
                </span>
              </article>
            )
        )
        .reverse()}
    </div>
  </div>
);

export default List;
