function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    
/* Slider */

const prev          = document.querySelector(prevArrow),
      slider        = document.querySelector(container),
      next          = document.querySelector(nextArrow),
      slides        = document.querySelectorAll(slide),
      total         = document.querySelector(totalCounter),
      current       = document.querySelector(currentCounter),
      slidesWrapper = document.querySelector(wrapper),
      slidesField   = document.querySelector(field),
      sliderWidth   = window.getComputedStyle(slidesWrapper).width; // Получаем применнёные стили(в объекте) для ширины слайдера

let slideIndex = 1;
let offset = 0;                                                   // Отступ

if(slides.length < 10) {                                          // Изменение общего числа слайдов
  total.textContent = `0${slides.length}`;
  current.textContent = `0${slideIndex}`;
} else {
  total.textContent = slides.length;
  current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';              // Делаем ширину поля для слайдов шириной во все слайды
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';
slides.forEach(slide => {
  slide.style.width = sliderWidth;                                // Перебираем каждый слайд и даём максимальную ширину видимой части слайдера
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
      dots = [];

indicators.classList.add('carousel-indicators');

slider.append(indicators);

for(let i = 0; i < slides.length; i++) {
  const dot = document.createElement('li');
  dot.classList.add('dot');
  dot.setAttribute('data-slide-to', i + 1);
  
  if (i === 0) {
    dot.style.opacity = 1;
  }
  indicators.append(dot);
  dots.push(dot);
}

function deleteNotDigits(str) {
  return +str.replace(/\D/g, '');
}

next.addEventListener('click', () => {
  if(offset == deleteNotDigits(sliderWidth) * (slides.length - 1)){  // Преобразовываем строку в число с помощью унарного плюса и вырезания "px" из sliderWidth
    offset = 0;                                                      // Отступ
  } else {
    offset += deleteNotDigits(sliderWidth);
  }
  slidesField.style.transform = `translateX(-${offset}px)`;          // Сдвиг по оси X

  if(slideIndex == slides.length) {                                  // Если индекс равен крайнему значению то ставить его в начало, иначе +1
    slideIndex = 1;
  } else {
    slideIndex++;
  }

  if(slides.length < 10) {                                            // Если значение меньше 10, то ставить ему ноль в начало (01)
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }

  dots.forEach(dot => dot.style.opacity = '.5');
  dots[slideIndex - 1].style.opacity = 1;
});

prev.addEventListener('click', () => {
  if(offset == 0){
    offset = deleteNotDigits(sliderWidth) * (slides.length - 1);
  } else {
    offset -= deleteNotDigits(sliderWidth);
  }
  slidesField.style.transform = `translateX(-${offset}px)`;

  if(slideIndex == 1) {
    slideIndex = slides.length;
  } else {
    slideIndex--;
  }

  if(slides.length < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }

  dots.forEach(dot => dot.style.opacity = '.5');
  dots[slideIndex - 1].style.opacity = 1;
});

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    const slideTo = e.target.getAttribute('data-slide-to');

    slideIndex = slideTo;
    offset = deleteNotDigits(sliderWidth) * (slideTo - 1);

    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  });
});
}

export default slider;