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

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('projectsGrid');
  const searchInput = document.getElementById('searchInput');
  const countBadge = document.getElementById('projectCount');

  function renderProjects(items) {
    gridContainer.innerHTML = '';
    if (countBadge) {
      countBadge.textContent = `${items.length} รายการ`;
    }

    if (items.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: #64748b; font-size: 0.9rem;">
          ไม่พบรายการบริการที่ค้นหา
        </div>
      `;
      return;
    }

    items.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'project-card';

      // Clean domain text
      const domainDisplay = proj.url.replace(/^https?:\/\//, '');

      card.innerHTML = `
        <div>
          <div class="card-top">
            <div class="project-icon">${proj.icon}</div>
            <div class="project-name">${proj.name}</div>
          </div>
          <p class="project-desc">${proj.desc}</p>
        </div>
        <div class="card-bottom">
          <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="domain-link" title="${proj.url}">
            ${domainDisplay}
          </a>
          <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="launch-btn">
            เปิดเว็บไซต์ ↗
          </a>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  }

  // Initial Render
  renderProjects(INITIAL_PROJECTS);

  // Search Filtering Logic
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const filtered = INITIAL_PROJECTS.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.desc.toLowerCase().includes(term) ||
        p.url.toLowerCase().includes(term)
      );
      renderProjects(filtered);
    });
  }
});
