window.addEventListener('DOMContentLoaded', () => {

  /* Tabs */
const tabs = document.querySelectorAll('.tabheader__item'),                   /* Находим элементы и помещаеи их в переменные */
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent  = document.querySelector ('.tabheader__items');


        function hideTabContent() {                                           /* Функция для того чтобы скрыть табы */
          tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
          });
          tabs.forEach(tab =>{
            tab.classList.remove('tabheader__item_active');
          });
        }

        function showTabContent(i = 0) {                                      /* Функция для того чтобы показать табы */
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (e) => {                         /* Событие отлавливающие клик на табе (определяет какой таб открыть, остальные закрывает) */
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

        
        
        /* Timer */

        const deadline = '2022-01-01';                              /* Определяем дедлайн */

        function getTimeRemaining(endtime) {                        /* Функция определяющая разницу между дедлайном и текущим временем */
          const t = Date.parse(endtime) - Date.parse(new Date()) ,  /* endtime - конечная точка до которой нам нужно досчитать отнимаем текущую дату */
                days = Math.floor(t / (1000 * 60 * 60 * 24)) ,      /* считаем в милисекундах значения таймера округляя до ближайшего целого(Math.floor)*/
                hours = Math.floor((t / (1000* 60 * 60) % 24)) ,
                minutes = Math.floor((t / 1000 / 60) % 60) ,
                seconds = Math.floor((t / 1000) % 60);
          
          return {                                                  /* Создаём объект и помещаем в него значения из функции getTimeRemaining */
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
          };
        }

        function getZero(num) {                                     /* Функция создающая двухзначные значения, не 9, а 09 к примеру */
          if (num >= 0 && num < 10) {
            return `0${num}`;
          } else {
           return num;
          }
        }

        function setClock(selector, endtime) {                     /* Функция для работы самого таймера */    
          const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);     /* Вызываем функцию updateClock каждую секунду (обновление таймера) */

          updateClock();                                           /* Обновляем таймер в самом начале чтобы, JS перебил статичную верстку, иначе таймер после загрузки страницы отобразится через секунду из-за setInterval выше */

          function updateClock() {                                 /* Функция обновления таймера */
            const t = getTimeRemaining(endtime);                   /* Помещаем разницу во времени в переменную */

            days.textContent = getZero(t.days);                    /* Помещаем полученые из объекта значения с функцией getZero(преоброзование в 2-ух значное число) в сами элементы таймера */
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {                                     /* Остановка таймера когда время закончилось */
              clearInterval(timeInterval);
            }
          }
        }

    setClock('.timer', deadline);                                   /* вызываем функцию с 2-мя аргументами, селектор самого таймера и дедлайн */

   
   
    /* Modal */

    const modalTrigger = document.querySelectorAll('[data-modal]'), /* Обьявляем в переменные кнопки, само модальное окно, и кнопку для скрытия окна */
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');
    
        modalTrigger.forEach(btn => {                               /* Перебираем кнопки из псевдомассива и вешаем обработчик события */
          btn.addEventListener('click', openModal);                 /* Для того чтобы запретить скроллл */
        });

    function openModal() {                                          /* Чтобы не повторять один и тот же код, вывел его в отдельную функцию */
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);                                  /* При открытии модального окна таймер ниже сбивается, чтобы не надоедать пользователю */
    }
    function closeModal() {                                         /* Чтобы не повторять один и тот же код, вывел его в отдельную функцию */
      modal.classList.remove('show');
      modal.classList.add('hide');
      document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e)=> {                         /* Закрытие при клике за пределами модального окна */
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {                   /* Закрытие при нажатии на клавишу ESC */
      if(e.code === "Escape" && modal.classList.contains('show')) {
        closeModal();
      }
    });

     const modalTimerId = setTimeout(openModal, 5000);              /* Открытие модального окна через определённый промежуток времени */

    function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { 
      // PageYOffset - сколько px пользователь отлистал сверху по оси Y + clientHeight - высота видимой части >= scrollHeight - полный скролл страницы
        openModal();
        window.removeEventListener('scroll', showModalByScroll);    /* Чтобы удалить обработчик события нужно сделать ссылку на функцию которая исполняла обработку события */
      }
    }

    window.addEventListener('scroll', showModalByScroll);           /*  Когда доскроллим страницу до самого низа, откроется модальное окно */

    
    
    // Классы для карточек

    class MenuCard {                                                /* Создаём экземпляр класса, анализируем верстку, чтобы сделать динамику в ней */
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {  /* Помещаем сюда аргументы которые динамически будем встраивать в карточки и вспомогательные аргументы */
        this.src = src;                                             /* Присваиваем значения будущих объектов */
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);  
        this.classes = classes;  
        this.transfer = 27;                                          /* примерный курс к доллару(в макете гривны) */
        this.changeToUAH();                                          /* в объект будут поступать цена в долларах, и будет переводится в гривны по курсу */
      }

      changeToUAH() {                                                 /* Сам процесс перевода в гривны */
        this.price = this.price * this.transfer;
      }

      render() {                                                                    /* Рендер карточек с динамическим контентом */                                        
        const element = document.createElement('div'); 

        if(this.classes.length === 0) {                                             /* Если классов нет, по дефолту нужно подставлять menu__item */
          this.element = 'menu__item';                                              /* Предположим если класс понадобиться в будущем */
          element.classList.add(this.element);                                      /* Назначаем сам класс */
        } else {
          this.classes.forEach(className => element.classList.add(className));        /* Добавляем все классы попавшие в массив classes */ 
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

    new MenuCard(                                                     /* Объект из которого сформируется карточка на странице как и 2 следующие */
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      ".menu .container",
    ).render();

    new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      14,
      ".menu .container",
    ).render();

    new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      21,
      ".menu .container",
    ).render();


    /* Forms */
      const forms = document.querySelectorAll('form');    /* Получаем все формы со страницы */

      const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
      };

      forms.forEach(item => {                             /* Перебираем полученные формы */
        postData(item);
      });

    function postData(form) {                             /* Запишем в функционал который будет повторяться (на странице 2 формы) */
      form.addEventListener('submit', (e) => {
        e.preventDefault();                               /* Отменяем стандартное поведение */

        const statusMessage = document.createElement('div');    /* Создаём оповещение статуса отправки данных для пользователя */
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);
        

        const request = new XMLHttpRequest();             /* Запрос */
        request.open('POST', 'server.php');               /* Настройка запроса */
        
        const formData = new FormData(form);

        request.send(formData);                           /* Указываем что нам нужно отправить */                                          

 
        request.addEventListener('load', () => {
          if(request.status === 200) {                    /* Проверка на успешную отправку данных */
            console.log(request.response);
            statusMessage.textContent = message.success;  /* Оповещение что всё прошло успешно */
            form.reset();                                 /* Очистить поля после отправки */
            setTimeout(() => {                            /* Через 2 секунды удалять оповещения */
              statusMessage.remove();
            }, 2000)
          } else {
            statusMessage.textContent = message.failure;  /* Оповещение "Что-то пошло не так..." */
          }
        });
      });
    }
});

