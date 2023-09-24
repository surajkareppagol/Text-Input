"use strict";

const formInput = document.querySelector(".form__input");
const formDiv = document.querySelector(".form__div");
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

optionNone.addEventListener("click", (event) => {
  currentStyle = "none";
  currentInputStackLength = formInputValue.length;
  formInputValueBold = "";
  formInputValueItalics = "";
});

optionBold.addEventListener("click", (event) => {
  currentStyle = "bold";
  currentInputStackLength = formInputValue.length;
  formInputValueNone = "";
  formInputValueItalics = "";
});

optionItalics.addEventListener("click", (event) => {
  currentStyle = "italics";
  currentInputStackLength = formInputValue.length;
  formInputValueNone = "";
  formInputValueBold = "";
});

optionEmoji.addEventListener("click", (event) => {
  currentStyle = "emoji";
  currentStyle = "italics";

  formInputValueNone = "";
  formInputValueBold = "";
  formInputValueItalics = "";

  emojiBox.classList.toggle("u-display-flex");

  emojiOptions.forEach((emoji) =>
    emoji.addEventListener("click", () => {
      formInputValueEmoji = emoji;
      formInputValue.push(formInputValueEmoji.textContent);
      currentInputStackLength = formInputValue.length;
      emojiBox.classList.toggle("u-display-flex");
    })
  );
});

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
  console.log(formInputValue);
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
