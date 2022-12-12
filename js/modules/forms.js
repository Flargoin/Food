function forms() {
    const forms = document.querySelectorAll('form');

    /* Создаём объект с сообщениями для пользователя */
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...'
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
                .then(data => {
                    showThanksModal(message.success);
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
}

module.exports = forms;