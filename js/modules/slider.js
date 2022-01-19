function slider() {
    
/* Slider */

const prev          = document.querySelector('.offer__slider-prev'),
      slider        = document.querySelector('.offer__slider'),
      next          = document.querySelector('.offer__slider-next'),
      slides        = document.querySelectorAll('.offer__slide'),
      total         = document.querySelector('#total'),
      current       = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField   = document.querySelector('.offer__slider-inner'),
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
indicators.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
`;
slider.append(indicators);

for(let i = 0; i < slides.length; i++) {
  const dot = document.createElement('li');
  dot.setAttribute('data-slide-to', i + 1);
  dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
  `;
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

module.exports = slider;