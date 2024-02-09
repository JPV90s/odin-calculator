let firstOperand = "";
let secondOperand = "";
let currentOperation = "";
let nextOperation = "";
let calculatorOn = true;

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const onOffButton = document.querySelector("#onOff");
const previewDisplay = document.querySelector("#preview");
const resultDisplay = document.querySelector("#result");

numberButtons.forEach((button) => button.addEventListener("click", () => appendNumber(button.textContent)));
operatorButtons.forEach((button) => button.addEventListener("click", () => setOperation(button.textContent)));
equalButton.addEventListener("click", operate);
clearButton.addEventListener("click", clear);
onOffButton.addEventListener("click", turnOnOff);

function appendNumber(number) {
    if(resultDisplay.textContent === "0") {
        if(number === "."){
            resultDisplay.textContent = "";
            resultDisplay.textContent = "0.";
        } else{
            resultDisplay.textContent = "";
            resultDisplay.textContent = number;
        }
    } else if (resultDisplay.textContent !== "0") {
        if(number === "." && resultDisplay.textContent.includes(".")) {
            return
        } else if (number === "." && resultDisplay.textContent.length < 10) {
            resultDisplay.textContent += number;
        } else if (resultDisplay.textContent.length < 10) {
            resultDisplay.textContent += number;
        }
    }
}; 

function setOperation(operator) {
    if(resultDisplay.textContent !== "0" && previewDisplay.textContent === "") {
        if(operator !== "=") {
            firstOperand = resultDisplay.textContent;
            currentOperation = operator;
            previewDisplay.textContent = resultDisplay.textContent + operator;
            resultDisplay.textContent = "";
        } else {
            currentOperation = "";
        }
    }
    if (previewDisplay.textContent !== "" && resultDisplay.textContent !== ""){
        if(operator !== "=") {
            secondOperand = resultDisplay.textContent;
            let result = operate(firstOperand, currentOperation, secondOperand);
            firstOperand = result;
            currentOperation = operator;
            previewDisplay.textContent = result + currentOperation;
            resultDisplay.textContent = ""; 
        } else {
            secondOperand = resultDisplay.textContent;
            let result = operate(firstOperand, currentOperation, secondOperand);
            firstOperand = result;
            currentOperation = "";
            resultDisplay.textContent = result;
            previewDisplay.textContent = "";    
        }
    }
};


function clear() {
    if (previewDisplay.textContent !== "" && resultDisplay.textContent !== "") {
        resultDisplay.textContent = "";
    } else if (previewDisplay.textContent !== "" && resultDisplay.textContent === "") {
        firstOperand = "";
        secondOperand = "";
        currentOperation = "";
        previewDisplay.textContent = "";
        resultDisplay.textContent = "0";
    } else if (resultDisplay.textContent !== "" && previewDisplay.textContent === "") {
        firstOperand = "";
        secondOperand = "";
        currentOperation = "";
        previewDisplay.textContent = "";
        resultDisplay.textContent = "0";
    }
    
};

function turnOnOff() {
    if (calculatorOn) {
        firstOperand = "";
        secondOperand = "";
        currentOperation = null;
        previewDisplay.textContent = "";
        resultDisplay.textContent = "";
        numberButtons.forEach((button) => {
            button.disabled = true;
          });
          operatorButtons.forEach((button) => {
            button.disabled = true;
          });
        clearButton.disabled = true;
          
        calculatorOn = false;
    } else {
        previewDisplay.textContent = "";
        resultDisplay.textContent = "0";
        numberButtons.forEach((button) => {
            button.disabled = false;
          });
          operatorButtons.forEach((button) => {
            button.disabled = false;
          });
        clearButton.disabled = false;
        calculatorOn = true;
    }
};

function operate(frstOprnd, oprtr, scndOprnd) {
    firstOperand = Number(frstOprnd);
    secondOperand = Number(scndOprnd);
    switch(oprtr) {
        case "+":
            return add(firstOperand, secondOperand);
        case "-":
            return subtract(firstOperand, secondOperand);
        case "x":
            return multiply(firstOperand, secondOperand);
        case "÷":
            return divide(firstOperand, secondOperand);
        default:
            return null;
    }
}

function add(a, b) { 
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    if(b === 0){
        return "Hala Madrid!"
    }
    return a / b;
}

