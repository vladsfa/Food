document.addEventListener("DOMContentLoaded", _ => {
    const modal = document.querySelector(".modal");
    const triggers = document.querySelectorAll("[data-modal]");

    window.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            if (modal.classList.contains("show")) {
                hideModal(modal);
            }
        }
    });

    window.addEventListener("scroll", _ => {
        const e = document.documentElement;
        if (e.clientHeight + window.pageYOffset >= e.scrollHeight){
            showModal(modal);
        }
    });

    modal.addEventListener("click", e => {
        if (e.target.matches(".modal")) {
            hideModal(modal);
        }
    });

    triggers.forEach(e => {
        e.addEventListener("click" ,_ => {
            showModal(modal);
        });
    });

    modal.addEventListener("click", e => {
        if(e.target.matches("[data-close]")){
            hideModal(modal);
        }
    });

    function hideModal(modal){
        modal.classList.remove("show");
        document.body.classList.remove("overflow-hidden");
    }

    function showModal(modal){
        modal.classList.add("show");
        document.body.classList.add("overflow-hidden");
    }
});