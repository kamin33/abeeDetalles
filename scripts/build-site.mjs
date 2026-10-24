import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "dist");
const hashableExtensions = new Set([".css", ".js"]);
const excluded = new Set([".git", ".github", "dist", "node_modules"]);

function copySource(source, destination) {
  mkdirSync(destination, { recursive: true });
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    const sourcePath = join(source, entry.name);
    const destinationPath = join(destination, entry.name);
    if (entry.isDirectory()) copySource(sourcePath, destinationPath);
    else cpSync(sourcePath, destinationPath);
  }
}

function findHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (excluded.has(entry.name)) return [];
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findHtmlFiles(path);
    return extname(entry.name).toLowerCase() === ".html" ? [path] : [];
  });
}

function localAssetReferences(html) {
  const references = [];
  const pattern = /(?:src|href)=["']([^"'#?]+)["']/gi;
  for (const match of html.matchAll(pattern)) {
    const value = match[1];
    if (!value.startsWith("http") && hashableExtensions.has(extname(value).toLowerCase())) {
      references.push(value);
    }
  }
  return references;
}

rmSync(output, { recursive: true, force: true });
copySource(root, output);

const assets = new Map();
for (const htmlPath of findHtmlFiles(root)) {
  const html = readFileSync(htmlPath, "utf8");
  for (const reference of localAssetReferences(html)) {
    const sourcePath = resolve(dirname(htmlPath), reference);
    if (!existsSync(sourcePath) || assets.has(sourcePath)) continue;
    const content = readFileSync(sourcePath);
    const hash = createHash("sha256").update(content).digest("hex").slice(0, 12);
    const hashedName = `${sourcePath.slice(0, -extname(sourcePath).length)}.${hash}${extname(sourcePath)}`;
    assets.set(sourcePath, { hash, hashedName });
  }
}

for (const [sourcePath, asset] of assets) {
  const outputSourcePath = join(output, relative(root, sourcePath));
  const outputHashedPath = join(output, relative(root, asset.hashedName));
  cpSync(outputSourcePath, outputHashedPath);
  rmSync(outputSourcePath);
}

for (const htmlPath of findHtmlFiles(root)) {
  const outputHtmlPath = join(output, relative(root, htmlPath));
  let html = readFileSync(outputHtmlPath, "utf8");
  for (const reference of localAssetReferences(html)) {
    const sourcePath = resolve(dirname(htmlPath), reference);
    const asset = assets.get(sourcePath);
    if (!asset) continue;
    const hashedRelativePath = relative(dirname(htmlPath), asset.hashedName).replaceAll("\\", "/");
    html = html.replaceAll(reference, hashedRelativePath);
  }
  writeFileSync(outputHtmlPath, html);
}

console.log(`Generated ${output} with ${assets.size} content-hashed assets.`);
