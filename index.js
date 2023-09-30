"use strict";

const formInput = document.querySelector(".form__input");
const formDiv = document.querySelector(".form__div");
const optionList = document.querySelectorAll(".option");
const optionBold = document.querySelector(".option__b");
const optionItalics = document.querySelector(".option__i");
const optionStrikeThrough = document.querySelector(".option__s");
const optionEmoji = document.querySelector(".option__e");

const emojiBox = document.querySelector(".emoji-box");
const emojiOptions = document.querySelectorAll(".emoji-option");

let formInputValue = [];
let formInputValueBold = "";
let formInputValueItalics = "";
let formInputValueStrikeThrough = "";
let formInputValueEmoji = "";
let formInputValueNone = "";

let currentStyle = "none";

let currentInputStackLength = 0;

function addStyle(option) {
  optionList.forEach((option) => option.classList.remove("select-option"));

  if (!option) return;

  option.classList.add("select-option");
}

optionStrikeThrough.addEventListener("click", (event) => {
  if (currentStyle === "strikeThrough") {
    currentStyle = "none";
    currentInputStackLength = formInputValue.length;
    formInputValueBold = "";
    formInputValueItalics = "";
    formInputValueNone = "";

    addStyle(null);
    return;
  }

  currentStyle = "strikeThrough";
  currentInputStackLength = formInputValue.length;
  formInputValueBold = "";
  formInputValueItalics = "";
  formInputValueNone = "";

  addStyle(optionStrikeThrough);
});

optionBold.addEventListener("click", (event) => {
  if (currentStyle === "bold") {
    currentStyle = "none";
    currentInputStackLength = formInputValue.length;
    formInputValueStrikeThrough = "";
    formInputValueItalics = "";
    formInputValueNone = "";

    addStyle(null);
    return;
  }

  currentStyle = "bold";
  currentInputStackLength = formInputValue.length;
  formInputValueStrikeThrough = "";
  formInputValueItalics = "";
  formInputValueNone = "";

  addStyle(optionBold);
});

optionItalics.addEventListener("click", (event) => {
  if (currentStyle === "italics") {
    currentStyle = "none";
    currentInputStackLength = formInputValue.length;
    formInputValueStrikeThrough = "";
    formInputValueBold = "";
    formInputValueNone = "";

    addStyle(null);
    return;
  }

  currentStyle = "italics";
  currentInputStackLength = formInputValue.length;
  formInputValueStrikeThrough = "";
  formInputValueBold = "";
  formInputValueNone = "";

  addStyle(optionItalics);
});

optionEmoji.addEventListener("click", (event) => {
  currentStyle = "emoji";

  formInputValueStrikeThrough = "";
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
        break;
      case "strikeThrough":
        handleFormText(event.key, "strikeThrough");
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
  } else if (type === "strikeThrough") {
    formInputValueStrikeThrough += key;
    formInputValue.push(
      `<span class="u-strike-through">${formInputValueStrikeThrough}</span>`
    );
  }
}
