'use strict';
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
import 'dom-node-polyfills';
import 'node-fetch';
import 'formdata-polyfill';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {
    openModal
} from './modules/modal';

/* Событие которое ждёт прогрузки DOM */
document.addEventListener("DOMContentLoaded", () => {

    /* 
        Вынес modalTimerId из modal.js
        1) Создали переменную modalTimerId
        2) Помещаем в переменную уникальный индентификатор таймера
        3) Который будет выполнен через определённый промежуток времени и будет запускаться функция openModal
        4) Но openModal должен принимать в себя 2 аргумента
        5) openModal('.modal', modalTimerId):
            1) Селектор модального окна
            2) Уникальный индентификатор таймера который был запущен
        6) Через определённый промежуток времени запуститься функция на которую ссылаемся НО НЕ ВЫЗЫВАЕМ СРАЗУ () => openModal('.modal', modalTimerId)
        7) Пердаём modalTimerId(Уникальный индентификатор таймера) в модуль modal
        8) НЕ ЗАБЫТЬ ИМПОРТИРОВАТЬ openModal В НАШ ГЛАВНЫЙ ФАЙЛ main.js

        9) так как мы ещё работаем с forms.js где есть вызов openModal, передаём туда modalTimerId
    */
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 10000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2023-03-17');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });
});