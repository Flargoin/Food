import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
        /* Forms */
        const forms = document.querySelectorAll(formSelector);    // Получаем все формы со страницы

        const message = {
          loading: 'img/form/spinner.svg',
          success: 'Спасибо! Скоро мы с вами свяжемся',
          failure: 'Что-то пошло не так...'
        };
  
        forms.forEach(item => {                             // Перебираем полученные формы
          bindPostData(item);
        });
  

  
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
        openModal('.modal', modalTimerId);                                                        // Открытие модального окна
  
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
          closeModal('.modal');                                                     // Закрываем модальное окно
        }, 4000);
      }
    }

export default forms;