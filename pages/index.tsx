import type { GetStaticProps } from "next";
import Head from "next/head";

import fs from "node:fs";
import matter from "gray-matter";

import List from "../components/List";

interface Thought {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    time: string;
    hidden: boolean;
  };
}

export interface Props {
  thoughts: Thought[];
}

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync("thoughts");

  const thoughts = files
    .filter((file) => !file.includes("hidden"))
    .map((file) => {
      const slug = file.replace(".md", "");
      const posts = fs.readFileSync(`thoughts/${file}`, "utf-8");
      const { data: frontmatter } = matter(posts);

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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <main className="min-h-screen">
      <h1 className="font-SourceSerifPro text-4xl px-auto pt-6 text-center">
        Thoughts
      </h1>
      <List thoughts={thoughts} />
    </main>
  </div>
);

export default Home;
