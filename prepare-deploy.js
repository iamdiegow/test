const fs = require("fs-extra");
const path = require("path");

const { STORYBOOK_PATH, GITHUB_CONTEXT } = process.env;

const PUBLIC_PATH = path.join(process.cwd(), "public");

const github = JSON.parse(GITHUB_CONTEXT);

const isPullRequest = github.event_name === "pull_request";

const slug = slugify(isPullRequest ? github.head_ref : github.ref_name);

const destination = path.join(PUBLIC_PATH, slug);

console.log(`Moving files from ${STORYBOOK_PATH}`);
console.log(`To ${destination}`);

fs.moveSync(STORYBOOK_PATH, destination, {
  overwrite: true,
});

console.log(`Files moved!`);

const metadata = {
  slug,
  actor: github.actor,
  is_pull_request: github.event_name === "pull_request",
};

if (github.event_name === "pull_request") {
  metadata.pull_request_title = github.event.pull_request.title;
  metadata.pull_request_url = github.event.pull_request.html_url;
  metadata.ref = github.head_ref;
  metadata.commit_url = `${github.event.pull_request.html_url}/commits/${github.event.pull_request.head.sha}`;
} else {
  metadata.ref = github.ref;
}

fs.writeJsonSync(path.join(destination, "metadata.json"), metadata);

console.log("medata.json file was created!");

function slugify(str) {
  str = str
    .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
    .toLowerCase();
  str = str.replace(/^\s+|\s+$/gm, "");
  return str.replace(/\s+/g, "-");
}
