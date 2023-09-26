"use strict";

const formInput = document.querySelector(".form__input");
const formDiv = document.querySelector(".form__div");
const optionList = document.querySelectorAll(".option");
const optionBold = document.querySelector(".option__b");
const optionItalics = document.querySelector(".option__i");
const optionNone = document.querySelector(".option__n");
const optionEmoji = document.querySelector(".option__e");

const emojiBox = document.querySelector(".emoji-box");
const emojiOptions = document.querySelectorAll(".emoji-option");

let formInputValue = [];
let formInputValueBold = "";
let formInputValueItalics = "";
let formInputValueNone = "";
let formInputValueEmoji = "";

let currentStyle = "none";

let currentInputStackLength = 0;

function addStyle(option) {
  optionList.forEach((option) => option.classList.remove("select-option"));
  option.classList.add("select-option");
}

addStyle(optionNone);

optionNone.addEventListener("click", (event) => {
  currentStyle = "none";
  currentInputStackLength = formInputValue.length;
  formInputValueBold = "";
  formInputValueItalics = "";

  addStyle(optionNone);
});

optionBold.addEventListener("click", (event) => {
  if (currentStyle === "bold") {
    currentStyle = "none";
    currentInputStackLength = formInputValue.length;
    formInputValueNone = "";
    formInputValueItalics = "";
    addStyle(optionNone);
    return;
  }

  currentStyle = "bold";
  currentInputStackLength = formInputValue.length;
  formInputValueNone = "";
  formInputValueItalics = "";

  addStyle(optionBold);
});

optionItalics.addEventListener("click", (event) => {
  if (currentStyle === "italics") {
    currentStyle = "none";
    addStyle(optionNone);
    currentInputStackLength = formInputValue.length;
    formInputValueNone = "";
    formInputValueBold = "";
    return;
  }

  currentStyle = "italics";
  currentInputStackLength = formInputValue.length;
  formInputValueNone = "";
  formInputValueBold = "";

  addStyle(optionItalics);
});

optionEmoji.addEventListener("click", (event) => {
  currentStyle = "emoji";

  formInputValueNone = "";
  formInputValueBold = "";
  formInputValueItalics = "";

  emojiBox.classList.toggle("u-display-flex");
});

emojiOptions.forEach((emoji) =>
  emoji.addEventListener("click", () => {
    formInputValueEmoji = emoji;
    formInputValue.push(formInputValueEmoji.textContent);
    currentInputStackLength = formInputValue.length;
    formDiv.innerHTML = `<p class="form__p">${formInputValue.join(" ")}</p>`;
    emojiBox.classList.remove("u-display-flex");
    currentStyle = "none";
  })
);

formInput.addEventListener("keydown", (event) => {
  if (event.key.length === 1) {
    switch (currentStyle) {
      case "none":
        handleFormText(event.key, "none");
        break;
      case "bold":
        handleFormText(event.key, "bold");
        break;
      case "italics":
        handleFormText(event.key, "italics");
    }
  }

  formDiv.innerHTML = `<p class="form__p">${formInputValue.join(" ")}</p>`;
});

function handleFormText(key, type) {
  if (formInputValue.length > currentInputStackLength) formInputValue.pop();

  if (type === "none") {
    formInputValueNone += key;
    formInputValue.push(formInputValueNone);
  } else if (type === "bold") {
    formInputValueBold += key;
    formInputValue.push(`<strong>${formInputValueBold}</strong>`);
  } else if (type === "italics") {
    formInputValueItalics += key;
    formInputValue.push(`<em>${formInputValueItalics}</em>`);
  }
}
