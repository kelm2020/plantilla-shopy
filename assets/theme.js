(() => {
  const focusTarget = document.querySelector('#MainContent');
  document.addEventListener('shopify:section:load', () => {
    if (focusTarget) focusTarget.removeAttribute('tabindex');
  });
})();
