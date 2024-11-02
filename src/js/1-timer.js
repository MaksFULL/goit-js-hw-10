import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const currentDate = Date.now() / 1000;
const dateTime = document.querySelector("#datetime-picker");
const buttonStart = document.querySelector("[data-start]");
let daysValue = document.querySelector("[data-days]");
let hoursValue = document.querySelector("[data-hours]");
let minutesValue = document.querySelector("[data-minutes]");
let secondsValue = document.querySelector("[data-seconds]");
buttonStart.setAttribute("disabled", true);
let selectedTime = 0;
let timerID = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if ((selectedDates[0].getTime()/1000)> currentDate) {
            selectedTime = selectedDates[0].getTime() / 1000;
            buttonStart.removeAttribute("disabled");
        }
        else {
            buttonStart.setAttribute("disabled", true);
            iziToast.error({
                message: "Please choose a date in the future",
                backgroundColor: "#ef4040",
                messageColor: "#ffffff",
                position: 'topRight', 
                theme: 'dark',
            });
        };
    },
};
flatpickr(dateTime, options);

const startTimer = () => {
    buttonStart.setAttribute("disabled", true);
    dateTime.setAttribute("disabled", true);
    timerID = setInterval(() => {
        const timeForStart = Math.floor(selectedTime - currentDate);
        daysValue.textContent = String(Math.floor(timeForStart / (24 * 60 * 60))).padStart(2, 0);
        hoursValue.textContent = String(Math.floor(timeForStart % (24 * 60 * 60) / (60 * 60))).padStart(2, 0);
        minutesValue.textContent = String(Math.floor(timeForStart % (60 * 60) / 60)).padStart(2, 0);
        secondsValue.textContent = String(timeForStart % 60).padStart(2, 0);
        selectedTime--;
        if (timeForStart === 0) {
            clearInterval(timerID)
            buttonStart.removeAttribute("disabled");
            dateTime.removeAttribute("disabled");
            iziToast.info({
                message: "Interval stopped!",
                backgroundColor: "#0090f0",
                messageColor: "#ffffff",
                position: 'topRight', 
                theme: 'dark',
            });
            };
    }, 1000)
};

buttonStart.addEventListener("click", startTimer);