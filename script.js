const calculator = document.getElementById("calculator");
const expression = document.getElementById("expression");
const result = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let currentNumber = "0";
let storedNumber = null;
let selectedOperator = null;
let ResetScreen = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.id === "clear") {
      clear();
    } else if (button.id === "pam") {
      toggleSign();
    } else if (button.id === "pourc") {
      percent();
    } else if (button.id === "divide") {
      selectOperator("/");
    } else if (button.id === "multiply") {
      selectOperator("*");
    } else if (button.id === "subtract") {
      selectOperator("-");
    } else if (button.id === "add") {
      selectOperator("+");
    } else if (button.id === "delete") {
      deleteNumber();
    } else if (button.id === "equals") {
      operator();
    } else {
      appendNumber(button.textContent);
    }
    updateScreen();
  });
});

function updateScreen() {
  if (storedNumber === null) {
    expression.textContent = `${currentNumber}`;
    result.textContent = `${currentNumber}`;
  } else {
    expression.textContent = `${storedNumber} ${selectedOperator} ${currentNumber}`;
    result.textContent = `${storedNumber} ${selectedOperator}`;
  }
  if (ResetScreen) {
    result.textContent = currentNumber;
    ResetScreen = false;
  }
}

function clear() {
  currentNumber = "0";
  storedNumber = null;
  selectedOperator = null;
}

function percent() {
  currentNumber = `${parseFloat(currentNumber) / 100}`;
}

function selectOperator(operator) {
  if (selectedOperator !== null) {
    operator();
  }
  storedNumber = currentNumber;
  selectedOperator = operator;
  ResetScreen = true;
}

function deleteNumber() {
  currentNumber = currentNumber.slice(0, -1);
}

function appendNumber(number) {
  if (currentNumber === "0") {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
}

function operator() {
  const num1 = storedNumber;
  const num2 = currentNumber;
  switch (selectedOperator) {
    case "+":
      currentNumber = `${parseFloat(num1) + parseFloat(num2)}`;
      break;
    case "-":
      currentNumber = `${num1 - num2}`;
      break;
    case "*":
      currentNumber = `${num1 * num2}`;
      break;
    case "/":
      currentNumber = `${num1 / num2}`;
      break;
    default:
      return;
  }
  storedNumber = null;
  selectedOperator = null;
  ResetScreen = true;
}