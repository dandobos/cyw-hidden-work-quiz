// HW LOADER. Written by sync-deploy.py; not part of hidden-work-quiz-v2.html.
// This pinned URL used to hold the whole quiz bundle, which browsers cached for ten
// minutes past every deploy. Now it holds no app code at all: it reads version.txt
// (unique query, so no cache can answer) and injects the real bundle by its stamped
// URL, hidden-work-app-core.js?v=<stamp>, which no cache has seen before. If the
// version fetch is slow or fails, it injects the core with a per-minute query, which
// also misses every cache: at most 1 minute stale. Current build at write time: fd4da18e20.
(function () {
  var el = document.currentScript;
  var src = el && el.src ? String(el.src) : '';
  var base = /^https?:/.test(src) ? src.split('?')[0].replace(/[^\/]+$/, '') : '';
  var done = false;
  function inject(stamp) {
    if (done) return;
    done = true;
    var v = stamp ? '?v=' + stamp : '';
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = base + 'hidden-work-app.css' + v;
    document.head.appendChild(l);
    var sc = document.createElement('script');
    sc.src = base + 'hidden-work-app-core.js' + v;
    document.head.appendChild(sc);
  }
  function fallback() { inject('m' + Math.floor(Date.now() / 60000)); }
  if (!base) { inject(''); return; }
  if (!window.fetch) { fallback(); return; }
  setTimeout(fallback, 4000);
  fetch(base + 'version.txt?fresh=' + Date.now(), { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.text() : ''; })
    .then(function (t) {
      t = (t || '').trim();
      if (/^[0-9a-f]{6,40}$/.test(t)) inject(t); else fallback();
    })
    .catch(fallback);
})();
