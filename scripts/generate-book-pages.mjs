#!/usr/bin/env node
/**
 * Book page generator.
 *
 * Usage:
 *   node scripts/generate-book-pages.mjs data/book-pages/brian-weiss/a-traves-del-tiempo.json
 *
 * Generated HTML is committed to the repository. No runtime Node dependency is
 * required by the website.
 */
import { readFile, writeFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const input = process.argv[2];
if (!input) throw new Error('Indica un JSON editorial en data/book-pages/.');

const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const data = JSON.parse(await readFile(resolve(ROOT,input),'utf8'));
for (const key of ['title','slug','original_title','authors','lead','about','cover','archive_copies','purchase','work_slug']) {
  if (!data[key] || (Array.isArray(data[key]) && !data[key].length)) throw new Error(`Falta el campo obligatorio: ${key}`);
}
const author=data.authors[0], authorSlug=author.slug;
const output=resolve(ROOT,`autores/${authorSlug}/libros/${data.slug}/index.html`);
await access(dirname(output));
const template=await readFile(resolve(ROOT,'templates/book-detail.html'),'utf8');
const paragraphs=data.about.map(p=>`<p>${esc(p)}</p>`).join('');
const isbns=(data.isbns||[data.primary_isbn]).filter(Boolean).map(x=>`<li><strong>${esc(x)}</strong></li>`).join('');
const archive=data.archive_copies.map(x=>`<li><strong>${esc(x.label)} · ${esc(x.language)}</strong><br><span class="catalog-sub">Internet Archive · préstamo o consulta digital según disponibilidad</span><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">Leer online en Internet Archive</a></li>`).join('');
const canonical=`https://miterapiaregresiva.com/autores/${authorSlug}/libros/${data.slug}/`;
const jsonLd=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Book","name":data.title,"alternateName":data.original_title,"author":{"@type":"Person","name":author.name,"url":`https://miterapiaregresiva.com/autores/${authorSlug}/`},"inLanguage":data.languages||["es"],"isbn":data.primary_isbn||undefined,"image":data.cover.src},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://miterapiaregresiva.com/"},{"@type":"ListItem","position":2,"name":"Biblioteca","item":"https://miterapiaregresiva.com/biblioteca-de-terapia-regresiva/"},{"@type":"ListItem","position":3,"name":"Autores","item":"https://miterapiaregresiva.com/autores/"},{"@type":"ListItem","position":4,"name":author.name,"item":`https://miterapiaregresiva.com/autores/${authorSlug}/`},{"@type":"ListItem","position":5,"name":data.title,"item":canonical}]}]});
const values={
  TITLE:esc(data.title), ORIGINAL_TITLE:esc(data.original_title), AUTHOR:esc(author.name), AUTHOR_SLUG:esc(authorSlug),
  SLUG:esc(data.slug), LEAD:esc(data.lead), ABOUT:paragraphs, ISBNS:isbns, COVER_SRC:esc(data.cover.src), COVER_ALT:esc(data.cover.alt),
  COVER_CREDIT_SOURCE:esc(data.cover.credit_source), COVER_CREDIT_URL:esc(data.cover.credit_url), ARCHIVE:archive,
  AVAILABILITY_SOURCE:esc(data.availability_source||`/data/availability/${authorSlug}.json`), WORK_SLUG:esc(data.work_slug),
  JSON_LD:jsonLd, PRIMARY_ISBN:esc(data.primary_isbn||''), CANONICAL:canonical
};
let html=template;
for(const [k,v] of Object.entries(values)) html=html.split(`{{${k}}}`).join(v);
if (/{{[A-Z0-9_]+}}/.test(html)) throw new Error('La plantilla contiene variables sin resolver.');
await writeFile(output,html,'utf8');
console.log(`Generada: ${output.replace(ROOT+'/','')}`);
