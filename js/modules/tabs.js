function tabs() {

    /* Tabs */

    const tabs = document.querySelectorAll('.tabheader__item'),                   // Находим элементы и помещаеи их в переменные
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent  = document.querySelector ('.tabheader__items');


    function hideTabContent() {                                           // Функция для того чтобы скрыть табы
        tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
        });
        tabs.forEach(tab =>{
        tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {                                      // Функция для того чтобы показать табы
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {             // Событие отлавливающие клик на табе (определяет какой таб открыть, остальные закрывает)
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;