import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

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
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug;
  const fileName = fs.readFileSync(`thoughts/${slug}.md`, "utf-8");

  const { data: frontmatter, content } = matter(fileName);
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
    </Head>
    <main className="prose min-h-fit mx-auto my-10">
      <h1 className="font-SourceSerifPro text-5xl px-12 pt-5">{title}</h1>
      <p className="font-bold px-12">
        {date}
        <span className="px-2" aria-hidden>
          /
        </span>
        {time}
      </p>
      <div
        className="px-12"
        dangerouslySetInnerHTML={{ __html: md().render(content) }}
      />
    </main>
  </>
);

export default Post;
