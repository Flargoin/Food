function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const parentTabs = document.querySelector(tabsParentSelector),
        tab = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabsContentSelector);

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tab.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');

        tab[i].classList.add(activeClass);
    }

    parentTabs.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
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

export default tabs;