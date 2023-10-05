"use strict";

const optionList = document.querySelectorAll(".option");

let formInputTextValue = "";

export function addStyle(option) {
  optionList.forEach((option) => option.classList.remove("select-option"));

  if (!option) return;

  option.classList.add("select-option");
}

export function setCurrentStyle(currentStyle, style, stylize) {
  if (currentStyle === style) {
    formInputTextValue = "";

    addStyle(null);
    // if same style
    return true;
  }

  formInputTextValue = "";

  addStyle(stylize);
  return false;
}

export function handleFormText(key, type) {
  if (type === "none") {
    formInputTextValue += key;
    return `<span>${formInputTextValue}</span>`;
  } else if (type === "bold") {
    formInputTextValue += key;
    return `<strong>${formInputTextValue}</strong>`;
  } else if (type === "italics") {
    formInputTextValue += key;
    return `<em>${formInputTextValue}</em>`;
  } else if (type === "strikeThrough") {
    formInputTextValue += key;
    return `<span class="u-strike-through">${formInputTextValue}</span>`;
  } else if (type === "code") {
    formInputTextValue += key;
    return `<span class="code">${formInputTextValue}</span>`;
  }
}

export function handleBackSpace(inputValue, stackValue) {
  const indexOfCloseBracket = stackValue.indexOf(">");
  const indexOfOpenBracket = stackValue.lastIndexOf("<");

  const openTag = stackValue.slice(0, indexOfCloseBracket + 1);
  const closeTag = stackValue.slice(indexOfOpenBracket, stackValue.length + 1);

  const value = `${openTag}${inputValue}${closeTag}`;

  if (!inputValue) {
    formInputTextValue = "";
    return null;
  }

  formInputTextValue = inputValue;

  return value;
}

export function cleanUpText() {
  formInputTextValue = "";
}
