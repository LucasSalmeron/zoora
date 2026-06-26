function fitPrice(container) {
  ['price__regular', 'price__sale'].forEach(function (cls) {
    var el = container.querySelector('.' + cls);
    if (!el || getComputedStyle(el).display === 'none') return;

    el.style.fontSize = '';

    var item = el.querySelector('.price-item');
    if (!item) return;

    var containerWidth = container.getBoundingClientRect().width;
    if (!containerWidth) return;

    var itemWidth = item.getBoundingClientRect().width;
    if (itemWidth <= containerWidth) return;

    var currentSize = parseFloat(getComputedStyle(el).fontSize);
    var newSize = Math.max(currentSize * (containerWidth / itemWidth) * 0.95, 8);
    el.style.fontSize = newSize + 'px';
  });
}

function fitAllPrices(root) {
  (root || document).querySelectorAll('.price').forEach(fitPrice);
}

var ro = new ResizeObserver(function (entries) {
  entries.forEach(function (entry) {
    fitPrice(entry.target);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.price').forEach(function (el) {
    ro.observe(el);
  });
});

document.addEventListener('variant:changed', function () {
  fitAllPrices();
});
