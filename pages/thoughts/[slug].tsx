import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Markdoc from "@markdoc/markdoc";
import matter from "gray-matter";

import fs from "node:fs";

import Photo from "../../components/Photo";
import Code from "../../components/Code";
import Pre from "../../components/Pre";

import photo from "../../markdoc/tags/photo.markdoc";
import code from "../../markdoc/tags/code.markdoc";
import pre from "../../markdoc/tags/pre.markdoc";

interface Props {
  frontmatter: {
    title: string;
    date: string;
    time: string;
  };
  content: string;
}

const config = {
  tags: {
    photo,
    code,
    pre,
  },
};

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

  const ast = Markdoc.parse(source);
  const content = JSON.stringify(Markdoc.transform(ast, config));

  const { data: frontmatter } = matter(source);

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
      <div className="px-12">
        {Markdoc.renderers.react(JSON.parse(content), React, {
          components: {
            Photo,
            Code,
            Pre,
          },
        })}
      </div>
    </main>
  </>
);

export default Post;
