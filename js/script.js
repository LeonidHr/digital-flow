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

      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();

        form.classList.remove('_sending');
        document.body.classList.remove('_lock-form');
      } else {
        alert('Ошибка!');
        form.classList.remove('_sending');
        document.body.classList.remove('_lock-form');
      }

    } else {
      alert('Заполните указанные поля!');
    }

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

























