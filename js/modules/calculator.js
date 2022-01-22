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


export default calculator;