function measureTextWidth(span, computedStyle) {
  measureTextWidth.canvas = measureTextWidth.canvas || document.createElement('canvas');
  var ctx = measureTextWidth.canvas.getContext('2d');

  ctx.font =
    computedStyle.font ||
    [
      computedStyle.fontStyle,
      computedStyle.fontVariant,
      computedStyle.fontWeight,
      computedStyle.fontSize,
      computedStyle.fontFamily,
    ].join(' ');

  if ('letterSpacing' in ctx) {
    ctx.letterSpacing = computedStyle.letterSpacing;
  }

  return ctx.measureText(span.textContent.trim()).width;
}

function fitPriceItems() {
  document.querySelectorAll('.price-item').forEach(function (span) {
    span.style.fontSize = '';

    var card = span.closest('.price');
    if (!card) return;

    var cardWidth = card.offsetWidth;
    if (!cardWidth) return;

    var computedStyle = getComputedStyle(span);
    var textWidth = measureTextWidth(span, computedStyle);
    if (textWidth <= cardWidth) return;

    var fs = parseFloat(computedStyle.fontSize);
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
