/* Permanent personal result link: dandobos.com/r/?rt=<token>
 *
 * The quiz mints a token at completion and sends it two ways: to Kit as
 * hw_result_token (so the result email can print this address) and to the
 * beta-portal backend with the quiz log (which stores it next to the reader's
 * raw answers). The result page is a pure function of those answers, so this
 * loader fetches them, hands them to the quiz app on window.__HW_RESTORE, and
 * the app renders the reader's exact original result.
 *
 * The app is only injected AFTER the answers arrive, because it reads
 * __HW_RESTORE synchronously as it loads. Nothing is written back to this
 * browser's storage, so opening a link never overwrites your own result.
 *
 * Loaded by the WordPress page at dandobos.com/r/ (see project notes).
 */
(function () {
  var API = 'https://my.dandobos.com/result/';
  var APP = 'https://dandobos.github.io/cyw-hidden-work-quiz/hidden-work-app.js';
  var page = document.getElementById('page');
  if (!page) return;

  function screenMsg(title, body, showCta) {
    page.innerHTML =
      '<p class="intro-eyebrow">The Choose Your Work Quiz</p>' +
      '<h1 class="intro-title">' + title + '</h1>' +
      '<p class="intro-desc">' + body + '</p>' +
      (showCta
        ? '<a class="continue-btn" style="text-decoration:none;display:block;text-align:center;" ' +
          'href="https://dandobos.com/choose-your-work-quiz/">Take the quiz</a>'
        : '');
  }

  var token = '';
  try {
    token = (new URLSearchParams(window.location.search).get('rt') || '').trim().toLowerCase();
  } catch (e) { token = ''; }

  if (!/^[a-z0-9]{6,32}$/.test(token)) {
    screenMsg('This link is not complete',
      'A saved result link ends in your own code, like ' +
      '<span style="white-space:nowrap">/r/?rt=k8x4m2qp</span>. Check the address you pasted, ' +
      'or open the link in your result email.', true);
    return;
  }

  // Working state (decision page item A, 21 Aug 2026): animated dots so the
  // wait reads as progress, and a reassurance line if the backend is cold.
  screenMsg('Opening your result',
    'One moment<span id="hw-r-dots">.</span>', false);
  var dotsTimer = setInterval(function () {
    var el = document.getElementById('hw-r-dots');
    if (!el) { clearInterval(dotsTimer); return; }
    el.textContent = el.textContent.length >= 3 ? '.' : el.textContent + '.';
  }, 450);
  var slowTimer = setTimeout(function () {
    var el = document.getElementById('hw-r-dots');
    if (el && el.parentNode) {
      el.parentNode.innerHTML =
        'Still fetching your saved answers, a few more seconds<span id="hw-r-dots">.</span>';
    }
  }, 4000);

  function loadApp() {
    var s = document.createElement('script');
    s.src = APP + '?v=' + encodeURIComponent(window.__HW_APP_V || 'live');
    s.onerror = function () {
      screenMsg('We could not load your result page',
        'Something went wrong on our side. Please try again in a moment.', false);
    };
    document.body.appendChild(s);
  }

  // The quiz swaps the address bar to this link seconds after a reader finishes, while
  // the sheet log that backs the lookup is still in flight. On the reader's own device
  // their finished result is in localStorage, so fall back to that rather than telling
  // someone their brand new result does not exist. The app self-restores from it.
  function ownResultStored() {
    try { return !!localStorage.getItem('hw_quiz_result_v2'); } catch (e) { return false; }
  }

  var done = false;
  function stopWait() {
    try { clearInterval(dotsTimer); clearTimeout(slowTimer); } catch (e) {}
  }
  function failed() {
    if (done) return; done = true;
    stopWait();
    if (ownResultStored()) { loadApp(); return; }
    screenMsg('We could not open that result',
      'The link may be mistyped, or the result behind it may predate saved links. ' +
      'Your full result is also in the email we sent you when you finished the quiz.', true);
  }

  setTimeout(failed, 12000);

  fetch(API + encodeURIComponent(token))
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (d) {
      if (done) return;
      if (!d || !d.answers || !Object.keys(d.answers).length) throw new Error('empty');
      done = true;
      stopWait();
      window.__HW_RESTORE = { answers: d.answers, token: d.token, taken: d.taken };
      loadApp();
    })
    .catch(failed);
})();
