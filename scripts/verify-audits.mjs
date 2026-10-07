import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, resolve, relative } from 'node:path';
const source = resolve(process.argv[2] || '..');
const sites = JSON.parse(await readFile('src/catalog/sites.json', 'utf8'));
async function files(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const path = join(root, entry.name);
    if (entry.isDirectory()) result.push(...(await files(path)));
    else if (entry.isFile()) result.push(path);
  }
  return result;
}
const records = [];
for (const site of sites) {
  const original = join(source, site.directory),
    copy = resolve('public/audits', site.directory);
  const paths = await files(original);
  for (const file of paths) {
    const name = relative(original, file);
    const [a, b] = await Promise.all([readFile(file), readFile(join(copy, name))]);
    const hash = createHash('sha256').update(a).digest('hex');
    if (!a.equals(b)) throw Error('Audit copy differs: ' + site.directory + '/' + name);
    records.push({ site: site.id, file: name, bytes: a.length, sha256: hash });
  }
}
await mkdir('docs/evidence', { recursive: true });
await writeFile(
  'docs/evidence/audit-manifest.json',
  JSON.stringify({ verifiedAt: new Date().toISOString(), source, files: records }, null, 2),
);
console.log(`Verified ${records.length} audit files byte-for-byte against the originals.`);
