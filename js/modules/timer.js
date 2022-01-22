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

export default timer;