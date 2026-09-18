const updateStickyHeaderOffset=()=>{
  const header=document.querySelector('.site-header');
  if(!header)return;
  const gap=16;
  document.documentElement.style.setProperty('--sticky-header-offset',`${Math.ceil(header.getBoundingClientRect().height+gap)}px`);
};

updateStickyHeaderOffset();
window.addEventListener('resize',updateStickyHeaderOffset,{passive:true});
if('ResizeObserver' in window){
  const stickyHeader=document.querySelector('.site-header');
  if(stickyHeader)new ResizeObserver(updateStickyHeaderOffset).observe(stickyHeader);
}

document.addEventListener('DOMContentLoaded',()=>{
  updateStickyHeaderOffset();
  document.querySelectorAll('.site-header').forEach(header=>{
    const nav=header.querySelector('.nav');
    const menu=header.querySelector('.menu');
    const button=header.querySelector('.mobile-menu-toggle');
    if(!nav||!menu||!button)return;

    nav.classList.add('mobile-nav-enhanced');

    const setOpen=open=>{
      nav.classList.toggle('mobile-menu-open',open);
      button.setAttribute('aria-expanded',String(open));
      const label=button.querySelector('.mobile-menu-label');
      const icon=button.querySelector('.mobile-menu-icon');
      if(label)label.textContent=open?'Cerrar':'Menú';
      if(icon)icon.textContent=open?'×':'☰';
    };
    const close=(restoreFocus=false)=>{
      if(!nav.classList.contains('mobile-menu-open'))return;
      setOpen(false);
      if(restoreFocus)button.focus();
    };

    button.addEventListener('click',()=>setOpen(!nav.classList.contains('mobile-menu-open')));
    menu.addEventListener('click',e=>{if(e.target.closest('a'))close(false)});
    document.addEventListener('click',e=>{if(!nav.contains(e.target))close(false)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close(true)});
  });
});

document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  document.querySelectorAll('.image-credit[open]').forEach(panel=>{
    const restoreFocus=panel.contains(document.activeElement);
    panel.open=false;
    if(restoreFocus)panel.querySelector('summary')?.focus();
  });
});
