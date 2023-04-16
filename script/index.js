const doneBtn = document.querySelector(".btn__calc");
    doneBtn.onclick = () => calculate();

const cleanBtn = document.querySelector(".clean__btn");
    cleanBtn.onclick = () => clean()

operators.forEach(element => {
    const operatorBtn = document.createElement("button");
    operatorBtn.textContent = element.value;
    operatorBtn.className = "operator";
    operatorBtn.onclick = () => addValue(element.operator);
    const operatorBox = document.querySelector(".calc__math");
    operatorBox.appendChild(operatorBtn);
    });

function addValue(value) {
    const screen = document.querySelector(".screen__result");
    screen.innerHTML += value;
}

function clean() {
    const screenToClean = document.querySelector(".screen__result");
    screenToClean.textContent = "";
}

function calculate() {
    const resultScreen = document.querySelector(".screen__result");
    const result = eval(resultScreen.textContent);
    resultScreen.textContent = result;
  }

numbers.forEach(element => {
    const numberBtn = document.createElement("button");
    numberBtn.textContent = element.value;
    numberBtn.className = "number";
    numberBtn.onclick = () => addValue(element.value);
    const numberBox = document.querySelector(".calc__numbers");
    numberBox.appendChild(numberBtn);
})

