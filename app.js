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


function orchardArtwork(index) {
  const uid = 'orchard-' + index;
  const fruitXs = [[770,1010,1235],[865,1110],[745,990,1210],[900,1165],[800,1030,1250],[860,1090,1260]][index % 6];
  const fruits = fruitXs.map((x, j) => {
    const y = 345 + ((j + index) % 3) * 92;
    const s = 0.72 + ((j + index) % 2) * 0.18;
    return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#${uid}-shadow)">
      <path d="M0 -42 C-8 -68 -2 -82 7 -94 C13 -74 12 -60 5 -39" fill="none" stroke="#4d5131" stroke-width="8" stroke-linecap="round"/>
      <path d="M0 -40 C-58 -69 -81 -35 -75 15 C-68 76 -35 114 0 119 C37 114 68 75 75 15 C81 -35 56 -69 0 -40Z" fill="url(#${uid}-fruit)"/>
      <path d="M-40 -27 C-56 -6 -53 35 -37 59" fill="none" stroke="#f9d990" stroke-width="9" stroke-linecap="round" opacity=".36"/>
      <ellipse class="fruit-glint" cx="-33" cy="-3" rx="11" ry="25" fill="#fff4c5"/>
    </g>`;
  }).join('');
  const leaves = [[655,250,-28],[795,190,23],[1030,242,-12],[1185,195,33],[710,420,45],[930,250,38],[1115,380,-42],[1280,290,25],[875,475,-30],[1205,485,44],[580,300,12],[975,145,-15]];
  const foliage = leaves.map(([x,y,r],j)=>`<path class="leaf-drift" style="animation-delay:-${j*.31}s" d="M${x} ${y} C${x-48} ${y-46} ${x-76} ${y+2} ${x-13} ${y+34} C${x+21} ${y+22} ${x+25} ${y-6} ${x} ${y}Z" transform="rotate(${r} ${x} ${y})" fill="${j%3===0?'#60734c':j%3===1?'#75834d':'#a2a060'}" opacity=".92"/>`).join('');
  return `<svg class="scene-art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="${uid}-sky" x2="0" y2="1"><stop stop-color="#78b5d2"/><stop offset=".58" stop-color="#acd0ce"/><stop offset="1" stop-color="#e1c58b"/></linearGradient>
      <linearGradient id="${uid}-fruit" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f6d36b"/><stop offset=".48" stop-color="#e59a37"/><stop offset="1" stop-color="#b95226"/></linearGradient>
      <linearGradient id="${uid}-hill" x2="0" y2="1"><stop stop-color="#748052"/><stop offset="1" stop-color="#324b3b"/></linearGradient>
      <filter id="${uid}-shadow" x="-40%" y="-30%" width="180%" height="190%"><feGaussianBlur in="SourceAlpha" stdDeviation="12"/><feOffset dy="12"/><feComponentTransfer><feFuncA type="linear" slope=".32"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="${uid}-paper"><feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="2" seed="${19+index}"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .2"/></feComponentTransfer></filter>
    </defs>
    <rect width="1440" height="900" fill="url(#${uid}-sky)"/>
    <circle cx="285" cy="180" r="118" fill="#f8e8ba" opacity=".82"/>
    <path d="M0 530 C190 460 310 510 475 470 S775 440 965 500 S1260 470 1440 430 V900 H0Z" fill="#a5aa76" opacity=".65"/>
    <path d="M0 650 C210 540 350 620 545 560 S900 585 1090 530 S1300 550 1440 495 V900 H0Z" fill="url(#${uid}-hill)"/>
    <g class="orchard-sway">
      <path d="M500 900 C550 720 605 530 690 365 C760 220 910 170 1125 105" fill="none" stroke="#564c34" stroke-width="60" stroke-linecap="round"/>
      <path d="M720 370 C625 335 562 266 515 180 M850 245 C900 330 1005 375 1145 390 M958 183 C1020 225 1155 228 1300 180 M650 478 C545 480 450 430 375 345" fill="none" stroke="#665238" stroke-width="25" stroke-linecap="round"/>
      ${foliage}
      ${fruits}
    </g>
    <path d="M0 775 C180 720 325 770 500 730 S840 735 1000 700 S1290 700 1440 650 V900 H0Z" fill="#344b3a" opacity=".65"/>
    <rect class="grain" width="100%" height="100%" filter="url(#${uid}-paper)"/>
  </svg>`;
}

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
    sc.innerHTML = orchardArtwork(i);
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
      sc.style.transform = `scale(${1.08 + clamp(d + 0.5, 0, 1.4) * 0.24}) translate3d(0,${d * -22}px,0)`;
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
