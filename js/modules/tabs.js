function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    /* Tabs */

    const tabs = document.querySelectorAll(tabsSelector),                   // Находим элементы и помещаеи их в переменные
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent  = document.querySelector (tabsParentSelector);


    function hideTabContent() {                                           // Функция для того чтобы скрыть табы
        tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
        });
        tabs.forEach(tab =>{
        tab.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {                                      // Функция для того чтобы показать табы
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {             // Событие отлавливающие клик на табе (определяет какой таб открыть, остальные закрывает)
        const target = e.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
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