require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';


import tabs from'./modules/tabs';
import modal, { openModal } from'./modules/modal';
import timer from'./modules/timer';
import cards from'./modules/cards';
import forms from'./modules/forms';
import slider from'./modules/slider';
import calculator from'./modules/calculator';
import burger from './modules/burger';

window.addEventListener('DOMContentLoaded', () => {
  
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000);              // Открытие модального окна через определённый промежуток времени

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  modal('[data-modal]', '.modal', modalTimerId);
  timer('.timer', '2022-02-01');
  cards();
  forms('form', modalTimerId);
  slider({
    container : '.offer__slider',
    slide : '.offer__slide',
    nextArrow : '.offer__slider-next',
    prevArrow : '.offer__slider-prev',
    totalCounter : '#total',
    currentCounter : '#current',
    wrapper : '.offer__slider-wrapper',
    field : '.offer__slider-inner'
  });
  calculator();
});