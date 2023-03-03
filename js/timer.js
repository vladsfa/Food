document.addEventListener("DOMContentLoaded", _ => {
    const days = document.querySelector("#days"),
        hours = document.querySelector("#hours"),
        minutes = document.querySelector("#minutes"),
        seconds = document.querySelector("#seconds");

    const currentDate = new Date();
    const goalDate = new Date(currentDate.getTime() + 10000);
    let diff = goalDate - currentDate;
    setCurrentTime(days, hours, minutes, seconds, diff);
    startTimer(days, hours, minutes, seconds, diff - 1000);

    function startTimer(dayElement, hourElement, minuteElement, secondElement, currentDiff, speed = 1){
        const timer = setInterval(_ => {
            setCurrentTime(dayElement, hourElement, minuteElement, secondElement, currentDiff);
            currentDiff -= 1000;
            if (currentDiff < 0) {
                clearInterval(timer);
            }
        },1000 / speed);
    }

    function setCurrentTime(dayElement, hourElement, minuteElement, secondElement, diff){
        dayElement.textContent = Math.floor(diff / 86400000);
        hourElement.textContent = Math.floor(diff / 3600000) % 24;
        minuteElement.textContent = Math.floor(diff / 60000) % 60;
        secondElement.textContent = Math.floor(diff / 1000) % 60;
    }
});