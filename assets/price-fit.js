window.addEventListener('load', function () {
  document.querySelectorAll('.price-item').forEach(function (span) {
    span.style.fontSize = '';

    var card = span.closest('.price');
    if (!card) return;

    var cardWidth = card.offsetWidth;
    if (!cardWidth) return;

    // Force inline-block + nowrap to measure real text width
    span.style.display = 'inline-block';
    span.style.whiteSpace = 'nowrap';
    var textWidth = span.offsetWidth;
    span.style.display = '';
    span.style.whiteSpace = '';

    if (textWidth <= cardWidth) return;

    var fs = parseFloat(getComputedStyle(span).fontSize);
    span.style.fontSize = Math.max(fs * cardWidth / textWidth * 0.92, 8) + 'px';
  });
});
