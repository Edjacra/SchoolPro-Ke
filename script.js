// SchoolPro Ke — shared site behaviour
(function () {
  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }

  // Dropdown toggle on tap for touch/mobile (desktop uses hover via CSS)
  document.querySelectorAll('.has-dropdown > button.nav-top-link').forEach((btn) => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.has-dropdown');
      const isOpen = parent.classList.contains('open');
      document.querySelectorAll('.has-dropdown.open').forEach((el) => {
        if (el !== parent) el.classList.remove('open');
      });
      parent.classList.toggle('open', !isOpen);
    });
  });

  // Close mobile menu when a real link is followed
  document.querySelectorAll('.nav-menu-wrap a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  });

  // Role-based tabs (For Principals / For Teachers / For Parents)
  const roleTabs = document.querySelectorAll('.role-tab');
  const rolePanels = document.querySelectorAll('.role-panel');
  function activateRole(role) {
    roleTabs.forEach((t) => t.classList.toggle('active', t.dataset.role === role));
    rolePanels.forEach((p) => p.classList.toggle('active', p.dataset.role === role));
  }
  roleTabs.forEach((tab) => {
    tab.addEventListener('click', () => activateRole(tab.dataset.role));
  });

  // Allow header links like index.html#roles?role=teachers to preselect a tab
  function applyRoleFromHash() {
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');
    if (role && document.querySelector('.role-tab[data-role="' + role + '"]')) {
      activateRole(role);
    }
  }
  applyRoleFromHash();

  // Header shadow-on-scroll (subtle, no layout shift)
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 8 ? '0 1px 0 rgba(18,27,62,0.06)' : 'none';
    }, { passive: true });
  }
})();
