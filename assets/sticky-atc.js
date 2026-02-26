(() => {
  const stickyBar = document.querySelector('[data-sticky-atc]');
  const triggerButton = document.querySelector('[data-sticky-atc-trigger]');
  const mainSubmit = document.querySelector('.product-form__submit');

  if (!stickyBar || !triggerButton || !mainSubmit) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      stickyBar.classList.toggle('is-visible', !entry.isIntersecting);
    },
    { threshold: 0.35 }
  );

  observer.observe(mainSubmit);

  triggerButton.addEventListener('click', () => {
    mainSubmit.click();
    mainSubmit.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
