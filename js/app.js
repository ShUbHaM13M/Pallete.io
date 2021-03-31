const palette = document.getElementsByClassName("palette");
let previousColors = [];
const copiedText = document.querySelector(".copied-text");

/* 
  class Color -> String 
    r:int , g:int, b:int
    isLocked:Boolean
    generateColors(): function -> void
    getString(): function -> String
*/
class Color {
  constructor() {
    this.r;
    this.g;
    this.b;
    this.isLocked = false;
    this.generateColors();
  }

  generateColors() {
    if (this.isLocked == false) {
      this.r = Math.floor(Math.random() * 254);
      this.g = Math.floor(Math.random() * 254);
      this.b = Math.floor(Math.random() * 254);
    }
  }

  getString() {
    let temp = `rgb(${this.r},${this.g},${this.b})`;
    temp = temp.match(re);
    const color = rgb2hex(
      temp[0].toString(),
      temp[1].toString(),
      temp[2].toString()
    );
    return color;
  }
}

let colorArr = [];

//Regular Expression to get rgb value from array
let re = /[\d]{1,3}/g;

//convert from rgb to hex
function rgb2hex(red, green, blue) {
  var rgb = blue | (green << 8) | (red << 16);
  return "#" + (0x1000000 + rgb).toString(16).slice(1);
}

//Update the text of the updated color in the Palette
function updateColorText() {
  for (let i = 0; i < palette.length; i++) {
    var temp = palette[i].style.backgroundColor;
    temp = temp.match(re);
    const color = rgb2hex(
      temp[0].toString(),
      temp[1].toString(),
      temp[2].toString()
    );
    palette[i].querySelector("#color").innerHTML = color;
  }
}

//Store Previous Colors OnGenerateBtn Clicked
function storePreviousColors() {
  previousColors = [];
  for (let i = 0; i < palette.length; i++) {
    previousColors.push(colorArr[i]);
  }
}

//Set the previous colors on PreviousBtn clicked
function onPreviousBtnClicked() {
  setColors(previousColors);
}

//setColors of the Palettes from the passed array
function setColors(arr) {
  for (let i = 0; i < arr.length; i++) {
    palette[i].style.backgroundColor = arr[i].getString();
  }
  updateColorText();
}

colorArr = [new Color(), new Color(), new Color(), new Color(), new Color()];

function onGenerateBtnPressed() {
  storePreviousColors();
  for (let i = 0; i < palette.length; i++) {
    colorArr[i].generateColors();
  }
  setColors(colorArr);
}

const emojiArr = [
  "😁",
  "👌",
  "✌",
  "🤞",
  "😃",
  "😎",
  "😉",
  "🙌",
  "👏",
  "😊",
  "🙂",
  "🎨",
];

function displayCopiedText() {
  copiedText.innerHTML =
    "Copied " + emojiArr[Math.floor(Math.random() * (emojiArr.length - 1))];
  copiedText.style.display = "block";
  setTimeout(function () {
    copiedText.style.display = "none";
  }, 2000);
}

//events
for (let i = 0; i < palette.length; i++) {
  let currentDiv = palette[i];
  const copyBtn = currentDiv.querySelector("#copy");
  copyBtn.addEventListener("click", function () {
    let temp = currentDiv.style.backgroundColor;
    temp = temp.match(re);
    const color = rgb2hex(
      temp[0].toString(),
      temp[1].toString(),
      temp[2].toString()
    );
    displayCopiedText();
    navigator.clipboard.writeText(color);
  });

  copyBtn.addEventListener("mouseover", function () {
    copyBtn.style.transform = "scale(1.15, 1.15)";
    const tooltipText = currentDiv.querySelector("#tooltip-text");
    tooltipText.style.visibility = "visible";
    tooltipText.style.opacity = 1;
  });

  copyBtn.addEventListener("mouseout", function () {
    copyBtn.style.transform = "scale(1.0, 1.0)";
    const tooltipText = currentDiv.querySelector("#tooltip-text");
    tooltipText.style.visibility = "hidden";
    tooltipText.style.opacity = 0;
  });

  let lockBtn = currentDiv.querySelector("#is-locked");
  lockBtn.addEventListener("click", function () {
    const btnSrc = lockBtn.getAttribute("value");
    const index = currentDiv.getAttribute("value");

    //locking
    if (btnSrc === "unlocked") {
      lockBtn.setAttribute("value", "locked");
      lockBtn.setAttribute("src", "./imgs/icons-lock.svg");
      colorArr[index].isLocked = true;
    }
    //unlocking
    else if (btnSrc === "locked") {
      lockBtn.setAttribute("value", "unlocked");
      lockBtn.setAttribute("src", "./imgs/icons-unlock.svg");
      colorArr[index].isLocked = false;
    }
  });
}

onGenerateBtnPressed();
updateColorText();