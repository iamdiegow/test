const fs = require("fs-extra");
const path = require("path");

const { STORYBOOK_PATH, REF_NAME, ACTOR } = process.env;

const PUBLIC_PATH = path.join(process.cwd(), "public");

const slug = slugify(REF_NAME);

const destination = path.join(PUBLIC_PATH, slug);

console.log(`Moving files from ${STORYBOOK_PATH}`);
console.log(`To ${destination}`);

fs.moveSync(STORYBOOK_PATH, destination, {
  overwrite: true,
});

console.log(`Files moved!`);

const metadata = {
  ref_name: REF_NAME,
  slug,
  actor: ACTOR,
};

fs.writeJsonSync(path.join(destination, "metadata.json"), metadata);

function slugify(str) {
  str = str
    .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
    .toLowerCase();
  str = str.replace(/^\s+|\s+$/gm, "");
  return str.replace(/\s+/g, "-");
}
