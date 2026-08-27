// HW LOADER. Written by sync-deploy.py; not part of hidden-work-quiz-v2.html.
// This pinned URL used to hold the whole quiz bundle, which browsers cached for ten
// minutes past every deploy. Now it holds no app code at all: it reads version.txt
// (unique query, so no cache can answer) and injects the real bundle by its stamped
// URL, hidden-work-app-core.js?v=<stamp>, which no cache has seen before. If the
// version fetch fails or returns garbage, it injects the unstamped core after a short
// timeout: at most ten minutes stale, never broken. Current build at write time: bebf1186fe.
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
  if (!base || !window.fetch) { inject(''); return; }
  setTimeout(function () { inject(''); }, 2500);
  fetch(base + 'version.txt?fresh=' + Date.now(), { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.text() : ''; })
    .then(function (t) {
      t = (t || '').trim();
      inject(/^[0-9a-f]{6,40}$/.test(t) ? t : '');
    })
    .catch(function () { inject(''); });
})();
