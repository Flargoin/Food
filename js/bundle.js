/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {

// Calculator

const result = document.querySelector('.calculating__result span'); // Получаем спан в котором будет выводится спан

let sex, height, weight, age, ratio;                                // Получаем все необходимые переменные для расчёта

if(localStorage.getItem('sex')) {
  sex = localStorage.getItem('sex');
} else {
  sex = 'female';
  localStorage.setItem('sex', 'female');
}

if(localStorage.getItem('ratio')) {
  ratio = localStorage.getItem('ratio');
} else {
  ratio = 1.375;
  localStorage.setItem('ratio', 1.375);
}

function initLocalSettings(selector, activeClass) {                             // Эта функция сверяет данные localStorage c дефолтными или введёнными пользователем
  const elements = document.querySelectorAll(selector);

  elements.forEach(elem => {
    elem.classList.remove(activeClass);
    if(elem.getAttribute('id') === localStorage.getItem('sex')) {
      elem.classList.add(activeClass);
    }

    if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
      elem.classList.add(activeClass);
    }
  });
}

initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

function calcTotal() {                                              // Функция для рассчёта (будет вызываться каждый раз когда что меняется)
  if (!sex || !height || !weight || !age || !ratio) {               // Проверяем заполнены ли поля (если не заполнены, результат выведен не будет)
      result.textContent = '0';
      return;
  }

  if (sex === 'female') {
    result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);     // формула жен.
  } else {
    result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);    // формула муж
  }
}

calcTotal();

function getStaticInfo(selector, activeClass) {
  const elements =document.querySelectorAll(selector);

  elements.forEach(elem => {
    elem.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-ratio')) {                                                // Работаем с значениям атрибутов
        ratio = +e.target.getAttribute('data-ratio');                                           // Получаем значение из дата-атрибута в вёрстке
        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
      } else {                                                                                  // Работаем с id
        sex = e.target.getAttribute('id');
        localStorage.setItem('sex', e.target.getAttribute('id'));
      }
  
      elements.forEach(elem => {                                                                // Удаление и назначение активного класса
        elem.classList.remove(activeClass);
      });
      e.target.classList.add(activeClass);
  
      calcTotal();
    });
  });
}

getStaticInfo('#gender div', 'calculating__choose-item_active');
getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

function getDinamicInfo(selector) {                                                           // Функция в которой получаем данные со страницы в виде строки переводим в числа
  const input = document.querySelector(selector);

  input.addEventListener('input', () => {

    if(input.value.match(/\D/g)) {                                                            // Если пользователь вводит не числа, границы окрасятся в красный
      input.style.border = '1px solid red';
    } else {
      input.style.border = 'none';
    }

    switch(input.getAttribute('id')) {
      case 'height':
        height = +input.value;
        break;
      case 'weight':
        weight = +input.value;
        break;
      case 'age':
        age = +input.value;
        break;
    }

    calcTotal();
  });
}

getDinamicInfo('#height');
getDinamicInfo('#weight');
getDinamicInfo('#age');

}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    // Классы для карточек

    class MenuCard {                                                              // Создаём экземпляр класса, анализируем верстку, чтобы сделать динамику в ней
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {  // Помещаем сюда аргументы которые динамически будем встраивать в карточки и вспомогательные аргументы
          this.src = src;                                                         // Присваиваем значения будущих объектов
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.price = price;
          this.parent = document.querySelector(parentSelector);  
          this.classes = classes;  
          this.transfer = 27;                                                         // примерный курс к доллару(в макете гривны)
          this.changeToUAH();                                                         // в объект будут поступать цена в долларах, и будет переводится в гривны по курсу
        }
  
        changeToUAH() {                                                               // процесс перевода в гривны
          this.price = this.price * this.transfer;
        }
  
        render() {                                                                    // Рендер карточек с динамическим контентом                                        
          const element = document.createElement('div'); 
  
          if(this.classes.length === 0) {                                             // Если классов нет, по дефолту нужно подставлять menu__item
            this.element = 'menu__item';                                              // Предположим если класс понадобиться в будущем
            element.classList.add(this.element);                                      // Назначаем сам класс
          } else {
            this.classes.forEach(className => element.classList.add(className));       // Добавляем все классы попавшие в массив classes 
          }
          element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
          `;
          this.parent.append(element);
        }
      }   
      
      const getResource = async (url) => {                                                // Функция получения данных
        const res = await fetch(url);
  
        if(!res.ok) {
          throw new Error(`Could not fetch ${url}, status: ${res.status}`);               // Обработка ошибок
        }
  
        return await res.json();
      };
  
      getResource('http://localhost:3000/menu')                                           // Функция для получения данных с сервера
      .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {                            // Деструктуризация
          new MenuCard(img, altimg, title, descr, price, '.menu .container').render();    // Передаю в конструктор и происходит рендер
        });
      });
  
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");



function forms() {
        /* Forms */
        const forms = document.querySelectorAll('form');    // Получаем все формы со страницы

        const message = {
          loading: 'img/form/spinner.svg',
          success: 'Спасибо! Скоро мы с вами свяжемся',
          failure: 'Что-то пошло не так...'
        };
  
        forms.forEach(item => {                             // Перебираем полученные формы
          bindPostData(item);
        });
  
        const postData = async (url, data) => {             // функция для пост запросов
          const res = await fetch(url,{
            method: "POST",
            headers: {
              'Content-type': 'application/json',
            },
            body: data    
          });
  
          return await res.json();
        };
  
      function bindPostData(form) {                               // Запишем в функцию формы которые будет повторяться (на странице 2 формы)
        form.addEventListener('submit', (e) => {
          e.preventDefault();                                     // Отменяем стандартное поведение
  
          const statusMessage = document.createElement('img');    // Создаём оповещение статуса отправки данных для пользователя
          statusMessage.src = message.loading;
          statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
          `;
          form.insertAdjacentElement('afterend', statusMessage);  // Вставляем спиннер загрузки после формы, чтобы не ломать вёрстку
       
          
          const formData = new FormData(form);
  
          const json = JSON.stringify(Object.fromEntries(formData.entries())); // превращаем formData в массив массивов(Object.entries), потом в объект (fromEntries), следом в json (stringify)
  
          postData('http://localhost:3000/requests', json)
          .then ( data => {                           
            console.log(data);                          
            showThanksModal(message.success);                                
              statusMessage.remove();
          }).catch (() => {
              showThanksModal(message.failure);  
          }).finally(() => {
            form.reset();
          });
          });
      }
      function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');   // Получаем элемент со страницы
  
        prevModalDialog.classList.add('hide');                              // Скрываем элемент
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)();                                                        // Открытие модального окна
  
        const thanksModal = document.createElement('div');                  // Создаём модальное окно с оповещением
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
          <div class="modal__close">×</div>
          <div class="modal__title">${message}</div>
        </div>
        `;
  
        document.querySelector('.modal').append(thanksModal);               // Добавляем модальное окно методом append
        setTimeout(() => {                                                  // Время показа оповещения 4 секунды
          thanksModal.remove();
          prevModalDialog.classList.add('show');
          prevModalDialog.classList.remove('hide');
          (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)();                                                     // Закрываем модальное окно
        }, 4000);
      }
    }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal() {                                          // Чтобы не повторять один и тот же код, вывел его в отдельную функцию
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearInterval(modalTimerId);                                  // При открытии модального окна таймер ниже сбивается, чтобы не надоедать пользователю
}
function closeModal() {                                         // Чтобы не повторять один и тот же код, вывел его в отдельную функцию
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

function modal() {
        /* Modal */

    const modalTrigger = document.querySelectorAll('[data-modal]'), // Обьявляем в переменные кнопки, само модальное окно, и кнопку для скрытия окна
    modal = document.querySelector('.modal');
  
    modalTrigger.forEach(btn => {                               // Перебираем кнопки из псевдомассива и вешаем обработчик события
        btn.addEventListener('click', openModal);               // Для того чтобы запретить скроллл
    });


  modal.addEventListener('click', (e)=> {                         // Закрытие при клике за пределами модального окна
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {                   // Закрытие при нажатии на клавишу ESC
    if(e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });

   const modalTimerId = setTimeout(openModal, 5000);              // Открытие модального окна через определённый промежуток времени

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { 
    // PageYOffset - сколько px пользователь отлистал сверху по оси Y + clientHeight - высота видимой части >= scrollHeight - полный скролл страницы
      openModal();
      window.removeEventListener('scroll', showModalByScroll);    // Чтобы удалить обработчик события нужно сделать ссылку на функцию которая исполняла обработку события
    }
  }

  window.addEventListener('scroll', showModalByScroll);           // Когда доскроллим страницу до самого низа, откроется модальное окно
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    
/* Slider */

const prev          = document.querySelector('.offer__slider-prev'),
      slider        = document.querySelector('.offer__slider'),
      next          = document.querySelector('.offer__slider-next'),
      slides        = document.querySelectorAll('.offer__slide'),
      total         = document.querySelector('#total'),
      current       = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField   = document.querySelector('.offer__slider-inner'),
      sliderWidth   = window.getComputedStyle(slidesWrapper).width; // Получаем применнёные стили(в объекте) для ширины слайдера

let slideIndex = 1;
let offset = 0;                                                   // Отступ

if(slides.length < 10) {                                          // Изменение общего числа слайдов
  total.textContent = `0${slides.length}`;
  current.textContent = `0${slideIndex}`;
} else {
  total.textContent = slides.length;
  current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';              // Делаем ширину поля для слайдов шириной во все слайды
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';
slides.forEach(slide => {
  slide.style.width = sliderWidth;                                // Перебираем каждый слайд и даём максимальную ширину видимой части слайдера
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
      dots = [];

indicators.classList.add('carousel-indicators');
indicators.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
`;
slider.append(indicators);

for(let i = 0; i < slides.length; i++) {
  const dot = document.createElement('li');
  dot.setAttribute('data-slide-to', i + 1);
  dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
  `;
  if (i === 0) {
    dot.style.opacity = 1;
  }
  indicators.append(dot);
  dots.push(dot);
}

function deleteNotDigits(str) {
  return +str.replace(/\D/g, '');
}

next.addEventListener('click', () => {
  if(offset == deleteNotDigits(sliderWidth) * (slides.length - 1)){  // Преобразовываем строку в число с помощью унарного плюса и вырезания "px" из sliderWidth
    offset = 0;                                                      // Отступ
  } else {
    offset += deleteNotDigits(sliderWidth);
  }
  slidesField.style.transform = `translateX(-${offset}px)`;          // Сдвиг по оси X

  if(slideIndex == slides.length) {                                  // Если индекс равен крайнему значению то ставить его в начало, иначе +1
    slideIndex = 1;
  } else {
    slideIndex++;
  }

  if(slides.length < 10) {                                            // Если значение меньше 10, то ставить ему ноль в начало (01)
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }

  dots.forEach(dot => dot.style.opacity = '.5');
  dots[slideIndex - 1].style.opacity = 1;
});

prev.addEventListener('click', () => {
  if(offset == 0){
    offset = deleteNotDigits(sliderWidth) * (slides.length - 1);
  } else {
    offset -= deleteNotDigits(sliderWidth);
  }
  slidesField.style.transform = `translateX(-${offset}px)`;

  if(slideIndex == 1) {
    slideIndex = slides.length;
  } else {
    slideIndex--;
  }

  if(slides.length < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }

  dots.forEach(dot => dot.style.opacity = '.5');
  dots[slideIndex - 1].style.opacity = 1;
});

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    const slideTo = e.target.getAttribute('data-slide-to');

    slideIndex = slideTo;
    offset = deleteNotDigits(sliderWidth) * (slideTo - 1);

    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  });
});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {

    /* Tabs */

    const tabs = document.querySelectorAll('.tabheader__item'),                   // Находим элементы и помещаеи их в переменные
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent  = document.querySelector ('.tabheader__items');


    function hideTabContent() {                                           // Функция для того чтобы скрыть табы
        tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
        });
        tabs.forEach(tab =>{
        tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {                                      // Функция для того чтобы показать табы
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {             // Событие отлавливающие клик на табе (определяет какой таб открыть, остальные закрывает)
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
    
        /* Timer */

        const deadline = '2022-02-01';                              // Определяем дедлайн

        function getTimeRemaining(endtime) {                        // Функция определяющая разницу между дедлайном и текущим временем
          const t = Date.parse(endtime) - Date.parse(new Date()) ,  // endtime - конечная точка до которой нам нужно досчитать отнимаем текущую дату
                days = Math.floor(t / (1000 * 60 * 60 * 24)) ,      // считаем в милисекундах значения таймера округляя до ближайшего целого(Math.floor)
                hours = Math.floor((t / (1000* 60 * 60) % 24)) ,
                minutes = Math.floor((t / 1000 / 60) % 60) ,
                seconds = Math.floor((t / 1000) % 60);
          
          return {                                                  // Создаём объект и помещаем в него значения из функции getTimeRemaining
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
          };
        }

        function getZero(num) {                                     // Функция создающая двухзначные значения, не 9, а 09 к примеру
          if (num >= 0 && num < 10) {
            return `0${num}`;
          } else {
           return num;
          }
        }

        function setClock(selector, endtime) {                     // Функция для работы самого таймера    
          const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);     // Вызываем функцию updateClock каждую секунду (обновление таймера)

          updateClock();                                           // Обновляем таймер в самом начале чтобы, JS перебил статичную верстку, иначе таймер после загрузки страницы отобразится через секунду из-за setInterval выше

          function updateClock() {                                 // Функция обновления таймера
            const t = getTimeRemaining(endtime);                   // Помещаем разницу во времени в переменную

            days.textContent = getZero(t.days);                    // Помещаем полученые из объекта значения с функцией getZero(преоброзование в 2-ух значное число) в сами элементы таймера
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {                                     // Остановка таймера когда время закончилось
              clearInterval(timeInterval);
            }
          }
        }

    setClock('.timer', deadline);                                   // вызываем функцию с 2-мя аргументами, селектор самого таймера и дедлайн

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");








window.addEventListener('DOMContentLoaded', () => {

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map