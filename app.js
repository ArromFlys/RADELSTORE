(() => {
  'use strict';

  /* =========================================================
     RADELSTORE - MAIN JAVASCRIPT
     Semua konfigurasi bisnis ada di bagian ini agar mudah diedit.
     ========================================================= */

  const ranks = [
    { name: 'Warrior', maxStars: 3, price: 500, icon: '⚔️', color: '#a1a1aa', glow: '#71717a' },
    { name: 'Elite', maxStars: 4, price: 750, icon: '🛡️', color: '#4ade80', glow: '#22c55e' },
    { name: 'Master', maxStars: 4, price: 1500, icon: '🎯', color: '#60a5fa', glow: '#3b82f6' },
    { name: 'Grandmaster', maxStars: 5, price: 2000, icon: '👑', color: '#c084fc', glow: '#a855f7' },
    { name: 'Epic', maxStars: 5, price: 3000, icon: '💎', color: '#fb923c', glow: '#f97316' },
    { name: 'Legend', maxStars: 5, price: 5000, icon: '🔥', color: '#f87171', glow: '#ef4444' },
    { name: 'Mythic', maxStars: 26, price: 10000, icon: '⭐', color: '#22d3ee', glow: '#06b6d4' },
    { name: 'Mythic Honor', maxStars: 51, price: 15000, icon: '⭐', color: '#22d3ee', glow: '#06b6d4' },
    { name: 'Mythical Glory', maxStars: 101, price: 20000, icon: '🌟', color: '#facc15', glow: '#eab308' }
  ];

  const WA_NUMBER = '6281519547087';
  const REVIEW_STORAGE_KEY = 'radelstore_reviews';

  const defaultReviews = [
    { name: 'Andi', rating: 5, text: 'Joki mythic aman dan cepat banget! Akun gak diapa-apain sama sekali. Recommended banget!', date: '2025-01-10' },
    { name: 'Rina', rating: 5, text: 'Harga murah, proses cepat, dan admin ramah. Udah 3x order di sini, selalu puas!', date: '2025-01-08' },
    { name: 'Budi', rating: 4, text: 'Dari epic ke legend cuma 1 hari. Worth it banget. Tinggal sedikit lagi mythic!', date: '2024-12-29' },
    { name: 'Sari', rating: 5, text: 'Awalnya ragu, tapi setelah coba... WOW! Rank up sesuai target dan akun tetap aman. Top!', date: '2025-01-12' },
    { name: 'Dimas', rating: 4, text: 'Pelayanan oke, harga kompetitif. Proses agak lama di weekend tapi hasilnya memuaskan.', date: '2025-01-05' },
    { name: 'Wulan', rating: 5, text: 'Order legend ke mythic, selesai dalam 2 hari. Akun aman, gak ada masalah. Thanks Radelstore!', date: '2025-01-15' }
  ];

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const formatRupiah = value => `Rp ${Number(value || 0).toLocaleString('id-ID')}`;

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }

  /* =========================================================
     TOAST
     ========================================================= */
  let toastTimer = null;

  function showToast(message) {
    const toast = $('#toast');
    const toastMsg = $('#toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  /* =========================================================
     RANK CARDS
     ========================================================= */
  function renderRankCards() {
    const grid = $('#rankGrid');
    if (!grid) return;

    grid.innerHTML = ranks.map((rank, index) => `
      <div class="anim-up pre-anim rank-card p-5 rounded-2xl border border-white/5 bg-zinc-900/50"
           style="--glow:${rank.glow};">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-2xl" aria-hidden="true">${rank.icon}</span>
          <div>
            <h3 class="text-sm font-semibold" style="color:${rank.color};">${escapeHtml(rank.name)}</h3>
            <p class="text-[10px] text-zinc-600 mt-0.5">Maks. ${rank.maxStars} bintang untuk rank up</p>
          </div>
        </div>
        <div class="flex items-end justify-between">
          <div>
            <span class="text-[10px] text-zinc-600 uppercase tracking-wider">Per Bintang</span>
            <div class="text-xl font-bold text-white mt-0.5">${formatRupiah(rank.price)}</div>
          </div>
          <div class="text-amber-500/60 text-xs" aria-label="${index + 1} bintang">
            ${'★'.repeat(Math.min(index + 1, 5))}
          </div>
        </div>
      </div>
    `).join('');
  }

  /* =========================================================
     RANK SELECTS
     ========================================================= */
  function populateRankSelects() {
    ['currentRank', 'targetRank'].forEach(id => {
      const select = document.getElementById(id);
      if (!select) return;

      select.innerHTML = '<option value="">-- Pilih Rank --</option>';

      ranks.forEach((rank, index) => {
        const option = document.createElement('option');
        option.value = String(index);
        option.textContent = `${rank.icon} ${rank.name}`;
        select.appendChild(option);
      });
    });
  }

  function updateStars(type) {
    const rankId = type === 'current' ? 'currentRank' : 'targetRank';
    const starsId = type === 'current' ? 'currentStars' : 'targetStars';

    const rankSelect = document.getElementById(rankId);
    const starSelect = document.getElementById(starsId);
    if (!rankSelect || !starSelect) return;

    const rankIndex = Number.parseInt(rankSelect.value, 10);
    const isValidRank = Number.isInteger(rankIndex) && ranks[rankIndex];

    starSelect.innerHTML = '<option value="">-- Pilih --</option>';
    if (!isValidRank) return;

    const maxStars = ranks[rankIndex].maxStars;
    const start = type === 'current' ? 0 : 1;

    for (let stars = start; stars <= maxStars; stars += 1) {
      const option = document.createElement('option');
      option.value = String(stars);
      option.textContent = `${stars} ⭐${stars === maxStars && type === 'target' ? ' (Maks)' : ''}`;
      starSelect.appendChild(option);
    }
  }

  /* =========================================================
     PRICE CALCULATION
     ========================================================= */
  function getOrderValues() {
    const currentRank = Number.parseInt($('#currentRank')?.value, 10);
    const currentStars = Number.parseInt($('#currentStars')?.value, 10);
    const targetRank = Number.parseInt($('#targetRank')?.value, 10);
    const targetStars = Number.parseInt($('#targetStars')?.value, 10);

    return { currentRank, currentStars, targetRank, targetStars };
  }

  function calculatePrice() {
    const { currentRank, currentStars, targetRank, targetStars } = getOrderValues();
    const priceEl = $('#estimatedPrice');

    if (!priceEl) return 0;

    if (![currentRank, currentStars, targetRank, targetStars].every(Number.isInteger)) {
      priceEl.textContent = 'Rp 0';
      return 0;
    }

    if (currentRank > targetRank) {
      priceEl.textContent = '⚠️ Rank tujuan lebih rendah';
      return 0;
    }

    if (currentRank === targetRank && targetStars <= currentStars) {
      priceEl.textContent = '⚠️ Bintang tujuan harus lebih tinggi';
      return 0;
    }

    let total = 0;

    if (currentRank === targetRank) {
      total = (targetStars - currentStars) * ranks[currentRank].price;
    } else {
      total += (ranks[currentRank].maxStars - currentStars) * ranks[currentRank].price;

      for (let index = currentRank + 1; index < targetRank; index += 1) {
        total += ranks[index].maxStars * ranks[index].price;
      }

      total += targetStars * ranks[targetRank].price;
    }

    priceEl.textContent = formatRupiah(total);
    priceEl.classList.remove('price-pulse');
    void priceEl.offsetWidth;
    priceEl.classList.add('price-pulse');

    return total;
  }

  /* =========================================================
     WHATSAPP ORDER
     ========================================================= */
  function sendToWhatsApp() {
    const { currentRank, currentStars, targetRank, targetStars } = getOrderValues();

    const gameId = $('#gameId')?.value.trim() || '';
    const serverId = $('#serverId')?.value.trim() || '';
    const loginMethod = $('#loginMethod')?.value || '';
    const loginEmail = $('#loginEmail')?.value.trim() || '';
    const loginPassword = $('#loginPassword')?.value.trim() || '';
    const price = calculatePrice();

    if (![currentRank, currentStars, targetRank, targetStars].every(Number.isInteger)) {
      showToast('⚠️ Lengkapi info rank terlebih dahulu!');
      return;
    }

    if (!gameId || !serverId) {
      showToast('⚠️ ID Game dan Server ID wajib diisi!');
      return;
    }

    if (!loginMethod) {
      showToast('⚠️ Pilih metode login!');
      return;
    }

    if (!loginEmail || !loginPassword) {
      showToast('⚠️ Email dan password wajib diisi!');
      return;
    }

    if (price <= 0 || currentRank > targetRank ||
        (currentRank === targetRank && targetStars <= currentStars)) {
      showToast('⚠️ Estimasi harga tidak valid!');
      return;
    }

    const currentRankName = ranks[currentRank].name;
    const targetRankName = ranks[targetRank].name;

    const message = [
      '🛒 *ORDER JOKI MOBILE LEGENDS*',
      '🏪 *RADELSTORE*',
      '',
      '━━━━━━━━━━━━━━━━━━━',
      '',
      '⬇️ *RANK SAAT INI*',
      `▸ Rank: ${currentRankName}`,
      `▸ Bintang: ${currentStars} ⭐`,
      '',
      '⬆️ *RANK TUJUAN*',
      `▸ Rank: ${targetRankName}`,
      `▸ Bintang: ${targetStars} ⭐`,
      '',
      '━━━━━━━━━━━━━━━━━━━',
      '',
      '🎮 *DATA AKUN*',
      `▸ ID Game: ${gameId}`,
      `▸ Server ID: ${serverId}`,
      `▸ Metode Login: ${loginMethod}`,
      `▸ Email: ${loginEmail}`,
      `▸ Password: ${loginPassword}`,
      '',
      '━━━━━━━━━━━━━━━━━━━',
      '',
      '💰 *ESTIMASI HARGA*',
      `▸ Total: *${formatRupiah(price)}*`,
      '',
      '━━━━━━━━━━━━━━━━━━━',
      '',
      '⚡ _Saya ingin order joki dengan detail di atas. Silakan konfirmasi. Terima kasih!_ 🙏'
    ].join('\n');

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /* =========================================================
     REVIEWS
     ========================================================= */
  function getReviews() {
    try {
      const stored = localStorage.getItem(REVIEW_STORAGE_KEY);
      if (!stored) return [...defaultReviews];

      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [...defaultReviews];
    } catch {
      return [...defaultReviews];
    }
  }

  function saveReviews(reviews) {
    try {
      localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews));
      return true;
    } catch {
      showToast('⚠️ Review tidak dapat disimpan di browser ini.');
      return false;
    }
  }

  function renderReviews() {
    const list = $('#reviewsList');
    if (!list) return;

    const reviews = getReviews();

    list.innerHTML = reviews.map(review => {
      const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));
      const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
      const name = escapeHtml(review.name || 'Pelanggan');
      const reviewText = escapeHtml(review.text || '');
      const date = escapeHtml(review.date || '');

      return `
        <article class="anim-up pre-anim p-5 rounded-2xl border border-white/5 bg-zinc-900/50">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 rounded-full flex items-center justify-center text-black font-bold text-sm shrink-0"
                 style="background:linear-gradient(135deg,#f59e0b,#ea580c);">
              ${escapeHtml((review.name || 'P').charAt(0).toUpperCase())}
            </div>
            <div>
              <div class="text-sm font-semibold">${name}</div>
              <div class="text-xs text-amber-400" aria-label="Rating ${rating} dari 5">${stars}</div>
            </div>
          </div>
          <p class="text-sm text-zinc-400 font-light leading-relaxed">"${reviewText}"</p>
          <p class="text-[10px] text-zinc-700 mt-3">${date}</p>
        </article>
      `;
    }).join('');

    runObserver();
  }

  let selectedRating = 0;

  function setRating(value) {
    selectedRating = Number(value) || 0;

    $$('#starInput .star-btn').forEach((button, index) => {
      button.style.color = index < selectedRating ? '#f59e0b' : '#3f3f46';
      button.setAttribute('aria-pressed', index < selectedRating ? 'true' : 'false');
    });
  }

  function submitReview() {
    const name = $('#reviewName')?.value.trim() || '';
    const text = $('#reviewText')?.value.trim() || '';

    if (!name) {
      showToast('⚠️ Nama wajib diisi!');
      return;
    }

    if (selectedRating === 0) {
      showToast('⚠️ Pilih rating bintang!');
      return;
    }

    if (!text) {
      showToast('⚠️ Tulis review kamu!');
      return;
    }

    const reviews = getReviews();
    const today = new Date().toISOString().split('T')[0];

    reviews.unshift({
      name: name.slice(0, 50),
      rating: selectedRating,
      text: text.slice(0, 500),
      date: today
    });

    if (saveReviews(reviews)) {
      renderReviews();
      $('#reviewName').value = '';
      $('#reviewText').value = '';
      setRating(0);
      showToast('✅ Review berhasil ditambahkan!');
    }
  }

  /* =========================================================
     MOBILE MENU
     ========================================================= */
  let menuOpen = false;

  function setMenu(open) {
    menuOpen = Boolean(open);

    const menu = $('#mobileMenu');
    const button = $('#menuBtn');
    const b1 = $('#bar1');
    const b2 = $('#bar2');
    const b3 = $('#bar3');

    if (!menu || !button || !b1 || !b2 || !b3) return;

    menu.classList.toggle('open', menuOpen);
    button.setAttribute('aria-expanded', String(menuOpen));

    b1.style.transform = menuOpen ? 'rotate(45deg) translate(3px,3px)' : '';
    b2.style.opacity = menuOpen ? '0' : '1';
    b3.style.transform = menuOpen ? 'rotate(-45deg) translate(3px,-3px)' : '';
  }

  function closeMenu() {
    setMenu(false);
  }

  /* =========================================================
     SCROLL / NAVBAR
     ========================================================= */
  let ticking = false;

  function updateScrollUI() {
    const navbar = $('#navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);

    const sections = $$('section[id]');
    const links = $$('.nav-link');

    let current = '';
    const marker = window.scrollY + 180;

    sections.forEach(section => {
      if (marker >= section.offsetTop) current = section.id;
    });

    links.forEach(link => {
      const active = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('text-amber-400', active);
      link.classList.toggle('text-zinc-400', !active);
      link.setAttribute('aria-current', active ? 'page' : 'false');
    });

    ticking = false;
  }

  function requestScrollUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }

  /* =========================================================
     INTERSECTION OBSERVER
     ========================================================= */
  let revealObserver = null;

  function runObserver() {
    const elements = $$('.anim-up.pre-anim');

    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.remove('pre-anim'));
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('pre-anim');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      });
    }

    elements.forEach(element => revealObserver.observe(element));
  }

  /* =========================================================
     EVENT LISTENERS
     Tidak lagi memakai onclick/onchange inline di HTML.
     ========================================================= */
  function bindEvents() {
    $('#currentRank')?.addEventListener('change', () => {
      updateStars('current');
      calculatePrice();
    });

    $('#targetRank')?.addEventListener('change', () => {
      updateStars('target');
      calculatePrice();
    });

    $('#currentStars')?.addEventListener('change', calculatePrice);
    $('#targetStars')?.addEventListener('change', calculatePrice);

    $('#menuBtn')?.addEventListener('click', event => {
      event.stopPropagation();
      setMenu(!menuOpen);
    });

    $$('#mobileMenu a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', event => {
      if (menuOpen && !$('#navbar')?.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuOpen) closeMenu();
    });

    $('#submitOrderBtn')?.addEventListener('click', sendToWhatsApp);

    $$('#starInput .star-btn').forEach((button, index) => {
      button.addEventListener('click', () => setRating(index + 1));
    });

    $('#starInput')?.addEventListener('keydown', event => {
      const button = event.target.closest('.star-btn');
      if (!button) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        button.click();
      }
    });

    $('#reviewText')?.addEventListener('keydown', event => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        submitReview();
      }
    });

    $('#reviewName')?.addEventListener('keydown', event => {
      if (event.key === 'Enter') $('#reviewText')?.focus();
    });

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate);
  }

  /* =========================================================
     INIT
     ========================================================= */
  function init() {
    renderRankCards();
    populateRankSelects();
    renderReviews();
    setRating(0);
    bindEvents();
    runObserver();
    updateScrollUI();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
