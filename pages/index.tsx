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
  };
}

export interface Props {
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <main className="min-h-screen">
      <h1 className="font-SourceSerifPro text-4xl p-10 text-center">
        Thoughts
      </h1>
      <List thoughts={thoughts} />
    </main>
  </div>
);

export default Home;
