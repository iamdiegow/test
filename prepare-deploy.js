const fs = require("fs-extra");
const path = require("path");

const { STORYBOOK_PATH, REF, ACTOR, PULL_REQUEST_TITLE, PULL_REQUEST_URL } =
  process.env;

const PUBLIC_PATH = path.join(process.cwd(), "public");

const slug = slugify(REF);

const destination = path.join(PUBLIC_PATH, slug);

console.log(`Moving files from ${STORYBOOK_PATH}`);
console.log(`To ${destination}`);

fs.moveSync(STORYBOOK_PATH, destination, {
  overwrite: true,
});

console.log(`Files moved!`);

const metadata = {
  ref: REF,
  slug,
  actor: ACTOR,
  is_pull_request: false,
};

console.log(PULL_REQUEST_TITLE);
console.log(PULL_REQUEST_URL);

if (
  typeof PULL_REQUEST_TITLE !== "undefined" &&
  typeof PULL_REQUEST_URL !== "undefined"
) {
  metadata.is_pull_request = true;
  metadata.pull_request_title = PULL_REQUEST_TITLE;
  metadata.pull_request_url = PULL_REQUEST_URL;
}

fs.writeJsonSync(path.join(destination, "metadata.json"), metadata);

function slugify(str) {
  str = str
    .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
    .toLowerCase();
  str = str.replace(/^\s+|\s+$/gm, "");
  return str.replace(/\s+/g, "-");
}
