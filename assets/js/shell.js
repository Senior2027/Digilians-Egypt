/**
 * NCC Shell — الشريط الجانبي وشريط الأدوات الموحد
 * يُضاف في جميع الصفحات الفرعية بعد app.js
 */
(function () {
  'use strict';

  /* ======= بنية القائمة ======= */
  const MENU = [
    {
      icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
      label: 'الرئيسية / داشبورد',
      href: 'index.html'
    },
    {
      icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/><path d="M14 15h4"/>',
      label: 'محفظتي الرقمية',
      href: 'wallet.html'
    },
    {
      icon: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
      label: 'وزارة الداخلية',
      href: 'interior.html',
      sub: [
        { label: 'المرور والمخالفات', href: 'interior.html' },
        { label: 'الجوازات والهجرة', href: 'passports.html' },
        { label: 'التجنيد والتعبئة', href: 'defense.html' }
      ]
    },
    {
      icon: '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.3.3 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>',
      label: 'وزارة الصحة',
      href: 'health.html'
    },
    {
      icon: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
      label: 'وزارة المالية',
      href: 'banks.html',
      sub: [
        { label: 'الحسابات البنكية', href: 'banks.html' },
        { label: 'الاستثمار والضرائب', href: 'finance.html' }
      ]
    },
    {
      icon: '<path d="M12 10v4M10 2h4M4 6l1.5 1.5M20 6l-1.5 1.5M2 12h2M20 12h2"/><circle cx="12" cy="14" r="4"/>',
      label: 'وزارة التعليم',
      href: 'edu-basic.html',
      sub: [
        { label: 'الشهادات الدراسية', href: 'edu-basic.html' },
        { label: 'نتائج الامتحانات', href: 'edu-exams.html' },
        { label: 'بكالوريوس / جامعي', href: 'uni-bachelor.html' },
        { label: 'ماجستير', href: 'uni-masters.html' },
        { label: 'دكتوراه', href: 'uni-phd.html' }
      ]
    },
    {
      icon: '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M9 15l6-6M15 3h6v6"/>',
      label: 'وزارة العدل',
      href: 'justice.html',
      sub: [
        { label: 'الشهر العقاري والتوثيق', href: 'justice.html' },
        { label: 'حصر الورثة', href: 'inheritance.html' }
      ]
    },
    {
      icon: '<path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3l-4 6M13 3l4 6M2 9h20"/>',
      label: 'وزارة التموين',
      href: 'supply.html'
    },
    {
      icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
      label: 'المرافق الذكية',
      href: 'utilities.html'
    }
  ];

  /* ======= تحديد الصفحة الحالية ======= */
  function currentPage() {
    return location.pathname.split('/').pop() || 'index.html';
  }

  function isActive(href) {
    return currentPage() === href;
  }

  function hasActiveSub(item) {
    return item.sub && item.sub.some(s => isActive(s.href));
  }

  /* ======= بناء SVG ======= */
  function svg(d, size) {
    size = size || 20;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  }

  /* ======= بناء HTML الشريط الجانبي ======= */
  function buildSidebar(user) {
    var items = MENU.map(function (item) {
      var active = isActive(item.href) || hasActiveSub(item);
      var hasSub = item.sub && item.sub.length;
      var subOpen = hasActiveSub(item) || isActive(item.href);

      var html = '<button class="sb-item' + (active ? ' active' : '') + '"' +
        (hasSub ? ' aria-expanded="' + (subOpen ? 'true' : 'false') + '" data-toggle' : '') +
        (!hasSub ? ' onclick="location.href=\'' + item.href + '\'"' : '') +
        ' type="button">' +
        svg(item.icon) +
        '<span>' + item.label + '</span>' +
        (hasSub ? svg('<polyline points="15 18 9 12 15 6"/>', 14) + '' : '') +
        '</button>';

      if (hasSub) {
        html += '<div class="sb-sub' + (subOpen ? ' open' : '') + '">';
        item.sub.forEach(function (s) {
          html += '<a href="' + s.href + '"' + (isActive(s.href) ? ' class="active"' : '') + '>' + s.label + '</a>';
        });
        html += '</div>';
      }

      return html;
    }).join('');

    var avatar = user && user.name ? user.name.trim().charAt(0) : '؟';
    var uName = user ? user.name : 'زائر';
    var uNid = user ? user.nid.slice(0, 6) + '****' + user.nid.slice(-2) : '';

    return '<aside class="side" id="nccSide" aria-label="القائمة الجانبية">' +
      '<a class="sb-brand" href="index.html">' +
      '<img src="assets/img/ncc-logo.svg" alt="NCC" onerror="this.style.display=\'none\'">' +
      '<span><b>المركز الوطني للتحكم</b><small>NCC — ID Egypt</small></span>' +
      '</a>' +
      '<nav>' + items + '</nav>' +
      '<div class="sb-user">' +
      '<div class="sb-avatar">' + avatar + '</div>' +
      '<div class="sb-uinfo"><b>' + uName + '</b>' + (uNid ? '<small>' + uNid + '</small>' : '') + '</div>' +
      '</div>' +
      '<button class="sb-item sb-out" type="button" id="sbLogout">' +
      svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>') +
      '<span>تسجيل الخروج</span>' +
      '</button>' +
      '</aside>';
  }

  /* ======= بناء شريط الأدوات العلوي ======= */
  function buildTopbar(title) {
    return '<header class="topbar" role="banner">' +
      '<button class="icon-btn topbar-menu" id="topMenu" type="button" aria-label="القائمة" aria-expanded="false" aria-controls="nccSide">' +
      svg('<path d="M3 12h18M3 6h18M3 18h18"/>') +
      '</button>' +
      '<h1 class="topbar-title">' + (title || 'المركز الوطني للتحكم') + '</h1>' +
      '<div class="topbar-tools" id="shellTools"></div>' +
      '</header>';
  }

  /* ======= تحديد عنوان الصفحة ======= */
  var PAGE_TITLES = {
    'index.html': 'الرئيسية',
    'wallet.html': 'المحفظة الرقمية',
    'interior.html': 'وزارة الداخلية',
    'passports.html': 'الجوازات والهجرة',
    'defense.html': 'التجنيد والقوات المسلحة',
    'health.html': 'وزارة الصحة',
    'banks.html': 'الحسابات البنكية',
    'finance.html': 'الاستثمار والضرائب',
    'edu-basic.html': 'التعليم قبل الجامعي',
    'edu-exams.html': 'نتائج الامتحانات',
    'uni-bachelor.html': 'الشهادة الجامعية',
    'uni-masters.html': 'الماجستير',
    'uni-phd.html': 'الدكتوراه',
    'justice.html': 'الشهر العقاري والعدل',
    'inheritance.html': 'حصر الورثة',
    'supply.html': 'وزارة التموين',
    'utilities.html': 'المرافق الذكية'
  };

  /* ======= تحديث شريط المسار (Breadcrumbs) ======= */
  function upgradeCrumbs() {
    var crumbs = document.querySelector('.crumbs');
    if (!crumbs) return;
    var html = crumbs.innerHTML;
    crumbs.className = 'crumbs ncc-crumbs';
    crumbs.innerHTML =
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' +
      html;
  }

  /* ======= الحاجب (Scrim) ======= */
  function buildScrim() {
    var d = document.createElement('div');
    d.id = 'nccScrim';
    d.className = 'scrim';
    d.setAttribute('aria-hidden', 'true');
    return d;
  }

  /* ======= نافذة التأكيد على الخروج ======= */
  function logout() {
    if (typeof ID !== 'undefined' && ID.confirm) {
      ID.confirm('تسجيل الخروج', 'هل تريد تسجيل الخروج من حسابك؟', 'خروج', true).then(function (ok) {
        if (ok) {
          if (typeof ID.logout === 'function') ID.logout();
          location.href = 'index.html';
        }
      });
    } else {
      location.href = 'index.html';
    }
  }

  /* ======= الدالة الرئيسية ======= */
  function initShell(user) {
    var page = currentPage();
    var title = PAGE_TITLES[page] || document.title;

    // إضافة class للجسم
    document.body.classList.add('shell');

    // بناء الهيكل
    var wrapper = document.createElement('div');
    wrapper.id = 'nccShellWrap';
    wrapper.innerHTML = buildSidebar(user) + buildTopbar(title);

    // إدراج في أول الجسم
    document.body.insertBefore(wrapper, document.body.firstChild);
    document.body.insertBefore(buildScrim(), wrapper.nextSibling);

    upgradeCrumbs();

    // إضافة ribbon إذا لم يكن موجوداً
    if (!document.querySelector('.demo-ribbon')) {
      var ribbon = document.createElement('div');
      ribbon.className = 'demo-ribbon';
      ribbon.textContent = 'نسخة تجريبية: جميع البيانات والوثائق افتراضية وليست مستندات رسمية.';
      document.body.insertBefore(ribbon, document.getElementById('nccShellWrap'));
    }

    // ربط الأحداث
    var side = document.getElementById('nccSide');
    var scrim = document.getElementById('nccScrim');
    var menuBtn = document.getElementById('topMenu');

    function openSide() {
      side.classList.add('open');
      scrim.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
    function closeSide() {
      side.classList.remove('open');
      scrim.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }

    menuBtn.addEventListener('click', function () {
      if (side.classList.contains('open')) closeSide(); else openSide();
    });
    scrim.addEventListener('click', closeSide);

    // Toggle القوائم الفرعية
    side.querySelectorAll('[data-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sub = btn.nextElementSibling;
        if (!sub) return;
        var open = sub.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });

    // تسجيل الخروج
    var logoutBtn = document.getElementById('sbLogout');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // tools slot
    var tools = document.getElementById('shellTools');
    if (tools && typeof ID !== 'undefined' && ID.tools) {
      tools.innerHTML = ID.tools();
      if (ID.bindTools) ID.bindTools();
    }
  }

  /* ======= نقطة الدخول — تُستدعى بعد app.js ======= */
  window.NCC = window.NCC || {};
  window.NCC.shell = function () {
    var user = null;
    if (typeof ID !== 'undefined' && ID.user) user = ID.user();
    initShell(user);
  };
})();
