(function(){
  var POSTHOG_KEY  = 'phc_xaksPnZi9WkQ4uSEJYdeFzS4Kx7Ez6uJTAvSmGE26hey';   // project API key (US)
  var POSTHOG_HOST = 'https://us.i.posthog.com';          // EU data residency? use https://eu.i.posthog.com
  if (!POSTHOG_KEY || POSTHOG_KEY.indexOf('phc_REPLACE') === 0) return;   // not configured yet -> skip
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording capturePageView capturePageLeave debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    persistence: 'memory',                        // cookieless: no consent banner needed
    autocapture: false,                           // explicit events only
    capture_pageview: true,                       // top-of-funnel count
    disable_surveys: true,
    session_recording: { maskAllInputs: true }    // email + free-text answers are never recorded
  });
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
    text: "When you think about your work, which of these words rises first?",
    sub: "Don't think too hard. Pick the one that surfaces.",
    words: [
      ["Drained", 20, 'V'], ["Trapped", 15, 'AL'], ["Stuck", 20, 'AG'],
      ["Pushing", 25, 'C'], ["Lost", 20, 'C'], ["Fake", 20, 'AL'],
      ["Alive", 90, 'V'], ["Mine", 90, 'AL'], ["Called", 85, 'C']
    ] },

  // ===== VITALITY =====
  { type: 'choice', section: 'V', text: "On Monday morning, what's the first feeling that hits you when you remember it's a work day?",
    options: [["Dreading the start of the work week", 0], ["Mild annoyance the weekend is over", 33], ["Neutral, just another day", 66], ["Excitement", 100]] },
  { type: 'choice', section: 'V', text: "Over the past week, roughly what share of your work hours were spent on activities that left you feeling more alive, not less?",
    options: [["Almost none", 0], ["Less than half", 30], ["More than half", 70], ["Most of them", 100]] },
  { type: 'choice', section: 'V', text: "How often does your work pull you in so deeply that you lose track of time?",
    options: [["Never", 0], ["Rarely", 30], ["Weekly", 70], ["Daily", 100]] },
  { type: 'choice', section: 'V', text: "The skill that has gotten you the furthest in your career also tends to:",
    options: [["Drains me", 0], ["Slightly drains me", 30], ["Slightly energizes me", 70], ["Energizes me", 100]] },
  { type: 'activity_name', section: 'V',
    text: "Name three things you're widely praised for at work.",
    sub: "Just name them for now." },
  { type: 'activity_rate', section: 'V',
    text: "Now, how energized does each one make you feel?",
    likert: [["Drains me", 0], ["Slightly drains me", 30], ["Slightly energizes me", 70], ["Energizes me", 100]] },
  { type: 'choice', section: 'V', text: "When you imagine doing your current work for three more years with no change, the feeling is closest to:",
    options: [["Dread", 0], ["Heaviness", 30], ["Quiet contentment", 70], ["Excitement", 100]] },

  // ===== ALIGNMENT =====
  { type: 'choice', section: 'AL', text: "If you were not paid for your current role and had to do it anonymously, would you pour your heart into it?",
    options: [["Definitely no", 0], ["Probably no", 35], ["Probably yes", 75], ["Definitely yes", 100]] },
  { type: 'choice', section: 'AL', text: "The main reason you're in your current role:",
    options: [["I'm not sure", 10], ["It's what's expected of me", 20], ["It pays well", 40], ["I'm good at it", 60], ["It lights me up", 100]] },
  { type: 'choice', section: 'AL', text: "When someone asks \"How's work?\", what do you actually think before giving your polished answer?",
    options: [["I can't say what I really feel", 0], ["I don't really want to talk about it", 33], ["It's fine", 66], ["It's genuinely good", 100]] },
  { type: 'choice', section: 'AL', text: "Have you stayed in your current path because of the title, the salary, or what others would think?",
    options: [["I'm not sure", 5], ["Yes, those are the main reasons", 15], ["Partly, but not mainly", 40], ["No, my reasons are mine", 100]] },
  { type: 'rank', section: 'AL',
    text: "Order these voices from loudest to quietest when you make a big life decision.",
    sub: "The top voice is the loudest.",
    items: ["Society\u2019s voice", "A parent\u2019s voice", "A partner\u2019s voice", "My own voice"] },
  { type: 'choice', section: 'AL', text: "If you keep on your current path, the person you're slowly becoming is:",
    options: [["Someone I don't really recognise", 0], ["Not quite who I want to be", 30], ["Mostly who I want to be", 70], ["Exactly who I want to become", 100]] },

  // ===== CLARITY =====
  { type: 'choice', section: 'C', text: "When you imagine the next chapter of your work life, what's there?",
    options: [["Nothing at all", 0], ["A list of things I think I should do", 30], ["A vague sense of direction", 60], ["A clear, specific picture", 100]] },
  { type: 'choice', section: 'C', text: "When did you last sit in stillness long enough to actually hear yourself think, no phone, no input?",
    options: [["I genuinely can't remember", 0], ["Sometime this month", 40], ["Sometime this week", 70], ["In the last few days", 100]] },
  { type: 'choice', section: 'C', text: "The last big career decision you made was driven primarily by:",
    options: [["External pressure or a deadline", 20], ["I\u2019m not sure", 30], ["Logical analysis", 60], ["A clear inner knowing", 100]] },
  { type: 'choice', section: 'C', text: "Is there something you keep grinding through at work, even though a quieter voice says to stop?",
    options: [["Yes, most days", 0], ["Fairly often", 30], ["Rarely", 70], ["No, nothing like that", 100]] },
  { type: 'choice', section: 'C', text: "When you think about changing direction, how much does what you've already invested hold you back?",
    options: [["It's the main thing stopping me, I've come too far to change", 0], ["It weighs on me heavily", 30], ["It's a factor, but not decisive", 65], ["What I've put in doesn't trap me, I'd change if it was right", 100]] },
  { type: 'choice', section: 'C', text: "When you picture changing your work, what's pulling you?",
    options: [["I just want to get away from where I am now", 20], ["Mostly escaping the current situation", 40], ["A mix of escaping this and moving toward something", 65], ["I'm drawn toward something specific I want", 100]] },

  // ===== AGENCY =====
  { type: 'choice', section: 'AG', text: "Have you set aside any regular, protected time to work on what matters to you, outside your job's demands?",
    options: [["No, I haven't", 0], ["I've tried, but it never sticks", 30], ["Yes, but it slips often", 60], ["Yes, and I protect it consistently", 100]] },
  { type: 'choice', section: 'AG', text: "Have you ever started a project that's genuinely yours, not one assigned or expected of you?",
    options: [["No", 0], ["Only in my head so far", 25], ["I've started, but it's stalled", 55], ["Yes, and I'm actively working on it", 100]] },
  { type: 'choice', section: 'AG', text: "When you decide to change something about your work life, what usually happens?",
    options: [["I stay where I am, even when I want to move", 0], ["I plan a lot but rarely begin", 30], ["I start strong but lose momentum", 60], ["I follow through and make it happen", 100]] },
  { type: 'choice', section: 'AG', text: "When someone whose opinion you value disapproves of a direction you want to take, what usually happens?",
    options: [["I drop it to keep the peace", 0], ["I delay it, sometimes indefinitely", 30], ["I push back but often compromise", 65], ["I hear them out and still do what I think is right", 100]] },
  { type: 'choice', section: 'AG', text: "When you face something you want but it feels too big, what tends to happen?",
    options: [["I freeze and don't start", 0], ["I overthink it for a long time", 30], ["I gradually create a plan", 70], ["I take the smallest first step quickly", 100]] },
  { type: 'choice', section: 'AG', text: "In the last few months, how much have you actually moved on work that matters to you, outside your job's demands?",
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
    options: [["Early career (under 30)", "early"], ["Mid-career (30-45)", "mid"], ["Late career (45+)", "late"], ["In transition", "transition"], ["Student", "student"]] },
  { type: 'choice', section: 'X', unscored: true, text: "What's your current role type?",
    options: [["Employee", "employee"], ["Manager", "manager"], ["Founder or owner", "founder"], ["Freelance or contractor", "freelance"], ["Between roles", "between"], ["Other", "other"]] }
];

const TOTAL_Q = questions.length;
let screen = 'intro', qIdx = 0, answers = {};
let activityNames = ['', '', ''], activityScores = [null, null, null];
let textVal = '', rankState = {}, rankTouched = {}, rankConfirmPending = {};
let advancing = false;
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
const STATE_KEY = 'hw_quiz_state_v2';
function saveState(){ try{ sessionStorage.setItem(STATE_KEY, JSON.stringify({screen, qIdx, answers, activityNames, activityScores, textVal, rankState, rankTouched, rankConfirmPending})); }catch(e){} }
function loadState(){ try{ var r = sessionStorage.getItem(STATE_KEY); if(!r) return false; var st = JSON.parse(r); if(!st || (st.screen !== 'question' && st.screen !== 'gate')) return false; screen=st.screen; qIdx=st.qIdx||0; answers=st.answers||{}; activityNames=st.activityNames||['','','']; activityScores=st.activityScores||[null,null,null]; textVal=st.textVal||''; rankState=st.rankState||{}; rankTouched=st.rankTouched||{}; rankConfirmPending=st.rankConfirmPending||{}; return true; }catch(e){ return false; } }
function clearState(){ try{ sessionStorage.removeItem(STATE_KEY); }catch(e){} }

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
  var _pb=document.getElementById('progressbar'); if(_pb) _pb.setAttribute('aria-valuenow', Math.round(pct));
}
function renderIntro() {
  // Invited visitors (arriving via a friend's share link) get the friend's pattern up
  // front and a compare promise; everyone else gets the standard intro.
  var invited = _invite && ARCH[_invite.key];
  var title = invited ? 'Which of the 8 work patterns are you?' : 'Discover the work you are meant to do';
  var invCard = '';
  var desc = 'A 7-minute assessment that helps you identify your work patterns and clarify your next move.';
  var begin = 'Begin';
  if (invited){
    invCard = '<div class="inv-card" style="border-left-color:' + VIRAL[_invite.key].accent + '">'
      + '<p class="inv-ey">The friend who sent you this came out as</p>'
      + '<p class="inv-name">' + ARCH[_invite.key].name + '</p>'
      + '<p class="inv-claim">&ldquo;' + VIRAL[_invite.key].claim + '&rdquo;</p>'
      + '</div>';
    desc = 'Take the same 7-minute assessment. At the end you’ll see your own pattern, plus where you two match and where you differ' + (_invite.scores ? ', dimension by dimension.' : '.');
    begin = 'Find your pattern';
  }
  return '<p class="intro-eyebrow">The Hidden Work</p>'
    + '<h1 class="intro-title">' + title + '</h1>'
    + invCard
    + '<p class="intro-desc">' + desc + '</p>'
    + '<div class="intro-stats"><div class="intro-stat"><div class="intro-stat-num">' + TOTAL_Q + '</div><div class="intro-stat-lbl">Questions</div></div>'
    + '<div class="intro-stat"><div class="intro-stat-num">~7</div><div class="intro-stat-lbl">Minutes</div></div>'
    + '<div class="intro-stat"><div class="intro-stat-num">8</div><div class="intro-stat-lbl">Patterns</div></div></div>'
    + '<button class="continue-btn" onclick="startQuiz()">' + begin + '</button>';
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
  return '<h1 class="gate-title">Your Hidden Work result is ready.</h1>'
    + '<p class="gate-desc">Enter your email and I&rsquo;ll send your result, your free chapter, and the 7-day <em>Choose Your Work</em> course.</p>'
    + '<input class="email-input" id="hw-email" type="email" name="email" autocomplete="email" aria-label="Your email address" placeholder="your@email.com" onkeydown="if(event.key===\'Enter\'){event.preventDefault();submitGate();}"/>'
    + '<p id="hw-gate-err" role="alert" style="display:none;font-family:var(--sans);font-size:13px;color:#B23A2E;text-align:center;margin:10px 0 0;">Please enter a valid email address.</p>'
    + '<button class="continue-btn" id="hw-gate-btn" onclick="submitGate()" style="margin: 8px auto 0; width: 100%;">Show me my Hidden Work</button>'
    + '<p class="gate-fine">No spam. Unsubscribe anytime. Your answers stay private.</p>';
}
// ================= SCORING ENGINE =================
// Dimension score = average of that dimension's scored answers (0-100).
// Archetype = Clarity bucket + Agency bucket + Alignment bucket (each High/Low at the 50 threshold).
// Vitality is not displayed; it sets the regret signal. The past-wound flag can re-order chapters.
const THRESHOLD = 50;   // > 50 => High pole; <= 50 => Low pole
const BORDERLINE = 12;  // within +/- this of threshold => axis flagged borderline

const ARCH = {
  HHH: { name: 'The Aligned Maker',       ch: 9 },
  HHL: { name: 'The High Achiever',       ch: 5 },
  HLH: { name: 'The Awakened Observer',    ch: 4 },
  HLL: { name: 'The Restless Visionary',   ch: 3 },
  LHH: { name: 'The Restless Explorer',   ch: 7 },
  LHL: { name: 'The Tireless Driver',  ch: 8 },
  LLH: { name: 'The Grounded Seeker',       ch: 6 },
  LLL: { name: 'The Late Bloomer', ch: 1 }
};
// Low-agency types where a past wound could be the brake. Awakened Observer (HLH) excluded by design.
const WOUND_ELIGIBLE = ['HLL', 'LLH', 'LLL'];

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
const NARR = {
  HHH: "You are one of the rare ones. You know what your real work is, you are actually doing it, and it is truly yours. Your clarity and your actions point the same direction. Your work energizes you rather than drains you. This is not luck. It is the result of choices most people never manage to make. The risk for you is not that you are on the wrong path, it is that comfort at this altitude can quietly shrink your ambition. The question is no longer whether you have found your work. It is whether you can create something world-class.",
  HHL: "You are very good at what you do, and you know exactly what you are aiming at. People can see the skill, the drive, the results. The trouble is the summit you are climbing was never really yours. Somewhere in the past, your ambitions were handed to you by what others expected or admired, causing you to execute brilliantly against a target your true self never chose.\nThe more you have achieved, the more you have invested, which is exactly what makes turning so hard. This is one of the hardest places to acknowledge, because everything looks like success. But winning the wrong game feels hollow after a while. The clarity and drive you already have will serve you once they are pointed at work that is actually yours.",
  HLH: "Something has shifted. You know where you are going, the noise of other people's expectations has gone quiet, and you make your own decisions. You can see your real work clearly. What you do not have yet is a system. Clarity without action leads to drifting. You do not need more reflection or additional insights. You need to start using the 1-1-1 rule: one hour a day, on one project, in one location. Start this week. You are of the few who has a developed soul. Now it's time to take action.",
  HLL: "You can see it clearly. You know what your real work is, maybe you have known for years. Despite this, you seem to be standing still, inside a life that was built around someone else's expectations. This can feel painful because clarity is not the problem. Your main challenge is to develop an escape plan.\nThe title, the salary, the years you have already put in, the weight of what others would think, all of it holds you in a life that is not yours while you can see the one that is. Part of what keeps you frozen is how much you have already invested, and how hard it feels to move in a direction the people closest to you would question. Seeing is not enough. The work now is to stop watching and start moving, one step at a time, toward the place you've always known is right for you.",
  LHH: "You have energy and you have momentum. You are true to yourself, you take action and do not wait around. The one thing missing is a target. You are moving fast and well, but much of that motion may be away from what you do not want rather than toward something you do. The good news is that you have mastered the hardest parts: being true to yourself and taking action. Now you need to let the work choose you. Loosen your grip on things and notice what quietly draws you in. What speaks to your true self? Direction, not more effort, is the missing piece.",
  LHL: "You have serious horsepower. You move fast, you push hard, and you are used to powering through resistance. The problem is the engine is running on grit, with no clear target and no sense that the work is even your own. You are grinding hard at something that was chosen by your ambition and your training rather than by your true self. This is why you sometimes feel drained. You are skilled at getting things done; what is missing is a direction worth all that drive. Your challenge is to channel your talent into work that matters to you.",
  LLH: "You know who you are. You are not performing for anyone, nor living someone else's life. But you are not moving forward either because you are not yet clear on the shape of your real work.\nThe challenge is that being at peace can quietly become an excuse to stay put. What you are missing is not character, it is taking more action, even if you don't exactly know where it will lead.",
  LLL: "From the outside, your life looks fine. Maybe even good. There is a paycheck, a routine, people who would call you successful. And yet there is a small, persistent pebble in your emotional shoe that you have been trying to ignore. You do not know what your real work is, you are unsure what to do next, and the life you are living does not feel like your own. You are suffering in comfort, and yet it feels easy to not change anything. The question is not whether something is off. You already know it is. The question is whether you are willing to look directly at it and then start to make changes."
};
const WHY = {
  HHH: "Your scores are high across all dimensions, so this chapter is about scale, not repair.",
  HHL: "Your clarity and drive are high. The next step is to choose the work that aligns with your true self.",
  HLH: "You know where you're going, but you don't yet have a system, which is what this chapter gives you.",
  HLL: "You can see your real work clearly, but you're held in place by a set of situations that are not yours.",
  LHH: "You're true to yourself and taking action. This chapter helps you move toward a clear target.",
  LHL: "You're driving hard at work that drains instead of energizes you. This is the curse of competence.",
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
const SOFT_AWAKENED = "You have done much of the inner work already. If the past still bothers you, Chapter 2 is there for you. But the fastest path to progress is the system in Chapter 4.";
const SOFT_GENERIC = "If a past experience still weighs on you, Chapter 2 may help.";

// Aligned Maker "praise gate": the full "rare one" narrative is earned only at genuinely high scores.
// Below the bar the reader keeps the same clean label (The Aligned Maker) but gets a direct
// "foothills" read instead of the celebration. (DRAFT COPY, pending review.)
const AM_FULL_REQ = s => (s.AL >= 75 && s.C >= 65 && s.AG >= 65 && s.V >= 60);
const AM_FOOTHILLS_SHARE = "I'm close to work that's fully mine. Now to close the gap.";
const AM_FOOTHILLS_WHY = "You're in a good position, so this chapter is about building from that strength while you close the gap.";
function amFoothillsNarr(s){
  const base = "You're clear about what matters, you're taking action, and your work is reasonably aligned. That puts you in a good position. But there is still work to do.";
  const m = Math.min(s.C, s.AG, s.AL);
  let tail;
  if (s.AL === m) tail = " The area where you can improve is alignment. A real part of what you do is what's expected rather than what you'd choose.";
  else if (s.C === m) tail = " The area where you can improve is clarity. The specific shape of your work could be clearer.";
  else tail = " The area where you can improve is agency. You know what you need to do, but you could be taking more action.";
  return base + tail;
}
// Drained Aligned Maker: displayed dims all strong (C/AG/AL clear the full bar) but Vitality is low.
// Foothills' "close the gap on a dimension" would be false here, so this variant speaks to energy. (Copy: Dan's.)
const AM_DRAINED_SHARE = "My work is genuinely mine. It just isn't feeding me right now.";
const AM_DRAINED_WHY = "You've built genuinely aligned work, and this chapter is about sustaining and scaling it without letting it burn you out.";
const AM_DRAINED_NARR = "You've done the hard part. You've found your work and you're taking action. This is rare. But right now it's draining you more than it's energizing you. Even work you've genuinely chosen can come at a price from too much load, too little rest, or a quiet shift in your values. This isn't a sign you're on the wrong path but it is a sign that something needs to change. Observe what depletes your energy and use that as a guide to move forward.";
// Grounded Seeker (LLH) has two readings depending on Vitality: the default narrative assumes a calm,
// "at peace" person; high-vitality readers are energized-but-adrift, so they get this variant instead.
const DS_HIGH_V_NARR = "You know who you are. Your work energizes you. But that energy is often going into the day instead of something that matters to you. You're absorbed and engaged but you haven't defined a clear direction or made space to pursue it. You're not missing drive or self-knowledge. You need to focus on clarifying the target and finding time to pursue it.";

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
  if (flag === 'strong' || flag === 'moderate') return { chapters:[base], mode:'soft' };
  return { chapters:[base], mode:'default' };
}
function computeResult(){
  const s = dimensionScores();
  const key = bucket(s.C) + bucket(s.AG) + bucket(s.AL);
  const flagIdx = questions.findIndex(q=>q.routingFlag);
  const flag = (flagIdx>=0 && answers[flagIdx]) ? answers[flagIdx].value : 'none';
  const plan = chapterPlan(key, flag);
  const border = [];
  if (isBorderline(s.C))  border.push('Clarity');
  if (isBorderline(s.AG)) border.push('Agency');
  if (isBorderline(s.AL)) border.push('Alignment');
  let neighbour = null, neighbourKey = null;
  if (border.length === 1){
    const flip = c => c === 'H' ? 'L' : 'H';
    const pos = { Clarity:0, Agency:1, Alignment:2 }[border[0]];
    const alt = key.split(''); alt[pos] = flip(alt[pos]);
    neighbourKey = alt.join('');
    neighbour = ARCH[neighbourKey].name;
  }
  return { scores:s, key, archetype:ARCH[key].name, regret:regretFor(s),
           vitality:vitalityReadout(s),
           chapters:plan.chapters, mode:plan.mode, flag, border, neighbour, neighbourKey };
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
    return inv;
  } catch(e){ return null; }
}
var _invite = parseInviteFromUrl();
if (_invite){
  try { sessionStorage.setItem(INVITE_KEY, JSON.stringify(_invite)); } catch(e){}
  hwCap('landed_from_share', { invite_type: _invite.key, has_scores: !!_invite.scores });
} else {
  try { _invite = JSON.parse(sessionStorage.getItem(INVITE_KEY) || 'null'); } catch(e){ _invite = null; }
  if (_invite && !ARCH[_invite.key]) _invite = null;
}

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
const SHARE_BASE = 'https://dandobos.com/hidden-work/';
const SHARE_COMPARE_PROMPT = 'Want to compare patterns with someone?';
const SHARE_CHALLENGE_TITLE = 'Help a friend discover their hidden work';
const SHARE_CHALLENGE_BODY = 'They will get their own pattern, then you can compare where you match and where you do not.';
const SHARE_CHALLENGE_MESSAGE = 'Want to compare Hidden Work patterns? Take The Hidden Work and see: ';
var _share = null;
function viralShareText(r){ return 'I did the Hidden Work quiz and came out as the ' + r.archetype.replace(/^The\s+/, '') + '. Which of the 8 work patterns are you?'; }
function viralLink(r, s){ return SHARE_BASE + '?type=' + r.key + (s ? '&hws=' + s.C + '-' + s.AG + '-' + s.AL : ''); }
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
  HHH:[["Work that’s truly their own","Found their real work and gives it everything."],["Clarity and action aligned","Knows where they’re going and moves there daily."],["Raising the bar","Not content with good; building toward world-class."]],
  HHL:[["Relentless execution","Sets a target and delivers it, every time."],["Visible, proven skill","The talent and the results speak for themselves."],["Brave enough to choose again","Willing to question a win and aim for something even more important."]],
  HLH:[["Deep self-knowledge","Has done the inner work and knows who they are."],["A clear inner compass","Decides from their own truth, not the noise."],["The honest read","The person others come to for clarity."]],
  HLL:[["Crystal-clear vision","Already knows the work and life worth building."],["Refuses the default path","Will not settle for a life chosen by other people."],["Ready to move","Standing at the edge, about to start building."]],
  LHH:[["Momentum that doesn’t wait","Starts, moves, and keeps going."],["True to themselves","Acts from who they really are, not appearances."],["Open to what’s next","Curious enough to find the right direction."]],
  LHL:[["Serious horsepower","Pushes through resistance that stops other people."],["Always delivers","Hand them something hard and it gets done."],["Ready for something new","All that power is about to find its real target."]],
  LLH:[["Genuinely themselves","No performance, no pretending; what you see is real."],["A calm, grounding presence","The steady one others feel safe around."],["Secure enough to explore","Comfortable wandering until the right path appears."]],
  LLL:[["Steady and dependable","Shows up, holds things together, keeps everything running."],["Honest with themselves","Will name the quiet thing most people talk themselves out of."],["Open to the real question","Done with settling and ready to choose."]]
};
const SHARE_GRID = ['Restless Visionary','Aligned Maker','High Achiever','Awakened Observer','Restless Explorer','Tireless Driver','Grounded Seeker','Late Bloomer'];
function wcCardHtml(r){
  var short = r.archetype.replace(/^The\s+/, '');
  var art = /^[AEIOU]/.test(short) ? 'an' : 'a';
  var items = SHARE_STRENGTHS[r.key].map(function(s){
    return '<div class="wc-item"><div class="wc-ck">✓</div><div><p class="wc-it-t">'+s[0]+'</p><p class="wc-it-d">'+s[1]+'</p></div></div>';
  }).join('');
  var cells = SHARE_GRID.map(function(p){
    return '<div class="wc-cell'+(p===short?' me':'')+'"><span class="d"></span>'+p+'</div>';
  }).join('');
  return '<div class="wc" id="wc-card"><div class="wc-bar"></div>'
    + '<button class="card-corner" title="Save card as image" onclick="viralSaveImage()"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 4v10m0 0l-3.5-3.5M12 14l3.5-3.5M5 19h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
    + '<p class="wc-ey">The Hidden Work</p>'
    + '<h2 class="wc-name">I am '+art+' <b>'+short+'</b></h2>'
    + '<p class="wc-claim">“'+SHARE_CLAIM[r.key]+'”</p>'
    + '<p class="wc-label">What people can count on me for</p>'
    + '<div class="wc-list">'+items+'</div>'
    + '<div class="wc-divh"><span>Which of the 8 are you?</span></div>'
    + '<div class="wc-grid">'+cells+'</div>'
    + '<div class="foot-live"><a class="wc-cta" href="#">Discover your hidden work</a><p class="wc-src">Find yours at dandobos.com/hidden-work</p></div>'
    + '</div>';
}
const SHARE_HEADLINE = {
  HHH:"Who else in your circle is a Maker?",
  HHL:"Who else in your circle is a High Achiever?",
  HLH:"Who else in your circle sees what many others miss?",
  HLL:"Who else in your circle is a Visionary?",
  LHH:"Who else in your circle is an Explorer?",
  LHL:"Who else in your circle is a Tireless Driver?",
  LLH:"Who else in your circle is a Grounded Seeker?",
  LLL:"Who else in your circle is a Late Bloomer?"
};
function shareLoopHtml(r, s){
  var p=sharePayload(r, s), e=encodeURIComponent;
  var fMsg = 'I did the Hidden Work quiz and came out as the ' + r.archetype.replace(/^The\s+/, '') + '. Which of the 8 work patterns are you?';
  p.text = fMsg;         // every share action sends this message, followed by the link
  _share = p;
  return '<div class="res-divider"></div>'
    + '<p class="res-section-label">Share Your Hidden Work Card With a Friend or Colleague</p>'
    + wcCardHtml(r)
    + '<div class="panelbox">'
      + '<p class="pb-h">' + SHARE_HEADLINE[r.key] + '</p>'
      + '<p class="pb-b">Send the quiz to a friend, post it, or save your card to share anywhere.</p>'
      + '<div class="seg">'
        + '<button class="seg-btn active" data-m="friend">Send Quiz to a Friend</button>'
        + '<button class="seg-btn" data-m="socials">Post Quiz to Socials</button>'
        + '<button class="seg-btn" data-m="save">Save Image for Yourself</button>'
      + '</div>'
      + '<div class="seg-body" data-m="friend">'
        + '<p class="pb-edit-hint">✎ Edit this message before you send it</p>'
        + '<div class="preview"><span class="quo">“</span><span class="msg" contenteditable="true" role="textbox" spellcheck="true" oninput="viralEditMsg(this)">' + fMsg + '</span><span class="quo">”</span></div>'
        + '<div class="share-btns">'
          + '<button class="sbtn native" onclick="viralNativeShare()"><span class="g">↗</span>Share</button>'
          + '<a class="sbtn share-wa" data-link="'+p.link+'" target="_blank" rel="noopener" onclick="hwShareClick(\'whatsapp\')" href="https://wa.me/?text='+e(fMsg+' '+p.link)+'"><span class="g g-wa">w</span>WhatsApp</a>'
          + '<button class="sbtn" onclick="viralCopyLink()"><span class="g g-cp">⧉</span>Copy info</button>'
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
        + '<button class="save-green" onclick="viralSaveStory()" style="margin-top:10px"><span class="main"><svg viewBox="0 0 24 24" width="16" height="16"><rect x="7" y="3" width="10" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/></svg>Save for Stories (9:16)</span><span class="sub">Portrait, for Instagram and TikTok stories.</span></button>'
      + '</div>'
    + '</div>';
}
function viralToast(msg){ var t=document.getElementById('share-toast'); if(!t){ t=document.createElement('div'); t.id='share-toast'; t.className='share-toast'; document.body.appendChild(t); } t.textContent=msg; t.classList.add('on'); clearTimeout(t._t); t._t=setTimeout(function(){ t.classList.remove('on'); },1900); }
function viralShareString(){ return (_share && _share.text ? _share.text + ' ' : '') + (_share ? _share.link : ''); }
function hwShareClick(ch){ hwCap('share_clicked', { channel: ch, archetype_key: (_share && _share.key) || null }); }
function viralCopyLink(){ if(!_share) return; hwShareClick('copy'); var u=viralShareString(); (navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){ viralToast('Copied'); }).catch(function(){ viralToast(u); }); }
function viralSocial(url, channel){ if(!_share) return; hwShareClick(channel||'social'); var u=viralShareString(); if(navigator.clipboard){ navigator.clipboard.writeText(u).then(function(){ viralToast('Message copied, paste it into your post'); }).catch(function(){}); } window.open(url,'_blank','noopener'); }
function viralInstagram(){ if(!_share) return; hwShareClick('instagram'); var u=viralShareString(); (navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){ viralToast('Message copied, paste it into Instagram'); }).catch(function(){ viralToast(u); }); }
function viralNativeShare(){ if(!_share) return; hwShareClick('native'); if(navigator.share){ navigator.share({ title:'The Hidden Work', text:_share.text, url:_share.link }).catch(function(){}); } else { viralCopyLink(); } }
function viralEditMsg(el){ var t=(el.textContent||'').replace(/\s+/g,' ').trim(); if(_share) _share.text=t; var box=el.closest&&el.closest('.panelbox'); if(!box) return; var e=encodeURIComponent; var wa=box.querySelector('a.share-wa, a[href*="wa.me"]'); if(wa){ var lw=wa.getAttribute('data-link')||''; wa.href='https://wa.me/?text='+e(t+(lw?' '+lw:'')); } var tw=box.querySelector('a.share-tw, a[href*="twitter.com"]'); if(tw){ var lt=tw.getAttribute('data-link')||''; tw.href='https://twitter.com/intent/tweet?text='+e(t)+(lt?'&url='+e(lt):''); } }
function viralSaveImage(){
  var el=document.getElementById('wc-card');
  if(!el||typeof html2canvas==='undefined'){ viralToast('Image tool still loading, try again in a moment'); return; }
  hwCap('card_saved', { format: 'card', archetype_key: (_share && _share.key) || null });
  viralToast('Creating image…');
  // Render a clone with the download footer (Discover prompt + URL as the CTA), no corner icon.
  var clone=el.cloneNode(true); clone.removeAttribute('id');
  var cc=clone.querySelector('.card-corner'); if(cc) cc.parentNode.removeChild(cc);
  var fl=clone.querySelector('.foot-live'); if(fl) fl.outerHTML='<div class="foot-dl"><p class="dl-discover">Discover Your Hidden Work</p><span class="dl-url">dandobos.com/hidden-work</span></div>';
  clone.style.position='fixed'; clone.style.left='-9999px'; clone.style.top='0'; clone.style.width=el.offsetWidth+'px';
  document.body.appendChild(clone);
  function cleanup(){ if(clone.parentNode) clone.parentNode.removeChild(clone); }
  html2canvas(clone,{backgroundColor:'#FFFFFF',scale:2,useCORS:true,logging:false}).then(function(canvas){
    cleanup();
    canvas.toBlob(function(blob){
      if(!blob){ viralToast('Could not create image'); return; }
      // Always download the PNG to the device.
      var url=URL.createObjectURL(blob);
      var a=document.createElement('a'); a.href=url; a.download='my-hidden-work.png';
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
  top.innerHTML='<p style="font-family:\'Inter\',sans-serif;font-size:24px;font-weight:700;letter-spacing:5px;text-transform:uppercase;opacity:.85;margin:0 0 18px">The Hidden Work</p><p style="font-size:52px;line-height:1.15;font-weight:400;margin:0;">Which of the 8 work<br>patterns are you?</p>';
  var mid=document.createElement('div');
  var clone=el.cloneNode(true); clone.removeAttribute('id');
  var cc=clone.querySelector('.card-corner'); if(cc) cc.parentNode.removeChild(cc);
  var fl=clone.querySelector('.foot-live'); if(fl) fl.outerHTML='<div class="foot-dl"><p class="dl-discover">Discover Your Hidden Work</p><span class="dl-url">dandobos.com/hidden-work</span></div>';
  clone.style.width='860px'; clone.style.boxShadow='0 30px 80px rgba(0,0,0,.35)'; clone.style.borderRadius='6px';
  mid.appendChild(clone);
  var bot=document.createElement('div');
  bot.style.cssText='text-align:center;color:#fff;font-family:\'Inter\',sans-serif;';
  bot.innerHTML='<p style="font-size:30px;font-weight:600;margin:0 0 8px">Find your pattern</p><p style="font-size:26px;opacity:.85;margin:0;letter-spacing:.5px">dandobos.com/hidden-work</p>';
  wrap.appendChild(top); wrap.appendChild(mid); wrap.appendChild(bot);
  document.body.appendChild(wrap);
  function cleanup(){ if(wrap.parentNode) wrap.parentNode.removeChild(wrap); }
  html2canvas(wrap,{backgroundColor:null,scale:2,useCORS:true,logging:false}).then(function(canvas){
    cleanup();
    canvas.toBlob(function(blob){
      if(!blob){ viralToast('Could not create image'); return; }
      var url=URL.createObjectURL(blob);
      var a=document.createElement('a'); a.href=url; a.download='my-hidden-work-story.png';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function(){ URL.revokeObjectURL(url); },1000);
      viralToast('Story image saved');
    },'image/png');
  }).catch(function(){ cleanup(); viralToast('Could not create image, please screenshot the card'); });
}
function viralChallenge(){ if(!_share) return; hwShareClick('challenge'); var msg=SHARE_CHALLENGE_MESSAGE+_share.link; if(navigator.share){ navigator.share({ title:'The Hidden Work', text:msg, url:_share.link }).catch(function(){}); } else { (navigator.clipboard?navigator.clipboard.writeText(msg):Promise.reject()).then(function(){ viralToast('Invite copied, paste it to a friend'); }).catch(function(){ window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank'); }); } }

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
      ? '<div class="cmp-line"><span class="cmp-who">Them</span><div class="cmp-track"><div class="cmp-fill them" style="width:' + themScore + '%;background:' + d.color + '"></div></div><span class="cmp-num" style="color:' + d.color + ';opacity:.55">' + themScore + '</span></div>'
      : '<div class="cmp-line"><span class="cmp-who">Them</span><span class="cmp-band">' + (themBand === 'H' ? d.hi : d.lo) + '</span></div>';
    return '<div class="cmp-row">'
      + '<div class="cmp-head"><span class="cmp-dim">' + d.name + '</span><span class="cmp-verdict" style="color:' + (same ? '#3D7A6E' : '#A85A3D') + '">' + (same ? 'You match' : 'You differ') + '</span></div>'
      + '<div class="cmp-line"><span class="cmp-who">You</span><div class="cmp-track"><div class="cmp-fill" style="width:' + d.score + '%;background:' + d.color + '"></div></div><span class="cmp-num" style="color:' + d.color + '">' + d.score + '</span></div>'
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
  if (navigator.share){ navigator.share({ title: 'The Hidden Work', text: _cmpBack.text, url: _cmpBack.link }).catch(function(){}); }
  else { cmpCopy(); }
}
function cmpCopy(){
  if (!_cmpBack) return;
  hwCap('compare_sendback', { channel: 'copy' });
  var u = _cmpBack.text + ' ' + _cmpBack.link;
  (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(function(){ viralToast('Copied, send it back to them'); }).catch(function(){ viralToast(u); });
}

function renderResult(){
  const r = computeResult();
  const s = r.scores;
  const word = (answers[0] && answers[0].label) ? answers[0].label : 'that word';
  // Aligned Maker keeps its label, but the full "rare one" copy is gated; below the bar -> "foothills" voice.
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
  } else {
    const base = r.chapters[0];
    chEyebrow = 'The Next Step';
    chTitleHtml = 'Chapter ' + base + ': ' + CH_TITLE[base];
    chWhy = amDrained ? AM_DRAINED_WHY : amFoothills ? AM_FOOTHILLS_WHY : WHY[r.key];
    if (r.mode === 'soft') chNote = (r.key === 'HLH') ? SOFT_AWAKENED : SOFT_GENERIC;
  }

  return '<p class="res-eyebrow">Your Hidden Work</p>'
    + '<h1 class="res-name">' + r.archetype + '</h1>'
    + '<p class="res-share">' + (amDrained ? AM_DRAINED_SHARE : amFoothills ? AM_FOOTHILLS_SHARE : SHARE[r.key]) + '</p>'
    
    + '<div class="res-narrative">' + (amDrained ? AM_DRAINED_NARR : amFoothills ? amFoothillsNarr(s) : (r.key === 'LLH' && s.V > 60 ? DS_HIGH_V_NARR : NARR[r.key])).split('\n').map(function(para){ return '<p>' + para + '</p>'; }).join('') + '</div>'
    + '<div class="res-divider"></div>'
    + '<p class="res-section-label">Where You Sit on the Three Dimensions</p>'
    + '<div class="dd-card">' + rows + '</div>'
    + compareHtml(r, s)
    + (r.neighbour
        ? '<div class="res-divider"></div>'
          + '<p class="res-section-label">Your ' + r.border[0] + ' Sits Close to the Midpoint</p>'
          + '<p class="res-borderline" style="margin-top:0">Only a few answers separate you from <a class="res-borderline-link" onclick="toggleNeighbour()">' + r.neighbour + ' (show profile)</a>. If the above result doesn’t fit, review <a class="res-borderline-link" onclick="toggleNeighbour()">' + r.neighbour + ' (show profile)</a>.</p>'
          + '<div class="res-neighbour" id="neighbour-profile" style="display:none;">'
            + '<p class="res-neighbour-eyebrow">If you’re more like</p>'
            + '<h3 class="res-neighbour-name">' + r.neighbour + '</h3>'
            + '<p class="res-neighbour-share">' + SHARE[r.neighbourKey] + '</p>'
            + '<div class="res-neighbour-narr">' + NARR[r.neighbourKey].split('\n').map(function(para){ return '<p>' + para + '</p>'; }).join('') + '</div>'
          + '</div>'
        : '')
    + '<div class="res-divider"></div>'
    + '<p class="res-section-label">Regret Signal</p>'
    + '<div class="res-regret">'
      + '<p class="res-regret-level" style="color:' + reg.color + '">' + reg.label + '</p>'
      + '<div class="res-regret-meter">' + segs + '</div>'
      + '<p class="res-regret-desc">' + reg.desc + '</p>'
    + '</div>'
    + '<div class="res-divider"></div>'
    + '<p class="res-section-label">' + chEyebrow + '</p>'
    + '<div class="res-chapter">'
      + '<div class="res-chapter-title">' + chTitleHtml + '</div>'
      + '<p class="res-chapter-why">' + chWhy + '</p>'
      + (chNote ? '<p class="res-note">' + chNote + '</p>' : '')
      + (function(){
          var ordered = r.chapters.slice().sort(function(a,b){ return a - b; });  // bundle filename + label stay ascending so hosted files resolve
          var key = ordered.join('_');
          var label = (r.mode === 'sequence')
            ? 'Download Chapters ' + ordered.join(' and ') + ' Free'
            : 'Download Chapter ' + r.chapters[0] + ' Free';
          return '<div class="res-dl">'
            + '<p class="res-dl-label">' + label + '</p>'
            + '<div class="res-dl-row">'
              + '<a class="res-dl-btn" href="' + dlUrl(key, 'pdf') + '" target="_blank" rel="noopener" download>PDF</a>'
              + '<a class="res-dl-btn" href="' + dlUrl(key, 'epub') + '" target="_blank" rel="noopener" download>EPUB (Kindle)</a>'
              + '<a class="res-dl-btn" href="' + dlUrl(key, 'mp3') + '" target="_blank" rel="noopener" download>Audio (MP3)</a>'
            + '</div>'
          + '</div>';
        })()
    + '</div>'
    + shareLoopHtml(r, s)
    + '<div class="res-divider"></div>'
    + '<p class="res-book-head"><em>Choose Your Work</em> Takes You From This Snapshot to the System Behind It.</p><p class="res-book-text">Your result points to where to begin, but the book is where the change happens.</p>'
    + '<a class="continue-btn" href="https://dandobos.com/choose-your-work/" target="_blank" rel="noopener" style="text-decoration:none; display:block; width:100%; text-align:center;">Get Choose Your Work</a>';
}
function renderComplete() { return renderResult(); }
function render(keepScroll) {
  setProgress();
  let html;
  if (screen === 'intro') html = renderIntro();
  else if (screen === 'question') html = renderQuestion();
  else if (screen === 'gate') html = renderGate();
  else html = renderComplete();
  document.getElementById('page').innerHTML = html;
  advancing = false;
  saveState();
  if (!keepScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
}
function startQuiz() { clearState(); _submitting=false; _submitted=false; _kitConfirmed=false; _kitEmail=''; hwTimingStart(); hwCap('quiz_started', { total_questions: TOTAL_Q }); screen = 'question'; qIdx = 0; render(); }
function selectChoice(i) {
  if (advancing) return;
  const q = questions[qIdx];
  answers[qIdx] = { value: q.options[i][1], label: q.options[i][0], section: q.section, unscored: q.unscored };
  const btns = document.querySelectorAll('.option');
  btns.forEach(b => b.classList.remove('selected'));
  btns[i].classList.add('selected');
  advancing = true;
  setTimeout(advance, 260);
}
function selectWord(i) {
  if (advancing) return;
  const w = questions[qIdx].words[i];
  answers[qIdx] = { value: w[1], label: w[0], section: w[2] };
  const tiles = document.querySelectorAll('.word-tile');
  tiles.forEach(t => t.classList.remove('selected'));
  tiles[i].classList.add('selected');
  advancing = true;
  setTimeout(advance, 300);
}
function updateActivityName(i, val) { if (activityNames[i] !== val) activityScores[i] = null; activityNames[i] = val; document.getElementById('act-name-btn').disabled = !activityNames.every(n=>n.trim()); }
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
function updateFreetext(v) { textVal = v; const b = document.getElementById('freetext-btn'); if (b) b.disabled = !v.trim(); }
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
// so the email merge fields match the on-page result (incl. Aligned Maker / Grounded Seeker
// vitality variants and the multi-chapter past-wound bundles).
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
  let chapterLabel, dlLabel, chapterWhy;
  if (r.mode === 'sequence'){
    chapterLabel = 'Chapters ' + ordered.join(' and ');
    dlLabel = 'Download Chapters ' + ordered.join(' and ') + ' Free';
    chapterWhy = SEQ_LINE[r.key];
  } else {
    const base = r.chapters[0];
    chapterLabel = 'Chapter ' + base + ': ' + CH_TITLE[base];
    dlLabel = 'Download Chapter ' + base + ' Free';
    chapterWhy = amDrained ? AM_DRAINED_WHY : amFoothills ? AM_FOOTHILLS_WHY : WHY[r.key];
  }
  const ansVal = pred => { const i = questions.findIndex(pred); return (i >= 0 && answers[i]) ? answers[i].value : ''; };
  return {
    hw_archetype: r.archetype,
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
        archetype: r.archetype, archetype_key: r.key,
        regret_signal: r.regret && r.regret.label,
        vitality_band: r.vitality && r.vitality.verdict,
        score_clarity: r.scores.C, score_agency: r.scores.AG,
        score_alignment: r.scores.AL, score_vitality: r.scores.V,
        chapters: r.chapters.length, mode: r.mode,
        past_wound: !!(r.flag && r.flag !== 'none'),
        kit_ok: !!confirmed,
        invited: !!_invite, invite_type: _invite ? _invite.key : null, invite_has_scores: !!(_invite && _invite.scores),
        duration_seconds: d.duration_seconds, active_seconds: d.active_seconds
      });
    } catch(e){}
    showResult();
  };
  submitToKit(email, hwFields())
    .then(res => proceed(res && res.ok))
    .catch(() => proceed(false));   // CORS-opaque or offline: the POST still reached Kit; show the result anyway
  setTimeout(() => proceed(false), 6000);
}

function showResult() { screen='complete'; render(); }
function restart() { clearState(); _submitting=false; _submitted=false; _kitConfirmed=false; _kitEmail=''; screen='intro'; qIdx=0; answers={}; activityNames=['','','']; activityScores=[null,null,null]; textVal=''; rankState={}; rankTouched={}; rankConfirmPending={}; render(); }
function toggleNeighbour() {
  var el = document.getElementById('neighbour-profile'); if (!el) return;
  var open = (el.style.display === 'none');
  el.style.display = open ? 'block' : 'none';
  var lks = document.querySelectorAll('.res-borderline-link');
  for (var i = 0; i < lks.length; i++) { lks[i].textContent = lks[i].textContent.replace(open ? '(show profile)' : '(hide profile)', open ? '(hide profile)' : '(show profile)'); }
}
// segmented share control: show one set of actions at a time
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('.seg-btn'); if(!b) return;
  var box = b.closest('.panelbox'); if(!box) return;
  var m = b.getAttribute('data-m');
  box.querySelectorAll('.seg-btn').forEach(function(x){ x.classList.toggle('active', x===b); });
  box.querySelectorAll('.seg-body').forEach(function(x){ x.style.display = (x.getAttribute('data-m')===m)?'block':'none'; });
});
var _resumed = loadState();
hwTimingLoad();
if (_resumed) hwCap('quiz_resumed', { screen: screen });
render();
