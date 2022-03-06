"use strict";

const form = document.querySelector("form");
const errorText = form.querySelector(".error-text");

const VISIBLE_TAG_CN = "visible-nametag";
const EMPTY_TEXT_CN = "empty-text";
const ERROR_CN = "error";

let email;
let currentNameTag;

function chkword(input) {
    const value = input.value;
    const leng = value.length;
    const lable = input.nextElementSibling;
    const errorText = input.parentElement.nextElementSibling;

    if (leng === 0) {
        input.classList.add(ERROR_CN);
        currentNameTag.classList.add(ERROR_CN);
        showEmtpyText(lable);
        showErrorMsg(errorText);

        return;
    }

    email = emailCheck(value);

    // email
    if (!email) {
        input.classList.add(ERROR_CN);
        currentNameTag.classList.add(ERROR_CN);
        showErrorMsg(errorText);
    } else {
        input.classList.remove(ERROR_CN);
        currentNameTag.classList.remove(ERROR_CN);
        hideErrorMsg(errorText);
    }

    // password
    if (input.matches("#userPassword") && leng !== 0) {
        input.classList.remove(ERROR_CN);
        currentNameTag.classList.remove(ERROR_CN);
        hideErrorMsg(errorText);
    }
}

function emailCheck(email) {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    return regex.test(email);
}

function showEmtpyText(lable) {
    lable.classList.add(EMPTY_TEXT_CN);
}

function hideEmptyText(lable) {
    lable.classList.remove(EMPTY_TEXT_CN);
}

function showErrorMsg(text) {
    text.classList.add(ERROR_CN);
}

function hideErrorMsg(text) {
    text.classList.remove(ERROR_CN);
}

function visibleTag(tag) {
    tag.classList.add(VISIBLE_TAG_CN);
}

function hiddenTag(tag) {
    tag.classList.remove(VISIBLE_TAG_CN);
}

form.addEventListener(
    "focus",
    (event) => {
        const target = event.target;
        const lable = target.nextElementSibling;
        const nameTag = target.previousElementSibling;

        currentNameTag = nameTag;

        visibleTag(nameTag);

        if (lable.matches(".empty-text")) {
            hideEmptyText(lable);

            return;
        }
    },
    true
);

form.addEventListener(
    "blur",
    (event) => {
        const target = event.target;
        const nameTag = target.previousElementSibling;

        hiddenTag(nameTag);
        chkword(target);
    },
    true
);
