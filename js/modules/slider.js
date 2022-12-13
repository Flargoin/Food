function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // 1) Получаем элементы со страницы
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        // Получаем применённые стили к элементу, в данном случае width   
        width = window.getComputedStyle(slidesWrapper).width;

    // 2) Переменная которая поможет индексировать слайды (Указываем 1 потому что мы выводим это значение для пользователей)
    let slideIndex = 1;
    // 7) Создаём переменную для отсчёта сдвига карусели
    let offset = 0;

    // 9) 
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    // 3) Установим блоку со слайдами ширину.
    slidesField.style.width = 100 * slides.length + '%';

    // 4) Помещаем полученное значение width в свойство ширины каждого слайда
    slides.forEach(slide => {
        slide.style.width = width;
    });

    // Устанавливаем относительное позиционирование карусели
    slider.style.position = 'relative';

    // Создаём обёртку для навигации и даём ему класс со стилями
    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    // Создаём сами точки и назначаем им атрибут со значениями от 1 до значения slides.length
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        // Если это первый элемент то добавлять стиль
        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    // 5) Прописываем нужные стили для блока со слайдами (позже выведу стили в отдельные классы)
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    // 6) Ограничиваем область контента карусели (чтобы показывать 1 слайд из всех)
    slidesWrapper.style.overflow = 'hidden';

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    // 8) Нужно назначить обработчик события движения карусели
    next.addEventListener('click', () => {
        // Проверяем 650px * 3 слайда (не на 4 потому что мы отсчитываем от 0, мы 3 раза листаем добавляя 650, на 4 клик мы возвращаемся в начало)
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        // Если индекс слайда будет равен общему кол-ву слайдов в каруселе - это значит что мы дошли до конца карусели, нужно перейти в начало карусели. Иначе изменять индекс слайда.
        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        // Также нужно регулировать отображение число индекса
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        // Переюираем каждую точку в массиве dots и делать прозрачной, а точку с индексом слайда делать активной яркой
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        // Проверяем 650px * 3 слайда (не на 4 потому что мы отсчитываем от 0, мы 3 раза листаем добавляя 650, на 4 клик мы возвращаемся в начало)
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        // Если индекс слайда будет равен общему кол-ву слайдов в каруселе - это значит что мы дошли до конца карусели, нужно перейти в начало карусели. Иначе изменять индекс слайда.
        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        // Также нужно регулировать отображение число индекса
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = +e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = '1';
        });
    });
}

export default slider;