import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

const handleForm = (event) => {
    event.preventDefault();
    const delay = event.currentTarget.elements.delay.value;
    const radioSelect = event.currentTarget.elements.state.value;

    return new Promise((resolve, reject) => {
        form.reset();
        setTimeout(() => {
            if (radioSelect === "fulfilled") resolve();
            else reject();
        }, delay)
    }).then(() => {
        iziToast.success({
            theme: 'dark',
            title: "OK",
            message: `Fulfilled promise in ${delay}ms`,
            position: 'topRight',
            backgroundColor: "#59A10D",
            titleColor: "#fff",
            messageColor: "#fff",
        })
    }).catch(() => {
        iziToast.error({
            theme: 'dark',
            title: "Error",
            message: `Rejected promise in ${delay}ms`,
            position: 'topRight',
            backgroundColor: "#EF4040",
            titleColor: "#fff",
            messageColor: "#fff",
        })
    });
}

form.addEventListener("submit", handleForm);