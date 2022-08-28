import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import fs from "node:fs";

import matter from "gray-matter";
import md from "markdown-it";

interface Props {
  frontmatter: {
    title: string;
    date: string;
    time: string;
  };
  content: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("thoughts");
  const paths = files.map((file) => ({
    params: {
      slug: file.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug;
  const source = fs.readFileSync(`thoughts/${slug}.md`, "utf-8");

  const { data: frontmatter, content } = matter(source);
  return {
    props: {
      frontmatter,
      content,
    },
  };
};

const Post = ({ frontmatter: { title, date, time }, content }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <main className="prose min-h-fit mx-auto py-6" id="main">
      <h1 className="font-SourceSerifPro text-2xl md:text-5xl px-12 pt-5">
        {title}
      </h1>
      <p className="font-bold px-12">
        <span>{date}</span>
        <span className="px-2" aria-hidden>
          /
        </span>
        <time>{time}</time>
      </p>
      <div
        className="px-12"
        dangerouslySetInnerHTML={{ __html: md().render(content) }}
      />
    </main>
  </>
);

export default Post;
