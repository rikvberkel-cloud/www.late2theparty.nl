/* ============================================
   Tagfilter voor het nieuwsbriefarchief.
   Filters zijn genre-pills (ae-pill); aria-pressed bepaalt de actieve.
   ============================================ */
(function () {
  'use strict';

  var knoppen = document.querySelectorAll('.ae-pill[data-tag]');
  var items = document.querySelectorAll('.nb-item');
  var leeg = document.getElementById('nbEmpty');

  if (!knoppen.length || !items.length) return;

  /* Een filter zonder editie blijft verborgen tot er een editie met die tag is */
  knoppen.forEach(function (knop) {
    var tag = knop.getAttribute('data-tag');
    if (tag === 'alles') return;
    var heeftEditie = Array.prototype.some.call(items, function (item) {
      return (item.getAttribute('data-tags') || '').split(' ').indexOf(tag) !== -1;
    });
    knop.hidden = !heeftEditie;
  });

  function filter(tag) {
    var zichtbaar = 0;

    items.forEach(function (item) {
      var tags = (item.getAttribute('data-tags') || '').split(' ');
      var toon = tag === 'alles' || tags.indexOf(tag) !== -1;
      item.hidden = !toon;
      if (toon) zichtbaar++;
    });

    if (leeg) leeg.hidden = zichtbaar > 0;
  }

  knoppen.forEach(function (knop) {
    knop.addEventListener('click', function () {
      knoppen.forEach(function (k) {
        k.setAttribute('aria-pressed', k === knop ? 'true' : 'false');
      });
      filter(knop.getAttribute('data-tag'));
    });
  });
})();
