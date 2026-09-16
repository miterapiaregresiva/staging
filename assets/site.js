document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.faq').forEach(f=>{const items=[...f.querySelectorAll('details')];items.forEach(i=>i.addEventListener('toggle',()=>{if(i.open)items.forEach(o=>{if(o!==i)o.open=false})}))});

  /* Sprint 06 — navegación móvil compacta y accesible.
     Sin JavaScript el menú permanece visible: la ocultación solo se activa tras añadir .mobile-nav-enhanced. */
  document.querySelectorAll('.site-header').forEach((header,index)=>{
    const nav=header.querySelector('.nav');
    const menu=header.querySelector('.menu');
    if(!nav||!menu||nav.querySelector('.mobile-menu-toggle'))return;

    const menuId=menu.id||`mobile-navigation-${index+1}`;
    menu.id=menuId;

    const button=document.createElement('button');
    button.type='button';
    button.className='mobile-menu-toggle';
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-controls',menuId);
    button.innerHTML='<span class="mobile-menu-label">Menú</span><span class="mobile-menu-icon" aria-hidden="true">☰</span>';
    nav.insertBefore(button,menu);

    const setOpen=open=>{
      nav.classList.toggle('mobile-menu-open',open);
      button.setAttribute('aria-expanded',String(open));
      button.querySelector('.mobile-menu-label').textContent=open?'Cerrar':'Menú';
      button.querySelector('.mobile-menu-icon').textContent=open?'×':'☰';
    };
    const close=(restoreFocus=false)=>{if(!nav.classList.contains('mobile-menu-open'))return;setOpen(false);if(restoreFocus)button.focus()};

    button.addEventListener('click',()=>setOpen(!nav.classList.contains('mobile-menu-open')));
    menu.addEventListener('click',e=>{if(e.target.closest('a'))close(false)});
    document.addEventListener('click',e=>{if(!nav.contains(e.target))close(false)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close(true)});

    nav.classList.add('mobile-nav-enhanced');
  });

  if(!document.getElementById('sprint-06-mobile-nav-styles')){const s=document.createElement('style');s.id='sprint-06-mobile-nav-styles';s.textContent=`
.mobile-menu-toggle{display:none}
@media(max-width:700px){
  .site-header{position:sticky;top:0}
  .site-header .nav{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:.5rem;padding:.35rem 1.25rem;min-height:64px;text-align:left}
  .site-header .brand-lockup{margin:0;justify-content:flex-start;gap:.55rem;width:auto;max-width:min(100%,18rem);min-height:0}
  .site-header .brand-lockup .brand-symbol{width:48px;height:48px;flex:0 0 48px}
  .site-header .brand-lockup .brand-copy{display:block;min-width:0;text-align:left}
  .site-header .brand-lockup .brand-domain{display:block;font-size:clamp(.98rem,4.4vw,1.2rem);line-height:1.1;overflow:hidden;text-overflow:ellipsis}
  .site-header .brand-lockup .brand-tagline,.site-header .brand-lockup .brand-service{display:none}
  .mobile-menu-toggle{grid-column:2;display:inline-flex;align-items:center;justify-content:center;gap:.4rem;min-width:48px;min-height:48px;padding:.55rem .7rem;border:1px solid transparent;border-radius:999px;background:transparent;color:var(--text);font:inherit;font-size:.95rem;font-weight:650;cursor:pointer}
  .mobile-menu-toggle:hover,.mobile-menu-toggle[aria-expanded="true"]{background:var(--accent-soft);color:var(--accent-strong)}
  .mobile-menu-toggle:focus-visible{outline:3px solid var(--focus);outline-offset:3px}
  .mobile-menu-icon{font-size:1.25rem;line-height:1;width:1.15rem;text-align:center}
  .site-header .mobile-nav-enhanced .menu{display:none!important}
  .site-header .mobile-nav-enhanced.mobile-menu-open .menu{position:absolute;top:100%;left:0;right:0;z-index:30;display:flex!important;flex-direction:column;align-items:stretch;width:100%;gap:.15rem;padding:.55rem 1.25rem .85rem;background:rgba(251,249,252,.98);border-top:1px solid rgba(107,63,120,.12);border-bottom:1px solid var(--line);box-shadow:0 12px 26px rgba(55,34,63,.08);backdrop-filter:blur(14px)}
  .site-header .mobile-nav-enhanced.mobile-menu-open .menu a{display:flex!important;width:100%;min-height:48px;align-items:center;justify-content:flex-start;text-align:left;padding:.65rem .75rem;border-radius:12px;font-size:1rem;line-height:1.3}
  .site-header .mobile-nav-enhanced.mobile-menu-open .menu a[aria-current="page"]{background:var(--accent-soft);color:var(--accent-strong)}
  .wrap{width:min(100% - 2.5rem,var(--max))}
  .site-footer .footer-grid{grid-template-columns:1fr!important;gap:1.5rem}
  .site-footer .footer-brand-column{grid-column:auto}
  .site-footer .footer-grid>nav,.site-footer .footer-grid>nav:first-of-type,.site-footer .footer-grid>nav:last-of-type{align-items:flex-start!important;text-align:left!important}
  .site-footer .footer-brand-lockup{margin-inline:0;align-items:flex-start;text-align:left}
  .site-footer .footer-brand-divider{display:none}
  .hero{padding-top:2rem}
}
@media(max-width:390px){
  .site-header .nav{padding-inline:1rem}
  .site-header .brand-lockup .brand-symbol{width:44px;height:44px;flex-basis:44px}
  .site-header .brand-lockup .brand-domain{font-size:.96rem}
  .mobile-menu-toggle{padding-inline:.6rem}
  .site-header .mobile-nav-enhanced.mobile-menu-open .menu{padding-inline:1rem}
}
@media(prefers-reduced-motion:reduce){.site-header *{scroll-behavior:auto}}
`;
    document.head.appendChild(s)
  }

  const webpMap={'assets/images/books/internet-archive-brian-weiss-a-traves-del-tiempo-portada-417x670.jpg':'assets/images/webp/internet-archive-brian-weiss-a-traves-del-tiempo-portada-417x670.webp','assets/images/books/internet-archive-brian-weiss-los-mensajes-de-los-sabios-portada-440x672.jpeg':'assets/images/webp/internet-archive-brian-weiss-los-mensajes-de-los-sabios-portada-440x672.webp','assets/images/books/internet-archive-brian-weiss-los-milagros-existen-portada-412x668.jpeg':'assets/images/webp/internet-archive-brian-weiss-los-milagros-existen-portada-412x668.webp','assets/images/books/internet-archive-brian-weiss-muchas-vidas-muchos-maestros-portada-404x668.jpeg':'assets/images/webp/internet-archive-brian-weiss-muchas-vidas-muchos-maestros-portada-404x668.webp','assets/images/books/internet-archive-brian-weiss-muchos-cuerpos-una-misma-alma-portada-396x671.jpeg':'assets/images/webp/internet-archive-brian-weiss-muchos-cuerpos-una-misma-alma-portada-396x671.webp','assets/images/books/internet-archive-helen-wambach-vida-antes-de-la-vida-portada-579x834.jpeg':'assets/images/webp/internet-archive-helen-wambach-vida-antes-de-la-vida-portada-579x834.webp','assets/images/books/internet-archive-ian-stevenson-cases-of-the-reincarnation-type-portada-452x668.jpeg':'assets/images/webp/internet-archive-ian-stevenson-cases-of-the-reincarnation-type-portada-452x668.webp','assets/images/books/internet-archive-ian-stevenson-children-who-remember-previous-lives-portada-426x671.jpeg':'assets/images/webp/internet-archive-ian-stevenson-children-who-remember-previous-lives-portada-426x671.webp','assets/images/books/internet-archive-ian-stevenson-twenty-cases-suggestive-of-reincarnation-portada-438x670.jpeg':'assets/images/webp/internet-archive-ian-stevenson-twenty-cases-suggestive-of-reincarnation-portada-438x670.webp','assets/images/books/internet-archive-ian-stevenson-where-reincarnation-and-biology-intersect-portada-406x669.jpeg':'assets/images/webp/internet-archive-ian-stevenson-where-reincarnation-and-biology-intersect-portada-406x669.webp','assets/images/books/internet-archive-raymond-moody-life-after-life-edicion-francesa-portada-395x672.jpg':'assets/images/webp/internet-archive-raymond-moody-life-after-life-edicion-francesa-portada-395x672.webp','assets/images/branding/miterapiaregresiva-equipo-identidad-logo-reducido-150x150.png':'assets/images/webp/miterapiaregresiva-equipo-identidad-logo-redes-150x150.webp','assets/images/branding/miterapiaregresiva-equipo-identidad-logo-principal-1024x1024.png':'assets/images/webp/miterapiaregresiva-equipo-identidad-logo-redes-1024x1024.webp'};
  document.querySelectorAll('img').forEach(img=>{const s=img.getAttribute('src');if(!s)return;if(webpMap[s])img.src=webpMap[s];else if(s.startsWith('assets/images/original/')&&/\.(?:jpe?g|png)$/i.test(s))img.src=s.replace('assets/images/original/','assets/images/webp/').replace(/\.(?:jpe?g|png)$/i,'.webp')});

  /* Convierte párrafos que son exclusivamente acciones/enlaces en botones, también cuando hay varios. Sprint 08 revisará esta jerarquía. */
  document.querySelectorAll('main p').forEach(p=>{if(p.closest('.image-credit'))return;const n=[...p.childNodes].filter(x=>x.nodeType!==Node.TEXT_NODE||x.textContent.trim());const actions=n.length&&n.every(x=>(x.nodeType===Node.ELEMENT_NODE&&x.tagName==='A')||(x.nodeType===Node.TEXT_NODE&&/^[\s·|/]+$/.test(x.textContent)));if(!actions)return;n.forEach(x=>{if(x.nodeType===Node.ELEMENT_NODE)x.classList.add('button','content-link-button');else x.remove()});p.classList.add('link-actions')});

  const hasBC=[...document.querySelectorAll('script[type="application/ld+json"]')].some(s=>s.textContent.includes('BreadcrumbList')),bc=document.querySelector('.breadcrumbs');
  if(bc&&!hasBC){const origin='https://miterapiaregresiva.com',labels=bc.textContent.split('→').map(x=>x.trim()).filter(Boolean),links=[...bc.querySelectorAll('a')],items=labels.map((name,i)=>{let item;if(i<links.length)item=origin+new URL(links[i].href,location.href).pathname;else item=origin+location.pathname;return{'@type':'ListItem',position:i+1,name,item}}),s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items});document.head.appendChild(s)}

  if(!document.querySelector('.whatsapp-float')){const a=document.createElement('a');a.className='whatsapp-float';a.href='https://wa.me/34650805613?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20las%20sesiones%20de%20terapia%20regresiva.';a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label','Contactar por WhatsApp');a.textContent='WhatsApp';document.body.appendChild(a)}

  document.querySelectorAll('.site-footer').forEach(f=>{const nav=f.querySelector('nav[aria-label="Recursos y legal"]');if(nav&&!nav.querySelector('a[href="licencias-de-recursos/"]')){const a=document.createElement('a');a.href='licencias-de-recursos/';a.textContent='Licencias de recursos';nav.appendChild(a)}if(f.querySelector('.footer-legal'))return;const box=document.createElement('div');box.className='wrap footer-legal';box.innerHTML='<p>© 2023–2026 Mi Terapia Regresiva · Código bajo <a href="https://github.com/miterapiaregresiva/miterapiaregresiva.github.io/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">GNU AGPL v3.0</a> · Desarrollo web: <a href="https://gofiodesign.eu/" target="_blank" rel="noopener noreferrer">Gofio Design</a></p>';f.appendChild(box)});

  if(!document.getElementById('sprint-4-styles')){const s=document.createElement('style');s.id='sprint-4-styles';s.textContent='.footer-legal{margin-top:2rem;padding-top:1.25rem;border-top:1px solid var(--line);font-size:.84rem}.footer-legal p{margin:0}.content-link-button{margin-top:.2rem;min-height:48px}.link-actions{display:flex;gap:.6rem;flex-wrap:wrap;align-items:center}.card .content-link-button{margin-top:.35rem}.whatsapp-float{position:fixed;right:max(1rem,env(safe-area-inset-right));bottom:max(1rem,env(safe-area-inset-bottom));z-index:50;min-width:58px;height:58px;padding:0 1rem;border-radius:999px;display:flex;align-items:center;justify-content:center;background:#25d366;color:#12351e;font-weight:750;text-decoration:none;box-shadow:0 12px 30px rgba(24,93,50,.28);animation:wa-pop .45s ease-out both,wa-pulse 1.7s ease-in-out 1.5s 2}.whatsapp-float::before{content:"¿Hablamos?";position:absolute;right:calc(100% + .7rem);white-space:nowrap;background:#fff;color:var(--text);border:1px solid var(--line);border-radius:999px;padding:.42rem .72rem;font-size:.88rem;font-weight:650;box-shadow:0 8px 22px rgba(55,34,63,.12);opacity:0;pointer-events:none;animation:wa-tip 7s ease 1.1s 1 both}.whatsapp-float:hover,.whatsapp-float:focus-visible{background:#1da851}.whatsapp-float:hover::before,.whatsapp-float:focus-visible::before{opacity:1;animation:none}@keyframes wa-pop{from{opacity:0;transform:translateY(18px) scale(.85)}to{opacity:1;transform:none}}@keyframes wa-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}@keyframes wa-tip{0%,100%{opacity:0;transform:translateX(8px)}12%,72%{opacity:1;transform:none}}@media(max-width:700px){.content-link-button{width:100%}.link-actions{display:grid;grid-template-columns:1fr;gap:.5rem}.whatsapp-float{width:56px;min-width:56px;height:56px;padding:0;font-size:0}.whatsapp-float::before{display:none}.whatsapp-float::after{content:"";width:30px;height:30px;background-repeat:no-repeat;background-position:center;background-size:contain;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Cpath fill=%27white%27 d=%27M16.75 2.25c-7.1 0-12.87 5.76-12.87 12.86 0 2.27.6 4.49 1.73 6.44L3.77 28.25l6.86-1.8a12.87 12.87 0 1 0 6.12-24.2zm0 23.33c-1.94 0-3.84-.53-5.49-1.54l-.39-.23-4.07 1.07 1.09-3.97-.26-.41a10.42 10.42 0 1 1 9.12 5.08zm5.72-7.81c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-.99 1.23-.18.21-.37.24-.68.08-.31-.16-1.32-.49-2.51-1.55-.93-.83-1.55-1.85-1.73-2.16-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.25-.63-.51-.54-.71-.55h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61s1.12 3.03 1.28 3.24c.16.21 2.21 3.37 5.35 4.73.75.32 1.33.52 1.78.66.75.24 1.43.21 1.97.13.6-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37z%27/%3E%3C/svg%3E")}}@media(prefers-reduced-motion:reduce){.whatsapp-float,.whatsapp-float::before{animation:none}}';document.head.appendChild(s)}
});

// Close image credit panels with Escape and restore focus to their trigger.
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.image-credit[open]').forEach(panel => {
    const restoreFocus = panel.contains(document.activeElement);
    panel.open = false;
    if (restoreFocus) panel.querySelector('summary').focus();
  });
});
