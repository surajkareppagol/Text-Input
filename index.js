"use strict";

const formInput = document.querySelector(".form__input");
const formDiv = document.querySelector(".form__div");
const optionList = document.querySelectorAll(".option");
const optionBold = document.querySelector(".option__b");
const optionItalics = document.querySelector(".option__i");
const optionStrikeThrough = document.querySelector(".option__s");
const optionCode = document.querySelector(".option__c");
const optionEmoji = document.querySelector(".option__e");

const emojiBox = document.querySelector(".emoji-box");
const emojiOptions = document.querySelectorAll(".emoji-option");

let formInputValue = [];
let formInputTextValue = "";

let currentStyle = "none";

let currentInputStackLength = 0;

if (formInputValue.length === 0) {
  formDiv.innerHTML = "<p class='form__p-empty'>Start Writing Here...</p>";
}

function addStyle(option) {
  optionList.forEach((option) => option.classList.remove("select-option"));

  if (!option) return;

  option.classList.add("select-option");
}

optionBold.addEventListener("click", () => {
  setCurrentStyle("bold", optionBold);
});

optionItalics.addEventListener("click", () => {
  setCurrentStyle("italics", optionItalics);
});

optionStrikeThrough.addEventListener("click", () => {
  setCurrentStyle("strikeThrough", optionStrikeThrough);
});

optionCode.addEventListener("click", () => {
  setCurrentStyle("code", optionCode);
});

optionEmoji.addEventListener("click", () => {
  emojiBox.classList.toggle("u-display-flex");
});

emojiOptions.forEach((emoji) =>
  emoji.addEventListener("click", () => {
    formInputTextValue = emoji;

    formInputValue.push(formInputTextValue.textContent);
    currentInputStackLength = formInputValue.length;

    formDiv.innerHTML = `<p class="form__p">${formInputValue.join(" ")}</p>`;
    emojiBox.classList.remove("u-display-flex");

    formInputTextValue = "";
    currentStyle = "none";
  })
);

formInput.addEventListener("keydown", (event) => {
  if (event.key === "Backspace" && formInputValue.length !== 0) {
    handleBackSpace();
  }

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
        break;
      case "strikeThrough":
        handleFormText(event.key, "strikeThrough");
        break;
      case "code":
        handleFormText(event.key, "code");
    }
  }

  formDiv.innerHTML = `<p class="form__p">${formInputValue.join(" ")}</p>`;

  if (formInputValue.length === 0) {
    formDiv.innerHTML = "<p class='form__p-empty'>Start Writing Here...</p>";
  }
});

function handleFormText(key, type) {
  if (formInputValue.length > currentInputStackLength) formInputValue.pop();

  if (type === "none") {
    formInputTextValue += key;
    formInputValue.push(`<span>${formInputTextValue}</span>`);
  } else if (type === "bold") {
    formInputTextValue += key;
    formInputValue.push(`<strong>${formInputTextValue}</strong>`);
  } else if (type === "italics") {
    formInputTextValue += key;
    formInputValue.push(`<em>${formInputTextValue}</em>`);
  } else if (type === "strikeThrough") {
    formInputTextValue += key;
    formInputValue.push(
      `<span class="u-strike-through">${formInputTextValue}</span>`
    );
  } else if (type === "code") {
    formInputTextValue += key;
    formInputValue.push(`<span class="code">${formInputTextValue}</span>`);
  }
}

function handleBackSpace() {
  const lastItem = formInputValue.at(-1);

  const indexOfCloseBracket = lastItem.indexOf(">");
  const indexOfOpenBracket = lastItem.lastIndexOf("<");

  const tagValue = lastItem
    .slice(indexOfCloseBracket + 1, indexOfOpenBracket)
    .slice(0, -1);

  const value = `${lastItem.slice(
    0,
    indexOfCloseBracket + 1
  )}${tagValue}${lastItem.slice(indexOfOpenBracket, lastItem.length + 1)}`;

  formInputValue.pop();

  formInputTextValue = formInputTextValue.slice(0, -1);

  if (!tagValue) {
    return;
  }

  formInputValue.push(value);
}

function setCurrentStyle(style, stylize) {
  if (currentStyle === style) {
    currentStyle = "none";
    currentInputStackLength = formInputValue.length;
    formInputTextValue = "";

    addStyle(null);
    return;
  }

  currentStyle = style;
  currentInputStackLength = formInputValue.length;
  formInputTextValue = "";

  addStyle(stylize);
}
