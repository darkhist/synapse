import { writeFileSync } from "node:fs";
import { input, editor, confirm } from "@inquirer/prompts";

const hiddenPath = `thoughts/idea-${Date.now()}.hidden.md`;
const publicPath = hiddenPath.replace(".hidden", "");

const date = new Date().toLocaleDateString("en-US");

const timestamp = new Date().toLocaleTimeString("en-US", {
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const title = await input({ message: "What should I call this thought?" });

// wrap timestamp in "" to: avoid YAML parsing issues & display in HH:MM:SS format
const matter = `---
title: ${title}
date: ${date}
time: "${timestamp}"
---\n\n`;

const content = await editor({
  message: "What are you thinking about?",
  default: matter,
  postfix: ".md",
});

const publish = await confirm({ message: "Publish?" });

const destination = (publish && publicPath) || hiddenPath;

writeFileSync(destination, content, { encoding: "utf-8" });
