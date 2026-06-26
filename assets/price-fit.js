function fitPrice(container) {
  ['price__regular', 'price__sale'].forEach(function (cls) {
    var el = container.querySelector('.' + cls);
    if (!el || getComputedStyle(el).display === 'none') return;

    var item = el.querySelector('.price-item');
    if (!item) return;

    item.style.fontSize = '';

    // Temporarily force single line to get the true text width
    var savedWS = item.style.whiteSpace;
    item.style.whiteSpace = 'nowrap';
    var naturalWidth = item.getBoundingClientRect().width;
    item.style.whiteSpace = savedWS;

    var containerWidth = container.getBoundingClientRect().width;
    if (!containerWidth || naturalWidth <= containerWidth) return;

    var currentSize = parseFloat(getComputedStyle(item).fontSize);
    var newSize = Math.max(currentSize * (containerWidth / naturalWidth) * 0.95, 8);
    item.style.fontSize = newSize + 'px';
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

document.addEventListener('variant:changed', fitAllPrices);
