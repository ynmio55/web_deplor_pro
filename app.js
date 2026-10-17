const INITIAL_PROJECTS = [
  {
    id: 'litewave-web',
    name: 'LiteWave Web',
    desc: 'เว็บเบราว์เซอร์มินิมอล ประสิทธิภาพสูงด้วย Rust Engine และระบบบล็อกโฆษณาในตัว',
    icon: '🌊',
    url: 'https://litewave.miosmooth.com'
  },
  {
    id: 'mp3-converter',
    name: 'YouTube MP3 Downloader',
    desc: 'บริการแปลงไฟล์วิดีโอ YouTube เป็นไฟล์เสียง MP3 ความเร็วสูงแบบ 1-Click',
    icon: '🎵',
    url: 'https://mp3-con-dow.miosmooth.com'
  },
  {
    id: 'yabotify-web',
    name: 'Yabotify Web Application',
    desc: 'หน้าเว็บแอปพลิเคชันหลักของ Yabotify สตรีมมิ่งเพลงและบอทเพลง',
    icon: '📱',
    url: 'https://yabotify.miosmooth.com'
  },
  {
    id: 'morph-app',
    name: 'Morph Web Application',
    desc: 'ระบบประมวลผลและแปลงรูปแบบข้อมูล SmoothMorph Web',
    icon: '🎨',
    url: 'https://morph.miosmooth.com'
  },
  {
    id: 'ascii-vision',
    name: 'ASCII Vision Web Service',
    desc: 'ระบบประมวลผลรูปภาพและวิดีโอเป็นตัวอักษร ASCII แบบเรียลไทม์',
    icon: '👁️',
    url: 'https://ascii.miosmooth.com'
  },
  {
    id: 'stem-studio',
    name: 'Stem Studio Web App',
    desc: 'เครื่องมือแยกแทร็กเสียงดนตรีและไฟล์สตูดิโอด้วย AI',
    icon: '🎼',
    url: 'https://stemstudio.miosmooth.com'
  }
];

const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
// [base hue, horizon hue, sun hue] — one palette per scene
const PALETTES = [[235,262,45],[272,305,325],[200,218,42],[322,345,32],[255,192,50],[285,330,45]];

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('projectsGrid');
  const searchInput = document.getElementById('searchInput');
  const countBadge = document.getElementById('projectCount');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const cursor = document.getElementById('cursor');

  /* ---------- Cards (original logic + search kept) ---------- */
  function renderProjects(items) {
    gridContainer.innerHTML = '';
    if (countBadge) countBadge.textContent = `${items.length} รายการ`;
    if (items.length === 0) {
      gridContainer.innerHTML = '<div class="empty">ไม่พบรายการบริการที่ค้นหา</div>';
      return;
    }
    items.forEach((proj, i) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', [100, 200, 300][i % 3]);
      const domainDisplay = proj.url.replace(/^https?:\/\//, '');
      card.innerHTML = `
        <div>
          <div class="card-top">
            <div class="project-icon">${esc(proj.icon)}</div>
            <div class="project-name">${esc(proj.name)}</div>
          </div>
          <p class="project-desc">${esc(proj.desc)}</p>
        </div>
        <div class="card-bottom">
          <a href="${esc(proj.url)}" target="_blank" rel="noopener noreferrer" class="domain-link" title="${esc(proj.url)}">${esc(domainDisplay)}</a>
          <a href="${esc(proj.url)}" target="_blank" rel="noopener noreferrer" class="launch-btn">เปิดเว็บไซต์ <i data-lucide="arrow-up-right" class="arrow"></i></a>
        </div>`;
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
      gridContainer.appendChild(card);
    });
    lucide.createIcons();
    bindCursor(gridContainer);
    if (window.AOS) setTimeout(() => AOS.refreshHard(), 30);
  }
  renderProjects(INITIAL_PROJECTS);

  if (searchInput) {
    let jumped = false;
    searchInput.addEventListener('input', e => {
      const term = e.target.value.toLowerCase().trim();
      renderProjects(INITIAL_PROJECTS.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.desc.toLowerCase().includes(term) ||
        p.url.toLowerCase().includes(term)));
      if (term && !jumped) { jumped = true; document.getElementById('services').scrollIntoView({behavior: reduce ? 'auto' : 'smooth'}); }
      if (!term) jumped = false;
    });
  }

  /* ---------- Scroll-driven story: one scene per service ---------- */
  const story = document.getElementById('story');
  const scenesEl = document.getElementById('scenes');
  const capsEl = document.getElementById('captions');
  const dotsEl = document.getElementById('dots');
  const n = INITIAL_PROJECTS.length;

  INITIAL_PROJECTS.forEach((p, i) => {
    const [h1, h2, h3] = PALETTES[i % PALETTES.length];
    const sc = document.createElement('div');
    sc.className = 'scene';
    sc.style.cssText = `--h1:${h1};--h2:${h2};--h3:${h3};--sx:${i % 2 ? 24 : 72}%;--sy:${26 + (i % 3) * 5}%`;
    sc.innerHTML = [
      [-8, 18, 520], [48, 32, 640], [20, 62, 760], [62, 70, 560]
    ].map(([x, y, w]) => `<span class="cloud" style="--cx:${x}%;--cy:${y}%;--cw:${w}px"></span>`).join('')
      + `<div class="relic">${esc(p.icon)}</div>`;
    scenesEl.appendChild(sc);

    const cap = document.createElement('div');
    cap.className = 'caption';
    cap.innerHTML = `
      <h3 class="serif">${esc(p.name)}</h3>
      <p>${esc(p.desc)}</p>
      <a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">เปิดเว็บไซต์ <i data-lucide="arrow-up-right" class="arrow"></i></a>
      <span class="domain">${esc(p.url.replace(/^https?:\/\//, ''))}</span>`;
    capsEl.appendChild(cap);

    const dot = document.createElement('button');
    dot.setAttribute('aria-label', p.name);
    dot.addEventListener('click', () => {
      const top = story.getBoundingClientRect().top + scrollY;
      scrollTo({top: top + i * innerHeight + innerHeight * 0.5, behavior: reduce ? 'auto' : 'smooth'});
    });
    dotsEl.appendChild(dot);
  });

  const scenes = [...scenesEl.children], caps = [...capsEl.children], dots = [...dotsEl.children];
  const sizeStory = () => { story.style.height = (n + 1) * innerHeight + 'px'; };

  function updateStory() {
    const rect = story.getBoundingClientRect();
    const t = clamp(-rect.top / (story.offsetHeight - innerHeight)) * n; // 0..n
    scenes.forEach((sc, i) => {
      const d = t - (i + 0.5);            // distance from this scene's centre
      const a = Math.abs(d);
      sc.style.opacity = clamp(1 - a * 1.1);
      sc.style.transform = `scale(${1 + clamp(d + 0.5, 0, 1.4) * 0.32}) translateY(${d * -30}px)`;
      sc.style.setProperty('--shift', (d * -160) + 'px');
      const cap = caps[i];
      const o = clamp(1 - (a - 0.22) / 0.22);
      cap.style.opacity = o;
      cap.style.transform = `translateY(${d * -140}px)`;
      cap.style.filter = `blur(${clamp((a - 0.22) * 14, 0, 10)}px)`;
      cap.classList.toggle('on', o > 0.6);
      dots[i].classList.toggle('on', a < 0.5);
    });
  }
  let ticking = false;
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { updateStory(); ticking = false; }); } };
  addEventListener('scroll', onScroll, {passive: true});
  addEventListener('resize', () => { sizeStory(); updateStory(); });
  sizeStory(); updateStory();

  /* ---------- Typing effect ---------- */
  const words = ['ทุกบริการ', 'ทุกเว็บไซต์', 'ทุกระบบ'];
  const typed = document.getElementById('typed');
  if (reduce) typed.textContent = words[0];
  else {
    let w = 0, c = 0, del = false;
    (function tick() {
      const word = words[w];
      typed.textContent = word.slice(0, c);
      let delay = del ? 45 : 95;
      if (!del && c === word.length) { del = true; delay = 1400; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; delay = 350; }
      c += del ? -1 : 1;
      setTimeout(tick, delay);
    })();
  }

  /* ---------- Custom cursor ---------- */
  function bindCursor(root) {
    root.querySelectorAll('a,button,input,.btn').forEach(el => {
      if (el._c) return; el._c = true;
      el.addEventListener('mouseenter', () => cursor.classList.add('big'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
    });
  }
  if (fine) {
    document.body.classList.add('has-cursor');
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
    (function loop() { cx += (x - cx) * .22; cy += (y - cy) * .22; cursor.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
  }

  lucide.createIcons();
  bindCursor(document);
  AOS.init({once: true, offset: 60, duration: 800, disable: reduce});
});
