import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const root = resolve(process.argv[2] || '..');
const sites = [
  {
    id: 'barber',
    directory: 'barber-motion-audit',
    name: 'Barber & Co',
    url: 'https://www.barberandco.us/',
  },
  {
    id: 'lenzing',
    directory: 'lenzing-motion-audit',
    name: 'Studio Lenzing',
    url: 'https://www.studiolenzing.com/',
  },
  { id: 'linear', directory: 'linear-motion-audit', name: 'Linear', url: 'https://linear.app/' },
  {
    id: 'instrument',
    directory: 'instrument-motion-audit',
    name: 'Instrument',
    url: 'https://www.instrument.com/',
  },
  {
    id: 'vestre',
    directory: 'vestre-motion-audit',
    name: 'Vestre',
    url: 'https://www.vestre.com/us',
  },
];
await mkdir('public/audits', { recursive: true });
const data = {};
for (const site of sites) {
  const from = join(root, site.directory);
  data[site.id] = JSON.parse(await readFile(join(from, 'homepage-motion-data.json'), 'utf8'));
  await cp(from, join('public/audits', site.directory), {
    recursive: true,
    filter: (path) => !/(^|\/)(node_modules|\.git)(\/|$)/.test(path),
  });
}
await writeFile('src/catalog/audit-data.json', JSON.stringify(data));
await writeFile('src/catalog/sites.json', JSON.stringify(sites, null, 2));
await writeFile('src/catalog/linear-motion.json', JSON.stringify({ grids: data.linear.grids }));
const vestreHTML = await readFile(join(root, 'vestre-motion-audit/motion-audit.html'), 'utf8');
const svg = vestreHTML.match(/<div class="footer-track"><svg[^>]*>([\s\S]*?)<\/svg>/)?.[1];
if (!svg)
  throw Error('Vestre footer SVG not found; inspect the new audit before updating the adapter.');
const paths = Array.from(svg.matchAll(/<g\b[^>]*>([\s\S]*?)<\/g>/g), (group) =>
  Array.from(group[1].matchAll(/<path\b[^>]*d="([^"]+)"/g), (path) => path[1]),
);
if (paths.length !== 6 || paths.some((group) => group.length === 0))
  throw Error('Unexpected Vestre footer geometry; adapter review required.');
await writeFile('src/patterns/footer-paths.json', JSON.stringify(paths));
console.log(
  `Preserved ${sites.length} audit directories and refreshed source data. Originals were read only.`,
);
