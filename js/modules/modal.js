function openModal(modalSelector, modalTimerId) {                                          // Чтобы не повторять один и тот же код, вывел его в отдельную функцию
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  console.log(modalTimerId);
  if(modalTimerId) {
    clearInterval(modalTimerId);                                  // При открытии модального окна таймер ниже сбивается, чтобы не надоедать пользователю
  }
 
}
function closeModal(modalSelector) {                                         // Чтобы не повторять один и тот же код, вывел его в отдельную функцию
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
        /* Modal */

    const modalTrigger = document.querySelectorAll(triggerSelector), // Обьявляем в переменные кнопки, само модальное окно, и кнопку для скрытия окна
          modal = document.querySelector(modalSelector);
  
    modalTrigger.forEach(btn => {                               // Перебираем кнопки из псевдомассива и вешаем обработчик события
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });


  modal.addEventListener('click', (e)=> {                         // Закрытие при клике за пределами модального окна
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {                   // Закрытие при нажатии на клавишу ESC
    if(e.code === "Escape" && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });



  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { 
    // PageYOffset - сколько px пользователь отлистал сверху по оси Y + clientHeight - высота видимой части >= scrollHeight - полный скролл страницы
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);    // Чтобы удалить обработчик события нужно сделать ссылку на функцию которая исполняла обработку события
    }
  }

  window.addEventListener('scroll', showModalByScroll);           // Когда доскроллим страницу до самого низа, откроется модальное окно
}

export default modal;
export {closeModal};
export {openModal};