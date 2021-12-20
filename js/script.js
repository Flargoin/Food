window.addEventListener('DOMContentLoaded', () => {

  /* Tabs */
const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent  = document.querySelector ('.tabheader__items');


        function hideTabContent() {
          tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
          });
          tabs.forEach(tab =>{
            tab.classList.remove('tabheader__item_active');
          });
        }

        function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (e) => {
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

        const deadline = '2022-01-01';

        function getTimeRemaining(endtime) {
          const t = Date.parse(endtime) - Date.parse(new Date()) ,
                days = Math.floor(t / (1000 * 60 * 60 * 24)) ,
                hours = Math.floor((t / (1000* 60 * 60) % 24)) ,
                minutes = Math.floor((t / 1000 / 60) % 60) ,
                seconds = Math.floor((t / 1000) % 60);
          
          return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
          };
        }

        function getZero(num) {
          if (num >= 0 && num < 10) {
            return `0${num}`;
          } else {
           return num;
          }
        }

        function setClock(selector, endtime) {
          const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

          updateClock();

          function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
              clearInterval(timeInterval);
            }
          }
        }

    setClock('.timer', deadline);

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

    const modalTimerId = setTimeout(openModal, 5000);               /* Открытие модального окна через определённый промежуток времени */

    function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { 
      // PageYOffset - сколько px пользователь отлистал сверху по оси Y + clientHeight - высота видимой части >= scrollHeight - полный скролл страницы (если совпадает условие сработает)
        openModal();
        window.removeEventListener('scroll', showModalByScroll);    /* Чтобы удалить обработчик события мы должны сделать ссылку на функцию которая исполняла обработку события */
      }
    }

    window.addEventListener('scroll', showModalByScroll);           /*  Когда доскроллим страницу до самого низа, откроется модальное окно */
});

