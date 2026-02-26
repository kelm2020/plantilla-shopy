(() => {
  const onReady = (cb) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cb, { once: true });
      return;
    }
    cb();
  };

  const runWhenIdle = (cb) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(cb, { timeout: 800 });
      return;
    }
    window.setTimeout(cb, 1);
  };

  onReady(() => {
    const focusTarget = document.querySelector('#MainContent');
    document.addEventListener('shopify:section:load', () => {
      if (focusTarget) focusTarget.removeAttribute('tabindex');
    });

    runWhenIdle(() => {
      document.documentElement.classList.add('theme-idle-ready');
    });
  });
})();
