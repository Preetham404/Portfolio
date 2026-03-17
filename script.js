(function () {

  var html = document.documentElement;
  var ttBtn = document.getElementById('theme-toggle');
  var ttLabel = document.getElementById('tt-label');

  localStorage.removeItem('ps-theme');
  var saved = 'dark';
  html.setAttribute('data-theme', saved);
  ttLabel.textContent = 'Dark';

  ttBtn.addEventListener('click', function () {
    var current = html.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('ps-theme', next);
    ttLabel.textContent = next === 'dark' ? 'Dark' : 'Light';
  });

  var fill = document.getElementById('lbfill');
  var ltxt = document.getElementById('ltxt');
  var loader = document.getElementById('loader');
  fill.style.width = '100%';
  setTimeout(function () {
    ltxt.textContent = 'Ready.';
    setTimeout(function () {
      loader.classList.add('out');
      setTimeout(function () { loader.style.display = 'none'; }, 700);
    }, 300);
  }, 1500);

  function init() {
    var nav = document.getElementById('nav');
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    var secs = document.querySelectorAll('section[id]');
    var nls = document.querySelectorAll('.nl[data-s]');
    function setActive() {
      var cur = '';
      secs.forEach(function (s) { if (window.scrollY >= s.offsetTop - 140) cur = s.id; });
      nls.forEach(function (l) { l.classList.toggle('on', l.dataset.s === cur); });
    }
    window.addEventListener('scroll', setActive, { passive: true });
    setActive();

    var nbtn = document.getElementById('nbtn');
    var mob = document.getElementById('mob');
    var mopen = false;
    function tog(v) {
      mopen = v !== undefined ? v : !mopen;
      mob.classList.toggle('open', mopen);
      nbtn.classList.toggle('open', mopen);
      document.body.style.overflow = mopen ? 'hidden' : '';
    }
    nbtn.addEventListener('click', function () { tog(); });
    mob.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { tog(false); });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 66, behavior: 'smooth' }); }
      });
    });

    var ec = document.getElementById('emailcopy');
    if (ec) {
      ec.addEventListener('click', function () {
        var orig = ec.textContent;
        navigator.clipboard && navigator.clipboard.writeText('preethamshetty5353@gmail.com').then(function () {
          ec.textContent = 'Copied ✓';
          setTimeout(function () { ec.textContent = orig; }, 2000);
        });
      });
    }

    var dot = document.getElementById('cdot');
    var ring = document.getElementById('cring');
    if (dot && ring) {
      var mx = 0, my = 0, cx = 0, cy = 0;
      document.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      });
      (function ani() {
        cx += (mx - cx) * .1; cy += (my - cy) * .1;
        ring.style.left = cx + 'px'; ring.style.top = cy + 'px';
        requestAnimationFrame(ani);
      })();
      document.querySelectorAll('a,button,.skill-block,.pcard,.cemail,.edu-card,.intro-stat').forEach(function (el) {
        el.addEventListener('mouseenter', function () { ring.classList.add('h'); });
        el.addEventListener('mouseleave', function () { ring.classList.remove('h'); });
      });
    }

    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('vis'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });
    document.querySelectorAll('.rv').forEach(function (el) { ro.observe(el); });

    var tlwrap = document.getElementById('tlwrap');
    var track = document.getElementById('tltrack');
    var prog = document.getElementById('tlprog');
    var tip = document.getElementById('tltip');
    var tes = document.querySelectorAll('.te');
    function updateTL() {
      if (!tlwrap) return;
      var tlH = tlwrap.scrollHeight;
      var tlTop = tlwrap.getBoundingClientRect().top + window.scrollY;
      var mid = window.scrollY + window.innerHeight * 0.55;
      var pct = Math.max(0, Math.min(100, (mid - tlTop) / tlH * 100));
      prog.style.height = pct + '%';
      track.style.height = tlH + 'px';
      tip.style.top = pct + '%';
      tes.forEach(function (te) {
        var teTop = te.getBoundingClientRect().top + window.scrollY;
        var rel = (teTop - tlTop) / tlH * 100;
        if (pct >= rel - 2) te.classList.add('vis');
      });
    }
    window.addEventListener('scroll', updateTL, { passive: true });
    updateTL();
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
