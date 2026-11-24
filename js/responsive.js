// РАХАТ — мобильное меню, работает и после смены языка
function setupMobileMenu() {
  const nav = document.querySelector('header .nav');
  if (!nav || nav.querySelector('.mobile-menu')) return;
  const links = nav.querySelector('.links');
  if (!links) return;
  links.id = 'mobile-navigation';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'mobile-menu';
  button.textContent = '☰';
  button.setAttribute('aria-label', 'Меню / Мәзір');
  button.setAttribute('aria-controls', links.id);
  button.setAttribute('aria-expanded', 'false');
  nav.insertBefore(button, links);
  function close() { nav.classList.remove('menu-open'); button.setAttribute('aria-expanded', 'false'); }
  button.onclick = () => { const open = nav.classList.toggle('menu-open'); button.setAttribute('aria-expanded', String(open)); };
  links.addEventListener('click', close);
  nav.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); button.focus(); } });
}
setupMobileMenu();
new MutationObserver(setupMobileMenu).observe(document.body, {childList:true, subtree:true});
