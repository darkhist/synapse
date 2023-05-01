import fs from "node:fs";
import inquirer from "inquirer";

const matter = "---";

const date = new Date().toLocaleDateString("en-US");

const timestamp = new Date().toLocaleTimeString("en-US", {
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

let out = `thoughts/idea-${Date.now()}.md`;

inquirer
  .prompt([
    {
      name: "title",
      message: "What should I call this thought?",
    },
    {
      name: "tags",
      type: "input",
      message: "Tag?",
    },
    {
      name: "hidden",
      type: "confirm",
      message: "Hide?",
    },
    {
      name: "content",
      type: "editor",
      message: "What're you thinking about?",
    },
  ])
  .then(({ title, tags, hidden, content }) => {
    if (hidden) out = `thoughts/idea-${Date.now()}.hidden.md`;

    fs.writeFileSync(out, matter, { encoding: "utf-8" });
    fs.appendFileSync(out, "\n");
    fs.appendFileSync(out, `title: ${title}\n`);
    fs.appendFileSync(out, `date: ${date}\n`);
    // wrap with "" to avoid YAML parsing issues
    // and ensure timestamps render in HH:MM:SS format
    fs.appendFileSync(out, `time: "${timestamp}"\n`);
    fs.appendFileSync(out, tags && `tags: ${tags}\n`);
    fs.appendFileSync(out, `hidden: ${hidden}\n`);
    fs.appendFileSync(out, matter);
    fs.appendFileSync(out, "\n\n");
    fs.appendFileSync(out, content);
  });
