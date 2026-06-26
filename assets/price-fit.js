function fitPriceElements(root) {
  (root || document).querySelectorAll('.price__regular, .price__sale').forEach(function (el) {
    if (getComputedStyle(el).display === 'none') return;
    el.style.fontSize = '';
    var parent = el.closest('.price');
    if (!parent) return;
    var maxWidth = parent.clientWidth;
    if (!maxWidth) return;
    var size = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > maxWidth && size > 8) {
      size -= 0.5;
      el.style.fontSize = size + 'px';
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  fitPriceElements();

  document.querySelectorAll('.price').forEach(function (el) {
    new MutationObserver(function () {
      fitPriceElements(el);
    }).observe(el, { childList: true, subtree: true, characterData: true });
  });
});
