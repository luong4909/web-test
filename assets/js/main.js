/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.onclick = () => {
    navMenu.classList.add('show-menu');
  };
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.onclick = () => {
    navMenu.classList.remove('show-menu');
  };
}

/*==================== REMOVE MENU MOBILE WHEN CLICK LINK====================*/
const navLink = document.querySelectorAll('.nav__link');

// when we click on each nav__link, we remove show-menu class form nav-menu
navLink.forEach(
  (value) =>
    (value.onclick = () => {
      navMenu.classList.remove('show-menu');
    }),
);

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.querySelectorAll('.skills__content');
const skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkill() {
  let itemClass = this.parentNode.className;

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills__content skills-close';
  }

  if (itemClass === 'skills__content skills-close') {
    this.parentNode.className = 'skills__content skills-open';
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener('click', toggleSkill);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach((tab) =>
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove('qualification__active');
    });

    target.classList.add('qualification__active');

    tabs.forEach((tab) => tab.classList.remove('qualification__active'));
    tab.classList.add('qualification__active');
  }),
);

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal');
const modalBtns = document.querySelectorAll('.services__button');
const modalCloses = document.querySelectorAll('.services__modal-close');
const modalContents = document.querySelectorAll('.services__modal-content');

function openModal(modal) {
  modalViews[modal].classList.add('active-modal');
}

modalBtns.forEach((btn, index) => {
  btn.onclick = () => openModal(index);
});

modalCloses.forEach((close) => {
  close.onclick = () => {
    // for (let i = 0; i < modalViews.length; i++) {
    //   if ((modalViews[i].classList.value = 'services__modal active-modal')) {
    //     modalViews[i].classList.remove('active-modal');
    //   }
    // }
    modalViews.forEach((modal) => modal.classList.remove('active-modal'));
  };
});

modalContents.forEach((card) => {
  card.onclick = (e) => e.stopPropagation();
  card.parentNode.onclick = () => {
    modalViews.forEach((modal) => modal.classList.remove('active-modal'));
  };
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
  grabCursor: true,
  loop: true,
  spaceBetween: 48,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    clickable: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sectionIds = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sectionIds.forEach((sectionId) => {
    const sectionHeight = sectionId.offsetHeight;
    const sectionTop = sectionId.offsetTop - 50;
    sectionIdCurrent = sectionId.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav__menu a[href*=' + sectionIdCurrent + ']')
        .classList.add('active-link');
    } else {
      document
        .querySelector('.nav__menu a[href*=' + sectionIdCurrent + ']')
        .classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById('header');

  if (this.scrollY > 80) nav.classList.add('scroll-header');
  else nav.classList.remove('scroll-header');
}

window.onscroll = scrollHeader;

/*==================== SHOW SCROLL UP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById('scroll-top');

  if (this.scrollY > 560) scrollTop.classList.add('show-scroll');
  else scrollTop.classList.remove('show-scroll');
}

window.onscroll = scrollTop;

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('change-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme,
  );
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](
    iconTheme,
  );
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});
