/**
 * Copia demos vanilla para public/library (iframe no hub).
 * Volta a correr após alterar componentes em components/.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(from, to) {
  ensureDir(path.dirname(to));
  fs.copyFileSync(from, to);
  console.log("copied", path.relative(root, to));
}

function copyDir(fromDir, toDir) {
  function walk(src, dest) {
    const st = fs.statSync(src);
    if (st.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      for (const name of fs.readdirSync(src)) {
        walk(path.join(src, name), path.join(dest, name));
      }
    } else {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
    }
  }
  fs.rmSync(toDir, { recursive: true, force: true });
  if (!fs.existsSync(fromDir)) {
    throw new Error("Missing source dir: " + fromDir);
  }
  fs.mkdirSync(toDir, { recursive: true });
  for (const name of fs.readdirSync(fromDir)) {
    walk(path.join(fromDir, name), path.join(toDir, name));
  }
  console.log("copied dir", path.relative(root, toDir));
}

const headerSrc = path.join(root, "components/headers/header-01");
const headerPub = path.join(root, "public/library/header-01");
const btnSrc = path.join(root, "components/buttons/button-01/style.css");
const btnPub = path.join(root, "public/library/buttons/button-01/style.css");

copyFile(path.join(headerSrc, "style.css"), path.join(headerPub, "style.css"));
copyFile(path.join(headerSrc, "script.js"), path.join(headerPub, "script.js"));
copyFile(btnSrc, btnPub);

let index = fs.readFileSync(path.join(headerSrc, "index.html"), "utf8");
index = index.replace(
  'href="../../buttons/button-01/style.css"',
  'href="../buttons/button-01/style.css"'
);
fs.writeFileSync(path.join(headerPub, "index.html"), index);
console.log("written", path.relative(root, path.join(headerPub, "index.html")));

const bookSrc = path.join(root, "components/layout/project-book-01");
const bookPub = path.join(root, "public/library/project-book-01");
copyDir(bookSrc, bookPub);

const dversoSrc = path.join(
  root,
  "components/microinteractions/dverso-logo-process-01"
);
const dversoPub = path.join(
  root,
  "public/library/microinteractions/dverso-logo-process-01"
);
copyDir(dversoSrc, dversoPub);
