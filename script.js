// 見出し・キャッチコピーを1行に収める(画面幅に応じて自動縮小)
function fitToOneLine(el) {
  if (!el) return;
  el.style.fontSize = '';
  const parent = el.parentElement;
  const parentStyle = getComputedStyle(parent);
  const paddingLeft = parseFloat(parentStyle.paddingLeft) || 0;
  const paddingRight = parseFloat(parentStyle.paddingRight) || 0;
  const maxWidth = parent.clientWidth - paddingLeft - paddingRight;
  const textWidth = el.scrollWidth;
  if (textWidth > maxWidth) {
    const baseSize = parseFloat(getComputedStyle(el).fontSize);
    const ratio = maxWidth / textWidth;
    el.style.fontSize = (baseSize * ratio * 0.96) + 'px';
  }
}

function fitHeroText() {
  const heroTitle = document.getElementById('heroTitle');
  const heroCopy = document.getElementById('heroCopy');
  const aboutTitle = document.getElementById('aboutTitle');
  const isMobile = window.innerWidth <= 720;

  // 会社名は画面幅に関わらず1行に収まるよう自動縮小
  fitToOneLine(heroTitle);
  fitToOneLine(aboutTitle);

  // キャッチフレーズはPCでは1行、スマホでは手動の改行位置で折り返す
  if (isMobile) {
    if (heroCopy) heroCopy.style.fontSize = '';
  } else {
    fitToOneLine(heroCopy);
  }
}

fitHeroText();
window.addEventListener('resize', () => {
  window.requestAnimationFrame(fitHeroText);
});
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fitHeroText);
}

// ヘッダーのスクロール状態
const header = document.getElementById('siteHeader');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('is-scrolled');
  else header.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// モバイルメニュー
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  navToggle.classList.toggle('is-active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// スクロールで要素をフェードイン
const revealTargets = document.querySelectorAll(
  '.service-card, .work-card, .price-card, .about-grid, .section-head'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => observer.observe(el));

// 開幕演出(絞り羽根)を一定時間後にDOMから外し、操作の邪魔にならないようにする
const irisIntro = document.getElementById('irisIntro');
if (irisIntro) {
  setTimeout(() => {
    irisIntro.style.display = 'none';
  }, 1600);
}
