//* Ой зря ты сюда полез

const iconMenu = document.querySelector('.icon-menu'),
      logoImgsB = document.querySelector('.logo__images--b'),
      logoImgsW = document.querySelector('.logo__images--w'),
      menu = document.querySelector('.menu'),
      header = document.querySelector('.header'),
      iconMenuInner = document.getElementById('icon-menu-inner');


function showMenu() {
  iconMenu.classList.toggle('_remove');
  iconMenuInner.classList.toggle('_active');
  menu.classList.toggle('_active');
  document.body.classList.toggle('_lock');
}

iconMenu.addEventListener("click", () => {
  showMenu();
  iconMenuInner.addEventListener("click", showMenu);
});


//* функция для показа хедера при скролле

var lastScrollTop = 0;
$(window).scroll(function(event){
  var st = $(this).scrollTop();
  if (st > lastScrollTop){
    header.classList.add('_scroll');
  } else {
    header.classList.remove('_scroll');
  }
  lastScrollTop = st;
});


//* swiper

var swiper = new Swiper(".swiper", {  
  direction: getDirection(),
  
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  loop: true,

  autoplay: {
    stopOnLastSlide: false,

  },

});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 992 ? 'horizontal' : 'vertical';

  return direction;
}



//* адаптивная высота для слайдера
// слайдеры 
const sliderSwiperAbout = document.querySelector('.swiper-about'),
      sliderSwiperPortfolio = document.querySelector('.swiper-portfolio');

// сам контент
const swiperContentPortfolio = document.querySelectorAll('.content-swiper-portfolio'),
      swiperContentAbout = document.querySelectorAll('.content-swiper-about');

// итоговая высота
let heightContAbout = 0,
    heightContPortfolio = 0;

// задаем высоту свайперам
const getSwiperHeight = () => {
  meterAboutHeight();
  meterPortfolioHeight();

  // добавляем отступ
  heightContAbout += 150;
  heightContPortfolio /= 1.9;

  if (window.innerWidth <= 767) {
    heightContAbout -= 150;
  }

  //задаем стили
  sliderSwiperAbout.style.height = `${heightContAbout}px`;
  sliderSwiperPortfolio.style.height = `${heightContPortfolio}px`;

}

// считаем выcоту about
const meterAboutHeight = () => {
  for (let j = 0; j < swiperContentAbout.length; j++) {
    for (let i = 0; i < swiperContentAbout[j].children.length; i++) {
      heightContAbout = 
        swiperContentAbout[j].children[i].clientHeight + swiperContentAbout[j].children[i].clientHeight;
    }
  }
}

// считаем выcоту portfolio
const meterPortfolioHeight = () => {
  for (let j = 0; j < swiperContentPortfolio.length; j++) {
    for (let i = 0; i < swiperContentPortfolio[j].children.length; i++) {
      heightContPortfolio = 
        swiperContentPortfolio[j].children[i].clientHeight + swiperContentPortfolio[j].children[i].clientHeight;
    }
  }
}

getSwiperHeight();

//* offer cards click

"use strict"

const offerKards = document.querySelectorAll('.offer__kard');
const kardsContainer = document.getElementById('kards-container');

for (let i = 0; i < offerKards.length; i++) {
  offerKards[i].addEventListener("click", function (event) {
    for (let j = 0; j < offerKards.length; j++) {
      offerKards[j].classList.remove('_active');
    }

    event.currentTarget.classList.add('_active');
  });
}

//* form ==============================================================

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('form');
  const formError = document.querySelector('.offer__error');
  const formOk = document.querySelector('.offer__ok');
  const returnBtns = document.querySelectorAll('.btn-return');

  form.addEventListener("submit", formSend);

  async function formSend (e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      document.body.classList.add('_lock-form');

      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });

      // задаем событие кнопкам для возврата
      returnBtns.forEach(item => {
        item.addEventListener("click", returnToHomePage);
      });

      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();

        form.classList.remove('_sending');
        formOk.classList.add('_active');

      } else {
        form.classList.remove('_sending');
        formError.classList.add('_active');
      }
    }
  }

  // функция для возврата на основную стр
  function returnToHomePage() {
    formOk.classList.remove('_active');
    formError.classList.remove('_active');
    document.body.classList.remove('_lock-form');
  }

  // валидация формы
  function formValidate (form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains('_input')) {
        if (input.value == '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }


  // добавляем уведомление о ошибке
  function formAddError (input) {
    input.classList.add('_error');
  }

  // удаляем ошибку
  function formRemoveError (input) {
    input.classList.remove('_error')
  }

  // проверяем на правильность емейл
  function emailTest (input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

});

//* споллер для футера =======================================================

if (window.innerWidth <= 992) {
  $(document).ready(function () {
    $('.footer__item-top').click(function (event) {
      if ($('.footer__item').hasClass('one')) {
        $('.footer__item-top').not($(this)).removeClass('_active');
        $('.footer__item-content').not($(this).next()).slideUp(300);
      }
  
      $(this).toggleClass('_active').next().slideToggle(300);
    });
  });
  
}




 /*
  const footerTitle = document.querySelectorAll('.footer__title');
  const footerText = document.querySelectorAll('.footer__text');

  footerTitle.forEach(title => {
    title.addEventListener("click", openSpoiler);
  });

  function openSpoiler (e) {
    for (let i = 0; i < footerTitle.length; i++) {
      if (footerTitle[i] != e.currentTarget) {
        footerText[i].classList.remove('_open');
      }
      if (footerTitle[i] == e.currentTarget) {
        footerText[i].classList.toggle('_open');
      }
    }
  }
  */

















