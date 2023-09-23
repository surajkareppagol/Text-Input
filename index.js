"use strict";

const formInput = document.querySelector(".form__input");
const formDiv = document.querySelector(".form__div");
const optionBold = document.querySelector(".option__b");
const optionItalics = document.querySelector(".option__i");
const optionNone = document.querySelector(".option__n");

let formInputValue = [];
let formInputValueBold = "";
let formInputValueItalics = "";
let formInputValueNone = "";

let currentStyle = "none";
let previousStyle = "none";

let currentInputStackLength = 0;

let parts = 0;

formInput.addEventListener("keydown", (event) => {
  optionNone.addEventListener("click", (event) => {
    previousStyle = currentStyle;
    currentStyle = "none";
  });

  optionBold.addEventListener("click", (event) => {
    previousStyle = currentStyle;
    currentStyle = "bold";
  });

  optionItalics.addEventListener("click", (event) => {
    previousStyle = currentStyle;
    currentStyle = "italics";
  });

  if (event.key.length === 1) {
    if (currentStyle == "none") {
      if (formInputValue.length > currentInputStackLength) formInputValue.pop();

      currentInputStackLength = formInputValue.length;

      formInputValueNone += event.key;

      formInputValue.push(formInputValueNone);

      if (formInputValue.length !== currentInputStackLength) {
        if (previousStyle == "bold") {
          formInputValue.push(formInputValueBold);
        } else if (previousStyle == "italics") {
          formInputValue.push(formInputValueItalics);
        }
      }

      formInputValueBold = "";
      formInputValueItalics = "";
    } else if (currentStyle == "bold") {
      if (formInputValue.length > currentInputStackLength) formInputValue.pop();

      currentInputStackLength = formInputValue.length;

      formInputValueBold += event.key;

      formInputValue.push(`<strong>${formInputValueBold}</strong>`);

      if (formInputValue.length !== currentInputStackLength) {
        if (previousStyle == "none") {
          formInputValue.push(formInputValueNone);
        } else if (previousStyle == "italics") {
          formInputValue.push(formInputValueItalics);
        }
      }

      formInputValueNone = "";
      formInputValueItalics = "";
    } else if (currentStyle == "italics") {
      if (formInputValue.length > currentInputStackLength) formInputValue.pop();

      currentInputStackLength = formInputValue.length;

      formInputValueItalics += event.key;

      formInputValue.push(`<em>${formInputValueItalics}</em>`);

      if (formInputValue.length !== currentInputStackLength) {
        if (previousStyle == "none") {
          formInputValue.push(formInputValueNone);
        } else if (previousStyle == "bold") {
          formInputValue.push(formInputValueBold);
        }
      }

      formInputValueNone = "";
      formInputValueBold = "";
    }
  }

  formDiv.innerHTML = `<p class="form__p">${formInputValue.join(" ")}</p>`;
});
