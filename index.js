"use strict";

import {
  setCurrentStyle,
  handleFormText,
  handleBackSpace,
  cleanUpText,
} from "./util.js";

const formInput = document.querySelector(".form__input");
const formDiv = document.querySelector(".form__div");

const optionBold = document.querySelector(".option__b");
const optionItalics = document.querySelector(".option__i");
const optionStrikeThrough = document.querySelector(".option__s");
const optionCode = document.querySelector(".option__c");
const optionEmoji = document.querySelector(".option__e");

const emojiBox = document.querySelector(".emoji-box");
const emojiOptions = document.querySelectorAll(".emoji-option");

let formInputValue = [];
let textWithDeletedLetter = "";
let stackValue = "";

let isSameStyle = false;

let currentStyle = "none";

let currentInputStackLength = 0;

if (formInputValue.length === 0) {
  formDiv.innerHTML = "<p class='form__p-empty'>Start Writing Here...</p>";
}

optionBold.addEventListener("click", () => {
  currentInputStackLength = formInputValue.length;
  isSameStyle = setCurrentStyle(currentStyle, "bold", optionBold);

  currentStyle = "bold";
  if (isSameStyle) currentStyle = "none";
});

optionItalics.addEventListener("click", () => {
  currentInputStackLength = formInputValue.length;
  isSameStyle = setCurrentStyle(currentStyle, "italics", optionItalics);

  currentStyle = "italics";
  if (isSameStyle) currentStyle = "none";
});

optionStrikeThrough.addEventListener("click", () => {
  currentInputStackLength = formInputValue.length;
  isSameStyle = setCurrentStyle(
    currentStyle,
    "strikeThrough",
    optionStrikeThrough
  );

  currentStyle = "strikeThrough";
  if (isSameStyle) currentStyle = "none";
});

optionCode.addEventListener("click", () => {
  currentInputStackLength = formInputValue.length;
  isSameStyle = setCurrentStyle(currentStyle, "code", optionCode);

  currentStyle = "code";
  if (isSameStyle) currentStyle = "none";
});

optionEmoji.addEventListener("click", () => {
  emojiBox.classList.toggle("u-display-flex");
});

emojiOptions.forEach((emoji) => {
  emoji.addEventListener("click", () => {
    cleanUpText();
    const selectedEmoji = emoji.textContent;
    formInputValue.push(selectedEmoji);
    currentInputStackLength = formInputValue.length;

    formDiv.innerHTML = `<p class="form__p">${formInputValue.join(" ")}</p>`;
    emojiBox.classList.remove("u-display-flex");
  });
});

formInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    formInputValue.push("<br />");
    currentInputStackLength = formInputValue.length;
    cleanUpText();
  }

  if (event.key === "Backspace" && formInputValue.length !== 0) {
    textWithDeletedLetter = handleBackSpace(
      formInput.value.slice(0, -1),
      formInputValue.at(-1)
    );
    formInputValue.pop();

    if (textWithDeletedLetter !== null) {
      formInputValue.push(textWithDeletedLetter);
    }
  }

  if (event.key.length === 1) {
    if (formInputValue.length > currentInputStackLength) formInputValue.pop();

    switch (currentStyle) {
      case "none":
        stackValue = handleFormText(event.key, "none");
        break;
      case "bold":
        stackValue = handleFormText(event.key, "bold");
        break;
      case "italics":
        stackValue = handleFormText(event.key, "italics");
        break;
      case "strikeThrough":
        stackValue = handleFormText(event.key, "strikeThrough");
        break;
      case "code":
        stackValue = handleFormText(event.key, "code");
    }

    formInputValue.push(stackValue);
  }

  formDiv.innerHTML = `<p class="form__p">${formInputValue.join(" ")}</p>`;

  if (formInputValue.length === 0) {
    formDiv.innerHTML = "<p class='form__p-empty'>Start Writing Here...</p>";
  }
});
