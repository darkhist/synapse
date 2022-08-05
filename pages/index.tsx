import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import fs from "node:fs";

import matter from "gray-matter";

interface Thought {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    time: string;
  };
}

interface Props {
  thoughts: Thought[];
}

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync("thoughts");

  const thoughts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");

    const readFile = fs.readFileSync(`thoughts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      thoughts,
    },
  };
};

const Home = ({ thoughts }: Props) => (
  <div className="bg-black text-white">
    <Head>
      <title>synapse</title>
      <meta charSet="UTF-8" />
      <meta name="description" content="Minimal CLI-powered markdown blog" />
      <meta name="keywords" content="blog, CLI, software, markdown" />
      <meta name="author" content="Quinn Salas" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <main className="min-h-screen">
      <h1 className="font-SourceSerifPro text-5xl px-12 pt-16 pb-10">
        Archive
      </h1>
      <div className="flex flex-col">
        {thoughts
          .map(({ slug, frontmatter: { title } }) => (
            <Link key={slug} href={`/thoughts/${slug}`}>
              <a className="font-mono text-lg mx-12 my-4 w-fit underline cursor-pointer hover:text-[#fc5c6a]">
                {title}
              </a>
            </Link>
          ))
          .reverse()}
      </div>
    </main>
  </div>
);

export default Home;
