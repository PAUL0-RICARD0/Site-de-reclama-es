/* ============================================================
   GLOBAL.JS — Comportamentos compartilhados em todas as páginas
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- 1. Fade-in ao carregar a página ---
  document.body.classList.add('fade-in');

  // --- 2. Fade-out ao navegar entre páginas ---
  document.querySelectorAll('a[href]').forEach(link => {
    // Ignora links externos, âncoras e links com target="_blank"
    if (
      link.hostname !== window.location.hostname ||
      link.getAttribute('href').startsWith('#') ||
      link.target === '_blank'
    ) return;

    link.addEventListener('click', function (e) {
      e.preventDefault();
      const destino = this.href;
      document.body.classList.remove('fade-in');
      setTimeout(() => { window.location.href = destino; }, 400);
    });
  });

  // --- 3. Menu hambúrguer ---
  const btnMenu = document.querySelector('.btn-menu');
  const siteNav = document.querySelector('.site-nav');

  if (btnMenu && siteNav) {
    btnMenu.addEventListener('click', function () {
      const aberto = siteNav.classList.toggle('aberto');
      btnMenu.classList.toggle('aberto', aberto);
      btnMenu.setAttribute('aria-expanded', aberto);
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', function (e) {
      if (!btnMenu.contains(e.target) && !siteNav.contains(e.target)) {
        siteNav.classList.remove('aberto');
        btnMenu.classList.remove('aberto');
        btnMenu.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 4. Destaca o link ativo no menu ---
  const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === paginaAtual) link.classList.add('ativo');
  });
});
