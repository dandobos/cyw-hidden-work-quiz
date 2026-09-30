/* Choose Your Work landing (built 20260930a) */
(function(){

!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag identify alias people.set people.set_once set_config startSessionRecording stopSessionRecording".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
if(!window.__cywPH){window.__cywPH=1;try{posthog.init('phc_xaksPnZi9WkQ4uSEJYdeFzS4Kx7Ez6uJTAvSmGE26hey',{api_host:'https://k.dandobos.com',person_profiles:'identified_only'});posthog.register({page_variant:'v8'});}catch(e){}}
function cywEv(n,p){try{window.posthog&&posthog.capture(n,p||{},{transport:'sendBeacon'});}catch(e){}}


document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('#topCta,.mbar .btn');if(!a)return;var f=document.getElementById('heroForm');if(!f)return;
 e.preventDefault();f.scrollIntoView({behavior:'smooth',block:'center'});var i=f.querySelector('input');setTimeout(function(){i&&i.focus({preventScroll:true});},450);});

(function(){var h=document.getElementById('heroForm'),b=document.getElementById('mbar'),t=document.getElementById('top');
 if(!('IntersectionObserver' in window)){b.classList.add('show');t.classList.add('show');return;}
 new IntersectionObserver(function(e){var past=!e[0].isIntersecting&&e[0].boundingClientRect.top<0;b.classList.toggle('show',past);t.classList.toggle('show',past);}).observe(h);
 var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting)x.target.classList.add('on');});},{rootMargin:'0px 0px -30% 0px'});
 document.querySelectorAll('.line').forEach(function(l){io.observe(l);});})();
if(location.hash==='#static'){document.querySelectorAll('.line').forEach(function(l){l.classList.add('on')});}

(function(){
function sec(el){return el.closest('section.hero');}
function openCh(s,n){s.querySelectorAll('[data-card]').forEach(function(c){c.classList.toggle('on',c.getAttribute('data-card')===n);c.classList.remove('m-closed');});
 s.querySelectorAll('.rib').forEach(function(r){r.setAttribute('aria-expanded',r.getAttribute('data-ch')===n?'true':'false');});}
function closeAll(s){s.querySelectorAll('[data-card]').forEach(function(c){if(!c.classList.contains('panel'))c.classList.remove('on');});
 s.querySelectorAll('.rib').forEach(function(r){if(!s.classList.contains('b3'))r.setAttribute('aria-expanded','false');});}
document.addEventListener('click',function(e){var r=e.target.closest('.rib');
 if(r){var s=sec(r);stopTour(s);var n=r.getAttribute('data-ch');if(s.dataset.hover==='1'){s.dataset.hover='';openCh(s,n);return;}if(r.getAttribute('aria-expanded')==='true'&&!s.classList.contains('b3')){closeAll(s);}else{openCh(s,n);}return;}
 var x=e.target.closest('.x');if(x){var s2=sec(x);stopTour(s2);closeAll(s2);return;}
 var g=e.target.closest('.go-dl');if(g){var s3=sec(g);stopTour(s3);closeAll(s3);var f=s3.querySelector('form.dl'),i=f.querySelector('input');
  f.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(function(){i.focus({preventScroll:true});},350);
  s3.classList.remove('flash');void s3.offsetWidth;s3.classList.add('flash');return;}
 document.querySelectorAll('section.hero').forEach(function(s){if(!e.target.closest('[data-card]')&&!e.target.closest('.rib'))closeAll(s);});});
document.addEventListener('keydown',function(e){if(e.key==='Escape')document.querySelectorAll('section.hero').forEach(closeAll);});
{var ht=null;
 document.addEventListener('pointerover',function(e){if(e.pointerType!=='mouse')return;var r=e.target.closest('.rib');if(r){var s=sec(r);stopTour(s);clearTimeout(ht);
   if(r.getAttribute('aria-expanded')!=='true'){openCh(s,r.getAttribute('data-ch'));s.dataset.hover='1';}return;}
  var inCard=e.target.closest('[data-card].on');if(inCard){clearTimeout(ht);}});
 document.addEventListener('pointerout',function(e){if(e.pointerType!=='mouse')return;var s=e.target.closest('section.hero');if(!s||s.dataset.hover!=='1')return;
  var to=e.relatedTarget;if(to&&to.closest&&(to.closest('.rib')||to.closest('[data-card]')||to.closest('.col-b')===e.target.closest('.col-b')))return;
  clearTimeout(ht);ht=setTimeout(function(){if(s.querySelector('[data-card].on input:focus')||(s.querySelector('[data-card].on input')&&s.querySelector('[data-card].on input').value))return;if(s.dataset.hover==='1'){closeAll(s);s.dataset.hover='';}},600);});}
var tours={};function stopTour(s){if(!s)return;(tours[s.getAttribute('data-k')]||[]).forEach(clearTimeout);tours[s.getAttribute('data-k')]=[];}
function start(){var s=document.querySelector('section.hero:not([hidden])');if(!s)return;
 s.classList.remove('bounce');void s.offsetWidth;s.classList.add('bounce');
 if(s.classList.contains('b3')){var mob=window.innerWidth<=680;openCh(s,'1');if(mob){s.querySelectorAll('.panel').forEach(function(p){p.classList.add('m-closed');});s.querySelectorAll('.rib').forEach(function(r){r.setAttribute('aria-expanded','false');});}}
 if(s.classList.contains('b5')){stopTour(s);var k=s.getAttribute('data-k');tours[k]=[setTimeout(function(){openCh(s,'1');},1300),setTimeout(function(){openCh(s,'2');},3900),setTimeout(function(){closeAll(s);},6500)];}}
setInterval(function(){var s=document.querySelector('section.hero:not([hidden])');if(s&&!s.querySelector('[data-card].on')&&!s.classList.contains('b2')){s.classList.remove('bounce');void s.offsetWidth;s.classList.add('bounce');}},7000);
start();
})();


(function(){
 cywEv('cyw_page_viewed',{variant:'v8'});
 // every form: keep the email for the thank-you page (same site, so sessionStorage carries it), record the send, then post to Kit
 document.addEventListener('submit',function(e){var f=e.target.closest&&e.target.closest('#cywlp form');if(!f)return;
  var i=f.querySelector('input[type=email]');try{if(i&&i.value)sessionStorage.setItem('cyw_email',i.value);}catch(x){}
  var card=f.closest('[data-card]');cywEv('cyw_form_submitted',{where:f.getAttribute('data-where')||'form',chapter:card?card.getAttribute('data-card'):null});},true);
 document.addEventListener('click',function(e){var t=e.target;
  if(t.closest&&t.closest('#topCta'))cywEv('cyw_topbar_clicked');
  var q=t.closest&&t.closest('.qx a');if(q)cywEv('cyw_quiz_clicked',{what:q.classList.contains('qbtn')?'button':q.textContent.trim()});},true);
 document.querySelectorAll('#cywlp details').forEach(function(d){d.addEventListener('toggle',function(){if(d.open)cywEv('cyw_faq_opened',{question:d.querySelector('summary').textContent.trim()});});});
 var seen={};window.addEventListener('scroll',function(){var h=document.documentElement,p=Math.round((h.scrollTop+innerHeight)/h.scrollHeight*100);
  [25,50,75,100].forEach(function(m){if(p>=m&&!seen[m]){seen[m]=1;cywEv('cyw_scrolled',{percent:m});}});},{passive:true});
 var mo=new MutationObserver(function(ms){ms.forEach(function(m){var c=m.target;if(c.matches&&c.matches('[data-card].on')&&!c.__logged){c.__logged=1;setTimeout(function(){c.__logged=0;},4000);
  cywEv('cyw_bookmark_opened',{chapter:c.getAttribute('data-card')});}});});
 document.querySelectorAll('#cywlp [data-card]').forEach(function(c){mo.observe(c,{attributes:true,attributeFilter:['class']});});
})();

})();
