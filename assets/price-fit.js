function fitPriceItems() {
  document.querySelectorAll('.price-item').forEach(function (span) {
    span.style.fontSize = '';

    var card = span.closest('.price');
    if (!card) return;

    var cardWidth = card.offsetWidth;
    if (!cardWidth) return;

    var textWidth = span.offsetWidth;
    if (textWidth <= cardWidth) return;

    var fs = parseFloat(getComputedStyle(span).fontSize);
    span.style.fontSize = Math.max(fs * cardWidth / textWidth * 0.92, 8) + 'px';
  });
}

window.addEventListener('load', fitPriceItems);

if (typeof debounce === 'function') {
  window.addEventListener('resize', debounce(fitPriceItems, 200));
} else {
  var priceFitResizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(priceFitResizeTimeout);
    priceFitResizeTimeout = setTimeout(fitPriceItems, 200);
  });
}
