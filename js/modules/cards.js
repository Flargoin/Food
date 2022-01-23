import { getResource } from "../services/services";

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
      
      getResource('http://localhost:3000/menu')                                           // Функция для получения данных с сервера
      .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {                            // Деструктуризация
          new MenuCard(img, altimg, title, descr, price, '.menu .container').render();    // Передаю в конструктор и происходит рендер
        });
      });
  
}

export default cards;