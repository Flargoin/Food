function burgerMenu() {
    const headerMenu = document.querySelector('.header__menu'),
          burger = document.querySelector('.header__burger'),
          menuClose = document.querySelector('.header__close'),
          menuLinks = document.querySelector('.header__links');

    burger.addEventListener('click', (e) => {
        e.preventDefault();
        headerMenu.classList.add('header__menu--active');
        document.body.classList.add('body-hidden');
    });

    menuClose.addEventListener('click', () => {
      headerMenu.classList.remove('header__menu--active');
      document.body.classList.remove('body-hidden');
    });

    menuLinks.addEventListener('click', (e) => {
      if(e.target && e.target.classList.contains('header__link')) {
        document.body.classList.remove('body-hidden');
        headerMenu.classList.remove('header__menu--active');
      }
    });
}

export default burgerMenu;