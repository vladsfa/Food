document.addEventListener("DOMContentLoaded", _ => {
    const tabs = document.querySelectorAll(".tabcontent"),
    headerTabsContainer = document.querySelector(".tabheader__items"),
    headerTabs = headerTabsContainer.children;

    run(tabs, headerTabs, headerTabsContainer);


    function run(tabs, headerTabs, headerTabsContainer){
        hideTabActive(tabs);
        hideHeaderTabsActive(headerTabs);
        addOnClickEventTab(tabs[0], headerTabs[0], headerTabsContainer);

        headerTabsContainer.addEventListener("click", event => {
            const target = event.target;
            if (isCorrectClickEvent(target)) {
                const iTabHeader = findHeaderTabIndex(target, headerTabs);
                addOnClickEventTab(tabs[iTabHeader], target, headerTabsContainer);
            }
        });
    }

    function hideTabActive(tabs){
        tabs.forEach(tab => {
            tab.classList.add("hide");
        });
    }

    function hideHeaderTabsActive(headerTabs){
        for (const header of headerTabs) {
            header.classList.remove("tabheader__item_active");
        }
    }

    function addOnClickEventTab(tab, header, containerHeaders){
        toggleTabAndHeader(tab, header);
        containerHeaders.addEventListener("click", function f(event){
            if (isCorrectClickEvent(event.target)) {
                toggleTabAndHeader(tab, header);
                containerHeaders.removeEventListener("click", f);
            }
        });
    }

    function toggleTabAndHeader(tab, header){
        toggleTab(tab);
        header.classList.toggle("tabheader__item_active");
    }

    function toggleTab(tab){
        const classes = tab.classList;
        if (classes.contains("show")) {
            classes.remove("show");
            classes.add("hide");
        }
        else{
            classes.remove("hide");
            classes.add("show");
        }
    }

    function findHeaderTabIndex(headerTab, headerTabs) {
        for (let i = 0; i < headerTabs.length; i++) {
            if (headerTabs[i] == headerTab) {
                return i;
            }
        }
    }

    function isCorrectClickEvent(target){
        return target && target.matches("div.tabheader__item");
    }
});