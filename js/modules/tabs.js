function tabs() {
    const parentTabs = document.querySelector('.tabheader__items'),
        tab = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tab.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');

        tab[i].classList.add('tabheader__item_active');
    }

    parentTabs.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tab.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });

    hideTabContent();
    showTabContent();
}

module.exports = tabs;