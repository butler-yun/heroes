"use strict";

const addBtn = document.querySelector(".btn-add");

const HIDE_CL = "hide";
const SHOW_CL = "show";

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    console.log("✔ beforeinstallprompt", event);
    deferredPrompt = event;
    addBtn.classList.replace(HIDE_CL, SHOW_CL);
});

addBtn.addEventListener("click", async () => {
    console.log("✔ addBtn-Clicked");

    if (!deferredPrompt) {
        return;
    }

    deferredPrompt.prompt();

    const result = await deferredPrompt.userChoice;
    console.log(" userChoice", result);

    if (result === "accepted") {
        console.log("User accepted");
    } else {
        console.log("User dismissed");
    }

    deferredPrompt = null;

    addBtn.classList.replace(SHOW_CL, HIDE_CL);
});

window.addEventListener("appinstalled", (event) => {
    console.log("✔ appinstalled", event);
    deferredPrompt = null;
});
