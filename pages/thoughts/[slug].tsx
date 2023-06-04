import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Markdoc from "@markdoc/markdoc";
import matter from "gray-matter";

import { readdirSync, readFileSync } from "node:fs";

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
    tags: string;
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
  const files = readdirSync("thoughts");
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
  const source = readFileSync(`thoughts/${slug}.md`, "utf-8");
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

const Post = ({ frontmatter: { title, date, time, tags }, content }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <main className="prose min-h-fit mx-auto py-8" id="main">
      <div className="px-12">
        <section>
          <h1 className="text-2xl md:text-4xl m-0">{title}</h1>
          <p className="py-2 m-0">
            <span>
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(date))}
            </span>
            <span className="px-1" aria-hidden>
              ·
            </span>
            <span>{time}</span>
          </p>
        </section>
        <hr className="h-px border-0 bg-gray-700 my-6"></hr>
        <section>
          {Markdoc.renderers.react(JSON.parse(content), React, {
            components: {
              Photo,
              Code,
              Pre,
            },
          })}
        </section>
      </div>
    </main>
  </>
);

export default Post;
