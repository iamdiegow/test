const fs = require("fs");
const path = require("path");

const { STORYBOOK_PATH, REF_NAME } = process.env;

const PUBLIC_PATH = path.join(process.cwd(), "public");

const slug = slugify(REF_NAME);

const destination = path.join(PUBLIC_PATH, slug);

fs.copySync(STORYBOOK_PATH, destination, {
  overwrite: true,
});

function slugify(str) {
  str = str
    .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
    .toLowerCase();
  str = str.replace(/^\s+|\s+$/gm, "");
  return str.replace(/\s+/g, "-");
}
