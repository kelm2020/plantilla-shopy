(() => {
  const forms = document.querySelectorAll('.product-form');
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener('submit', () => {
      const submitButton = form.querySelector('[type="submit"]');
      if (submitButton) submitButton.setAttribute('aria-busy', 'true');
    });
  });
})();
