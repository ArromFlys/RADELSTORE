
    /* ── RANK DATA ── */
    const ranks = [
      { name: 'Warrior III', tier: 'Warrior', division: 'III', maxStars: 3, price: 500, color: '#a1a1aa', glow: '#71717a' },
      { name: 'Warrior II', tier: 'Warrior', division: 'II', maxStars: 3, price: 500, color: '#a1a1aa', glow: '#71717a' },
      { name: 'Warrior I', tier: 'Warrior', division: 'I', maxStars: 3, price: 500, color: '#a1a1aa', glow: '#71717a' },
      { name: 'Elite III', tier: 'Elite', division: 'III', maxStars: 4, price: 750, color: '#4ade80', glow: '#22c55e' },
      { name: 'Elite II', tier: 'Elite', division: 'II', maxStars: 4, price: 750, color: '#4ade80', glow: '#22c55e' },
      { name: 'Elite I', tier: 'Elite', division: 'I', maxStars: 4, price: 750, color: '#4ade80', glow: '#22c55e' },
      { name: 'Master IV', tier: 'Master', division: 'IV', maxStars: 4, price: 1500, color: '#60a5fa', glow: '#3b82f6' },
      { name: 'Master III', tier: 'Master', division: 'III', maxStars: 4, price: 1500, color: '#60a5fa', glow: '#3b82f6' },
      { name: 'Master II', tier: 'Master', division: 'II', maxStars: 4, price: 1500, color: '#60a5fa', glow: '#3b82f6' },
      { name: 'Master I', tier: 'Master', division: 'I', maxStars: 4, price: 1500, color: '#60a5fa', glow: '#3b82f6' },
      { name: 'Grandmaster V', tier: 'Grandmaster', division: 'V', maxStars: 5, price: 2000, color: '#c084fc', glow: '#a855f7' },
      { name: 'Grandmaster IV', tier: 'Grandmaster', division: 'IV', maxStars: 5, price: 2000, color: '#c084fc', glow: '#a855f7' },
      { name: 'Grandmaster III', tier: 'Grandmaster', division: 'III', maxStars: 5, price: 2000, color: '#c084fc', glow: '#a855f7' },
      { name: 'Grandmaster II', tier: 'Grandmaster', division: 'II', maxStars: 5, price: 2000, color: '#c084fc', glow: '#a855f7' },
      { name: 'Grandmaster I', tier: 'Grandmaster', division: 'I', maxStars: 5, price: 2000, color: '#c084fc', glow: '#a855f7' },
      { name: 'Epic V', tier: 'Epic', division: 'V', maxStars: 5, price: 3000, color: '#fb923c', glow: '#f97316' },
      { name: 'Epic IV', tier: 'Epic', division: 'IV', maxStars: 5, price: 3000, color: '#fb923c', glow: '#f97316' },
      { name: 'Epic III', tier: 'Epic', division: 'III', maxStars: 5, price: 3000, color: '#fb923c', glow: '#f97316' },
      { name: 'Epic II', tier: 'Epic', division: 'II', maxStars: 5, price: 3000, color: '#fb923c', glow: '#f97316' },
      { name: 'Epic I', tier: 'Epic', division: 'I', maxStars: 5, price: 3000, color: '#fb923c', glow: '#f97316' },
      { name: 'Legend V', tier: 'Legend', division: 'V', maxStars: 5, price: 5000, color: '#f87171', glow: '#ef4444' },
      { name: 'Legend IV', tier: 'Legend', division: 'IV', maxStars: 5, price: 5000, color: '#f87171', glow: '#ef4444' },
      { name: 'Legend III', tier: 'Legend', division: 'III', maxStars: 5, price: 5000, color: '#f87171', glow: '#ef4444' },
      { name: 'Legend II', tier: 'Legend', division: 'II', maxStars: 5, price: 5000, color: '#f87171', glow: '#ef4444' },
      { name: 'Legend I', tier: 'Legend', division: 'I', maxStars: 5, price: 5000, color: '#f87171', glow: '#ef4444' },
      { name: 'Mythic', tier: 'Mythic', division: '', maxStars: 25, price: 10000, color: '#22d3ee', glow: '#06b6d4' },
      { name: 'Mythical Honor', tier: 'Mythical Honor', division: '', maxStars: 25, price: 15000, color: '#22d3ee', glow: '#06b6d4' },
      { name: 'Mythical Glory', tier: 'Mythical Glory', division: '', maxStars: 50, price: 20000, color: '#facc15', glow: '#eab308' },
      { name: 'Mythical Immortal', tier: 'Mythical Immortal', division: '', maxStars: 100, price: 25000, color: '#facc15', glow: '#eab308' },
    ];

    function rankEmblem(tier) {
      // Emblem SVG bergaya medali fantasy, dibuat khusus untuk website (bukan aset resmi game).
      const themes = {
        Warrior: ['#f0c98e','#68452a','#2c211b','#d7b27a'],
        Elite: ['#d9e9f7','#354d66','#182331','#a8c8e8'],
        Master: ['#ffe7a1','#9b6a20','#382714','#f7c85e'],
        Grandmaster: ['#e5f3ff','#52738f','#1d2b3d','#8dbbe3'],
        Epic: ['#7be8cf','#176d68','#102e31','#2abca7'],
        Legend: ['#fff0b0','#9c6a20','#4a3013','#f4c65c'],
        Mythic: ['#f5d5ff','#8d3bc5','#311449','#ce83f4'],
        'Mythical Honor': ['#d8f3ff','#2877bd','#102b4c','#6ed2ff'],
        'Mythical Glory': ['#ffe4a1','#b65a24','#4b2114','#ff9b4a'],
        'Mythical Immortal': ['#f5d8ff','#8633b5','#32134a','#d58aff']
      };
      const c = themes[tier] || themes.Warrior;
      const id = 'emblem-' + tier.replace(/[^a-z]/gi, '');
      return '<svg class="rank-emblem" viewBox="0 0 100 112" role="img" aria-label="Emblem rank ' + tier + '">' +
        '<defs>' +
          '<linearGradient id="' + id + '-metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="' + c[0] + '"/><stop offset=".48" stop-color="' + c[1] + '"/><stop offset="1" stop-color="' + c[3] + '"/></linearGradient>' +
          '<linearGradient id="' + id + '-inner" x1="0" y1="0" x2="0.8" y2="1"><stop stop-color="' + c[0] + '"/><stop offset=".5" stop-color="' + c[1] + '"/><stop offset="1" stop-color="' + c[2] + '"/></linearGradient>' +
          '<filter id="' + id + '-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-color="#000" flood-opacity=".7"/></filter>' +
        '</defs>' +
        '<g filter="url(#' + id + '-shadow)" stroke-linejoin="round">' +
          '<path d="M50 4 L62 18 L80 14 L78 33 L94 45 L82 59 L79 78 L64 83 L50 105 L36 83 L21 78 L18 59 L6 45 L22 33 L20 14 L38 18 Z" fill="url(#' + id + '-metal)" stroke="' + c[0] + '" stroke-width="2.4"/>' +
          '<path d="M50 13 L61 27 L75 24 L71 40 L84 47 L73 59 L69 73 L58 77 L50 93 L42 77 L31 73 L27 59 L16 47 L29 40 L25 24 L39 27 Z" fill="url(#' + id + '-inner)" stroke="' + c[2] + '" stroke-width="2"/>' +
          '<path d="M50 18 L57 36 L74 43 L61 54 L58 72 L50 64 L42 72 L39 54 L26 43 L43 36 Z" fill="' + c[0] + '" stroke="' + c[3] + '" stroke-width="1.5"/>' +
          '<path d="M50 29 L55 42 L67 47 L55 52 L50 65 L45 52 L33 47 L45 42 Z" fill="' + c[1] + '" stroke="' + c[0] + '" stroke-width="1.5"/>' +
          '<path d="M31 17 L38 30 L28 35 M69 17 L62 30 L72 35 M28 62 L38 69 L36 79 M72 62 L62 69 L64 79" fill="none" stroke="' + c[0] + '" stroke-width="2" opacity=".9"/>' +
          '<path d="M50 7 L50 18 M10 45 L23 48 M90 45 L77 48 M50 88 L50 99" stroke="#fff" stroke-opacity=".65" stroke-width="1.5"/>' +
        '</g></svg>';
    }

    /* ── GANTI NOMOR WA DI SINI ── */
    const WA_NUMBER = '6281519547087';

    /* ── POPULATE RANK SELECTS ── */
    function renderRankCards() {
      var grid = document.getElementById('rankGrid');
      if (!grid) return;
      var tiers = [];
      ranks.forEach(function(r) {
        var tier = r.tier || r.name.replace(/\s+(III|II|IV|V|I)$/, '');
        if (!tiers.some(function(item) { return item.name === tier; })) tiers.push({ name: tier, rank: r });
      });
      grid.innerHTML = tiers.map(function(item) {
        var r = item.rank;
        return '<div class="rank-card rounded-2xl border border-white/10 bg-zinc-900/60" style="--glow:' + (r.glow || r.color || '#f59e0b') + ';--rank-color:' + (r.color || '#f59e0b') + ';">' +
          '<div class="rank-emblem-wrap">' + rankEmblem(item.name) + '</div>' +
          '<div class="rank-nameplate"><h3>' + item.name + '</h3></div>' +
          '<span class="rank-price-label">PER BINTANG</span>' +
          '<div class="rank-price">Rp ' + Number(r.price || 0).toLocaleString('id-ID') + '</div></div>';
      }).join('');
    }

    function populateRankSelects() {
      var selectors = ['currentRank', 'targetRank'];
      selectors.forEach(function(id) {
        var sel = document.getElementById(id);
        if (!sel) return;
        ranks.forEach(function(r, i) {
          var opt = document.createElement('option');
          opt.value = i;
          opt.textContent = r.name;
          sel.appendChild(opt);
        });
      });
    }

    /* ── UPDATE STARS ── */
    function updateStars(type) {
      var rankSel = document.getElementById(type === 'current' ? 'currentRank' : 'targetRank');
      var starSel = document.getElementById(type === 'current' ? 'currentStars' : 'targetStars');
      var rankIdx = parseInt(rankSel.value);

      starSel.innerHTML = '<option value="">-- Pilih --</option>';

      if (!isNaN(rankIdx) && ranks[rankIdx]) {
        var max = ranks[rankIdx].maxStars;
        if (type === 'current') {
          for (var s = 0; s <= max; s++) {
            var opt = document.createElement('option');
            opt.value = s;
            opt.textContent = s + ' bintang';
            starSel.appendChild(opt);
          }
        } else {
          for (var s = 1; s <= max; s++) {
            var opt = document.createElement('option');
            opt.value = s;
            opt.textContent = s + ' bintang' + (s === max ? ' (Maks)' : '');
            starSel.appendChild(opt);
          }
        }
      }
    }

    /* ── CALCULATE PRICE ── */
    function calcPrice() {
      var cRank = parseInt(document.getElementById('currentRank').value);
      var cStars = parseInt(document.getElementById('currentStars').value);
      var tRank = parseInt(document.getElementById('targetRank').value);
      var tStars = parseInt(document.getElementById('targetStars').value);
      var priceEl = document.getElementById('estimatedPrice');
      var total = 0;

      if (isNaN(cRank) || isNaN(cStars) || isNaN(tRank) || isNaN(tStars)) {
        priceEl.textContent = 'Rp 0';
        return 0;
      }
      if (cRank > tRank) {
        priceEl.textContent = '⚠️ Rank tujuan lebih rendah';
        return 0;
      }
      if (cRank === tRank && tStars <= cStars) {
        priceEl.textContent = '⚠️ Bintang tujuan harus lebih tinggi';
        return 0;
      }

      if (cRank === tRank) {
        total = (tStars - cStars) * ranks[cRank].price;
      } else {
        total += (ranks[cRank].maxStars - cStars) * ranks[cRank].price;
        for (var i = cRank + 1; i < tRank; i++) {
          total += ranks[i].maxStars * ranks[i].price;
        }
        total += tStars * ranks[tRank].price;
      }

      priceEl.textContent = 'Rp ' + total.toLocaleString('id-ID');
      priceEl.classList.remove('price-pulse');
      void priceEl.offsetWidth;
      priceEl.classList.add('price-pulse');
      return total;
    }

    /* ── SEND TO WHATSAPP ── */
    function sendToWhatsApp() {
      var cRank = document.getElementById('currentRank').value;
      var cStars = document.getElementById('currentStars').value;
      var tRank = document.getElementById('targetRank').value;
      var tStars = document.getElementById('targetStars').value;
      var gameId = document.getElementById('gameId').value.trim();
      var serverId = document.getElementById('serverId').value.trim();
      var loginMethod = document.getElementById('loginMethod').value;
      var loginEmail = document.getElementById('loginEmail').value.trim();
      var loginPassword = document.getElementById('loginPassword').value.trim();
      var price = calcPrice();

      if (cRank === '' || cStars === '' || tRank === '' || tStars === '') { showToast('⚠️ Lengkapi info rank terlebih dahulu!'); return; }
      if (!gameId || !serverId) { showToast('⚠️ ID Game dan Server ID wajib diisi!'); return; }
      if (!loginMethod) { showToast('⚠️ Pilih metode login!'); return; }
      if (!loginEmail || !loginPassword) { showToast('⚠️ Email dan password wajib diisi!'); return; }
      if (price <= 0) { showToast('⚠️ Estimasi harga tidak valid!'); return; }

      var crName = ranks[parseInt(cRank)].name;
      var trName = ranks[parseInt(tRank)].name;

      var msg =
        '🛒 *ORDER JOKI MOBILE LEGENDS*\n' +
        '🏪 *RADELSTORE*\n\n' +
        '━━━━━━━━━━━━━━━━━━━\n\n' +
        '⬇️ *RANK SAAT INI*\n' +
        '▸ Rank: ' + crName + '\n' +
        '▸ Bintang: ' + cStars + ' ⭐\n\n' +
        '⬆️ *RANK TUJUAN*\n' +
        '▸ Rank: ' + trName + '\n' +
        '▸ Bintang: ' + tStars + ' ⭐\n\n' +
        '━━━━━━━━━━━━━━━━━━━\n\n' +
        '🎮 *DATA AKUN*\n' +
        '▸ ID Game: ' + gameId + '\n' +
        '▸ Server ID: ' + serverId + '\n' +
        '▸ Metode Login: ' + loginMethod + '\n' +
        '▸ Email: ' + loginEmail + '\n' +
        '▸ Password: ' + loginPassword + '\n\n' +
        '━━━━━━━━━━━━━━━━━━━\n\n' +
        '💰 *ESTIMASI HARGA*\n' +
        '▸ Total: *Rp ' + price.toLocaleString('id-ID') + '*\n\n' +
        '━━━━━━━━━━━━━━━━━━━\n\n' +
        '⚡ _Saya ingin order joki dengan detail di atas. Silakan konfirmasi. Terima kasih!_ 🙏';

      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
    }

    /* ── REVIEWS ── */
    var defaultReviews = [
      { name: 'Andi',  rating: 5, text: 'Joki mythic aman dan cepat banget! Akun gak diapa-apain sama sekali. Recommended banget!', date: '2025-01-10' },
      { name: 'Rina',  rating: 5, text: 'Harga murah, proses cepat, dan admin ramah. Udah 3x order di sini, selalu puas!', date: '2025-01-08' },
      { name: 'Budi',  rating: 4, text: 'Dari epic ke legend cuma 1 hari. Worth it banget. Tinggal sedikit lagi mythic!', date: '2024-12-29' },
      { name: 'Sari',  rating: 5, text: 'Awalnya ragu, tapi setelah coba... WOW! Rank up sesuai target dan akun tetap aman. Top!', date: '2025-01-12' },
      { name: 'Dimas', rating: 4, text: 'Pelayanan oke, harga kompetitif. Proses agak lama di weekend tapi hasilnya memuaskan.', date: '2025-01-05' },
      { name: 'Wulan', rating: 5, text: 'Order legend ke mythic, selesai dalam 2 hari. Akun aman, gak ada masalah. Thanks Radelstore!', date: '2025-01-15' },
    ];

    function getReviews() {
      try {
        var stored = localStorage.getItem('radelstore_reviews');
        return stored ? JSON.parse(stored) : defaultReviews;
      } catch(e) { return defaultReviews; }
    }

    function saveReviews(reviews) {
      try { localStorage.setItem('radelstore_reviews', JSON.stringify(reviews)); } catch(e) {}
    }

    function renderReviews() {
      var list = document.getElementById('reviewsList');
      if (!list) return;
      var reviews = getReviews();
      var html = '';
      reviews.forEach(function(r, i) {
        var stars = '';
        for (var j = 0; j < 5; j++) stars += j < r.rating ? '★' : '☆';
        html += '<div class="anim-up pre-anim p-5 rounded-2xl border border-white/5 bg-zinc-900/50">' +
          '<div class="flex items-center gap-3 mb-3">' +
            '<div class="w-9 h-9 rounded-full flex items-center justify-center text-black font-bold text-sm shrink-0" style="background:linear-gradient(135deg,#f59e0b,#ea580c);">' +
              r.name.charAt(0).toUpperCase() +
            '</div>' +
            '<div>' +
              '<div class="text-sm font-semibold">' + r.name + '</div>' +
              '<div class="text-xs text-amber-400">' + stars + '</div>' +
            '</div>' +
          '</div>' +
          '<p class="text-sm text-zinc-400 font-light leading-relaxed">"' + r.text + '"</p>' +
          '<p class="text-[10px] text-zinc-700 mt-3">' + r.date + '</p>' +
        '</div>';
      });
      list.innerHTML = html;
      runObserver();
    }

    /* ── RATING INPUT ── */
    var selectedRating = 0;
    function setRating(val) {
      selectedRating = val;
      var btns = document.querySelectorAll('#starInput .star-btn');
      btns.forEach(function(btn, i) {
        btn.style.color = i < val ? '#f59e0b' : '#3f3f46';
      });
    }

    function submitReview() {
      var name = document.getElementById('reviewName').value.trim();
      var text = document.getElementById('reviewText').value.trim();
      if (!name) { showToast('⚠️ Nama wajib diisi!'); return; }
      if (selectedRating === 0) { showToast('⚠️ Pilih rating bintang!'); return; }
      if (!text) { showToast('⚠️ Tulis review kamu!'); return; }
      var reviews = getReviews();
      var today = new Date().toISOString().split('T')[0];
      reviews.unshift({ name: name, rating: selectedRating, text: text, date: today });
      saveReviews(reviews);
      renderReviews();
      document.getElementById('reviewName').value = '';
      document.getElementById('reviewText').value = '';
      setRating(0);
      showToast('✅ Review berhasil ditambahkan!');
    }

    /* ── MOBILE MENU ── */
    var menuOpen = false;
    function toggleMenu() {
      menuOpen = !menuOpen;
      var menu = document.getElementById('mobileMenu');
      var b1 = document.getElementById('bar1');
      var b2 = document.getElementById('bar2');
      var b3 = document.getElementById('bar3');
      if (menuOpen) {
        menu.classList.add('open');
        b1.style.transform = 'rotate(45deg) translate(3px,3px)';
        b2.style.opacity = '0';
        b3.style.transform = 'rotate(-45deg) translate(3px,-3px)';
      } else {
        menu.classList.remove('open');
        b1.style.transform = '';
        b2.style.opacity = '1';
        b3.style.transform = '';
      }
    }
    function closeMenu() {
      menuOpen = false;
      document.getElementById('mobileMenu').classList.remove('open');
      document.getElementById('bar1').style.transform = '';
      document.getElementById('bar2').style.opacity = '1';
      document.getElementById('bar3').style.transform = '';
    }
    document.addEventListener('click', function(e) {
      if (menuOpen) {
        var nav = document.getElementById('navbar');
        if (!nav.contains(e.target)) closeMenu();
      }
    });

    /* ── TOAST ── */
    var toastTimer = null;
    function showToast(msg) {
      var t = document.getElementById('toast');
      document.getElementById('toastMsg').textContent = msg;
      t.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function() { t.classList.remove('show'); }, 3000);
    }

    /* ── NAVBAR SCROLL ── */
    window.addEventListener('scroll', function() {
      var nav = document.getElementById('navbar');
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });

    /* ── ACTIVE NAV LINK ── */
    window.addEventListener('scroll', function() {
      var sections = document.querySelectorAll('section[id]');
      var links = document.querySelectorAll('.nav-link');
      var current = '';
      sections.forEach(function(s) {
        if (window.scrollY >= s.offsetTop - 300) current = s.id;
      });
      links.forEach(function(link) {
        var href = link.getAttribute('href');
        if (href && href.substring(1) === current) {
          link.classList.remove('text-zinc-400');
          link.classList.add('text-amber-400');
        } else {
          link.classList.add('text-zinc-400');
          link.classList.remove('text-amber-400');
        }
      });
    });

    /* ── INTERSECTION OBSERVER ── */
    function runObserver() {
      var elems = document.querySelectorAll('.anim-up.pre-anim');
      if (!('IntersectionObserver' in window)) {
        elems.forEach(function(el) { el.classList.remove('pre-anim'); });
        return;
      }
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('pre-anim');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
      elems.forEach(function(el) { observer.observe(el); });
    }

    /* ── INIT ── */
    renderRankCards();
    populateRankSelects();
    renderReviews();
    runObserver();
  