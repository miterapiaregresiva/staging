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
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const input = process.argv[2];
if (!input) throw new Error('Indica un JSON editorial en data/book-pages/.');

const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const data = JSON.parse(await readFile(resolve(ROOT,input),'utf8'));
for (const key of ['title','slug','original_title','authors','lead','about','purchase','work_slug']) {
  if (!data[key] || (Array.isArray(data[key]) && !data[key].length)) throw new Error(`Falta el campo obligatorio: ${key}`);
}
const author=data.authors[0], authorSlug=author.slug;
const authorsDisplay=data.authors.map(x=>x.name).join(' y ');
const output=resolve(ROOT,`autores/${authorSlug}/libros/${data.slug}/index.html`);
await mkdir(dirname(output), {recursive:true});
const template=await readFile(resolve(ROOT,'templates/book-detail.html'),'utf8');
const FALLBACK_COVER='/assets/images/books/portada-no-disponible.webp';
const hasCover=Boolean(data.cover?.src);
const cover=hasCover?data.cover:{src:FALLBACK_COVER,alt:`Portada no disponible de ${data.title}`,credit_source:'',credit_url:''};
const coverCredit=hasCover && cover.credit_source && cover.credit_url
 ? `<details class="image-credit"><summary aria-label="Información y créditos de la imagen" title="Información y créditos de la imagen"><span aria-hidden="true">i</span></summary><div class="image-credit-panel"><p>Portada de una edición de <em>${esc(data.title)}</em>.</p><p><a href="${esc(cover.credit_url)}" target="_blank" rel="noopener noreferrer">Fuente: ${esc(cover.credit_source)}</a></p></div></details>`
 : '';
const paragraphs=data.about.map(p=>`<p>${esc(p)}</p>`).join('');
const languageNames={es:'ES',en:'EN',de:'DE',fr:'FR',it:'IT',pt:'PT'};
const languageTags=(data.languages||['es']).map(code=>`<span class="tag">${esc(languageNames[code]||String(code).toUpperCase())}</span>`).join('');
const languageLabel=(data.languages||[]).length>1?'Idiomas':'Idioma';
const isbns=(data.isbns||[data.primary_isbn]).filter(Boolean).map(x=>`<li><strong>${esc(x)}</strong></li>`).join('');
const archiveAccess = x => {
  if (x.access === 'preview') return {detail:'Internet Archive · vista previa', action:'Ver vista previa en Internet Archive'};
  if (x.access === 'borrow') return {detail:'Internet Archive · préstamo digital según disponibilidad', action:'Solicitar préstamo digital en Internet Archive'};
  if (x.access === 'read') return {detail:'Internet Archive · lectura digital', action:'Leer online en Internet Archive'};
  return {detail:'Internet Archive · préstamo o consulta digital según disponibilidad', action:'Consultar en Internet Archive'};
};
const archive=(data.archive_copies||[]).map(x=>{const a=archiveAccess(x);return `<li><strong>${esc(x.label)} · ${esc(x.language)}</strong><br><span class="catalog-sub">${a.detail}</span><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${a.action}</a></li>`}).join('') || '<li>No hemos verificado todavía un ejemplar digital de esta obra en Internet Archive.</li>';
const relatedCards = items => (items||[]).map(x => {
  const hasRelatedCover=Boolean(x.cover);
  if (hasRelatedCover && (!x.credit?.source || !x.credit?.url)) throw new Error(`Falta crédito de portada relacionada: ${x.title}`);
  const relatedCover=hasRelatedCover ? x.cover : FALLBACK_COVER;
  const relatedCredit=hasRelatedCover ? `<details class="image-credit"><summary aria-label="Información y créditos de la imagen" title="Información y créditos de la imagen"><span aria-hidden="true">i</span></summary><div class="image-credit-panel"><p>Portada de una edición de <em>${esc(x.title)}</em>.</p><p><a href="${esc(x.credit.url)}" target="_blank" rel="noopener noreferrer">Fuente: ${esc(x.credit.source)}</a></p></div></details>` : '';
  const relatedAuthorSlug=x.author_slug || authorSlug;
  return `<article class="card"><div class="book-cover image-with-credit"><img src="${esc(relatedCover)}" alt="${hasRelatedCover ? 'Portada de ' : 'Portada no disponible de '}${esc(x.title)}" loading="lazy">${relatedCredit}</div><h3><a href="/autores/${esc(relatedAuthorSlug)}/libros/${esc(x.slug)}/">${esc(x.title)}</a></h3><p><strong>Original:</strong> <em>${esc(x.original_title)}</em>.</p></article>`;
}).join('');
const purchase = `<div class="book-buy-options"><a class="ttl-buy-card" href="${esc(data.purchase.todostuslibros)}" target="_blank" rel="noopener noreferrer"><span class="ttl-buy-copy"><strong>Comprar nuevo en TodosTusLibros.com</strong><span>Consulta ediciones y librerías de España donde conseguirlo.</span></span></a><a class="book-buy-link service-buy-link" href="${esc(data.purchase.iberlibro)}" target="_blank" rel="noopener noreferrer"><span class="service-card-copy"><strong>Buscar de segunda mano en IberLibro</strong><span>Ejemplares usados ofrecidos por librerías y vendedores.</span></span></a><a class="book-buy-link service-buy-link" href="${esc(data.purchase.osdad)}" target="_blank" rel="noopener noreferrer"><span class="service-card-copy"><strong>Consultar libros de segunda mano en OSDAD</strong><span>Inventario solidario publicado en Gran Canaria.</span></span></a></div>`;
const availabilityEnabled=data.availability_enabled !== false;
const hasArchive=(data.archive_copies||[]).length>0;
const onlineHeading=esc(data.online_heading || (((data.archive_copies||[]).length && (data.archive_copies||[]).every(x=>x.access==='preview')) ? `Consultar ${data.title} online` : `Leer o consultar ${data.title} online`));
const primaryActions=[
  hasArchive ? '<a href="#leer-online">'+(data.primary_online_label ? esc(data.primary_online_label) : 'Consultar online')+'</a>' : '',
  availabilityEnabled ? '<a href="#bibliotecas-canarias">Solicitar en préstamo</a>' : ''
].filter(Boolean).join('');
const availabilitySections=availabilityEnabled
  ? `<section class="section"><h2>Disponibilidad de ${esc(data.title)} en las bibliotecas de Canarias</h2><div class="book-availability-summary"><div><strong data-value="bica_records">—</strong><span>registros en las bibliotecas de Canarias</span></div><div><strong data-value="copies">—</strong><span>ejemplares localizados</span></div><div><strong data-value="available">—</strong><span>disponibles</span></div><div><strong data-value="isbn_count">—</strong><span>ISBN localizados</span></div></div><p class="book-notice">La disponibilidad se actualiza una vez al día. Última comprobación: <strong data-updated>—</strong>.</p><p data-book-status class="catalog-status"></p></section>
<section class="section" id="bibliotecas-canarias"><h2>Préstamo de ${esc(data.title)} en Canarias</h2><p>RED BICA aporta el catálogo y la disponibilidad. Los nombres públicos y la información de cada biblioteca se enriquecen con el Directorio de Bibliotecas de Canarias.</p><div data-island-status class="book-islands"><p>Cargando disponibilidad…</p></div></section>`
  : '';
const canonical=`https://miterapiaregresiva.com/autores/${authorSlug}/libros/${data.slug}/`;
const bookLd={"@type":"Book","name":data.title,"alternateName":data.original_title,"author":data.authors.map((x,i)=>({"@type":"Person","name":x.name,...(i===0?{"url":`https://miterapiaregresiva.com/autores/${authorSlug}/`}:{})})),"inLanguage":data.languages||["es"],"isbn":data.primary_isbn||undefined};
if (hasCover) bookLd.image=cover.src;
const jsonLd=JSON.stringify({"@context":"https://schema.org","@graph":[bookLd,{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://miterapiaregresiva.com/"},{"@type":"ListItem","position":2,"name":"Biblioteca","item":"https://miterapiaregresiva.com/biblioteca-de-terapia-regresiva/"},{"@type":"ListItem","position":3,"name":"Autores","item":"https://miterapiaregresiva.com/autores/"},{"@type":"ListItem","position":4,"name":author.name,"item":`https://miterapiaregresiva.com/autores/${authorSlug}/`},{"@type":"ListItem","position":5,"name":data.title,"item":canonical}]}]});
const values={
  TITLE:esc(data.title), ORIGINAL_TITLE:esc(data.original_title), AUTHOR:esc(author.name), AUTHORS_DISPLAY:esc(authorsDisplay), AUTHOR_SLUG:esc(authorSlug),
  SLUG:esc(data.slug), LEAD:esc(data.lead), EYEBROW:esc(data.eyebrow || `Libro de ${authorsDisplay}`), ABOUT:paragraphs, LANGUAGE_LABEL:languageLabel, LANGUAGE_TAGS:languageTags, ISBNS:isbns, COVER_SRC:esc(cover.src), COVER_ALT:esc(cover.alt), COVER_CREDIT:coverCredit,
  ARCHIVE:archive, ONLINE_HEADING:onlineHeading, PRIMARY_ACTIONS:primaryActions, AVAILABILITY_SECTIONS:availabilitySections, DATA_SOURCE:esc(data.data_source||`/data/library/${authorSlug}.json`),
  AVAILABILITY_SOURCE:esc(availabilityEnabled ? (data.availability_source||`/data/availability/${authorSlug}.json`) : ''), WORK_SLUG:esc(data.work_slug),
  JSON_LD:jsonLd, PURCHASE:purchase, RELATED_AUTHOR:relatedCards(data.related_author_books), RELATED_REGRESSION:relatedCards(data.related_regression_books), PRIMARY_ISBN:esc(data.primary_isbn||''), CANONICAL:canonical
};
let html=template;
for(const [k,v] of Object.entries(values)) html=html.split(`{{${k}}}`).join(v);
if (/{{[A-Z0-9_]+}}/.test(html)) throw new Error('La plantilla contiene variables sin resolver.');
await writeFile(output,html,'utf8');
console.log(`Generada: ${output.replace(ROOT+'/','')}`);
