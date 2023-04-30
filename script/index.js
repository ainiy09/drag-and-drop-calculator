const doneBtn = document.querySelector(".btn__calc");
// doneBtn.onclick = () => calculate();

const cleanBtn = document.querySelector(".clean__btn");
// cleanBtn.onclick = () => clean();
const  calcElements = document.querySelector(".calc__elements");

const workField = document.querySelector(".work__field");

const radioButton1 = document.getElementById("radio-one");
const radioButton2 = document.getElementById("radio-two");

operators.forEach(element => {
    const operatorBtn = document.createElement("button");
    operatorBtn.textContent = element.value;
    operatorBtn.classList.add("operator",element.class);
    // operatorBtn.onclick = () => addValue(element.operator);
    const operatorBox = document.querySelector(".calc__math");
    operatorBox.appendChild(operatorBtn);
    });

numbers.forEach(element => {
        const numberBtn = document.createElement("button");
        numberBtn.textContent = element.value;
        numberBtn.classList.add(element.class, element.number);
        // numberBtn.onclick = () => addValue(element.value);
        const numberBox = document.querySelector(".calc__numbers");
        numberBox.appendChild(numberBtn);
    });

let screenValue = document.querySelector(".screen__result");

let valueStrInMemory = null;
let operatorInMemory = null;

const getValueAsStr = () => screenValue.textContent.split(',').join('');

const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
  if (radioButton1.checked && workField.contains(event.target)){
  if (valueStr[valueStr.length - 1] === '.') {
    screenValue.textContent += '.';
    return;
  }
  const [wholeNumStr, decimalStr] = valueStr.split('.');
  if (decimalStr) {
    screenValue.textContent =
      parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    screenValue.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
}};

const handleNumberClick = (numStr) => {
  const currentValueStr = getValueAsStr();
  if (currentValueStr === '0') {
    setStrAsValue(numStr);
  } else {
    setStrAsValue(currentValueStr + numStr);
  }
};

const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === 'addition') {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === 'subtraction') {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === 'multiplication') {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === 'division') {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsStr();

  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue('0');
    return;
  }
  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue('0');
};


const additionBtn = document.querySelector(".addition__operator");
const subtractionBtn = document.querySelector(".subtraction__operator");
const multiplicationBtn = document.querySelector(".multiplication__operator");
const divisionBtn = document.querySelector(".division__operator");

const decimalBtn = document.querySelector(".decimal");
const number1Btn = document.querySelector(".number1");
const number2Btn = document.querySelector(".number2");
const number3Btn = document.querySelector(".number3");
const number4Btn = document.querySelector(".number4");
const number5Btn = document.querySelector(".number5");
const number6Btn = document.querySelector(".number6");
const number7Btn = document.querySelector(".number7");
const number8Btn = document.querySelector(".number8");
const number9Btn = document.querySelector(".number9");
const number0Btn = document.querySelector(".number0");

const numbersBtnArray = [
  number0Btn, number1Btn, number2Btn, number3Btn, number4Btn,
  number5Btn, number6Btn, number7Btn, number8Btn, number9Btn
];


cleanBtn.addEventListener('click', () => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
});

additionBtn.addEventListener('click', () => {
  handleOperatorClick('addition');
});
subtractionBtn.addEventListener('click', () => {
  handleOperatorClick('subtraction');
});
multiplicationBtn.addEventListener('click', () => {
  handleOperatorClick('multiplication');
});
divisionBtn.addEventListener('click', () => {
  handleOperatorClick('division');
});
doneBtn.addEventListener('click', () => {
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null;
  }
});

for (let i=0; i < numbersBtnArray.length; i++) {
  const numberEl = numbersBtnArray[i];
  numberEl.addEventListener('click', () => {
    handleNumberClick(i.toString());
  });
}
decimalBtn.addEventListener('click', () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes('.')) {
    setStrAsValue(currentValueStr + '.');
  }
});

const draggableElements = [drag1, drag2, drag3, drag4];
const drop1 = document.getElementById("drop");
let isElementDragged = false;


function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
  isElementDragged = true;
};

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(data);
  const workFieldText = document.querySelector(".work__field__text");

  if (event.target === workField) {
    event.target.appendChild(draggableElement);
    if (workField.contains(workFieldText)){workField.removeChild(workFieldText)};
    draggableElement.draggable = false;
    draggableElement.classList.add("dragged");
    workField.style.border = 'none';
    if (draggableElement.id === "drag1") {
      workField.insertBefore(draggableElement, workField.firstChild);}
  } 
  if (isElementDragged) {
    const clonedElement = draggableElement.cloneNode(true);
    clonedElement.classList.add("untouchable");
    clonedElement.draggable = false;
    calcElements.appendChild(clonedElement);
  }
};

function enableDragAndDrop() {
  draggableElements.forEach(element => {
    element.addEventListener("dragstart", drag);
  });
  drop1.addEventListener("dragover", function(event) {
    event.preventDefault();
  });
  drop1.removeEventListener('drop', drop);
  drop1.addEventListener('drop', drop);
};

function disableDragAndDrop() {
  draggableElements.forEach(element => {
    element.removeEventListener("dragstart", drag);
  });
  drop1.removeEventListener("dragover", function(event) {
    event.preventDefault();
  });
  drop1.removeEventListener('drop', drop);
};

radioButton2.addEventListener('change', function(event) {
    if (radioButton2.checked) {
        enableDragAndDrop();
    } else {
        disableDragAndDrop();
    }
});

radioButton1.addEventListener('change', function(event) {
    if (radioButton1.checked) {
        disableDragAndDrop();
    } else {
        enableDragAndDrop();
    }
});