"use strict";

const body = document.querySelector("body");
const header = document.querySelector("header");
const nav = document.querySelector(".nav.mobile-nav");
const triggerBtn = document.querySelector(".btn-trigger");
const closeBtn = document.querySelector("nav .btn-close");

const MENU_OPEN_CN = "menu-open";
const SHOW_CN = "show";
const SCROLLDED_CN = "scrolled";
const DELAY_TIME = 100;

let currentItem;
let dropped = true;
let resizeTimer = null;

function showDropdown(elm) {
    elm.classList.add(SHOW_CN);
    currentItem = elm;
}

function hideDropdown(currentItem) {
    currentItem.classList.remove(SHOW_CN);
    currentItem = "";
}

// accordion navigation
nav.addEventListener("click", (event) => {
    const target = event.target;
    const navItem = target.closest(".nav__item");

    if (navItem == null) {
        return;
    } else if (navItem.matches(`.${SHOW_CN}`)) {
        navItem.classList.remove(SHOW_CN);
        return;
    }

    if (currentItem) {
        hideDropdown(currentItem);
        dropped = true;
    }

    if (dropped) {
        showDropdown(navItem);
        currentItem = navItem;
        dropped = false;
    }
});

// open navigation
triggerBtn.addEventListener("click", () => {
    triggerBtn.ariaExpanded = true;
    body.classList.add(MENU_OPEN_CN);
});

// close navigation
closeBtn.addEventListener("click", () => {
    triggerBtn.ariaExpanded = false;
    body.classList.remove(MENU_OPEN_CN);
});

// window resize event
window.addEventListener(
    "resize",
    () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            const screenWidth = window.innerWidth;

            if (screenWidth >= 1200) {
                if (currentItem == null) {
                    return;
                }

                hideDropdown(currentItem);
                body.classList.remove(MENU_OPEN_CN);
                triggerBtn.ariaExpanded = false;
            }
        }, DELAY_TIME);
    },
    false
);

// scroll event
window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (y === 0) {
        header.classList.remove(SCROLLDED_CN);
    } else if (y >= 30) {
        header.classList.add(SCROLLDED_CN);
    }
});
