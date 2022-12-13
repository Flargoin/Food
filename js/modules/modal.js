/* 
    1)  openModal и closeModal вы вынесли как 2 отдельные функциональности и экспортировали их.

    2)  Далее у нас появляется ошибка так как эти функции не знают с каким селектором modal они работают,
        добавляем аргумент modalSelector в наши функции, и создаём переменную в которой получаем этот селектор

    3)  В функции modal() нужно в каждый вызов openModal и closeModal передать наш аргумент modalSelector,
        так как они уже находятся в разных областях видимости.

    4)  btn.addEventListener('click', openModal(modalSelector, modalTimerId)) - было(неправильно), тут функция сразу вызывается после загрузки страницы
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)) - стало(правильно), тут мы помещаем в стрелочную функцию вызов нужной нам функции и получается колбэк.

    5)  Если функция openModal работает с таким параметром как modalTimerId, передадим его в качестве аргумента

    6)  Проверка внутри функции openModal, есть ли modalTimerId, если да то clearInterval(modalTimerId), иначе ничего не делать.

    7)  Также передаём аргументом modalTimerId в функцию modal(), чтобы передать её в вызов функций openModal.

    8)  Так как modalTimerId будет использоваться не только в файле modal.js, а ещё в forms.js целесообразно его вывести в главный файл script.js
*/

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector),
        modalTrigger = document.querySelectorAll(triggerSelector);

    modalTrigger.forEach(btn => {
        /* Колбэк функцию нельзя вызывать, она сама вызовется после клика, тут аоказан приём как обойти это, поместить в стрелочную функцию вызов нужной нам функции */
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        };
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        };
    });


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {
    openModal,
    closeModal
};