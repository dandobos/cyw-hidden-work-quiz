(function(){
  var POSTHOG_KEY  = 'phc_xaksPnZi9WkQ4uSEJYdeFzS4Kx7Ez6uJTAvSmGE26hey';   // project API key (US)
  var POSTHOG_HOST = 'https://k.dandobos.com';            // managed reverse proxy (dodges ad-blockers); events + /static served via k.dandobos.com -> PostHog US
  if (!POSTHOG_KEY || POSTHOG_KEY.indexOf('phc_REPLACE') === 0) return;   // not configured yet -> skip
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording capturePageView capturePageLeave debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    ui_host: 'https://us.posthog.com',            // proxy carries events; in-app links (replay/toolbar) point to the real PostHog UI
    persistence: 'memory',                        // cookieless: no consent banner needed
    autocapture: false,                           // explicit events only
    capture_pageview: true,                       // top-of-funnel count
    disable_surveys: true,
    session_recording: { maskAllInputs: true }    // email + free-text answers are never recorded
  });
  // Beta testers arrive from the portal with ?hwbt=<token>. Tag their whole session so
  // PostHog can report on the beta cohort, per tester. Public visitors have no hwbt and
  // stay anonymous/cookieless. The token is an opaque portal id, not a name or email.
  try {
    var _hwbt = (new URLSearchParams(location.search).get('hwbt') || '').slice(0, 64);
    if (_hwbt && _hwbt.indexOf('{{') === -1) {              // ignore an unresolved Tally mention
      posthog.register({ hw_beta: true, hw_beta_token: _hwbt });          // tags every event
      posthog.identify('beta:' + _hwbt, { hw_beta: true, hw_beta_token: _hwbt });  // per-tester person
    }
  } catch (e) {}
})();
;
// THE HIDDEN WORK v2: four dimensions: Vitality, Alignment, Clarity, Agency
// All answer options ordered 0 -> 100.
// section: V=Vitality, AL=Alignment, C=Clarity, AG=Agency, X=unscored/closing

const SECTION_ORDER = [
  { key: 'V',  name: 'Vitality' },
  { key: 'AL', name: 'Alignment' },
  { key: 'C',  name: 'Clarity' },
  { key: 'AG', name: 'Agency' },
  { key: 'X',  name: 'About You' }
];

const questions = [
  // OPENER: word association (bookended on result page)
  { type: 'word', section: 'V',
    text: "When you think about your work, which of these words arises first?",
    sub: "Don't think too hard. Pick the one that surfaces.",
    words: [
      ["Drained", 20, 'V'], ["Trapped", 15, 'AL'], ["Stuck", 20, 'AG'],
      ["Pushing", 25, 'C'], ["Lost", 20, 'C'], ["Fake", 20, 'AL'],
      ["Alive", 90, 'V'], ["Mine", 90, 'AL'], ["Called", 85, 'C']
    ] },

  // ===== VITALITY =====
  { type: 'choice', section: 'V', text: "On Monday morning, what's the first feeling that hits you when you remember it's a work day?",
    options: [["Dread: it's the start of the work week", 0], ["Mild annoyance: the weekend is over, back to reality", 33], ["Neutral: just another day", 66], ["Excitement: another week of doing what lights me up", 100]] },
  { type: 'choice', section: 'V', text: "Over the past week, roughly how much of your work time was spent on activities that left you feeling more alive?",
    options: [["Almost none", 0], ["Less than half", 30], ["More than half", 70], ["Most of it", 100]] },
  { type: 'choice', section: 'V', text: "How often does your work pull you in so deeply that you lose track of time?",
    options: [["Never", 0], ["Occasionally", 30], ["Weekly", 70], ["Daily", 100]] },
  { type: 'choice', section: 'V', text: "The skill that has gotten you the furthest in your career also tends to:",
    options: [["Drain me", 0], ["Slightly drain me", 30], ["Slightly energize me", 70], ["Energize me", 100]] },
  { type: 'activity_name', section: 'V',
    text: "Name three things you're widely praised for at work.",
    sub: "These can be skills or personal attributes. Just name them for now." },
  { type: 'activity_rate', section: 'V',
    text: "Now, how energized does each one make you feel?",
    likert: [["Drains me", 0], ["Slightly drains me", 30], ["Slightly energizes me", 70], ["Energizes me", 100]] },
  { type: 'choice', section: 'V', text: "When you imagine doing your current work for three more years with no change, the feeling is closest to:",
    options: [["Dread", 0], ["Heaviness", 30], ["Quiet contentment", 70], ["Excitement", 100]] },

  // ===== ALIGNMENT =====
  { type: 'choice', section: 'AL', text: "If your basic needs were already covered, and you did your current role unpaid and anonymously, would you still pour your heart into it?",
    options: [["Definitely no", 0], ["Probably no", 35], ["Probably yes", 75], ["Definitely yes", 100]] },
  { type: 'choice', section: 'AL', text: "The main reason you're in your current role:",
    options: [["I'm not sure", 10], ["It's what's expected of me", 20], ["It pays well", 40], ["I'm good at it", 60], ["It lights me up", 100]] },
  { type: 'choice', section: 'AL', text: "When someone asks \"How's work?\", what do you actually think before giving your polished answer?",
    options: [["I can't say what I really feel", 0], ["I don't really want to talk about it", 33], ["It's fine", 66], ["It's genuinely good", 100]] },
  { type: 'choice', section: 'AL', text: "Have you stayed on your current path for one or more of the following reasons: title, salary, or what others would think?",
    options: [["I'm not sure", 5], ["Yes, and at least one of those is my main reason for staying", 15], ["Yes, but my main reason for staying is not listed here", 40], ["No, none of these", 100]] },
  { type: 'rank', section: 'AL',
    text: "Order these voices from loudest to quietest when you make a big life decision.",
    sub: "The top voice is the loudest.",
    items: ["Society\u2019s voice", "A parent\u2019s voice", "A partner\u2019s voice", "My own voice"] },
  { type: 'choice', section: 'AL', text: "If you keep on your current path, the person you're slowly becoming is:",
    options: [["Someone I don't really recognize", 0], ["Not quite who I want to be", 30], ["Mostly who I want to be", 70], ["Exactly who I want to become", 100]] },

  // ===== CLARITY =====
  { type: 'choice', section: 'C', text: "When you imagine the next chapter of your work life, how clearly can you see it? What's there?",
    options: [["Nothing at all", 0], ["A list of things I think I should do", 30], ["A vague sense of direction", 60], ["A clear, specific picture", 100]] },
  { type: 'choice', section: 'C', text: "When did you last sit in stillness long enough to actually hear yourself think, no phone, no input?",
    options: [["I genuinely can't remember", 0], ["Sometime this month", 40], ["Sometime this week", 70], ["In the last few days", 100]] },
  { type: 'choice', section: 'C', text: "The last big career decision you made was driven primarily by:",
    options: [["External pressure or a deadline", 20], ["I\u2019m not sure", 30], ["Logical analysis", 60], ["A clear inner knowing", 100]] },
  { type: 'choice', section: 'C', text: "Is there something you keep grinding through at work, even though an inner voice says to stop?",
    options: [["Yes, most days", 0], ["Fairly often", 30], ["Rarely", 70], ["No, nothing like that", 100]] },
  { type: 'choice', section: 'C', text: "When you think about changing direction, how much does what you've already invested hold you back?",
    options: [["It's the main thing stopping me, I've come too far to change", 0], ["It weighs on me heavily", 30], ["It's a factor, but not decisive", 65], ["What I've put in doesn't trap me, I'd change if it was right", 100]] },
  { type: 'choice', section: 'C', text: "When you picture changing your work, is it more of a push or a pull?",
    options: [["I just want to get away from where I am now", 20], ["Mostly escaping the current situation", 40], ["A mix of escaping this and moving toward something", 65], ["I'm drawn toward something specific I want", 100]] },

  // ===== AGENCY =====
  { type: 'choice', section: 'AG', text: "Have you set aside any regular, protected time to work on what matters to you, outside of your job?",
    options: [["No, I haven't", 0], ["I've tried, but it never sticks", 30], ["Yes, but it slips often", 60], ["Yes, and I protect it consistently", 100]] },
  { type: 'choice', section: 'AG', text: "Have you ever started a project that's genuinely yours, not one assigned or expected of you?",
    options: [["No", 0], ["Only in my head so far", 25], ["I've started, but it's stalled", 55], ["Yes, and I'm actively working on it", 100]] },
  { type: 'choice', section: 'AG', text: "When you decide to change something about your work life, what usually happens?",
    options: [["I stay where I am, even when I want to move", 0], ["I plan a lot but rarely begin", 30], ["I start strong but lose momentum", 60], ["I follow through and make it happen", 100]] },
  { type: 'choice', section: 'AG', text: "When someone whose opinion you value disapproves of a direction you want to take, what usually happens?",
    options: [["I drop it to keep the peace", 0], ["I delay it, sometimes indefinitely", 30], ["I push back but often compromise", 65], ["I hear them out and still do what I think is right", 100]] },
  { type: 'choice', section: 'AG', text: "When you face something you want but it feels too big, what tends to happen?",
    options: [["I freeze or struggle to get motivated to start at all", 0], ["I overthink it for a long time", 30], ["I start strong, then stall before it's done", 50], ["I gradually create a plan", 70], ["I take the smallest first step quickly and then make consistent progress", 100]] },
  { type: 'choice', section: 'AG', text: "In the last few months, how much have you actually moved on work that matters to you, outside of your job?",
    options: [["Not at all", 0], ["I thought about it but didn't act", 30], ["A few small steps", 70], ["Steady, ongoing action", 100]] },

  // ===== PAST-WOUND ROUTING FLAG (unscored; routes to Chapter 2 for eligible archetypes) =====
  { type: 'choice', section: 'X', unscored: true, routingFlag: true,
    text: "Is there a painful experience from your past that still holds you back from the work you want?",
    sub: "There's no need to share what it was. This is just for you.",
    options: [["No, nothing from my past is holding me back", "none"], ["Maybe, but I've mostly worked through it", "low"], ["Yes, and I still feel its effects", "moderate"], ["Yes, and I think it's the main thing keeping me stuck", "strong"]] },

  // ===== CLOSING (unscored) =====
  { type: 'freetext', section: 'X',
    text: "What is a buried idea you've had for years that you've never given yourself permission to pursue?",
    placeholder: "Anything that comes to mind, however small." },
  { type: 'choice', section: 'X', unscored: true, text: "Where are you in your career?",
    options: [["Student, still studying", "Student"], ["Early career, roughly my first 10 years of working", "Early career"], ["Mid-career, around 10 to 25 years in", "Mid-career"], ["Late career, more than 25 years in", "Late career"], ["In transition, changing paths", "In transition"]] },
  { type: 'choice', section: 'X', unscored: true, text: "What's your current role type?",
    options: [["Employee", "Employee"], ["Manager", "Manager"], ["Founder or owner", "Founder or owner"], ["Freelance or contractor", "Freelance or contractor"], ["Between roles", "Between roles"], ["Other", "Other"]] }
];

const TOTAL_Q = questions.length;
let screen = 'intro', qIdx = 0, answers = {};
let activityNames = ['', '', ''], activityScores = [null, null, null];
let textVal = '', rankState = {}, rankTouched = {}, rankConfirmPending = {};
let advancing = false;
let inputReadyAt = 0;  // ghost-click guard: taps within 350ms of a screen render are iOS tap-through, not humans (beta bug: Taylor, iPhone Safari)
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
// In-progress quiz autosave. Persisted to localStorage (DURABLE) so a browser/tab
// crash, refresh, or accidental close never loses the reader's answers; on the next
// load the resume gate (renderResume) offers to pick up where they left off. Only the
// resumable screens (question/gate) are stored; completing or restarting clears it.
// (Was sessionStorage, which a mobile browser discards when the tab is killed. That
// was the beta's most severe bug: Vivienne froze on Part 1 Q6, the tab crashed, and
// she reopened at the start with nothing saved, 2026-07-09.)
const STATE_KEY = 'hw_quiz_state_v2';
function saveState(){ try{ if(screen!=='question' && screen!=='gate') return; localStorage.setItem(STATE_KEY, JSON.stringify({screen, qIdx, answers, activityNames, activityScores, textVal, rankState, rankTouched, rankConfirmPending})); }catch(e){} }
function loadState(){ try{ var r = localStorage.getItem(STATE_KEY); if(!r) return false; var st = JSON.parse(r); if(!st || (st.screen !== 'question' && st.screen !== 'gate')) return false; screen=st.screen; qIdx=st.qIdx||0; answers=st.answers||{}; activityNames=st.activityNames||['','','']; activityScores=st.activityScores||[null,null,null]; textVal=st.textVal||''; rankState=st.rankState||{}; rankTouched=st.rankTouched||{}; rankConfirmPending=st.rankConfirmPending||{}; return true; }catch(e){ return false; } }
function clearState(){ try{ localStorage.removeItem(STATE_KEY); }catch(e){} }
// Durable completed-result snapshot (localStorage, so it survives closing the tab).
// A reader who has finished and reopens the plain quiz URL lands back on their own
// result page (with the share card), instead of the intro. Arriving via a friend's
// share link (?type=) counts as a fresh visit and does NOT restore this.
const RESULT_KEY = 'hw_quiz_result_v2';
function saveResult(){ try{ localStorage.setItem(RESULT_KEY, JSON.stringify({answers, activityNames, activityScores, textVal, rankState, rankTouched, rankConfirmPending, email: (typeof _kitEmail !== 'undefined' && _kitEmail) || ''})); }catch(e){} }
function loadResult(){ try{ var r = localStorage.getItem(RESULT_KEY); if(!r) return false; var st = JSON.parse(r); if(!st || !st.answers) return false; answers=st.answers; activityNames=st.activityNames||['','','']; activityScores=st.activityScores||[null,null,null]; textVal=st.textVal||''; rankState=st.rankState||{}; rankTouched=st.rankTouched||{}; rankConfirmPending=st.rankConfirmPending||{}; if (st.email && EMAIL_RE.test(st.email)) _kitEmail = st.email; return true; }catch(e){ return false; } }
function clearResult(){ try{ localStorage.removeItem(RESULT_KEY); localStorage.removeItem(TOKEN_KEY); }catch(e){} }

// ---- Permanent personal result link ------------------------------------
// Every completion mints a token. It travels three ways: to Kit as
// hw_result_token (so the result email can print the address), to the backend
// with the sheet log (so /result/<token> can rebuild the answers), and into
// localStorage (so a browser-restored result still knows its own address).
// A retake mints a fresh token, so an old link keeps showing the old result.
const TOKEN_KEY = 'hw_result_token_v1';
const RESULT_LINK_BASE = 'https://dandobos.com/r/?rt=';
function mintResultToken(){
  var a = 'abcdefghijkmnopqrstuvwxyz23456789', t = '';   // no l/1/0/o: readable when typed out
  try {
    var b = new Uint8Array(10);
    (window.crypto || window.msCrypto).getRandomValues(b);
    for (var i = 0; i < b.length; i++) t += a.charAt(b[i] % a.length);
  } catch(e){
    for (var j = 0; j < 10; j++) t += a.charAt(Math.floor(Math.random() * a.length));
  }
  try { localStorage.setItem(TOKEN_KEY, t); } catch(e){}
  return t;
}
function resultToken(){ try { return localStorage.getItem(TOKEN_KEY) || ''; } catch(e){ return ''; } }
function resultLink(){ var t = resultToken(); return t ? RESULT_LINK_BASE + t : ''; }
// Dan's ruling 2026-08-05: swap the address bar rather than add a card, so the thing
// already in the reader's address bar IS the keepsake (bookmark, copy, share to self,
// back button all just work). Held back a few seconds because the sheet log that backs
// /r/ is fired at the same moment, and a reload before it lands would find nothing.
// Same-origin only: the standalone GitHub Pages /quiz/ copy stays where it is.
// Dan's rulings 2026-08-05/06: his line, his wording, in two places. Once as a strip
// above everything on arrival (approach 1), and once at the head of the diagnosis, which
// only unfolds when the reader confirms the archetype fits (approach 4). By then the
// first strip has scrolled away and a lot of new content sits "below", so it restates
// rather than repeats. Only shown when we actually sent the email: a result restored
// from a personal link has no address, so it never claims something it cannot know.
function hwEmailedNote(){
  var sent = (typeof _kitEmail !== 'undefined' && _kitEmail && EMAIL_RE.test(_kitEmail));
  return sent ? '<p class="res-emailed">Your result has been emailed to you</p>' : '';
}
var _addrSwapped = false;
function hwSwapAddress(){
  if (_addrSwapped || _fromLink || _invite) return;
  var t = resultToken(); if (!t) return;
  if (location.hostname !== 'dandobos.com') return;
  _addrSwapped = true;
  setTimeout(function(){
    try { history.replaceState(null, '', '/r/?rt=' + t); hwCap('result_address_swapped', {}); } catch(e){}
  }, 4000);
}

// ===== PostHog instrumentation (no-op if PostHog is not loaded) =====
function hwCap(name, props){ try{ if(window.posthog && posthog.capture){ posthog.capture(name, props || {}); } }catch(e){} }
// Completion-time tracking. "duration" is raw wall-clock; "active" caps each question at
// HW_STEP_CAP so a walk-away gap does not inflate it. Persisted so a refresh-resume keeps t0.
var HW_STEP_CAP = 90000, hwT0 = 0, hwLastStep = 0, hwActiveMs = 0;
function hwTimingPersist(){ try{ sessionStorage.setItem('hw_timing', JSON.stringify({ t0:hwT0, last:hwLastStep, active:hwActiveMs })); }catch(e){} }
function hwTimingStart(){ hwT0 = Date.now(); hwLastStep = hwT0; hwActiveMs = 0; hwTimingPersist(); }
function hwTimingLoad(){ try{ var r = JSON.parse(sessionStorage.getItem('hw_timing') || 'null'); if(r && r.t0){ hwT0 = r.t0; hwLastStep = r.last || r.t0; hwActiveMs = r.active || 0; } }catch(e){} }
function hwTimingStep(){ var now = Date.now(); if(hwLastStep){ hwActiveMs += Math.min(now - hwLastStep, HW_STEP_CAP); } hwLastStep = now; hwTimingPersist(); }
function hwDurations(){ return { duration_seconds: hwT0 ? Math.round((Date.now() - hwT0)/1000) : null, active_seconds: Math.round(hwActiveMs/1000) }; }
// Bottom-of-funnel clicks on the result page (free chapter + book CTA). _hwResult is set in renderResult().
function hwDownloadClick(fmt){ var m=window._hwResult||{}; hwCap('chapter_download_clicked', { format: fmt, chapters: m.chapters, archetype_key: m.archetype_key }); }
function hwBookClick(){ var m=window._hwResult||{}; hwCap('book_link_clicked', { archetype_key: m.archetype_key, location: 'result' }); }
// The share card's "Discover your Work Personality" link used to be href="#", which
// scrolled the reader back to the top of the page. Carry them DOWN to the book CTA
// instead, so they keep flowing toward their next step (beta feedback, 2026-07).
function hwCardCtaDown(e){ if(e){ e.preventDefault(); } var el=document.getElementById('hw-book-cta'); if(el){ el.scrollIntoView({behavior:'smooth', block:'center'}); } }

function currentSection() { return questions[qIdx]?.section || 'X'; }
function sectionProgress() {
  const sec = currentSection();
  const activeIdx = SECTION_ORDER.findIndex(s => s.key === sec);
  if (activeIdx === -1) return { show: false };
  const same = questions.filter(q => q.section === sec && q.type !== 'activity_rate');
  let idxInSection = same.findIndex(q => q === questions[qIdx]);
  if (idxInSection === -1) {
    // activity_rate is excluded from the count; it shares its step with the preceding
    // activity_name, so borrow that question's position instead of resetting to 1.
    for (let j = qIdx - 1; j >= 0; j--) { const p = same.indexOf(questions[j]); if (p !== -1) { idxInSection = p; break; } }
  }
  return { show: true, activeIdx, sectionName: SECTION_ORDER[activeIdx].name,
    posInSection: idxInSection >= 0 ? idxInSection + 1 : 1, totalInSection: same.length };
}
function renderStepper(activeIdx) {
  return '<div class="stepper">' + SECTION_ORDER.map((s, i) => {
    const cls = i < activeIdx ? 'done' : (i === activeIdx ? 'active' : 'todo');
    const lbl = i === activeIdx ? 'active' : '';
    return '<div class="step"><div class="step-bar ' + cls + '"></div><div class="step-label ' + lbl + '">' + ('Part ' + (i + 1) + '/' + SECTION_ORDER.length) + '</div></div>';
  }).join('') + '</div>';
}
function setProgress() {
  let pct = 0;
  if (screen === 'question') {
    const _sec = currentSection();
    const _inSec = questions.filter(q => q.section === _sec);
    pct = ((_inSec.indexOf(questions[qIdx]) + 1) / _inSec.length) * 100;  // progress within the current part
  }
  else if (screen === 'gate' || screen === 'complete') pct = 100;
  document.getElementById('progress').style.width = pct + '%';
  var _pb=document.getElementById('progressbar'); if(_pb){ _pb.setAttribute('aria-valuenow', Math.round(pct)); _pb.style.display = (screen === 'question' || screen === 'gate') ? '' : 'none'; }
}
function renderIntro() {
  // Invited visitors (arriving via a friend's share link) get the friend's pattern up
  // front and a compare promise; everyone else gets the standard intro.
  var invited = _invite && ARCH[_invite.key];
  var title = 'Discover your Work Personality. Choose the Work You Are Meant to Do.';
  var inviteSpectrum = '';
  var invCard = '';
  var invitePatterns = '';
  var tagline = '';
  var desc = '30 quick questions that identify your Work Personality and help clarify your next move.';
  var begin = 'Begin';
  var stats = '';  // stat blocks (30 / ~7 / 8) removed from the intro, 2026-07-20
  if (invited){
    // Compare-led headline + sender attribution (share-flow decisions 6 and 7, 2026-08-04).
    var invName = _invite.from ? esc(_invite.from) : '';
    var invArch = ARCH[_invite.key].name.replace(/^The\s+/, '');
    title = (invName || 'Your friend') + ' got <span class="inv-title-key">' + invArch + '.</span> What would you get?';
    // Beta feedback (Taylor, 2026-07-09): a cold recipient can't tell it's a career quiz
    // or who it's for. Name the category + audience before the friend card.
    tagline = '<p class="intro-tagline">A free 7-minute career quiz for people who want more from their work.</p>';
    if (invName) tagline = '<p class="inv-from">' + invName + ' sent you this</p>' + tagline;
    inviteSpectrum = '<div class="inv-spectrum" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>';
    invCard = '<div class="inv-card">'
      + '<p class="inv-ey">' + (invName ? invName + ' came out as' : 'Your friend came out as') + '</p>'
      + '<p class="inv-name">' + ARCH[_invite.key].name + '</p>'
      + '<p class="inv-claim">&ldquo;' + VIRAL[_invite.key].claim + '&rdquo;</p>'
      + '</div>';
    // Beta feedback (Lisa-Marie, 2026-07-09; actioned 2026-08-04): the pattern grid sat
    // between the friend card and the CTA, reading like buttons to press first. The CTA
    // now follows the card directly; the grid is secondary context under its own label.
    invitePatterns = '<p class="inv-grid-lbl">The 8 Work Personalities</p>'
      + '<div class="inv-pattern-grid">'
      + [['True Creator','#3D7A6E'],['High Achiever','#B8902F'],['Awakened Observer','#1E5F8C'],['Restless Visionary','#A85A3D'],['Restless Explorer','#C2722F'],['Tireless Driver','#B23A2E'],['Grounded Seeker','#557C9E'],['Late Bloomer','#6B6B6B']].map(function(p){
        return '<div class="inv-pattern-pill"><i style="background:' + p[1] + '"></i>' + p[0] + '</div>';
      }).join('')
      + '</div>';
    desc = 'Answer the same 30 quick questions and see where you and your friend match and differ.';
    begin = 'Find Your Pattern';
    stats = '';
  }
  return '<p class="intro-eyebrow">The Choose Your Work Quiz</p>'
    + inviteSpectrum
    + '<h1 class="intro-title">' + title + '</h1>'
    + tagline
    + invCard
    + '<p class="intro-desc">' + desc + '</p>'
    + stats
    + '<button class="continue-btn" onclick="startQuiz()">' + begin + '</button>'
    + invitePatterns;
}
function renderQuestion() {
  const q = questions[qIdx];
  const sp = sectionProgress();
  let body = '';
  if (q.type === 'choice') {
    body = '<div class="options">' + q.options.map((opt, i) => '<button class="option' + ((answers[qIdx] && answers[qIdx].label === opt[0]) ? ' selected' : '') + '" onclick="selectChoice(' + i + ')">' + opt[0] + '</button>').join('') + '</div>';
  } else if (q.type === 'word') {
    body = '<div class="word-grid">' + q.words.map((w, i) => '<button class="word-tile' + ((answers[qIdx] && answers[qIdx].label === w[0]) ? ' selected' : '') + '" onclick="selectWord(' + i + ')">' + w[0] + '</button>').join('') + '</div>';
  } else if (q.type === 'activity_name') {
    body = [0,1,2].map(i => '<div class="activity-item"><div class="activity-num">Activity ' + (i+1) + '</div><input class="activity-input" type="text" placeholder="Something you\u2019re praised for..." maxlength="80" value="' + esc(activityNames[i]) + '" oninput="updateActivityName(' + i + ', this.value)"/></div>').join('')
      + '<button class="continue-btn" id="act-name-btn" onclick="selectActivityNames()" ' + (activityNames.every(n=>n.trim())?'':'disabled') + '>Continue</button>';
  } else if (q.type === 'activity_rate') {
    body = [0,1,2].map(i => '<div class="rate-item"><div class="rate-label">' + esc(activityNames[i] || ('Activity ' + (i+1))) + '</div><div class="rate-likert">' + q.likert.map(l => '<button class="rate-btn ' + (activityScores[i]===l[1]?'selected':'') + '" onclick="updateActivityScore(' + i + ', ' + l[1] + ')">' + l[0] + '</button>').join('') + '</div></div>').join('')
      + '<button class="continue-btn" id="act-rate-btn" onclick="selectActivityScores()" ' + (activityScores.every(s=>s!==null)?'':'disabled') + '>Continue</button>';
  } else if (q.type === 'rank') {
    if (!rankState[qIdx]) rankState[qIdx] = q.items.slice();
    const items = rankState[qIdx];
    const pending = rankConfirmPending[qIdx];
    body = '<div class="rank-wrap">' + items.map((item, i) => '<div class="rank-row"><div class="rank-num">' + (i+1) + '</div><div class="rank-label">' + item + '</div><div class="rank-controls"><button class="rank-btn" onclick="rankMove(' + i + ', -1)" ' + (i===0?'disabled':'') + '>\u2191</button><button class="rank-btn" onclick="rankMove(' + i + ', 1)" ' + (i===items.length-1?'disabled':'') + '>\u2193</button></div></div>').join('') + '</div>'
      + (pending ? '<p class="rank-nudge">You haven\u2019t moved anything. Take a moment, is this really the order for you?</p>' : '')
      + '<button class="continue-btn" onclick="selectRank()">' + (pending ? 'Yes, this is my order' : 'Continue') + '</button>';
  } else if (q.type === 'freetext') {
    if (answers[qIdx] && typeof answers[qIdx].value === 'string') textVal = answers[qIdx].value;
    body = '<textarea class="textarea-input" maxlength="300" placeholder="' + q.placeholder + '" oninput="updateFreetext(this.value)">' + esc(textVal) + '</textarea>'
      + '<button class="continue-btn" id="freetext-btn" onclick="selectFreetext()" ' + (textVal.trim()?'':'disabled') + '>Continue</button>';
  }
  return (sp.show ? renderStepper(sp.activeIdx) : '')
    + '<h2 class="q-text">' + q.text + '</h2>'
    + (q.sub ? '<p class="q-sub">' + q.sub + '</p>' : '')
    + body
    + (qIdx > 0 ? '<div class="back-link"><button onclick="goBack()">\u2190 Previous question</button></div>' : '');
}
function renderGate() {
  return '<h1 class="gate-title">Your Work Personality is ready.</h1>'
    + '<p class="gate-desc">Enter your email and I&rsquo;ll send your result, your free chapter, and the 7-day <em>Choose Your Work</em> course.</p>'
    + '<input class="email-input" id="hw-email" type="email" name="email" autocomplete="email" aria-label="Your email address" placeholder="your@email.com" onkeydown="if(event.key===\'Enter\'){event.preventDefault();submitGate();}"/>'
    + '<p id="hw-gate-err" role="alert" style="display:none;font-family:var(--sans);font-size:13px;color:#B23A2E;text-align:center;margin:10px 0 0;">Please enter a valid email address.</p>'
    + '<button class="continue-btn" id="hw-gate-btn" onclick="submitGate()" style="margin: 8px auto 0; width: 100%;">Show me my Work Personality</button>'
    + '<p class="gate-fine">No spam. Unsubscribe anytime. Your answers stay private.</p>';
}
// ================= SCORING ENGINE =================
// Dimension score = average of that dimension's scored answers (0-100).
// Archetype = Clarity bucket + Agency bucket + Alignment bucket (each High/Low at the 50 threshold).
// Vitality is not displayed; it sets the regret signal. The past-wound flag can re-order chapters.
const THRESHOLD = 50;   // > 50 => High pole; <= 50 => Low pole
const BORDERLINE = 12;  // within +/- this of threshold => axis flagged borderline

const ARCH = {
  HHH: { name: 'The True Creator',       ch: 9 },
  HHL: { name: 'The High Achiever',       ch: 5 },
  HLH: { name: 'The Awakened Observer',    ch: 4 },
  HLL: { name: 'The Restless Visionary',   ch: 3 },
  LHH: { name: 'The Restless Explorer',   ch: 7 },
  LHL: { name: 'The Tireless Driver',  ch: 8 },
  LLH: { name: 'The Grounded Seeker',       ch: 6 },
  LLL: { name: 'The Late Bloomer', ch: 1 }
};
// Low-agency types where a past wound is the brake: for these, Chapter 2 LEADS (sequence mode).
// Since 2026-07-28 every other archetype with a strong wound answer also receives Chapter 2,
// but second, after their own chapter (supplement mode). Awakened Observer (HLH) stays out of
// the lead group by design (inner work already done); it gets the supplement with its own note.
const WOUND_ELIGIBLE = ['HLL', 'LLH', 'LLL'];

// Per-archetype subject line for Email 2 (welcome). Sent to Kit as the hw_welcome_subject
// custom field; the sequence email's subject is just {{ subscriber.hw_welcome_subject }}
// with a generic default. Kit caps subjects at 255 chars, so the full 8-branch Liquid
// cannot live in the subject field itself (publish fails validation).
const WELCOME_SUBJ = {
  HHH: "You’ve already chosen your work. Now let’s scale it.",
  HHL: "Has winning ever stopped feeling like winning?",
  HLH: "You don’t need more insight. You need more action. Here’s how to get started…",
  HLL: "How to actually move toward the life you want",
  LHH: "How to give your momentum a clear target",
  LHL: "✅ Grit. But what about the right direction… ❓",
  LLH: "How to clarify where you’re going and actually get there",
  LLL: "The pebble in your shoe"
};

const SHARE = {
  HHH: "I'm building something that matters. How can I make it world-class?",
  HHL: "I've been winning at the wrong game. I'm about to discover something important.",
  HLH: "I don't need more insight. I need to choose one hour a day to take action.",
  HLL: "I can see exactly the life I want. I need to start moving toward it.",
  LHH: "I'm moving fast. I just need to clarify the direction.",
  LHL: "I get things done. Now I need to discover what I really want to build.",
  LLH: "I'm at peace with who I am. I'm just not sure where I'm going.",
  LLL: "On paper everything seems fine. But something feels amiss."
};
// Narrative format (approved from beta feedback, 2026-07-10, Beta DB page "v2, standardized endings"):
// plain lines = prose; lines starting with "• " = bullets; "THE X:" lines = labeled closers.
// The page renders these via narrHtml(); the same string flows to Kit's hw_narrative, where
// newline_to_br keeps each line readable in the email. Variant narratives further down stay prose.
const NARR = {
  HHH: "You are one of the rare ones. This is the result of deliberate choices that few people ever make.\n• You know what your real work is, and you are doing it.\n• The work is truly yours, chosen by you.\n• Your clarity and your actions point the same direction.\n• Your work gives you energy.\nTHE RISK: At this altitude, comfort can quietly shrink your ambition.\nTHE QUESTION: You have found your work. Can you make it world-class?",
  HHL: "You are very good at what you do, and you know exactly what you are aiming at. Everyone can see your skill, drive, and results. The only problem is that the summit you are climbing was never really yours.\n• Somewhere in the past, your ambitions were handed to you by what others expected or admired.\n• So you execute brilliantly against a target your true self never chose.\n• The more you have achieved, the more you have invested, which is exactly what makes turning so hard.\n• This is one of the hardest places to acknowledge, because everything looks like success.\nTHE CHALLENGE: Winning the wrong game feels hollow after a while.\nTHE NEXT STEP: The clarity and drive you already have will serve you once they are pointed at work that is actually yours.",
  HLH: "Something has shifted. You have done the inner work most people put off, and you can see your real work clearly.\n• You know where you are going.\n• The noise of other people's expectations has gone quiet.\n• You make your own decisions.\nTHE CHALLENGE: What you do not have yet is a system. Clarity without action leads to drifting.\nTHE NEXT STEP: Reflection and insight have done their job. Now it is time to take action: start the 1-1-1 rule this week. Spend one hour a day, on one project, in one location.",
  HLL: "You can see it clearly. You know what your real work is, maybe you have known for years. Despite this, you seem to be standing still, inside a life built around someone else's expectations. What holds you there:\n• The title, the salary, the years you have already put in.\n• The weight of what the people closest to you would think.\n• How much you have already invested, which makes moving feel harder than staying.\nTHE CHALLENGE: This can feel painful because you already have the clarity. Knowing what to do turned out to be only half the journey.\nTHE NEXT STEP: Come up with at least three intensely emotional reasons why you move forward. Then develop an escape plan. Stop watching and start moving, one step at a time, toward the place you've always known is right for you.",
  LHH: "You have energy and you have momentum. The good news is that you have already mastered the hardest parts:\n• You are true to yourself.\n• You take action and do not wait around.\nTHE CHALLENGE: The one thing missing is a target. You are moving fast and well, though much of that motion is escape from what you do not want. Moving toward something you truly desire is the missing piece.\nTHE NEXT STEP: Let the work choose you. Loosen your grip on things and notice what quietly draws you in. What speaks to your true self?",
  LHL: "You have serious horsepower. You move fast, you push hard, and you are used to powering through resistance. The problem is the engine is running on grit:\n• There is no clear target, and no sense that the work is even your own.\n• You are working hard at something chosen by your ambition and your training. Your true self had little say in it.\n• This is why you sometimes feel drained.\nTHE CHALLENGE: You are skilled at getting things done. What is missing is a direction worth all that drive.\nTHE NEXT STEP: Channel your talent into work that matters to you.",
  LLH: "You know who you are:\n• You perform for no one.\n• The life you live is your own.\n• What's missing is motion: the shape of your real work is still coming into focus, so you stay where you are.\nTHE RISK: Being at peace can quietly become an excuse to stay put.\nTHE NEXT STEP: You have the character. What you are missing is action: take more of it, even if you don't exactly know where it will lead.",
  LLL: "From the outside, your life looks fine. Maybe even good. There is a paycheck, a routine, people who would call you successful. And yet there is a small, persistent pebble in your emotional shoe that you have been trying to ignore:\n• You do not know what your real work is.\n• You are unsure what to do next.\n• The life you are living does not feel like your own.\nTHE RISK: You are suffering in comfort, and yet it feels easy to not change anything. You already know something is off.\nTHE NEXT STEP: Be willing to look directly at it, and then start to make changes."
};
const WHY = {
  HHH: "Your scores are high across all dimensions, so this chapter is about scale, not repair.",
  HHL: "Your clarity and drive are high. The next step is to choose the work that aligns with your true self.",
  HLH: "You know where you're going, but you don't yet have a system, which is what this chapter gives you.",
  HLL: "You can see your real work clearly, but you're held in place by a set of situations that are not yours.",
  LHH: "You're true to yourself and taking action. This chapter helps you move toward a clear target.",
  LHL: "You're driving hard, and the work takes more from you than it gives back. This is the curse of competence.",
  LLH: "You're grounded in who you are but not yet moving. This chapter surfaces direction through play and exploration.",
  LLL: "The work begins with confronting the whole pattern and recognizing that there is a way forward."
};
const CH_TITLE = {
  1: "What If My Whole Life Has Been Wrong?",
  2: "The Unexpected Gifts Hidden in Your Struggles",
  3: "Don't Confuse Success with Suffering in Comfort",
  4: "How Do You Pay the Bills and Still Choose Your Work?",
  5: "How to Think Independently in a World Obsessed with Conformity",
  6: "Rational Work Only Produces Rational Results",
  7: "Let the Work Choose You",
  8: "How to Overcome the Curse of Competence",
  9: "You Don't Really Want to Lie on the Beach All Day",
  10: "Next Steps to a Fulfilling Life"
};
const SEQ_LINE = {
  HLL: "Start with Chapter 2. There is something unresolved from the past to address before you take action. Then move on to Chapter 3.",
  LLL: "Start with Chapter 2. There is something unresolved from the past to address before you take action. Then move on to Chapter 1.",
  LLH: "Start with Chapter 2. There is something unresolved from the past to address before you take action. Then move on to Chapter 6."
};
// hw_archetype_indef: the archetype as an indefinite noun phrase ("a Late Bloomer",
// "an Awakened Observer"), for sentences that read badly with the "The ..." form of
// hw_archetype. Built here rather than in Liquid because Kit documents only a handful of
// filters (capitalize, truncatewords, strip, url_encode, default) and not remove_first.
function archIndef(key){
  var n = ARCH[key].name.replace(/^The /, '');
  return (/^[AEIOU]/.test(n) ? 'an ' : 'a ') + n;
}
// hw_chapter_label for the Kit emails. Sequence mode keeps READING order (Chapter 2 leads)
// and carries the titles, so a two-chapter reader gets the same shape as the single-chapter
// case instead of a bare "Chapters 1 and 2". Download filenames stay ascending to match the
// hosted bundles, so this must not be reused for dlLabel or the URLs.
function chapterLabelFor(plan){
  return plan.chapters.map(function(n){ return 'Chapter ' + n + ': ' + CH_TITLE[n]; }).join(', then ');
}
// The day-8 email bullets the chapters ONLY when there are two (Dan, 2026-07-28), so it needs
// them as separate fields: Kit's Liquid has no split filter, and hw_chapter_label is one joined
// string. hw_chapter_2 is blank for single-chapter readers, which is the email's branch test.
// Both are in READING order, same as the label.
function chapterPartsFor(plan){
  var line = function(n){ return 'Chapter ' + n + ': ' + CH_TITLE[n]; };
  return { one: line(plan.chapters[0]), two: plan.chapters.length > 1 ? line(plan.chapters[1]) : '' };
}
const SOFT_AWAKENED = "You have done much of the inner work already. If the past still bothers you, Chapter 2 is there for you. But the fastest path to progress is the system in Chapter 4.";
const SOFT_GENERIC = "If a past experience still weighs on you, Chapter 2 may help.";
// Supplement mode (strong wound, non-eligible key): Chapter 2 is delivered as a companion
// rather than the lead. Own chapter first; this note explains why Chapter 2 is in the bundle.
const SUPP_GENERIC = "You said a painful experience from your past still holds you back. Chapter 2, The Unexpected Gifts Hidden in Your Struggles, is included in your download. Read it second.";
const SUPP_AWAKENED = "You have done much of the inner work already, so your own chapter comes first. Chapter 2, The Unexpected Gifts Hidden in Your Struggles, is included for whatever still lingers from the past. Read it second.";
function suppNote(key){ return key === 'HLH' ? SUPP_AWAKENED : SUPP_GENERIC; }

// True Creator "praise gate": the full "rare one" narrative is earned only at genuinely high scores.
// Below the bar the reader keeps the same clean label (The True Creator) but gets a direct
// "foothills" read instead of the celebration. (DRAFT COPY, pending review.)
const AM_FULL_REQ = s => (s.AL >= 75 && s.C >= 65 && s.AG >= 65 && s.V >= 60);
const AM_FOOTHILLS_SHARE = "I'm close to work that's fully mine. Now to close the gap.";
const AM_FOOTHILLS_WHY = "You're in a good position, so this chapter is about building from that strength while you close the gap.";
function amFoothillsNarr(s){
  const base = "You're clear about what matters, you're taking action, and your work is reasonably aligned. That puts you in a good position. But there is still work to do.";
  const m = Math.min(s.C, s.AG, s.AL);
  let tail;
  if (s.AL === m) tail = " The area where you can improve is alignment. A real part of what you do is there because others expect it, and the work you'd choose is still waiting for that space.";
  else if (s.C === m) tail = " The area where you can improve is clarity. The specific shape of your work could be clearer.";
  else tail = " The area where you can improve is agency. You know what you need to do, but you could be taking more action.";
  return base + tail;
}
// Drained True Creator: displayed dims all strong (C/AG/AL clear the full bar) but Vitality is low.
// Foothills' "close the gap on a dimension" would be false here, so this variant speaks to energy. (Copy: Dan's.)
const AM_DRAINED_SHARE = "My work is genuinely mine. It just isn't energizing me right now.";
const AM_DRAINED_WHY = "You've built genuinely aligned work, and this chapter is about sustaining and scaling it without letting it burn you out.";
const AM_DRAINED_NARR = "You've done the hard part. You've found your work and you're taking action. This is rare. But right now it's draining you more than it's energizing you. Even work you've genuinely chosen can come at a price from too much load, too little rest, or a quiet shift in your values. This isn't a sign you're on the wrong path but it is a sign that something needs to change. Observe what depletes your energy and use that as a guide to move forward.";
// Grounded Seeker (LLH) has two readings depending on Vitality: the default narrative assumes a calm,
// "at peace" person; high-vitality readers are energized-but-adrift, so they get this variant instead.
const DS_HIGH_V_NARR = "You know who you are. Your work energizes you. But that energy is mostly spent on the day itself, while the things that matter to you wait. You're absorbed and engaged, and you haven't yet defined a clear direction or made space to pursue it. You already have the drive and the self-knowledge. Your next move is clarifying the target and finding time to pursue it.";

// ===== Chapter download wiring =====
// Files are hosted on the unlisted cyw-hidden-work-quiz GitHub Pages site (noindex).
// key is a single chapter ('3') or a bundle ('1_2' -> Chapters 1 and 2).
const DL_BASE = 'https://dandobos.github.io/cyw-hidden-work-quiz/cyw/';
function dlUrl(key, fmt){
  var stem = (String(key).indexOf('_') >= 0)
    ? 'Choose_Your_Work_Chapters_' + String(key).split('_').join('_and_')
    : 'Choose_Your_Work_Chapter_' + key;
  return DL_BASE + stem + '.' + fmt;
}

const SENTENCES = {
  C: [
    "Your picture of your real work doesn't appear to have come into focus yet.",
    "You appear to have a faint sense of direction, but not yet a clear picture.",
    "Your direction appears clear, even if the specifics aren't there yet.",
    "You appear to be clear on the work that's truly yours."
  ],
  AG: [
    "You seem to keep meaning to begin, without having taken action yet.",
    "You seem to begin things, but then they appear to slip.",
    "You seem to take action, though you appear to lose momentum at times.",
    "You seem to be actively building toward what matters."
  ],
  AL: [
    "Your life appears to be shaped more by others than by you.",
    "Your work appears to be based on half your truth, half what is expected of you.",
    "Your work appears to be based mainly on your truth and less of what is expected of you.",
    "Your work appears to be genuinely chosen by you, not the expectation of others."
  ],
  // Vitality is NOT shown on the quiz result page (only C/AG/AL are). These sentences exist
  // so the post-quiz email can reveal the hidden fourth dimension. Poles: Depleted / Alive.
  V: [
    "Your work appears to be draining far more energy than it gives back.",
    "Your work seems to take a little more out of you than it puts back.",
    "Your work appears to give you a bit more energy than it takes.",
    "Your work appears to genuinely energize you."
  ]
};
// Vitality verdict words by band (email reveal only). Matches the Email 1 v2 spec wording.
const V_VERDICT = ["Drained", "Flat", "Steady", "Energized"];
function bandIdx(s){ if (s <= 25) return 0; if (s <= 50) return 1; if (s <= 75) return 2; return 3; }
// Hidden-dimension readout for the email funnel (hw_vitality_*). Not rendered on the quiz page.
function vitalityReadout(s){
  const i = bandIdx(s.V);
  return { score: s.V, verdict: V_VERDICT[i], sentence: SENTENCES.V[i] };
}

function avg(a){ return a.length ? Math.round(a.reduce((x,y)=>x+y,0)/a.length) : 50; }
function bucket(s){ return s > THRESHOLD ? 'H' : 'L'; }
function isBorderline(s){ return Math.abs(s - THRESHOLD) < BORDERLINE; }

function dimensionScores(){
  const b = { V:[], AL:[], C:[], AG:[] };
  Object.values(answers).forEach(a=>{
    if (!a || a.unscored) return;
    if (typeof a.value !== 'number') return;
    if (b[a.section]) b[a.section].push(a.value);
  });
  return { C:avg(b.C), AG:avg(b.AG), AL:avg(b.AL), V:avg(b.V) };
}
function regretMeta(v){
  // v = the weakest axis. Lower = more urgent. order: Low < Moderate < Elevated < High
  if (v <= 25) return { label:'High',     idx:3, color:'#B23A2E', desc:"The cost of staying on this path is real, and it is showing up now. This is worth acting on." };
  if (v <= 45) return { label:'Elevated', idx:2, color:'#C2722F', desc:"There is a real gap between where you are and the work you could be doing. Worth acting on now, before it becomes a major issue." };
  if (v <= 65) return { label:'Moderate', idx:1, color:'#B8902F', desc:"There is a real gap between where you are and the work you could be doing. Worth acting on now, before it becomes a major issue." };
  return            { label:'Low',      idx:0, color:'#3D7A6E', desc:"You are in genuinely good shape across the board. Well done. Keep going." };
}
function regretFor(s){
  // Urgency tracks the WEAKEST of the four axes, so the signal can never say "you're fine"
  // while a core dimension is low. Vitality is one of the four, so being drained still drives it up.
  return regretMeta(Math.min(s.C, s.AG, s.AL, s.V));
}
function chapterPlan(key, flag){
  const base = ARCH[key].ch;
  if (flag === 'strong' && WOUND_ELIGIBLE.includes(key)){
    return { chapters:[2, base], mode:'sequence' };  // Chapter 2 (past wound) first, then the base chapter
  }
  if (flag === 'strong'){
    // 2026-07-28 (Dan): a strong wound answer now delivers Chapter 2 to EVERY archetype,
    // not just the low-agency three. For readers already taking action the wound is not
    // the brake, so their own chapter keeps the lead and Chapter 2 rides along second.
    return { chapters:[base, 2], mode:'supplement' };
  }
  if (flag === 'moderate') return { chapters:[base], mode:'soft' };
  return { chapters:[base], mode:'default' };
}
function computeResult(){
  const s = dimensionScores();
  let key = bucket(s.C) + bucket(s.AG) + bucket(s.AL);
  // True Creator label gate (2026-07-14): the summit name requires the weakest displayed
  // dimension to clear TC_GATE. Bucketing alone made HHH the default outcome of mild
  // positivity (beta round 1: 45% of real completions, most with a weakest dim of 51-64).
  // Below the bar, the reader is assigned the neighbour archetype by flipping their
  // weakest dimension: a specific growth edge instead of a false summit. The "rare ones"
  // narrative keeps its own stricter praise gate (AM_FULL_REQ) on top of this.
  const TC_GATE = 65;
  let tcGated = false;
  if (key === 'HHH'){
    const weakest = Math.min(s.C, s.AG, s.AL);
    if (weakest < TC_GATE){
      tcGated = true;
      if (s.C === weakest) key = 'LHH';        // clarity is the edge -> Restless Explorer
      else if (s.AG === weakest) key = 'HLH';  // agency is the edge  -> Awakened Observer
      else key = 'HHL';                        // alignment is the edge -> High Achiever
    }
  }
  const flagIdx = questions.findIndex(q=>q.routingFlag);
  const flag = (flagIdx>=0 && answers[flagIdx]) ? answers[flagIdx].value : 'none';
  const plan = chapterPlan(key, flag);
  const border = [];
  if (isBorderline(s.C))  border.push('Clarity');
  if (isBorderline(s.AG)) border.push('Agency');
  if (isBorderline(s.AL)) border.push('Alignment');
  // Neighbour archetypes: one per borderline axis (a single-axis flip is an adjacent
  // archetype the reader is only a few answers away from). Ordered by proximity to the
  // midpoint, nearest first, since that is the likeliest alternative fit; show up to two.
  // (Widened 2026-07-08: previously only the single-borderline case rendered, which
  // skipped readers sitting near two thresholds at once, exactly the people most likely
  // to feel the result did not fully fit.)
  const AXIS_POS   = { Clarity:0, Agency:1, Alignment:2 };
  const AXIS_SCORE = { Clarity:s.C, Agency:s.AG, Alignment:s.AL };
  const flipHL = c => c === 'H' ? 'L' : 'H';
  const neighbours = border.slice()
    .sort((a, b) => Math.abs(AXIS_SCORE[a] - THRESHOLD) - Math.abs(AXIS_SCORE[b] - THRESHOLD))
    .slice(0, 2)
    .map(axis => {
      const alt = key.split(''); alt[AXIS_POS[axis]] = flipHL(alt[AXIS_POS[axis]]);
      const nk = alt.join('');
      return { axis: axis, key: nk, name: ARCH[nk].name };
    });
  const neighbour    = neighbours.length ? neighbours[0].name : null;
  const neighbourKey = neighbours.length ? neighbours[0].key  : null;
  return { scores:s, key, tcGated, archetype:ARCH[key].name, regret:regretFor(s),
           vitality:vitalityReadout(s),
           chapters:plan.chapters, mode:plan.mode, flag, border, neighbours, neighbour, neighbourKey };
}

// ================= INVITE (arriving via a friend's share link) =================
// Share links carry the sender's archetype (?type=KEY) and, since the compare build,
// their three dimension scores (&hws=C-AG-AL, each 0-100). The scores param MUST NOT
// be named "s": that is WordPress's reserved search var and 404s the live page.
// Both are validated hard; anything malformed is ignored and the page behaves as a
// normal visit. The invite survives the session (sessionStorage) so it is still
// there at the result.
const INVITE_KEY = 'hw_invite';
function parseInviteFromUrl(){
  try {
    var q = new URLSearchParams(location.search);
    var t = (q.get('type') || '').toUpperCase();
    if (!ARCH[t]) return null;
    var inv = { key: t };
    var raw = q.get('hws') || q.get('s') || '';
    if (/^\d{1,3}-\d{1,3}-\d{1,3}$/.test(raw)){
      var p = raw.split('-').map(Number);
      if (p.every(function(n){ return n >= 0 && n <= 100; })) inv.scores = { C: p[0], AG: p[1], AL: p[2] };
    }
    // Referral id of the friend who shared this link (b_<betaToken> or r_<random>). Opaque,
    // no PII. Lets us credit this visit back to the sharer without fingerprinting scores.
    var ref = (q.get('ref') || '').slice(0, 48);
    if (/^[A-Za-z0-9_-]{2,48}$/.test(ref)) inv.ref = ref;
    // Sender's first name (share-flow decision 7). Strict allowlist; rendered escaped.
    var from = (q.get('from') || '').slice(0, 24).trim();
    if (/^[A-Za-z][A-Za-z' -]{0,23}$/.test(from)) inv.from = from;
    return inv;
  } catch(e){ return null; }
}
var _invite = parseInviteFromUrl();
if (_invite){
  try { sessionStorage.setItem(INVITE_KEY, JSON.stringify(_invite)); } catch(e){}
  hwCap('landed_from_share', { invite_type: _invite.key, has_scores: !!_invite.scores, ref: _invite.ref || null });
} else {
  try { _invite = JSON.parse(sessionStorage.getItem(INVITE_KEY) || 'null'); } catch(e){ _invite = null; }
  if (_invite && !ARCH[_invite.key]) _invite = null;
}
// Register the sharer's ref as a super property so this visitor's quiz_started and
// quiz_completed inherit it (single-page app + memory persistence keeps it in-session).
try { if (_invite && _invite.ref && window.posthog && posthog.register) posthog.register({ referred_by: _invite.ref }); } catch(e){}

// ================= RESULT PAGE =================
// ===== VIRAL SHARE LOOP =====
const VIRAL = {
  HHH:{ accent:'#3D7A6E', claim:"My work is fully mine. Now it's time to make it world-class.",          prompt:"Know someone also building work that's truly their own?" },
  HHL:{ accent:'#B8902F', claim:"Turns out I've been winning the wrong game.",                          prompt:"Know someone who's also been winning at the wrong game?" },
  HLH:{ accent:'#1E5F8C', claim:"I can see my real work clearly. Now it's time to take more action.",   prompt:"Know someone who can also see their path but hasn't started walking it?" },
  HLL:{ accent:'#A85A3D', claim:"I can see the life I want. Time to start moving toward it.",            prompt:"Know someone who also can picture the life they want but feels stuck?" },
  LHH:{ accent:'#C2722F', claim:"I'm moving fast but need to better define my direction.",              prompt:"Know someone else moving fast with not much interest in a map?" },
  LHL:{ accent:'#B23A2E', claim:"My engine is firing. I now need to point it in the right direction.",  prompt:"Know someone with serious grit but not so much direction?" },
  LLH:{ accent:'#557C9E', claim:"I'm at peace with who I am. Now I need to define where I'm going.",     prompt:"Know someone also at peace with themselves but unsure where they're headed?" },
  LLL:{ accent:'#6B6B6B', claim:"Everything looks fine on paper, but I know something's off, and I'm done ignoring it.", prompt:"Know someone whose work looks fine on paper but something feels off?" }
};
const SHARE_BASE = 'https://dandobos.com/choose-your-work-quiz/';
// Per-archetype share-preview stubs: /choose-your-work-quiz/t/<slug> sets an archetype-specific
// og:image + title, then redirects into the quiz (?type=KEY, forwarding &hws=). So a shared
// link unfurls as the archetype card in WhatsApp/iMessage instead of the generic page.
const SHARE_SLUG = { HHH:'true-creator', HHL:'high-achiever', HLH:'awakened-observer', HLL:'restless-visionary', LHH:'restless-explorer', LHL:'tireless-driver', LLH:'grounded-seeker', LLL:'late-bloomer' };
const SHARE_COMPARE_PROMPT = 'Want to compare patterns with someone?';
const SHARE_CHALLENGE_TITLE = 'Help a friend choose their work';
const SHARE_CHALLENGE_BODY = 'They will get their own pattern, then you can compare where you match and where you do not.';
const SHARE_CHALLENGE_MESSAGE = 'Want to compare Work Personalities? Take the Choose Your Work Quiz and see: ';
var _share = null;
// Default share message (Dan's copy, share-flow decision 2, 2026-08-04): leads with the
// sender's result and the compare promise, then the time claim. The link follows after a
// blank line (never a bare URL mid-sentence).
function viralShareText(r){ return 'I got ' + r.archetype.replace(/^The\s+/, '') + " on the Choose Your Work Quiz. I wonder what you'd get? It maps the pattern behind how you choose work, and only takes around 7 minutes... then it shows us both side by side at the end."; }
// Per-sharer referral id, computed once. Beta testers get their stable portal token;
// everyone else a per-share-session random id. Registered as a super property so the
// sharer's own share_clicked events carry it, and embedded in every share link.
var _shareRef = null;
function myShareRef(){
  if (_shareRef) return _shareRef;
  var bt = _quizBetaToken();
  _shareRef = bt ? ('b_' + bt) : ('r_' + Math.random().toString(36).slice(2, 10));
  try { if (window.posthog && posthog.register) posthog.register({ share_ref: _shareRef }); } catch(e){}
  return _shareRef;
}
function viralLink(r, s){
  var qs = (s ? 'hws=' + s.C + '-' + s.AG + '-' + s.AL + '&' : '') + 'ref=' + encodeURIComponent(myShareRef());
  var slug = SHARE_SLUG[r.key];
  if (slug) return SHARE_BASE + 't/' + slug + '?' + qs;
  return SHARE_BASE + '?type=' + r.key + '&' + qs;
}
function shareDimensionData(s){
  return [
    { name:'Clarity', color:'#1E5F8C', lo:'Searching', hi:'Focused', score:s.C },
    { name:'Agency', color:'#A85A3D', lo:'Stuck', hi:'Building', score:s.AG },
    { name:'Alignment', color:'#3D7A6E', lo:'Expected', hi:'Chosen', score:s.AL }
  ];
}
function shareVerdict(d){ return d.score > 50 ? d.hi : d.lo; }
function sharePayload(r, s){
  var v = VIRAL[r.key];
  return {
    key: r.key,
    archetype: r.archetype,
    accent: v.accent,
    claim: v.claim,
    prompt: v.prompt,
    link: viralLink(r, s),
    text: viralShareText(r),
    dims: shareDimensionData(s)
  };
}
function shareCardDims(s){
  return shareDimensionData(s).map(function(d){
    var sc=d.score, v=shareVerdict(d), pos=Math.min(92,Math.max(8,sc));
    return '<div class="sc-dd-row"><div class="sc-dd-top"><span class="sc-dd-label">'+d.name+'</span><span class="sc-dd-verdict" style="color:'+d.color+'">'+v+'</span></div>'
      + '<div class="sc-dd-track"><div class="sc-dd-fill" style="width:'+sc+'%;background:'+d.color+'"></div>'
      + '<div class="sc-dd-circle" style="left:'+pos+'%;border-color:'+d.color+';color:'+d.color+'">'+sc+'</div></div></div>';
  }).join('');
}
// ===== new share card (wc): per-pattern claim + strengths, "look-good" framing =====
const SHARE_CLAIM = {
  HHH:"My work matters to me, and now I’m making it world-class.",
  HHL:"I’m very good at what I do, and am about to discover something important.",
  HLH:"I can see my real work clearly. I now need to create a plan to build it.",
  HLL:"I can see the life I want. Now I’m building the road to it.",
  LHH:"I’m moving fast, staying true to myself, and am ready to let the work choose me.",
  LHL:"I get things done and am about to discover what I really want to build.",
  LLH:"I’m at peace with who I am, and am ready to find the shape of my work.",
  LLL:"On paper it all works, and I’m honest enough to want more."
};
const SHARE_STRENGTHS = {
  HHH:[["Work that’s truly their own","Found their real work and gives it everything."],["Clarity and action aligned","Knows where they’re going and moves there daily."],["Raising the bar","Building from good toward world-class."]],
  HHL:[["Relentless execution","Sets a target and delivers it, every time."],["Visible, proven skill","The talent and the results speak for themselves."],["Brave enough to choose again","Willing to question a win and aim for something even more important."]],
  HLH:[["Deep self-knowledge","Has done the inner work and knows who they are."],["A clear inner compass","Decides from their own truth, not the noise."],["The honest read","The person others come to for clarity."]],
  HLL:[["Crystal-clear vision","Already knows the work and life worth building."],["Refuses the default path","Will not settle for a life chosen by other people."],["Ready to move","Standing at the edge, about to start building."]],
  LHH:[["Momentum that doesn’t wait","Starts, moves, and keeps going."],["True to themselves","Acts from who they really are, not appearances."],["Open to what’s next","Curious enough to find the right direction."]],
  LHL:[["Serious horsepower","Pushes through resistance that stops other people."],["Always delivers","Hand them something hard and it gets done."],["Ready for something new","All that power is about to find its real target."]],
  LLH:[["Genuinely themselves","The same person in private as in public."],["A calm, grounding presence","The steady one others feel safe around."],["Secure enough to explore","Comfortable wandering until the right path appears."]],
  LLL:[["Steady and dependable","Shows up, holds things together, keeps everything running."],["Honest with themselves","Will name the quiet thing most people talk themselves out of."],["Open to the real question","Done with settling and ready to choose."]]
};
const SHARE_GRID = ['Restless Visionary','True Creator','High Achiever','Awakened Observer','Restless Explorer','Tireless Driver','Grounded Seeker','Late Bloomer'];
function wcCardHtml(r, drained){
  var short = r.archetype.replace(/^The\s+/, '');
  var art = /^[AEIOU]/.test(short) ? 'an' : 'a';
  var strengths = SHARE_STRENGTHS[r.key];
  if (drained) strengths = [
    [strengths[0][0], 'Found their real work and owns every part of it.'],
    strengths[1],
    [strengths[2][0], 'Rebuilding the energy that world-class work runs on.']
  ];
  var items = strengths.map(function(s){
    return '<div class="wc-item"><div class="wc-ck">✓</div><div><p class="wc-it-t">'+s[0]+'</p><p class="wc-it-d">'+s[1]+'</p></div></div>';
  }).join('');
  var cells = SHARE_GRID.map(function(p){
    return '<div class="wc-cell'+(p===short?' me':'')+'"><span class="d"></span>'+p+'</div>';
  }).join('');
  return '<div class="wc" id="wc-card"><div class="wc-bar"></div>'
    + '<div class="wc-dlrow"><button class="wc-dl-btn" title="Download and Share Your Card" onclick="viralSaveImage()"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 4v10m0 0l-3.5-3.5M12 14l3.5-3.5M5 19h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Download &amp; Share</span></button></div>'
    + '<p class="wc-ey">The Choose Your Work Quiz</p>'
    + '<h2 class="wc-name">I am '+art+' <b>'+short+'</b></h2>'
    + '<p class="wc-claim">“'+(drained ? AM_DRAINED_SHARE : SHARE_CLAIM[r.key])+'”</p>'
    + '<p class="wc-label">What people can count on me for</p>'
    + '<div class="wc-list">'+items+'</div>'
    + '<div class="wc-divh"><span>Which of the 8 Work Personalities are you?</span></div>'
    + '<div class="wc-grid">'+cells+'</div>'
    + '<div class="foot-live"><a class="wc-cta" href="#hw-book-cta" onclick="hwCardCtaDown(event)">Discover Your Work Personality</a><p class="wc-src">A free 7-minute career quiz for people who want more from their work<br>dandobos.com/choose-your-work-quiz</p></div>'
    + '</div>';
}
const SHARE_HEADLINE = {
  HHH:"Who else in your circle is a Creator?",
  HHL:"Who else in your circle is a High Achiever?",
  HLH:"Who else in your circle sees what many others miss?",
  HLL:"Who else in your circle is a Visionary?",
  LHH:"Who else in your circle is an Explorer?",
  LHL:"Who else in your circle is a Tireless Driver?",
  LLH:"Who else in your circle is a Grounded Seeker?",
  LLL:"Who else in your circle is a Late Bloomer?"
};
// Sender first name for landing attribution (share-flow decision 7). Kept in localStorage
// so it survives revisits; appended to share links as &from= and greeted on the landing.
function hwSenderName(){ try { var n = (localStorage.getItem('hw_sender_name') || '').slice(0, 24).trim(); return /^[A-Za-z][A-Za-z' -]{0,23}$/.test(n) ? n : ''; } catch(e){ return ''; } }
function hwLinkWithFrom(base){ var n = hwSenderName(); return n ? base + '&from=' + encodeURIComponent(n) : base; }
function shareLoopHtml(r, s){
  var p=sharePayload(r, s), e=encodeURIComponent;
  var fMsg = viralShareText(r);
  p.baseLink = p.link;
  p.link = hwLinkWithFrom(p.baseLink);
  p.text = fMsg;         // every share action sends this message; the link follows a blank line
  _share = p;
  return '<div class="res-divider"></div>'
    + '<p class="res-section-label">Share Your Work Personality Card With a Friend or Colleague</p>'
    + wcCardHtml(r, _hwAmFlags(r.key, s).amDrained)
    + '<div class="panelbox">'
      + '<p class="pb-h">' + SHARE_HEADLINE[r.key] + '</p>'
      + '<p class="pb-b">Send the quiz to a friend, post it, or save your card to share anywhere.</p>'
      + '<div class="seg">'
        + '<button class="seg-btn active" data-m="friend">Send Quiz to a Friend</button>'
        + '<button class="seg-btn" data-m="socials">Post Quiz to Socials</button>'
        + '<button class="seg-btn" data-m="save">Save Image for Yourself</button>'
      + '</div>'
      + '<div class="seg-body" data-m="friend">'
        + '<p class="pb-note-label">Add a personal note (optional but helpful!)</p>'
        + '<textarea class="pb-note" placeholder="Hey. I thought of you when I got my result..." oninput="hwNoteInput(this)"></textarea>'
        + '<div class="pb-name-row"><label for="pb-name">Your first name</label><input class="pb-name" id="pb-name" maxlength="24" value="' + esc(hwSenderName()) + '" oninput="hwNameInput(this)"></div>'
        + '<p class="pb-name-hint">Optional. The page your friend opens will greet them with your name and result.</p>'
        + '<p class="pb-edit-hint">✎ Edit this message before you send it</p>'
        + '<div class="preview"><span class="quo">“</span><span class="msg" contenteditable="true" role="textbox" spellcheck="true" oninput="viralEditMsg(this)">' + fMsg + '</span><span class="quo">”</span></div>'
        + '<div class="share-btns">'
          + '<button class="sbtn native" onclick="viralNativeShare()"><span class="g">↗</span>Share</button>'
          + '<a class="sbtn share-wa" data-link="'+p.baseLink+'" target="_blank" rel="noopener" onclick="hwShareClick(\'whatsapp\')" href="https://wa.me/?text='+e(fMsg+'\n\n'+p.link)+'"><span class="g g-wa">w</span>WhatsApp</a>'
          + '<button class="sbtn" onclick="viralCopyLink()"><span class="g g-cp">⧉</span>Copy Info</button>'
        + '</div>'
      + '</div>'
      + '<div class="seg-body" data-m="socials" style="display:none">'
        + '<div class="share-btns">'
          + '<a class="sbtn share-tw" data-link="'+p.link+'" target="_blank" rel="noopener" onclick="hwShareClick(\'x\')" href="https://twitter.com/intent/tweet?text='+e(fMsg)+'&url='+e(p.link)+'"><span class="g g-x">X</span>Post</a>'
          + '<button class="sbtn" onclick="viralSocial(\'https://www.linkedin.com/sharing/share-offsite/?url='+e(p.link)+'\',\'linkedin\')"><span class="g g-li">in</span>LinkedIn</button>'
          + '<button class="sbtn" onclick="viralSocial(\'https://www.facebook.com/sharer/sharer.php?u='+e(p.link)+'\',\'facebook\')"><span class="g g-fb">f</span>Facebook</button>'
          + '<button class="sbtn" onclick="viralInstagram()"><span class="g g-ig">ig</span>Instagram</button>'
        + '</div>'
      + '</div>'
      + '<div class="seg-body" data-m="save" style="display:none">'
        + '<button class="save-green" onclick="viralSaveImage()"><span class="main"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 4v10m0 0l-3.5-3.5M12 14l3.5-3.5M5 19h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Save Image to Your Device</span><span class="sub">Great reference. Compare with others.</span></button>'
        + '<button class="save-green" onclick="viralSaveStory()" style="margin-top:10px"><span class="main"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 4v10m0 0l-3.5-3.5M12 14l3.5-3.5M5 19h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Save for Stories (9:16)</span><span class="sub">Portrait, for Instagram and TikTok stories.</span></button>'
      + '</div>'
    + '</div>';
}
function viralToast(msg){ var t=document.getElementById('share-toast'); if(!t){ t=document.createElement('div'); t.id='share-toast'; t.className='share-toast'; document.body.appendChild(t); } t.textContent=msg; t.classList.add('on'); clearTimeout(t._t); t._t=setTimeout(function(){ t.classList.remove('on'); },1900); }
// Outgoing message assembly: personal note (if any), then the message, then the link on
// its own line. _share.note is set by the note box; _share.text by the editable message.
var _shareNote = '';
function hwOutgoingText(){ return (_shareNote ? _shareNote + '\n\n' : '') + ((_share && _share.text) || ''); }
function viralShareString(){ return hwOutgoingText() + (_share ? '\n\n' + _share.link : ''); }
function hwRebuildShareLinks(box){
  if (!_share) return;
  var e = encodeURIComponent;
  _share.link = hwLinkWithFrom(_share.baseLink || _share.link);
  box = box || document.querySelector('.panelbox');
  if (!box) return;
  var t = hwOutgoingText();
  var wa = box.querySelector('a.share-wa, a[href*="wa.me"]');
  if (wa) wa.href = 'https://wa.me/?text=' + e(t + '\n\n' + _share.link);
  var tw = box.querySelector('a.share-tw, a[href*="twitter.com"]');
  if (tw) tw.href = 'https://twitter.com/intent/tweet?text=' + e(t) + '&url=' + e(_share.link);
}
function hwNoteInput(el){ _shareNote = (el.value || '').slice(0, 400).trim(); hwRebuildShareLinks(el.closest && el.closest('.panelbox')); }
function hwNameInput(el){
  var n = (el.value || '').slice(0, 24).trim();
  if (n && !/^[A-Za-z][A-Za-z' -]{0,23}$/.test(n)) n = n.replace(/[^A-Za-z' -]/g, '').slice(0, 24);
  try { localStorage.setItem('hw_sender_name', n); } catch(e){}
  hwRebuildShareLinks(el.closest && el.closest('.panelbox'));
}
function hwShareClick(ch){ hwCap('share_clicked', { channel: ch, archetype_key: (_share && _share.key) || null }); }
function viralCopyLink(){ if(!_share) return; hwShareClick('copy'); var u=viralShareString(); (navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){ viralToast('Copied'); }).catch(function(){ viralToast(u); }); }
function viralSocial(url, channel){ if(!_share) return; hwShareClick(channel||'social'); var u=viralShareString(); if(navigator.clipboard){ navigator.clipboard.writeText(u).then(function(){ viralToast('Message copied, paste it into your post'); }).catch(function(){}); } window.open(url,'_blank','noopener'); }
function viralInstagram(){ if(!_share) return; hwShareClick('instagram'); var u=viralShareString(); (navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){ viralToast('Message copied, paste it into Instagram'); }).catch(function(){ viralToast(u); }); }
function viralNativeShare(){ if(!_share) return; hwShareClick('native'); if(navigator.share){ navigator.share({ title:'The Choose Your Work Quiz', text:hwOutgoingText(), url:_share.link }).catch(function(){}); } else { viralCopyLink(); } }
function viralEditMsg(el){ var t=(el.textContent||'').replace(/\s+/g,' ').trim(); if(_share) _share.text=t; hwRebuildShareLinks(el.closest&&el.closest('.panelbox')); }
function viralSaveImage(){
  var el=document.getElementById('wc-card');
  if(!el||typeof html2canvas==='undefined'){ viralToast('Image tool still loading, try again in a moment'); return; }
  hwCap('card_saved', { format: 'card', archetype_key: (_share && _share.key) || null });
  viralToast('Creating image…');
  // Render a clone with the download footer (Discover prompt + URL as the CTA), no corner icon.
  var clone=el.cloneNode(true); clone.removeAttribute('id');
  var cc=clone.querySelector('.wc-dlrow'); if(cc) cc.parentNode.removeChild(cc);
  var fl=clone.querySelector('.foot-live'); if(fl) fl.outerHTML='<div class="foot-dl"><p class="dl-discover">Discover Your Work Personality</p><p class="dl-tag">A free 7-minute career quiz for people who want more from their work</p><span class="dl-url">dandobos.com/choose-your-work-quiz</span></div>';
  clone.style.position='fixed'; clone.style.left='-9999px'; clone.style.top='0'; clone.style.width=el.offsetWidth+'px';
  document.body.appendChild(clone);
  function cleanup(){ if(clone.parentNode) clone.parentNode.removeChild(clone); }
  html2canvas(clone,{backgroundColor:'#FFFFFF',scale:2,useCORS:true,logging:false}).then(function(canvas){
    cleanup();
    canvas.toBlob(function(blob){
      if(!blob){ viralToast('Could not create image'); return; }
      // Always download the PNG to the device.
      var url=URL.createObjectURL(blob);
      var a=document.createElement('a'); a.href=url; a.download='my-work-personality.png';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function(){ URL.revokeObjectURL(url); },1000);
      viralToast('Image saved');
    },'image/png');
  }).catch(function(){ cleanup(); viralToast('Could not create image, please screenshot the card'); });
}
// 9:16 story export: the card centered on a brand-coloured portrait canvas, for
// Instagram / TikTok stories, where quiz results actually circulate.
function viralSaveStory(){
  var el=document.getElementById('wc-card');
  if(!el||typeof html2canvas==='undefined'){ viralToast('Image tool still loading, try again in a moment'); return; }
  hwCap('card_saved', { format: 'story', archetype_key: (_share && _share.key) || null });
  viralToast('Creating story image…');
  var accent=(_share && _share.accent) || '#3D7A6E';
  var wrap=document.createElement('div');
  wrap.style.cssText='position:fixed;left:-9999px;top:0;width:1080px;height:1920px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:110px 90px;box-sizing:border-box;background:linear-gradient(165deg,'+accent+' 0%,#141414 135%);font-family:\'Source Serif Pro\',Georgia,serif;';
  var top=document.createElement('div');
  top.style.cssText='text-align:center;color:#fff;';
  top.innerHTML='<p style="font-family:\'Inter\',sans-serif;font-size:24px;font-weight:700;letter-spacing:5px;text-transform:uppercase;opacity:.85;margin:0 0 18px">The Choose Your Work Quiz</p><p style="font-size:52px;line-height:1.15;font-weight:400;margin:0;">There are 8 Work Personalities.<br>Which one are you?</p>';
  var mid=document.createElement('div');
  var clone=el.cloneNode(true); clone.removeAttribute('id');
  var cc=clone.querySelector('.wc-dlrow'); if(cc) cc.parentNode.removeChild(cc);
  var fl=clone.querySelector('.foot-live'); if(fl) fl.outerHTML='<div class="foot-dl"><p class="dl-discover">Discover Your Work Personality</p><p class="dl-tag">A free 7-minute career quiz for people who want more from their work</p><span class="dl-url">dandobos.com/choose-your-work-quiz</span></div>';
  clone.style.width='860px'; clone.style.boxShadow='0 30px 80px rgba(0,0,0,.35)'; clone.style.borderRadius='6px';
  mid.appendChild(clone);
  var bot=document.createElement('div');
  bot.style.cssText='text-align:center;color:#fff;font-family:\'Inter\',sans-serif;';
  bot.innerHTML='<p style="font-size:30px;font-weight:600;margin:0 0 8px">Find Your Pattern</p><p style="font-size:26px;opacity:.85;margin:0;letter-spacing:.5px">dandobos.com/choose-your-work-quiz</p>';
  wrap.appendChild(top); wrap.appendChild(mid); wrap.appendChild(bot);
  document.body.appendChild(wrap);
  function cleanup(){ if(wrap.parentNode) wrap.parentNode.removeChild(wrap); }
  html2canvas(wrap,{backgroundColor:null,scale:2,useCORS:true,logging:false}).then(function(canvas){
    cleanup();
    canvas.toBlob(function(blob){
      if(!blob){ viralToast('Could not create image'); return; }
      var url=URL.createObjectURL(blob);
      var a=document.createElement('a'); a.href=url; a.download='my-work-personality-story.png';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function(){ URL.revokeObjectURL(url); },1000);
      viralToast('Story image saved');
    },'image/png');
  }).catch(function(){ cleanup(); viralToast('Could not create image, please screenshot the card'); });
}
function viralChallenge(){ if(!_share) return; hwShareClick('challenge'); var msg=SHARE_CHALLENGE_MESSAGE+_share.link; if(navigator.share){ navigator.share({ title:'The Choose Your Work Quiz', text:msg, url:_share.link }).catch(function(){}); } else { (navigator.clipboard?navigator.clipboard.writeText(msg):Promise.reject()).then(function(){ viralToast('Invite copied, paste it to a friend'); }).catch(function(){ window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank'); }); } }

// ===== compare with the friend who invited you (closes the share loop) =====
// Renders only when an invite is present. With scores (&s=) it draws You/Them bars;
// with type-only links (older shares) it falls back to the friend's High/Low verdicts.
const CMP_GAP_LINE = {
  Clarity: 'One of you can already name the work; the other is still circling it.',
  Agency: 'One of you is already building; the other has not started moving yet.',
  Alignment: 'One of you chose their path; the other is still walking the expected one.'
};
var _cmpBack = null;
function compareHtml(r, s){
  if (!_invite || !ARCH[_invite.key]) return '';
  var fk = _invite.key, fs = _invite.scores || null;
  var fName = ARCH[fk].name;
  var keyPos = { Clarity: 0, Agency: 1, Alignment: 2 };
  var sKey = { Clarity: 'C', Agency: 'AG', Alignment: 'AL' };
  var matches = [], diffs = [];
  var rowsHtml = shareDimensionData(s).map(function(d){
    var themScore = fs ? fs[sKey[d.name]] : null;
    var youBand = d.score > 50 ? 'H' : 'L';
    var themBand = (themScore != null) ? (themScore > 50 ? 'H' : 'L') : fk[keyPos[d.name]];
    var same = youBand === themBand;
    (same ? matches : diffs).push({ name: d.name, gap: (themScore != null) ? Math.abs(d.score - themScore) : 0 });
    var themLine = (themScore != null)
      ? '<div class="cmp-line"><span class="cmp-who">Them</span><div class="cmp-track"><div class="cmp-fill them" style="width:' + themScore + '%;background:' + d.color + '"></div><div class="cmp-circle them" style="left:' + themScore + '%;border-color:' + d.color + ';color:' + d.color + '">' + themScore + '</div></div></div>'
      : '<div class="cmp-line"><span class="cmp-who">Them</span><span class="cmp-band">' + (themBand === 'H' ? d.hi : d.lo) + '</span></div>';
    return '<div class="cmp-row">'
      + '<div class="cmp-head"><span class="cmp-dim">' + d.name + '</span><span class="cmp-verdict" style="color:' + (same ? '#3D7A6E' : '#A85A3D') + '">' + (same ? 'You match' : 'You differ') + '</span></div>'
      + '<div class="cmp-line"><span class="cmp-who">You</span><div class="cmp-track"><div class="cmp-fill" style="width:' + d.score + '%;background:' + d.color + '"></div><div class="cmp-circle" style="left:' + d.score + '%;border-color:' + d.color + ';color:' + d.color + '">' + d.score + '</div></div></div>'
      + themLine
      + '</div>';
  }).join('');
  var names = function(list){ return list.map(function(m){ return m.name; }).join(' and '); };
  var summary;
  if (!diffs.length){
    summary = (fk === r.key)
      ? 'You both came out as ' + fName.replace(/^The\s/, 'the ') + '. Same pattern, two different lives. Compare notes on what you each do about it.'
      : 'You sit on the same side of all three dimensions. Your patterns are close neighbours; the differences are in degree, not direction.';
  } else {
    diffs.sort(function(a, b){ return b.gap - a.gap; });
    summary = (matches.length ? 'You match on ' + names(matches) + ', and split on ' + names(diffs) : 'You split on all three dimensions') + '. '
      + CMP_GAP_LINE[diffs[0].name] + ' That is worth a conversation.';
  }
  var meShort = r.archetype.replace(/^The\s+/, ''), themShort = fName.replace(/^The\s+/, '');
  var backMsg = (fk === r.key)
    ? 'I took the quiz you sent. I came out as the ' + meShort + ' too. We match.'
    : 'I took the quiz you sent. You are the ' + themShort + ', I am the ' + meShort + '. We split on ' + (diffs.length ? names(diffs) : 'nothing, just degree') + '.';
  _cmpBack = { text: backMsg, link: viralLink(r, s) };
  return '<div class="res-divider"></div>'
    + '<p class="res-section-label">You and the Friend Who Invited You</p>'
    + '<div class="cmp-card">'
      + '<p class="cmp-names"><span>You: <b>' + r.archetype + '</b></span><span>Them: <b>' + fName + '</b></span></p>'
      + rowsHtml
      + '<p class="cmp-summary">' + summary + '</p>'
      + '<div class="cmp-back">'
        + '<p class="cmp-back-h">Send your result back</p>'
        + '<div class="preview"><span class="quo">&ldquo;</span><span class="msg" contenteditable="true" role="textbox" spellcheck="true" oninput="cmpEditMsg(this)">' + backMsg + '</span><span class="quo">&rdquo;</span></div>'
        + '<div class="share-btns">'
          + '<button class="sbtn native" onclick="cmpNativeShare()"><span class="g">↗</span>Share</button>'
          + '<a class="sbtn share-wa" id="cmp-wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(backMsg + ' ' + _cmpBack.link) + '"><span class="g g-wa">w</span>WhatsApp</a>'
          + '<button class="sbtn" onclick="cmpCopy()"><span class="g g-cp">⧉</span>Copy</button>'
        + '</div>'
      + '</div>'
    + '</div>';
}
function cmpEditMsg(el){
  if (_cmpBack) _cmpBack.text = (el.textContent || '').replace(/\s+/g, ' ').trim();
  var wa = document.getElementById('cmp-wa');
  if (wa && _cmpBack) wa.href = 'https://wa.me/?text=' + encodeURIComponent(_cmpBack.text + ' ' + _cmpBack.link);
}
function cmpNativeShare(){
  if (!_cmpBack) return;
  hwCap('compare_sendback', { channel: 'native' });
  if (navigator.share){ navigator.share({ title: 'The Choose Your Work Quiz', text: _cmpBack.text, url: _cmpBack.link }).catch(function(){}); }
  else { cmpCopy(); }
}
function cmpCopy(){
  if (!_cmpBack) return;
  hwCap('compare_sendback', { channel: 'copy' });
  var u = _cmpBack.text + ' ' + _cmpBack.link;
  (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(function(){ viralToast('Copied, send it back to them'); }).catch(function(){ viralToast(u); });
}

// ===== Fit prompt: confirm-your-archetype gate =====
// The result page shows the scored top, then "Does this sound like you?". Everything
// below (diagnosis + next steps) is gated until the reader confirms. "Not quite" reveals
// the near archetypes (r.neighbours) plus the scored one (tagged, last) as an accordion;
// picking one re-renders the top + next chapter for that archetype. The confirmed key is
// held in _hwConfirmedKey (Part 2 will re-tag the Kit subscriber from it).
var _hwR = null, _hwS = null, _hwConfirmedKey = null, _hwKitKey = null;

function _hwAmFlags(key, s){
  var d = (key === 'HHH' && s.C >= 65 && s.AG >= 65 && s.AL >= 75 && s.V < 60);
  var f = (key === 'HHH' && !AM_FULL_REQ(s) && !d);
  return { amDrained: d, amFoothills: f };
}
// Renders a narrative string: plain lines -> <p>, "• " lines -> bullet list,
// "THE X:" lines -> small-caps label + text. Prose-only variants pass through as <p>s.
function narrHtml(narr){
  var html = '', inList = false;
  narr.split('\n').forEach(function(line){
    line = line.trim();
    if (!line) return;
    if (line.indexOf('• ') === 0){
      if (!inList){ html += '<ul class="res-narr-list">'; inList = true; }
      html += '<li>' + line.slice(2) + '</li>';
      return;
    }
    if (inList){ html += '</ul>'; inList = false; }
    var m = line.match(/^(THE [A-Z ]+?):\s*(.+)$/);
    if (m) html += '<p class="res-narr-label">' + m[1] + '</p><p class="res-narr-labeltext">' + m[2] + '</p>';
    else html += '<p>' + line + '</p>';
  });
  if (inList) html += '</ul>';
  return html;
}
function hwTopHtml(key, s){
  var am = _hwAmFlags(key, s);
  var share = am.amDrained ? AM_DRAINED_SHARE : am.amFoothills ? AM_FOOTHILLS_SHARE : SHARE[key];
  var narr = am.amDrained ? AM_DRAINED_NARR : am.amFoothills ? amFoothillsNarr(s) : ((key === 'LLH' && s.V > 60) ? DS_HIGH_V_NARR : NARR[key]);
  return '<p class="res-eyebrow">Your Work Personality</p>'
    + '<h1 class="res-name">' + ARCH[key].name + '</h1>'
    + '<p class="res-share">' + share + '</p>'
    + '<div class="res-narrative">' + narrHtml(narr) + '</div>'
    + (resultToken() ? '<p class="res-savenote">Save this page for future reference.</p>' : '');
}
function hwChapterHtml(key, s, flag){
  var plan = chapterPlan(key, flag);
  var am = _hwAmFlags(key, s);
  var chTitleHtml, chWhy, chNote = '';
  if (plan.mode === 'sequence'){
    chTitleHtml = '<ul class="res-chapter-list">' + plan.chapters.map(function(n){ return '<li>Chapter ' + n + ': ' + CH_TITLE[n] + '</li>'; }).join('') + '</ul>';
    chWhy = SEQ_LINE[key];
  } else if (plan.mode === 'supplement'){
    chTitleHtml = '<ul class="res-chapter-list">' + plan.chapters.map(function(n){ return '<li>Chapter ' + n + ': ' + CH_TITLE[n] + '</li>'; }).join('') + '</ul>';
    chWhy = am.amDrained ? AM_DRAINED_WHY : am.amFoothills ? AM_FOOTHILLS_WHY : WHY[key];
    chNote = suppNote(key);
  } else {
    var base = plan.chapters[0];
    chTitleHtml = 'Chapter ' + base + ': ' + CH_TITLE[base];
    chWhy = am.amDrained ? AM_DRAINED_WHY : am.amFoothills ? AM_FOOTHILLS_WHY : WHY[key];
    if (plan.mode === 'soft') chNote = (key === 'HLH') ? SOFT_AWAKENED : SOFT_GENERIC;
  }
  var ordered = plan.chapters.slice().sort(function(a,b){ return a - b; });
  var dlkey = ordered.join('_');
  var label = (plan.chapters.length > 1) ? 'Download Chapters ' + ordered.join(' and ') + ' Free' : 'Download Chapter ' + plan.chapters[0] + ' Free';
  return '<p class="zone updates">Your next steps</p>'
    + '<p class="res-section-label">The Next Step</p>'
    + '<div class="res-chapter">'
      + '<div class="res-chapter-title">' + chTitleHtml + '</div>'
      + '<p class="res-chapter-why">' + chWhy + '</p>'
      + (chNote ? '<p class="res-note">' + chNote + '</p>' : '')
      + '<div class="res-dl"><p class="res-dl-label">' + label + '</p><div class="res-dl-row">'
        + '<a class="res-dl-btn" href="' + dlUrl(dlkey, 'pdf') + '" target="_blank" rel="noopener" download onclick="hwDownloadClick(\'pdf\')">PDF</a>'
        + '<a class="res-dl-btn" href="' + dlUrl(dlkey, 'epub') + '" target="_blank" rel="noopener" download onclick="hwDownloadClick(\'epub\')">EPUB (Kindle)</a>'
        + '<a class="res-dl-btn" href="' + dlUrl(dlkey, 'mp3') + '" target="_blank" rel="noopener" download onclick="hwDownloadClick(\'mp3\')">Audio (MP3)</a>'
      + '</div></div>'
    + '</div>';
}
function _hwProfileCard(key, isOrig){
  return '<div class="res-neighbour' + (isOrig ? ' is-original' : '') + '">'
    + '<p class="res-neighbour-eyebrow">' + (isOrig ? 'Your original result' : 'You may be closer to') + '</p>'
    + '<h3 class="res-neighbour-name">' + ARCH[key].name + '</h3>'
    + '<p class="res-neighbour-share">' + SHARE[key] + '</p>'
    + '<div class="res-neighbour-narr">' + narrHtml(NARR[key]) + '</div>'
    + '<div class="nb-actions"><button class="continue-btn thats-it" onclick="hwPick(\'' + key + '\')">That’s it &rarr;</button></div>'
  + '</div>';
}
function _hwPhraseItem(key, isOrig){
  return '<div class="acc-item">'
    + '<button class="phrase-card" onclick="hwAcc(this)"><span class="who">' + ARCH[key].name + (isOrig ? '<span class="tag-orig">your original result</span>' : '') + '</span>&ldquo;' + SHARE[key] + '&rdquo;</button>'
    + '<div class="acc-body" hidden>' + _hwProfileCard(key, isOrig) + '</div>'
  + '</div>';
}
function _hwPhraseItems(keys){ return keys.map(function(k){ return _hwPhraseItem(k, false); }).join(''); }
// The chooser always ends in the scored archetype (tagged "your original result").
//  - Borderline result (has neighbours): show the 1-2 near archetypes, then a "show all types"
//    fallback that reveals the rest, so a reader who rejects both neighbours is never stuck.
//  - Clean result (no neighbours): there is no single obvious alternative, so list all 8 at once.
function hwFitBlockHtml(r){
  var neighbours = r.neighbours || [];
  var neighbourKeys = neighbours.map(function(n){ return n.key; });
  var origItem = _hwPhraseItem(r.key, true);
  var restKeys = Object.keys(ARCH).filter(function(k){ return k !== r.key && neighbourKeys.indexOf(k) === -1; });
  var itemsHtml, moreHtml = '';
  if (neighbourKeys.length){
    itemsHtml = _hwPhraseItems(neighbourKeys) + origItem;
    moreHtml = '<div class="acc-more" id="hw-morewrap"><button class="ghost-btn" onclick="hwShowAll()">None of these? Show all types</button></div>'
      + '<div id="hw-allrest" hidden>' + _hwPhraseItems(restKeys) + '</div>';
  } else {
    itemsHtml = _hwPhraseItems(restKeys) + origItem;
  }
  return '<div class="fit" id="hw-fit">'
    + '<div id="hw-ask">'
      + '<p class="res-section-label">Does this sound like you?</p>'
      + '<div class="fit-opts">'
        + '<button class="fit-btn" onclick="hwFit(\'notquite\')">Not quite</button>'
        + '<button class="fit-btn" onclick="hwFit(\'spot\')">Spot on</button>'
      + '</div>'
      + '<p class="fit-hint" id="hw-hint">Confirm this to see the bonus chapter and your next steps.</p>'
    + '</div>'
    + '<div class="reveal" id="hw-chooser" hidden>'
      + '<p class="res-section-label">Which of these sounds most like you?</p>'
      + itemsHtml
      + moreHtml
    + '</div>'
    + '<div class="confirmed" id="hw-confirmed" hidden><button class="ghost-btn" onclick="hwReopen()">Select a different archetype</button></div>'
  + '</div>';
}
function _hwScroll(el){ try { if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch(e){} }
function hwFit(mode){
  if (mode === 'spot'){ hwConfirm(_hwR.key); return; }
  var hint = document.getElementById('hw-hint'); if (hint) hint.hidden = true;
  var ch = document.getElementById('hw-chooser'); ch.hidden = false; _hwScroll(ch);
}
function hwShowAll(){
  var rest = document.getElementById('hw-allrest'); if (rest) rest.hidden = false;
  var wrap = document.getElementById('hw-morewrap'); if (wrap) wrap.style.display = 'none';
  try { hwCap('fit_show_all_types', { archetype_key: _hwR && _hwR.key }); } catch(e){}
  _hwScroll(rest);
}
function hwAcc(btn){
  var item = btn.parentNode, body = item.querySelector('.acc-body');
  var willOpen = body.hidden;
  document.querySelectorAll('#hw-chooser .acc-item').forEach(function(it){ it.classList.remove('open'); it.querySelector('.acc-body').hidden = true; });
  if (willOpen){ item.classList.add('open'); body.hidden = false; _hwScroll(item); }
}
function hwPick(key){ hwConfirm(key); }
function hwConfirm(key){
  _hwConfirmedKey = key;
  document.getElementById('hw-top').innerHTML = hwTopHtml(key, _hwS);
  document.getElementById('hw-chapter').innerHTML = hwChapterHtml(key, _hwS, _hwR.flag);
  var fm = document.getElementById('hw-firstmoves');
  if (fm) fm.innerHTML = checklistHtml(key, _hwAmFlags(key, _hwS).amDrained);   // re-picked archetype gets its own prompts
  document.getElementById('hw-ask').hidden = true;
  document.getElementById('hw-chooser').hidden = true;
  document.getElementById('hw-confirmed').hidden = false;
  var below = document.getElementById('hw-below'); below.hidden = false;
  _hwScroll(below);
  try { hwCap('fit_confirmed', { archetype_key: key, changed: key !== _hwR.key }); } catch(e){}
  hwRepick(key);
}
// Part 2: when the confirmed archetype changes, re-tag the Kit subscriber's archetype
// fields so the 7-day sequence (resolved at send time) follows the pick. Goes to the
// beta-portal /repick, which updates fields via POST /v4/subscribers (no form join, so
// the "joins a form" automation and Email 1 never re-fire). Fire-and-forget.
function hwArchetypeFields(key){
  var s = _hwS, flag = _hwR.flag, am = _hwAmFlags(key, s);
  var share = am.amDrained ? AM_DRAINED_SHARE : am.amFoothills ? AM_FOOTHILLS_SHARE : SHARE[key];
  var narrative = am.amDrained ? AM_DRAINED_NARR : am.amFoothills ? amFoothillsNarr(s) : ((key === 'LLH' && s.V > 60) ? DS_HIGH_V_NARR : NARR[key]);
  var plan = chapterPlan(key, flag);
  var ordered = plan.chapters.slice().sort(function(a,b){ return a - b; });
  var dlkey = ordered.join('_');
  var chapterLabel = chapterLabelFor(plan), dlLabel, chapterWhy;
  if (plan.mode === 'sequence'){
    dlLabel = 'Download Chapters ' + ordered.join(' and ') + ' Free';
    chapterWhy = SEQ_LINE[key];
  } else {
    var base = plan.chapters[0];
    dlLabel = (plan.chapters.length > 1) ? 'Download Chapters ' + ordered.join(' and ') + ' Free' : 'Download Chapter ' + base + ' Free';
    chapterWhy = am.amDrained ? AM_DRAINED_WHY : am.amFoothills ? AM_FOOTHILLS_WHY : WHY[key];
    if (plan.mode === 'supplement') chapterWhy += ' ' + suppNote(key);
  }
  var parts = chapterPartsFor(plan);
  return {
    hw_archetype: ARCH[key].name, hw_archetype_indef: archIndef(key),
    hw_welcome_subject: WELCOME_SUBJ[key], hw_share: share, hw_narrative: narrative,
    hw_chapter_label: chapterLabel, hw_chapter_why: chapterWhy, hw_dl_label: dlLabel,
    hw_chapter_1: parts.one, hw_chapter_2: parts.two,
    hw_dl_pdf: dlUrl(dlkey, 'pdf'), hw_dl_epub: dlUrl(dlkey, 'epub'), hw_dl_mp3: dlUrl(dlkey, 'mp3')
  };
}
function hwRepick(key){
  if (key === _hwKitKey) return;                                   // no change since last sent to Kit
  _hwKitKey = key;
  var email = (typeof _kitEmail !== 'undefined' && _kitEmail) ? _kitEmail : '';
  if (!email) return;                                              // restored/shared result, no email to re-tag
  try {
    fetch(BETA_BACKEND + '/repick', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, fields: hwArchetypeFields(key) }), keepalive: true }).catch(function(){});
    try { hwCap('archetype_repicked', { archetype_key: key }); } catch(e){}
  } catch(e){}
}
function hwReopen(){
  document.getElementById('hw-confirmed').hidden = true;
  document.getElementById('hw-below').hidden = true;
  document.getElementById('hw-ask').hidden = true;
  document.querySelectorAll('#hw-chooser .acc-item').forEach(function(it){ it.classList.remove('open'); it.querySelector('.acc-body').hidden = true; });
  var ch = document.getElementById('hw-chooser'); ch.hidden = false; _hwScroll(ch);
}

// Drained True Creator variant: displayed dims clear the label gate but Vitality is low.
// "Scale, not repair" is the wrong ask for a depleted reader; energy comes first.
const CHECKLIST_HHH_DRAINED = { note: `You have chosen your work, but it drains you. You will only become world-class when you are able to focus on the work that energizes you.`, items: [
  `Write two lists: the parts of your work that still energize you, and the parts that drain you.`,
  `Write down three ways you can eliminate, shrink, or delegate one draining task this week. Even 30 minutes counts.`,
  `Block 60 minutes in your calendar for the part that energizes you, before anything reactive. Protect it like a meeting. What day and time did you choose?`
] };
const CHECKLISTS = {
  HHH: { note: `The focus is on scale, not repair. The risk is comfort quietly shrinking your ambition.`, items: [
    `Write one sentence: what would make your work **world-class**, not just good?`,
    `Name the comfortable routine quietly capping your ambition. Then describe one way to interrupt it this week.`,
    `Block 60 minutes in your calendar either today or tomorrow for that world-class version. Do this session before anything reactive. What day and time did you choose?`
  ] },
  HHL: { note: `You have high clarity and drive, but you're possibly winning the wrong game. Choose work that fits the real you.`, items: [
    `Write down the game you're currently winning. Then, write one line on whether it's actually yours.`,
    `Name one metric you chase that you'd stop caring about if no one were watching.`,
    `Protect one hour this week for work that fits **you**, not the scoreboard. What day and time did you choose?`,
    `Ask someone who you trust: "Where do you see me forcing things instead of letting them flow?" Who will you speak to?`
  ] },
  HLH: { note: `You can see your real work clearly. You just don't have a system yet. The next step is to turn seeing into a plan.`, items: [
    `Write down the work that you can already see yourself doing.`,
    `Review what you have written. Come up with the first three concrete steps. Be specific. Make each step achievable. For example, instead of "Run a marathon", write "Set my alarm for 7am on Tuesday to go for a 30 min jog."`,
    `Put step one on your calendar this week, with a notification. What day and time did you choose?`,
    `Send that first step to someone you trust and tell them the good news. Who will you speak to?`
  ] },
  HLL: { note: `You can see the life you want but you're held in place by various situations.`, items: [
    `Describe a few images about the life and work you see yourself doing.`,
    `Name one situation you're in that doesn't feel right.`,
    `Review what you have written. Come up with the first three concrete steps. Be specific. Make each step achievable. For example, instead of "Run a marathon", write "Set my alarm for 7am on Tuesday to go for a 30 min jog."`,
    `Put step one on your calendar this week, with a notification. What day and time did you choose?`,
    `Send that first step to someone you trust and tell them the good news. Who will you speak to?`
  ] },
  LHH: { note: `You are moving fast and true to yourself but you need a clear target to move toward.`, items: [
    `List three things you've been exploring lately and consider which one pulls you in the most.`,
    `For that one, specify an easy target you'd know you'd like to hit.`,
    `Block one hour in your calendar this week to go deeper on it instead of starting something new. What day and time did you choose?`,
    `Tell someone you trust about your new target, so your exploring moves towards a specific destination. Who will you speak to?`
  ] },
  LHL: { note: `You have serious horsepower but it's sometimes aimed at work that drains you. This is the curse of competence.`, items: [
    `Write down a task you're great at even though it quietly drains you.`,
    `Name one activity that energizes you more than the above task.`,
    `Redirect 30 minutes of your energy this week from the draining work to the energizing one. Block 30 minutes in your calendar for this energizing activity. What day and time did you choose?`,
    `Tell someone you trust that you're pointing your engine somewhere new, so you don't drift back. Who will you speak to?`
  ] },
  LLH: { note: `You are at peace with who you are, but your momentum is lacking. Use play to move you forward.`, items: [
    `Write three things you'd happily do this week just because they pull you in. No outcome required.`,
    `Pick the one that surprises you most and think about why you like it.`,
    `Block in your calendar a short 30 minute session in the next three days to focus on that activity. What day and time did you choose?`,
    `Tell someone you trust what you're exploring, so you follow through. Who will you speak to?`
  ] },
  LLL: { note: `Everything looks fine on paper, but something's off and you're done ignoring it.`, items: [
    `Write down your thoughts about the quiet "something's off" feeling.`,
    `What is causing everything to look fine but deep down it feels wrong? Just write down the first thoughts that come to mind.`,
    `Block in your calendar 30 minutes to take one small action this week that your old self never would do. What day and time did you choose?`,
    `Tell someone you trust the thing you're done ignoring, so it can no longer hide in the silence. Who will you speak to?`
  ] }
};
var _fmQuestions = [];
function checklistHtml(key, drained){
  var c = (key === 'HHH' && drained) ? CHECKLIST_HHH_DRAINED : CHECKLISTS[key]; if (!c) return '';
  var accent = (typeof VIRAL !== 'undefined' && VIRAL[key] && VIRAL[key].accent) || '#3D7A6E';
  var bold = function(t){ return t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); };
  var plain = function(t){ return t.replace(/\*\*(.+?)\*\*/g, '$1'); };
  _fmQuestions = c.items.map(plain);
  var items = c.items.map(function(it, i){
    return '<div class="rc-q"><label class="rc-qt" for="fm-a-' + i + '">' + bold(it) + '</label>'
      + '<textarea id="fm-a-' + i + '" class="rc-a" rows="2" placeholder="Write your answer here..."></textarea></div>';
  }).join('');
  var emailRow = (typeof _kitEmail !== 'undefined' && _kitEmail) ? ''
    : '<input class="email-input" id="fm-email" type="email" name="email" autocomplete="email" aria-label="Your email address" placeholder="your@email.com" style="margin:10px 0 0;"/>';
  return '<div class="res-checklist" style="border-left-color:' + accent + '">'
    + '<p class="rc-eyebrow" style="color:' + accent + '">Your First Moves</p>'
    + '<p class="rc-title">Apply this to your work this week</p>'
    + '<p class="rc-sub">' + c.note + '</p>'
    + items
    + emailRow
    + '<button type="button" class="continue-btn rc-send" id="fm-btn" onclick="hwFirstMovesSend()">Email Me My Responses</button>'
    + '<p class="rc-note" id="fm-note" role="status"></p>'
    + '</div>';
}
function hwFirstMovesSend(){
  var btn = document.getElementById('fm-btn'), note = document.getElementById('fm-note');
  if (!btn || btn.disabled) return;
  var email = (typeof _kitEmail !== 'undefined' && _kitEmail) ? _kitEmail : '';
  var inp = document.getElementById('fm-email');
  if (!email && inp) email = (inp.value || '').trim();
  if (!EMAIL_RE.test(email)){
    if (note){ note.textContent = 'Please enter a valid email address.'; note.className = 'rc-note err'; }
    if (inp) inp.focus();
    return;
  }
  var moves = [];
  _fmQuestions.forEach(function(q, i){
    var t = document.getElementById('fm-a-' + i);
    var a = t ? (t.value || '').trim() : '';
    if (a) moves.push({ q: q, a: a });
  });
  if (!moves.length){
    if (note){ note.textContent = 'Write at least one answer first.'; note.className = 'rc-note err'; }
    return;
  }
  btn.disabled = true; btn.textContent = 'Sending...';
  if (note){ note.textContent = ''; note.className = 'rc-note'; }
  fetch(BETA_BACKEND + '/first-moves', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, moves: moves }) })
  .then(function(r){ if (!r.ok) throw new Error('send failed'); return r.json(); })
  .then(function(){
    btn.textContent = 'Sent';
    if (note){ note.textContent = 'Sent. Your responses are on their way to your inbox.'; note.className = 'rc-note ok'; }
    try { hwCap('first_moves_submitted', { archetype_key: (window._hwResult && window._hwResult.archetype_key) || null, answered: moves.length }); } catch(e){}
  })
  .catch(function(){
    btn.disabled = false; btn.textContent = 'Email Me My Responses';
    if (note){ note.textContent = 'Could not send right now. Please try again.'; note.className = 'rc-note err'; }
  });
}

function renderResult(){
  const r = computeResult();
  const s = r.scores;
  _hwR = r; _hwS = s; _hwConfirmedKey = r.key; _hwKitKey = r.key;
  window._hwResult = { archetype_key: r.key, chapters: r.chapters.slice().sort(function(a,b){return a-b;}).join('/'), mode: r.mode };
  const word = (answers[0] && answers[0].label) ? answers[0].label : 'that word';
  // True Creator keeps its label, but the full "rare one" copy is gated; below the bar -> "foothills" voice.
  const amDrained = (r.key === 'HHH' && s.C >= 65 && s.AG >= 65 && s.AL >= 75 && s.V < 60);
  const amFoothills = (r.key === 'HHH' && !AM_FULL_REQ(s) && !amDrained);

  const DIM = [
    { key:'C',  name:'Clarity',   color:'#1E5F8C', lo:'Searching', hi:'Focused',  score:s.C },
    { key:'AG', name:'Agency',    color:'#A85A3D', lo:'Stuck',     hi:'Building',  score:s.AG },
    { key:'AL', name:'Alignment', color:'#3D7A6E', lo:'Expected',  hi:'Chosen',    score:s.AL }
  ];
  const rows = DIM.map(d=>{
    const verdict = d.score > 50 ? d.hi : d.lo;
    const sentence = SENTENCES[d.key][bandIdx(d.score)];
    const pos = Math.min(92, Math.max(8, d.score));
    const loOn = d.score <= 50 ? 'on' : '';
    const hiOn = d.score > 50 ? 'on' : '';
    return '<div class="dd-row">'
      + '<div class="dd-left"><span class="dd-dimlabel">' + d.name + '</span>'
      + '<div class="dd-verdict" style="color:' + d.color + '">' + verdict + '</div></div>'
      + '<div class="dd-right">'
      + '<div class="dd-micro">' + sentence + '</div>'
      + '<div class="dd-track"><div class="dd-fill" style="width:' + d.score + '%;background:' + d.color + '"></div>'
      + '<div class="dd-numcircle" style="left:' + pos + '%;border-color:' + d.color + ';color:' + d.color + '">' + d.score + '</div></div>'
      + '<div class="dd-poles"><span class="' + loOn + '">' + d.lo + '</span><span class="' + hiOn + '">' + d.hi + '</span></div>'
      + '</div></div>';
  }).join('');

  // regret meter (4 segments, Low -> High, active one coloured)
  const reg = r.regret;
  const segs = [0,1,2,3].map(i => '<div class="res-regret-seg" style="' + (i <= reg.idx ? 'background:' + reg.color : '') + '"></div>').join('');

  // chapter block
  let chEyebrow, chTitleHtml, chWhy, chNote = '';
  if (r.mode === 'sequence'){
    chEyebrow = 'The Next Step';
    chTitleHtml = '<ul class="res-chapter-list">' + r.chapters.map(n => '<li>Chapter ' + n + ': ' + CH_TITLE[n] + '</li>').join('') + '</ul>';
    chWhy = SEQ_LINE[r.key];
  } else if (r.mode === 'supplement'){
    chEyebrow = 'The Next Step';
    chTitleHtml = '<ul class="res-chapter-list">' + r.chapters.map(n => '<li>Chapter ' + n + ': ' + CH_TITLE[n] + '</li>').join('') + '</ul>';
    chWhy = amDrained ? AM_DRAINED_WHY : amFoothills ? AM_FOOTHILLS_WHY : WHY[r.key];
    chNote = suppNote(r.key);
  } else {
    const base = r.chapters[0];
    chEyebrow = 'The Next Step';
    chTitleHtml = 'Chapter ' + base + ': ' + CH_TITLE[base];
    chWhy = amDrained ? AM_DRAINED_WHY : amFoothills ? AM_FOOTHILLS_WHY : WHY[r.key];
    if (r.mode === 'soft') chNote = (r.key === 'HLH') ? SOFT_AWAKENED : SOFT_GENERIC;
  }

  return hwEmailedNote()
    + '<div id="hw-top">' + hwTopHtml(r.key, s) + '</div>'
    + '<div class="res-divider"></div>'
    + hwFitBlockHtml(r)
    + '<div id="hw-below" hidden>'
      + hwEmailedNote()
      + '<div class="res-divider"></div>'
      + '<p class="zone fixed">Your diagnosis &middot; from your answers</p>'
      + '<p class="res-section-label">Where You Sit on the Three Dimensions</p>'
      + '<div class="dd-card">' + rows + '</div>'
      + compareHtml(r, s)
      + '<div class="res-divider"></div>'
      + '<p class="res-section-label">Regret Signal</p>'
      + '<div class="res-regret">'
        + '<p class="res-regret-level" style="color:' + reg.color + '">' + reg.label + '</p>'
        + '<div class="res-regret-meter">' + segs + '</div>'
        + '<p class="res-regret-desc">' + reg.desc + '</p>'
      + '</div>'
      + '<div class="res-divider"></div>'
      + '<div id="hw-firstmoves">' + checklistHtml(r.key, amDrained) + '</div>'
      + '<div class="res-divider"></div>'
      + '<div id="hw-chapter">' + hwChapterHtml(r.key, s, r.flag) + '</div>'
      + shareLoopHtml(r, s)
      + '<div class="res-divider"></div>'
      + '<p class="res-book-head"><em>Choose Your Work</em> Takes You From This Snapshot to the System Behind It.</p><p class="res-book-text">Your result points to where to begin, but the book is where the change happens.</p>'
      + '<a id="hw-book-cta" class="continue-btn" href="https://dandobos.com/choose-your-work/" target="_blank" rel="noopener" onclick="hwBookClick()" style="text-decoration:none; display:block; width:100%; text-align:center;">Get Choose Your Work</a>'
    + '</div>';
}
function renderComplete() { return renderResult(); }
function renderNeedQuiz() {
  return '<p class="intro-eyebrow">The Choose Your Work Quiz</p>'
    + '<h1 class="intro-title">Please complete the quiz first</h1>'
    + '<p class="intro-desc">Take the quiz to get your result. Once you have finished, you can open it here to share it.</p>'
    + '<button class="continue-btn" onclick="startQuiz()">Start the Quiz</button>';
}
// Resume gate: shown on load when a durable in-progress quiz is found, so a crash,
// refresh, or accidental close never silently drops the reader back at the intro.
var _resumeTarget = null;
function renderResume() {
  var where = (_resumeTarget && _resumeTarget.screen === 'gate')
    ? 'You were at the final step.'
    : 'You were on question ' + (((_resumeTarget && _resumeTarget.qIdx) || 0) + 1) + ' of ' + TOTAL_Q + '.';
  return '<p class="intro-eyebrow">The Choose Your Work Quiz</p>'
    + '<h1 class="intro-title">Welcome back</h1>'
    + '<p class="intro-desc">' + where + ' Pick up right where you left off; your answers are saved.</p>'
    + '<button class="continue-btn" onclick="resumeQuiz()">Resume the quiz</button>'
    + '<div style="text-align:center;margin-top:18px"><button class="ghost-btn" onclick="startOver()">Start Over</button></div>';
}
function resumeQuiz() {
  if (!_resumeTarget) { screen = 'question'; qIdx = 0; }
  else { screen = _resumeTarget.screen; qIdx = _resumeTarget.qIdx || 0; }
  try { hwCap('quiz_resume_confirmed', { screen: screen, index: qIdx + 1 }); } catch(e){}
  render();
}
function startOver() {
  try { hwCap('quiz_resume_declined', {}); } catch(e){}
  restart();
}
function render(keepScroll) {
  setProgress();
  let html;
  if (screen === 'intro') html = renderIntro();
  else if (screen === 'question') html = renderQuestion();
  else if (screen === 'gate') html = renderGate();
  else if (screen === 'resume') html = renderResume();
  else if (screen === 'needquiz') html = renderNeedQuiz();
  else html = renderComplete();
  const pageEl = document.getElementById('page');
  pageEl.className = 'page';
  if (screen === 'intro' && _invite && ARCH[_invite.key]) pageEl.classList.add('invited-intro-page');
  pageEl.innerHTML = html;
  if (screen === 'complete') hwSwapAddress();
  advancing = false;
  inputReadyAt = Date.now() + 350;
  saveState();
  if (!keepScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
}
function startQuiz() { clearState(); _submitting=false; _submitted=false; _kitConfirmed=false; _kitEmail=''; hwTimingStart(); hwCap('quiz_started', { total_questions: TOTAL_Q }); screen = 'question'; qIdx = 0; render(); }
function selectChoice(i) {
  if (advancing || Date.now() < inputReadyAt) return;
  const q = questions[qIdx];
  answers[qIdx] = { value: q.options[i][1], label: q.options[i][0], section: q.section, unscored: q.unscored };
  const btns = document.querySelectorAll('.option');
  btns.forEach(b => b.classList.remove('selected'));
  btns[i].classList.add('selected');
  advancing = true;
  setTimeout(advance, 260);
}
function selectWord(i) {
  if (advancing || Date.now() < inputReadyAt) return;
  const w = questions[qIdx].words[i];
  answers[qIdx] = { value: w[1], label: w[0], section: w[2] };
  const tiles = document.querySelectorAll('.word-tile');
  tiles.forEach(t => t.classList.remove('selected'));
  tiles[i].classList.add('selected');
  advancing = true;
  setTimeout(advance, 300);
}
function updateActivityName(i, val) { if (activityNames[i] !== val) activityScores[i] = null; activityNames[i] = val; document.getElementById('act-name-btn').disabled = !activityNames.every(n=>n.trim()); saveState(); }
function selectActivityNames() { answers[qIdx] = { value: activityNames.slice(), label: activityNames.join(', '), section: 'X', unscored: true }; advance(); }
function updateActivityScore(i, score) { activityScores[i] = score; render(true); }
function selectActivityScores() { const avg = activityScores.reduce((a,b)=>a+b,0)/activityScores.length; answers[qIdx] = { value: avg, label: activityScores.join(','), section: 'V' }; advance(); }
function rankMove(i, dir) { const items = rankState[qIdx]; const ni = i+dir; if (ni<0||ni>=items.length) return; const t=items[i]; items[i]=items[ni]; items[ni]=t; rankTouched[qIdx]=true; rankConfirmPending[qIdx]=false; render(true); }
function selectRank() {
  if (!rankTouched[qIdx] && !rankConfirmPending[qIdx]) { rankConfirmPending[qIdx]=true; render(true); return; }
  const items = rankState[qIdx];
  const ownIdx = items.findIndex(x => x.toLowerCase().indexOf('own') !== -1);
  const score = ((items.length - 1 - ownIdx) / (items.length - 1)) * 100;
  answers[qIdx] = { value: score, label: items.join(' > '), section: 'AL' };
  advance();
}
function updateFreetext(v) { textVal = v; const b = document.getElementById('freetext-btn'); if (b) b.disabled = !v.trim(); saveState(); }
function selectFreetext() { answers[qIdx] = { value: textVal, label: textVal, section: 'X', unscored: true }; textVal=''; advance(); }
function advance() {
  hwTimingStep();
  hwCap('question_answered', { index: qIdx + 1, section: currentSection(), total: TOTAL_Q });
  if (qIdx < questions.length - 1) { qIdx++; render(); }
  else { screen='gate'; hwCap('gate_viewed', {}); render(); }
}
function goBack() { if (advancing) return; if (qIdx > 0) { hwCap('question_back', { from_index: qIdx + 1 }); qIdx--; render(); } }
// ===== KIT WRITE-BACK (gate submit -> Kit form subscribe with all hw_* fields) =====
// Posts to the public Kit form endpoint (no API secret in the page). The form's automation
// fires Email 1, enrols the 7-day course, and applies the archetype tag server-side from
// the hw_archetype field. Form-encoded body = a CORS "simple request", so it reaches Kit
// even when the response is cross-origin and unreadable.
const KIT_FORM_ID = '9479581';   // numeric form id (NOT the embed uid 2f8f31fba1) - the subscribe endpoint resolves the form by this
const KIT_SUBSCRIBE_URL = 'https://app.kit.com/forms/' + KIT_FORM_ID + '/subscriptions';

// Build the exact Kit custom-field payload from the computed result. Mirrors renderResult()
// so the email merge fields match the on-page result (incl. True Creator / Grounded Seeker
// vitality variants and the multi-chapter past-wound bundles).
// IANA timezone from the browser (e.g. "Australia/Sydney"); '' when unavailable.
// Stored as the hw_tz Kit field so course emails can be sent at 8 AM local.
function hwTz(){
  try { return String(Intl.DateTimeFormat().resolvedOptions().timeZone || '').slice(0, 64); } catch(e){ return ''; }
}
function hwFields(){
  const r = computeResult();
  const s = r.scores;
  const amDrained   = (r.key === 'HHH' && s.C >= 65 && s.AG >= 65 && s.AL >= 75 && s.V < 60);
  const amFoothills = (r.key === 'HHH' && !AM_FULL_REQ(s) && !amDrained);
  const share = amDrained ? AM_DRAINED_SHARE : amFoothills ? AM_FOOTHILLS_SHARE : SHARE[r.key];
  const narrative = amDrained ? AM_DRAINED_NARR : amFoothills ? amFoothillsNarr(s)
                    : (r.key === 'LLH' && s.V > 60 ? DS_HIGH_V_NARR : NARR[r.key]);
  const reg = r.regret, vit = r.vitality;
  const ordered = r.chapters.slice().sort((a,b)=>a-b);  // ascending => matches hosted bundle filenames
  const dlkey = ordered.join('_');
  let chapterLabel = chapterLabelFor(r), dlLabel, chapterWhy;
  if (r.mode === 'sequence'){
    dlLabel = 'Download Chapters ' + ordered.join(' and ') + ' Free';
    chapterWhy = SEQ_LINE[r.key];
  } else {
    const base = r.chapters[0];
    dlLabel = (r.chapters.length > 1) ? 'Download Chapters ' + ordered.join(' and ') + ' Free' : 'Download Chapter ' + base + ' Free';
    chapterWhy = amDrained ? AM_DRAINED_WHY : amFoothills ? AM_FOOTHILLS_WHY : WHY[r.key];
    if (r.mode === 'supplement') chapterWhy += ' ' + suppNote(r.key);
  }
  const ansVal = pred => { const i = questions.findIndex(pred); return (i >= 0 && answers[i]) ? answers[i].value : ''; };
  return {
    hw_archetype: r.archetype,
    hw_result_token: resultToken(),
    hw_archetype_indef: archIndef(r.key),
    hw_tz: hwTz(),
    hw_welcome_subject: WELCOME_SUBJ[r.key],
    hw_share: share,
    hw_narrative: narrative,
    hw_clarity_score: String(s.C),
    hw_clarity_verdict: s.C > 50 ? 'Focused' : 'Searching',
    hw_clarity_sentence: SENTENCES.C[bandIdx(s.C)],
    hw_agency_score: String(s.AG),
    hw_agency_verdict: s.AG > 50 ? 'Building' : 'Stuck',
    hw_agency_sentence: SENTENCES.AG[bandIdx(s.AG)],
    hw_alignment_score: String(s.AL),
    hw_alignment_verdict: s.AL > 50 ? 'Chosen' : 'Expected',
    hw_alignment_sentence: SENTENCES.AL[bandIdx(s.AL)],
    hw_vitality_score: String(vit.score),
    hw_vitality_verdict: vit.verdict,
    hw_vitality_sentence: vit.sentence,
    hw_regret_level: reg.label,
    hw_regret_color: reg.color,
    hw_regret_desc: reg.desc,
    hw_chapter_label: chapterLabel,
    hw_chapter_why: chapterWhy,
    hw_chapter_1: chapterPartsFor(r).one,
    hw_chapter_2: chapterPartsFor(r).two,
    hw_dl_label: dlLabel,
    hw_dl_pdf: dlUrl(dlkey, 'pdf'),
    hw_dl_epub: dlUrl(dlkey, 'epub'),
    hw_dl_mp3: dlUrl(dlkey, 'mp3'),
    buried_idea: ansVal(q => q.type === 'freetext' && q.section === 'X'),
    career_stage: ansVal(q => q.section === 'X' && /career\?/.test(q.text || '')),
    role_type: ansVal(q => q.section === 'X' && /role type/.test(q.text || ''))
  };
}

function submitToKit(email, fields){
  let body = 'email_address=' + encodeURIComponent(email);
  for (const k in fields){ body += '&' + encodeURIComponent('fields[' + k + ']') + '=' + encodeURIComponent(fields[k] == null ? '' : fields[k]); }
  return fetch(KIT_SUBSCRIBE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
    body: body
  });
}

let _submitting = false, _submitted = false, _kitEmail = '', _kitConfirmed = false;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function submitGate(){
  if (_submitting || _submitted) return;                       // double-submit guard
  const input = document.getElementById('hw-email');
  const err   = document.getElementById('hw-gate-err');
  const email = ((input && input.value) || '').trim();
  if (!EMAIL_RE.test(email)){
    if (err){ err.textContent = 'Please enter a valid email address.'; err.style.display = 'block'; }
    if (input) input.focus();
    hwCap('gate_email_invalid', {});
    return;
  }
  if (err) err.style.display = 'none';
  _submitting = true; _kitEmail = email;
  mintResultToken();   // before hwFields() and the sheet log, so both carry the same token
  const btn = document.getElementById('hw-gate-btn');
  if (btn){ btn.disabled = true; btn.textContent = 'Sending…'; }
  let done = false;
  const proceed = confirmed => {                               // never trap the reader
    if (done) return; done = true;
    _submitting = false; _submitted = true; _kitConfirmed = !!confirmed;
    try {
      hwTimingStep();
      var r = computeResult(), d = hwDurations();
      hwCap('quiz_completed', {
        archetype: r.archetype, archetype_key: r.key, tc_gated: r.tcGated,
        regret_signal: r.regret && r.regret.label,
        vitality_band: r.vitality && r.vitality.verdict,
        score_clarity: r.scores.C, score_agency: r.scores.AG,
        score_alignment: r.scores.AL, score_vitality: r.scores.V,
        chapters: r.chapters.length, mode: r.mode,
        past_wound: !!(r.flag && r.flag !== 'none'),
        kit_ok: !!confirmed,
        invited: !!_invite, invite_type: _invite ? _invite.key : null, invite_has_scores: !!(_invite && _invite.scores),
        referred_by: (_invite && _invite.ref) || null,
        duration_seconds: d.duration_seconds, active_seconds: d.active_seconds
      });
    } catch(e){}
    logQuizToSheet();
    showResult();
  };
  submitToKit(email, hwFields())
    .then(res => proceed(res && res.ok))
    .catch(() => proceed(false));   // CORS-opaque or offline: the POST still reached Kit; show the result anyway
  setTimeout(() => proceed(false), 6000);
}

// ---- Quiz response logging to Google Sheet ------------------------------
// Every completed quiz is appended as one row to the "Hidden Work Quiz Responses"
// Google Sheet via the beta-portal backend (/quiz-log). Fire-and-forget; a failed
// log never affects the reader's result.
var SHEET_LOG_URL = 'https://beta-portal-production-df48.up.railway.app/quiz-log';
var _sheetLogged = false;
function _quizBetaToken(){
  try { var t = (new URLSearchParams(location.search).get('hwbt') || '').slice(0, 64); return (t && t.indexOf('{{') === -1) ? t : ''; } catch(e){ return ''; }
}
function buildQuizRecord(){
  var rec = {};
  try {
    var r = computeResult(), d = hwDurations(), s = r.scores;
    rec = {
      timestamp: new Date().toISOString(),
      email: _kitEmail || '',
      result_token: resultToken(),
      tz: hwTz(),
      beta_token: _quizBetaToken(),
      archetype: r.archetype, archetype_key: r.key,
      score_clarity: s.C, score_agency: s.AG, score_alignment: s.AL, score_vitality: s.V,
      regret: r.regret && r.regret.label,
      vitality_verdict: r.vitality && r.vitality.verdict,
      mode: r.mode, past_wound: !!(r.flag && r.flag !== 'none'),
      from_share: !!_invite, invite_type: _invite ? _invite.key : '',
      duration_seconds: d.duration_seconds, active_seconds: d.active_seconds
    };
    for (var i = 0; i < questions.length; i++){
      var q = questions[i]; if (!q) continue;
      var a = answers[i];
      var val = (a == null) ? '' : (a.value != null ? a.value : a);
      if (val && typeof val === 'object') { try { val = JSON.stringify(val); } catch(e){ val = ''; } }
      rec['q' + (i + 1) + '_' + (q.section || 'X')] = val;
    }
    try { rec.raw_answers_json = JSON.stringify(answers); } catch(e){}
  } catch(e){}
  return rec;
}
function logQuizToSheet(){
  if (_sheetLogged || !SHEET_LOG_URL) return;
  _sheetLogged = true;
  try {
    fetch(SHEET_LOG_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(buildQuizRecord()), keepalive: true }).catch(function(){});
  } catch(e){}
}

// Beta: when a tester arrives from the portal (?hwbt=<token>), tell the backend the
// quiz is done so their "Quiz taken" ticks in Notion automatically. Public visitors
// have no token, so nothing fires. (Separate from the PostHog tagging above.)
var BETA_BACKEND = 'https://beta-portal-production-df48.up.railway.app';
var _betaPinged = false;
function pingBetaQuizDone(){
  var tok = _quizBetaToken();
  if (_betaPinged || !tok) return;
  _betaPinged = true;
  try {
    fetch(BETA_BACKEND + '/progress?t=' + encodeURIComponent(tok), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step: 'quiz_taken' }), keepalive: true
    }).catch(function(){});
  } catch(e){}
}

function showResult() { screen='complete'; clearState(); saveResult(); pingBetaQuizDone(); render(); }
function restart() { clearResult(); clearState(); _submitting=false; _submitted=false; _kitConfirmed=false; _kitEmail=''; screen='intro'; qIdx=0; answers={}; activityNames=['','','']; activityScores=[null,null,null]; textVal=''; rankState={}; rankTouched={}; rankConfirmPending={}; render(); }
function toggleNeighbour(i) {
  var el = document.getElementById('neighbour-profile-' + i); if (!el) return;
  var open = (el.style.display === 'none');
  el.style.display = open ? 'block' : 'none';
  if (open) { try { hwCap('neighbour_opened'); } catch(e){} }
  var lk = document.querySelectorAll('.res-borderline-link')[i];
  if (lk) { lk.textContent = lk.textContent.replace(open ? '(show profile)' : '(hide profile)', open ? '(hide profile)' : '(show profile)'); }
}
// segmented share control: show one set of actions at a time
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('.seg-btn'); if(!b) return;
  var box = b.closest('.panelbox'); if(!box) return;
  var m = b.getAttribute('data-m');
  box.querySelectorAll('.seg-btn').forEach(function(x){ x.classList.toggle('active', x===b); });
  box.querySelectorAll('.seg-body').forEach(function(x){ x.style.display = (x.getAttribute('data-m')===m)?'block':'none'; });
});
// An unfinished quiz saved in durable storage: show the resume gate instead of
// silently dropping the reader mid-quiz (or, after a crash, back at the intro).
// Invited visits (?type=) are always a fresh start and never auto-resume.
// A permanent personal result link (/r/?rt=<token>) hands us the saved answers on
// window.__HW_RESTORE before this script loads. That wins over everything else: no
// resume gate, no share-invite handling, and nothing is written back to this
// browser's storage, so opening someone else's link never overwrites your own result.
var _fromLink = false;
if (window.__HW_RESTORE && window.__HW_RESTORE.answers) {
  try {
    answers = window.__HW_RESTORE.answers;
    if (window.__HW_RESTORE.email) _kitEmail = window.__HW_RESTORE.email;
    computeResult();
    screen = 'complete';
    _fromLink = true;
    saveResult = function(){};       // read-only view of a saved result
    saveState  = function(){};
    hwCap('result_link_opened', { token: window.__HW_RESTORE.token || null });
  } catch(e){ _fromLink = false; }
}
var _resumed = _fromLink;
if (!_fromLink && !_invite && loadState()) {
  _resumeTarget = { screen: screen, qIdx: qIdx };
  screen = 'resume';
  _resumed = true;
}
// Not mid-quiz and not arriving from a friend's share: if this reader already
// finished, restore straight to their saved result page.
if (!_resumed && !_invite) {
  try { if (loadResult()) { computeResult(); screen = 'complete'; _resumed = true; pingBetaQuizDone(); } }
  catch(e){ clearResult(); }
}
// The portal "Open my result to share" button adds ?result=1. If the reader has
// not finished yet (nothing was restored, so still on the intro), show a gentle
// "complete the quiz first" notice instead of dropping them into the intro.
try { if (new URLSearchParams(location.search).get('result') === '1' && screen === 'intro') screen = 'needquiz'; } catch(e){}
hwTimingLoad();
if (_resumed && !_fromLink) hwCap('quiz_resumed', { screen: screen });
render();
