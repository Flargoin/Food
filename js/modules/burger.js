const burger = document.querySelector('.header__burger span');
const menu = document.querySelector('.header__left-menu');

burger.addEventListener('click', (e) => {
    e.preventDefault();
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.querySelector('body').classList.toggle('fix');

})


export default burger;