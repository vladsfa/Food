document.addEventListener("DOMContentLoaded", _ => {
    const prevSlider = document.querySelector(".offer__slider-prev"),
        nextSlider = document.querySelector(".offer__slider-next"),
        current = document.querySelector("#current"),
        wrappers = document.querySelector(".offer__slider-wrapper").children;
    
    run(wrappers, current, nextSlider, prevSlider);


    function run(wrappers, current, nextSlider, prevSlider){
        hideWrappers(wrappers);
        setCorrectWrapper(wrappers, current);

        nextSlider.addEventListener("click", event => {
            let numberCurr = ParseNumberCurr(current.textContent);
            if (numberCurr < wrappers.length) {
                numberCurr += 1;
                current.textContent = "0" + numberCurr;
                toggleWrapper(wrappers[numberCurr - 1], wrappers[numberCurr - 2]);
            }
        });
    
        prevSlider.addEventListener("click", event => {
            let numberCurr = ParseNumberCurr(current.textContent);
            if (numberCurr > 1) {
                numberCurr -= 1;
                current.textContent = "0" + numberCurr;
                toggleWrapper(wrappers[numberCurr - 1], wrappers[numberCurr]);
            }
        });
    }

    function toggleWrapper(wrapperOn, wrapperOf){
        showWrapper(wrapperOn);
        hideWrapper(wrapperOf);
    }

    function showWrapper(wrapper){
        wrapper.classList.remove("hide");
    }

    function hideWrapper(wrapper){
        wrapper.classList.add("hide");
    }

    function ParseNumberCurr(numberCurrString){
        return Number.parseInt(numberCurrString.slice(1));
    }

    function hideWrappers(wrappers){
        for (const wrapper of wrappers) {
            wrapper.classList.add("hide");
        }
    }

    function setCorrectWrapper(wrappers, current){
        current.textContent = "01";
        showWrapper(wrappers[0], 1);
    }
});