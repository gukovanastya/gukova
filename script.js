// === ДАННЫЕ УСЛУГ ===
const SERVICES = [
  {
    tag: 'Дома',
    title: 'Семейная репортажная съёмка',
    text: 'Прихожу к вам домой на 1–1,5 часа. Никакого сценария — просто ваш обычный день. Завтрак, игры, обнимашки, споры. Всё это и есть ваша семья.',
  },
  {
    tag: 'Дома',
    title: 'Беременность',
    text: 'Это очень личный период, и я стараюсь снимать его именно так — тихо, уютно, без лишнего пафоса. Лучше всего дома, в привычном пространстве.',
  },
  {
    tag: 'Студия / Дом',
    title: 'Женский портрет',
    text: 'Иногда снимаю в студии — когда нужен контролируемый свет. Но чаще предпочитаю естественную среду. Главное — чтобы вам было комфортно.',
  },
];

// === ДАННЫЕ FAQ ===
const FAQ = [
  {
    q: 'Как проходит съёмка?',
    a: 'Я прихожу к вам домой или встречаюсь с вами на прогулке. Мы знакомимся, я объясняю, что буду делать. Иногда подсказываю по ходу — «обнимитесь», «пощекочите друг друга». Иногда просто снимаю то, что происходит само.',
  },
  {
    q: 'Нужно ли убирать квартиру?',
    a: 'Нет. Беспорядок — это тоже жизнь. Разбросанные игрушки, немытая посуда после завтрака — всё это часть вашей истории. Не прячьте её.',
  },
  {
    q: 'Сколько длится съёмка?',
    a: 'Обычно 1–1,5 часа. Этого времени достаточно, чтобы все расслабились и забыли о камере.',
  },
  {
    q: 'Когда я получу фотографии?',
    a: 'Готовая галерея — в течение 14 дней после съёмки.',
  },
  {
    q: 'Что если ребёнок будет плакать?',
    a: 'Это нормально. Я подожду, дам ему время. И, возможно, именно этот кадр станет самым тёплым — потому что он настоящий.',
  },
  {
    q: 'Вы выезжаете за город?',
    a: 'Да, выезжаю по Краснодару и краю. Условия выезда обсудим в переписке.',
  },
];

// === РЕНДЕР ПОРТФОЛИО ===
function renderPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;

  if (typeof PORTFOLIO === 'undefined') {
    console.warn('PORTFOLIO не найден — проверьте portfolio.js');
    return;
  }

  grid.innerHTML = PORTFOLIO.map((photo) => {
    const cls = photo.tall
      ? 'portfolio__item portfolio__item--tall'
      : 'portfolio__item';
    return `
      <div class="${cls}">
        <img src="${photo.src}" alt="${photo.alt}" loading="lazy" />
      </div>
    `;
  }).join('');
}

// === РЕНДЕР УСЛУГ ===
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  grid.innerHTML = SERVICES.map((s) => `
    <article class="service-card">
      <span class="service-card__tag">${s.tag}</span>
      <h3 class="service-card__title">${s.title}</h3>
      <p class="service-card__text">${s.text}</p>
    </article>
  `).join('');
}

// === РЕНДЕР FAQ ===
function renderFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;

  list.innerHTML = FAQ.map((item, i) => `
    <div class="faq__item" data-index="${i}">
      <button class="faq__question" type="button">
        <span>${item.q}</span>
        <span class="faq__icon">+</span>
      </button>
      <div class="faq__answer">${item.a}</div>
    </div>
  `).join('');

  list.querySelectorAll('.faq__question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('is-open');

      list.querySelectorAll('.faq__item').forEach((el) => {
        el.classList.remove('is-open');
        const icon = el.querySelector('.faq__icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('is-open');
        const icon = item.querySelector('.faq__icon');
        if (icon) icon.textContent = '−';
      }
    });
  });
}

// === МОБИЛЬНОЕ МЕНЮ ===
function initBurger() {
  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    links.classList.toggle('is-open');
  });

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      burger.classList.remove('is-open');
      links.classList.remove('is-open');
    });
  });
}

// === ПЛАВНОЕ ПОЯВЛЕНИЕ ===
function initReveal() {
  const targets = document.querySelectorAll('.section, .portfolio__item');
  if (!('IntersectionObserver' in window)) return;

  targets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
}

// === ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio();
  renderServices();
  renderFAQ();
  initBurger();
  initReveal();
});