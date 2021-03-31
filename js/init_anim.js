const Arr = ['#56CCF2', '#F2994A', "#EB5757"];

const textContainer = document.querySelector('.text-container');
const textString = textContainer.textContent;
textContainer.innerHTML = "";

for (const letter of textString) {
    textContainer.innerHTML += '<span class="letter">' + letter + '</span>';
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick() {
    textContainer.style.display = "inline";
    const span = textContainer.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;
    if (char === textString.length) {
        complete();
        return;
    }
}

function complete() {
    clearInterval(timer);
    timer = null;
    delete(timer);
    animateLogo();
}

function animateLogo() {
    const logo = document.getElementById('logo');
    const one = logo.querySelector('#one');
    const two = logo.querySelector("#two");
    const three = logo.querySelector('#three');

    const tempArr = [one, two, three];
    let timer = setInterval(setColors, 500);

    function setColors() {
        for (let i = 0; i < tempArr.length; i++) {
            tempArr[i].style.fill = Arr[i];
        }
        clearInterval(timer);
        timer = null;
        delete(timer);
    }
}