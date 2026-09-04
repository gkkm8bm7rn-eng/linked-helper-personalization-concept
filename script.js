const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const pricingToggles = document.querySelectorAll('.pricing-toggle');
const storageLabels = document.querySelectorAll('.storage-label');
const priceValues = document.querySelectorAll('[data-local][data-cloud]');

pricingToggles.forEach((button) => {
  button.addEventListener('click', () => {
    const storage = button.dataset.storage;

    pricingToggles.forEach((toggle) => {
      const active = toggle === button;
      toggle.classList.toggle('active', active);
      toggle.setAttribute('aria-pressed', String(active));
    });

    storageLabels.forEach((label) => {
      label.textContent = storage === 'cloud' ? 'Cloud-based storage' : 'Local-based storage';
    });

    priceValues.forEach((value) => {
      value.textContent = storage === 'cloud' ? value.dataset.cloud : value.dataset.local;
    });
  });
});
