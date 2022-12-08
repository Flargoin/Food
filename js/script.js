'use strict';

/* Событие которое ждёт прогрузки DOM */
document.addEventListener("DOMContentLoaded", () => {
    /* Табы */
    const parentTabs = document.querySelector('.tabheader__items'),
        tab = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tab.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');

        tab[i].classList.add('tabheader__item_active');
    }

    parentTabs.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tab.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });

    hideTabContent();
    showTabContent();


    // Таймер

    /* Создаём переменную до которой таймер будет отсчитывать */
    const deadline = '2023-03-17';

    /*
     Создаём функцию которая будет высчитывать разницу между нынешней датой и датой окончания акции :
        1) Создаём переменные для помещение числовых значений.
        2) Создаём техническую переменную в которую получаем разницу в милисекундах
        3) Создаём проверку на отрицательное значение
        4) Если t = 0 и меньше - показывать нули, если > нуля - преобразовывать милисекунды в нужные данные
        5) Вернуть объект с получившимся значениями.
     */
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    /* 
        Создаём функцию подстановки нуля однозначным числам.
    */
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    /* 
        Функция которая будет показывать время на странице:
        1) Получаем элементы на странице
        2) Вызываем обновление таймера (UpdataeClock) каждую секунду.
        3) Создаём внутри функцию обновления таймера:
            - помещаем в техническую переменную (t) возвращенный объект функцией getRemaining(), endtime придёт от setClock.
            - помещаем в каждый полученный элемент соответствующее значение объекта с вызовом функции getZero().
            - если общее число милисекунд меньше нуля, таймер не обновляется.
    */
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

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    /* Модальное окно */
    const modal = document.querySelector('.modal'),
          modalTrigger = document.querySelectorAll('[data-modal]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        };
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        };
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);


    /* Карточки меню */

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 35;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if(this.classes.length <= 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
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

    const getResource = async (url) => {
        const res = await fetch(url);
        /* 
            Если fetch сталкивается с ошибкой в http статусе, это не будет ошибкой для fetch
            Ошибки для fetch:
            1) Отсутствие интернета
            2) критические неполадки в самом запросе.

            свойства промиса fetch:
            .ok - запрос выполнился и мы что-то получили
            .status - получаем http статус 200, 404, 501
        */
        if(!res.ok) {
           throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    /* Переписал код по созданию экземпляров класса */
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    /* Отправка данных из форм */

    const forms = document.querySelectorAll('form');

    /* Создаём объект с сообщениями для пользователя */
    const message = {
        loading : 'img/form/spinner.svg',
        success : 'Спасибо! Скоро мы с вами свяжемся.',
        failure   : 'Что-то пошло не так...'
    };

    /* Подвязываем каждую форму к функции запроса */
    forms.forEach(item => {
        bindPostData(item);
    });

    /* 
        Создаём функцию для запросов на сервер.
        Но так как это асинхронный код, нужно немного его доработать (async/await ES8)
        async - ставится перед функцией
        await - ставится перед операциями которые необходимо дождаться.
        Эта конструкция нужна для того чтобы вызывая функцию мы точно увидели результат полученный от сервера.
    */
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    }


    /* 
        Создаём функцию которая будет отправлять данные на сервер.
        Передаём в аргумент форму, чтобы потом было удобно навешывать обработчик события.
    */
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            /* Отменяем дефолтное поведение браузера */
            e.preventDefault();

            /* Создаём элемент который будем показывать для оповещения пользователя о статусе */
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            /* 
                Создаём концепцию FormData которая будет собирать данные из формы которую мы передаём как аргумент 
                (ОСТОРОЖНО!!! МЫ ВСЕГДА ДОЛЖНЫ УКАЗЫВАТЬ У ИНПУТОВ АТРИБУТ name!!!)
            */
            const formData = new FormData(form);

            /* Переделал преобразование в json */
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // Вызываем нашу функцию которая возвращает промис
            postData('http://localhost:3000/requests', json)
            .then (data => {
                showThanksModal(message.success) ;
                statusMessage.remove()
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });

        });
    };

    /* Создаём окно с благодарностью */
    function showThanksModal(message) {
        /* Скрываем предыдущий контент */
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        /* Создаём новую структуру окна */
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        /* Показывать 4 секунды окно с благодарностью, затем закрывать окно и возвращать всё на место */
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000)
    }



    // Slider

    // 1) Получаем элементы со страницы
    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');

    // 2) Переменная которая поможет индексировать слайды (Указываем 1 потому что мы выводим это значение для пользователей)
    let slideIndex = 1;

    // 10) Для работы нужно проинициализировать слайдер
    showSlides(slideIndex);

    // 11) Нужно менять значение общего числа слайдов (Это нужно прописать 1 раз, так как это общее кол-во слайдов))
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    // 3) Создаём функцию которая будет показывать слайды (аргумент - индекс)
    function showSlides(n) {
        // 4) Нам надо предусмотреть поведение граничных значений индекса
        if(n > slides.length) {
            slideIndex = 1;
        }
        if(n < 1) {
            slideIndex = slides.length;
        }

        // 5) Скрываем слайды
        slides.forEach(item => item.style.display = 'none');

        // 6) Показать нужный слайд
        slides[slideIndex - 1].style.display = 'block';

        // 12) Изменять число текущего слайда
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    // 7) Функция которая отвечает за перелистывание слайдов
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // 8) Обработчик события на стрелку "Назад"
    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    // 9) Обработчик события на стрелку "Вперёд"
    next.addEventListener('click', () => {
        plusSlides(1);
    });
});