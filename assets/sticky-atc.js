(() => {
  const stickyBar = document.querySelector('[data-sticky-atc]');
  if (!stickyBar) return;

  const productForm = document.querySelector(stickyBar.dataset.productFormSelector);
  const mainVariantInput = productForm?.querySelector('input[name="id"]');
  const mainSubmit = productForm?.querySelector('.product-form__submit');

  const stickyVariantSelect = stickyBar.querySelector('[data-sticky-atc-variant-select]');
  const stickyQuantityInput = stickyBar.querySelector('[data-sticky-atc-quantity]');
  const stickyAddButton = stickyBar.querySelector('[data-sticky-atc-add]');
  const stickyImage = stickyBar.querySelector('[data-sticky-atc-image]');
  const stickyPrice = stickyBar.querySelector('[data-sticky-atc-price]');
  const stickyStatus = stickyBar.querySelector('[data-sticky-atc-status]');

  const productDataNode = document.querySelector('[data-sticky-atc-product-json]');
  if (!productForm || !mainVariantInput || !mainSubmit || !stickyVariantSelect || !stickyQuantityInput || !stickyAddButton || !productDataNode) {
    return;
  }

  const productData = JSON.parse(productDataNode.textContent);
  const activeCurrency = window.Shopify?.currency?.active || (window.Shopify?.currency?.default) || 'USD';
  const moneyFormatter = new Intl.NumberFormat(document.documentElement.lang || 'en', {
    style: 'currency',
    currency: activeCurrency
  });

  const getVariantById = (id) => productData.variants.find((variant) => String(variant.id) === String(id));

  const updateStickyContent = (variantId) => {
    const variant = getVariantById(variantId) || productData.variants[0];
    if (!variant) return;

    stickyVariantSelect.value = String(variant.id);
    mainVariantInput.value = String(variant.id);

    stickyAddButton.disabled = !variant.available;
    stickyAddButton.setAttribute('aria-disabled', String(!variant.available));
    stickyAddButton.textContent = variant.available ? stickyBar.dataset.addLabel : stickyBar.dataset.soldOutLabel;

    if (stickyPrice) stickyPrice.textContent = moneyFormatter.format(variant.price / 100);

    const media = variant.featured_image || productData.featured_image;
    if (media && stickyImage) {
      stickyImage.src = media.src;
      stickyImage.alt = media.alt || productData.title;
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      stickyBar.classList.toggle('is-visible', !entry.isIntersecting);
    },
    { threshold: 0.1 }
  );

  observer.observe(productForm);

  stickyVariantSelect.addEventListener('change', (event) => {
    updateStickyContent(event.target.value);
    const mainOptionSelects = productForm.querySelectorAll('select[name^="options["]');
    const selectedVariant = getVariantById(event.target.value);

    if (selectedVariant && mainOptionSelects.length) {
      mainOptionSelects.forEach((select, index) => {
        if (selectedVariant.options[index]) select.value = selectedVariant.options[index];
      });
    }
  });

  stickyAddButton.addEventListener('click', () => {
    productForm.querySelector('input[name="quantity"]')?.remove();

    const quantityInput = document.createElement('input');
    quantityInput.type = 'hidden';
    quantityInput.name = 'quantity';
    quantityInput.value = stickyQuantityInput.value;
    productForm.appendChild(quantityInput);

    mainSubmit.click();

    if (stickyStatus) {
      stickyStatus.textContent = stickyBar.dataset.addingLabel;
      window.setTimeout(() => {
        stickyStatus.textContent = '';
      }, 1000);
    }
  });

  stickyQuantityInput.addEventListener('change', () => {
    const qty = Number.parseInt(stickyQuantityInput.value, 10);
    if (Number.isNaN(qty) || qty < 1) stickyQuantityInput.value = '1';
  });

  updateStickyContent(mainVariantInput.value);
})();
