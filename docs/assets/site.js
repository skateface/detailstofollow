// "details to follow" label for the coming-soon links
(function () {
  var links = document.querySelectorAll('.soon');
  if (!links.length) return;

  var tip = document.createElement('div');
  tip.className = 'dtf-tip';
  tip.setAttribute('aria-hidden', 'true');
  tip.textContent = 'details to follow';
  document.body.appendChild(tip);

  var hideTimer;

  function place(x, y) {
    // keep the label on screen
    var w = tip.offsetWidth, h = tip.offsetHeight;
    var nx = Math.min(Math.max(8, x + 14), window.innerWidth - w - 14);
    var ny = Math.min(Math.max(8, y - h - 14), window.innerHeight - h - 14);
    tip.style.setProperty('--tx', nx + 'px');
    tip.style.setProperty('--ty', ny + 'px');
  }
  function placeOver(el) {
    var r = el.getBoundingClientRect();
    place(r.left + r.width / 2 - tip.offsetWidth / 2 - 14, r.top);
  }
  function show() { clearTimeout(hideTimer); tip.classList.add('is-on'); }
  function hide() { tip.classList.remove('is-on'); }

  links.forEach(function (a) {
    a.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'mouse') { place(e.clientX, e.clientY); show(); }
    });
    a.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'mouse') place(e.clientX, e.clientY);
    });
    a.addEventListener('pointerleave', function (e) {
      if (e.pointerType === 'mouse') hide();
    });
    // touch / keyboard: show it above the link for a moment
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (!tip.classList.contains('is-on') || e.pointerType !== 'mouse') {
        placeOver(a); show();
        hideTimer = setTimeout(hide, 1600);
      }
    });
    a.addEventListener('focus', function () {
      if (a.matches(':focus-visible')) { placeOver(a); show(); }
    });
    a.addEventListener('blur', hide);
    a.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); placeOver(a); show(); }
    });
  });
})();
