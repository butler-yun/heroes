"use strict";

const addBtn = document.querySelector(".btn-add");
console.log(addBtn);

const HIDE_CL = "hide";
const SHOW_CL = "show";

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    console.log("✔ beforeinstallprompt", event);
    deferredPrompt = event;
    addBtn.classList.replace(HIDE_CL, SHOW_CL);
});

addBtn.addEventListener("click", (event) => {
    console.log("✔ addBtn-Clicked");

    addBtn.classList.replace(SHOW_CL, HIDE_CL);
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
            console.log("User accepted");
        } else {
            console.log("User dismissed");
        }
        deferredPrompt = null;
    });
});

window.addEventListener("appinstalled", (event) => {
    console.log("✔ appinstalled", event);
    deferredPrompt = null;
});
