let storedInput = [];
let tempNumber = ''; //actually a string!

let input = document.querySelector('.input');
let inputHistory = document.querySelector('.inputHistory');

//operators
function add(a, b) {
  console.log('ayo from add');
  return a + b;
}

function sub(a, b) {
  console.log('ayo from sub');
  return a - b;
}

function div(a, b) {
  console.log('ayo from div');
  return a / b;
}

function mult(a, b) {
  console.log('ayo from mult');
  return a * b;
}

function operate(operand1, operator, operand2) {
  //console.log(arguments[0], arguments[1], arguments[2]);
  if (operator === '+') {
    return add(operand1, operand2);
  } else if (operator === '-') {
    return console.log(sub(operand1, operand2));
  } else if (operator === '/') {
    return div(operand1, operand2);
  } else if (operator === '*') {
    return mult(operand1, operand2);
  }
}

/**
 * Returns the total of all storedInput with the help of operate()
 * 
 * @param: none
 * @return {number} total value    
 */
function calculateHistory() {
  //let total = 0;
  let operand1 = +storedInput[0];
  let operand2 = 0;
  let operator = '';
  //console.log(storedInput.length);
  for (let i = 1; i < storedInput.length - 1; i += 2) {
    console.log(operand1)
    operator = storedInput[i];
    operand2 = +storedInput[i + 1];

    console.log(`operand1: ${operand1}; operand2: ${operand2}; operator: ${operator}`);
    operand1 += operate(operand1, operator, operand2);
  }
}

function getValue(e) {
  //console.log(e.target.value);
  storeInput(e.target.value);
}

function storeInput(value) {
  // when '=' is clicked
  if (value === '=') {
    storedInput.push(tempNumber);
    calculateHistory();
  }
  //check if value is part of a number or an operator
  if (value === '+' || value === '-' || value === '/' || value === '*') {
    storedInput.push(tempNumber);
    storedInput.push(value);
    tempNumber = '';
    inputHistory.textContent = storedInput.join(' ');
    input.textContent = '';
  } else {
    tempNumber += value;
    input.textContent = tempNumber;
  }
  //storedInput.push(value);
  //console.log(tempNumber);
}

const keys = document.querySelectorAll('.keys');
for (let key of keys) {
  key.addEventListener('click', getValue);
}

// reset button
document.querySelector('.reset').addEventListener('click', begone)

function begone() {
  tempNumber = '';
  storedInput = [];
  input.textContent = '';
  inputHistory.textContent = '';
}