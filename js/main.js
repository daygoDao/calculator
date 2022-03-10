let storedInput = [];
let tempNumber = ''; //actually a string!
let operatorList = ['+', '-', '/', '*'];

let input = document.querySelector('.input');
let inputHistory = document.querySelector('.inputHistory');

// equals button
document.querySelector('.equals').addEventListener('click', calculateHistory);
// reset button
document.querySelector('.reset').addEventListener('click', begone);

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
  if (b === 0) {
    console.log('badbadnogood')
    begone();
    alert('bug off');
    return 0;
  }
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
    return sub(operand1, operand2);
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
 * @return: none   
 */
function calculateHistory() {
  //take recent input and  add to storedInput array to calculate!  
  if (tempNumber !== '') {
    console.log(tempNumber)
    storedInput.push(tempNumber);
  }
  //let total = 0;
  let operand1 = +storedInput[0];
  let operand2 = 0;
  let operator = '';
  //console.log(storedInput.length);
  for (let i = 1; i < storedInput.length - 1; i += 2) {
    operator = storedInput[i];
    operand2 = +storedInput[i + 1];
    console.log(`operand1: ${operand1}; operand2: ${operand2}; operator: ${operator}`);
    //3console.log(`operate() returns: ${operate(operand1, operator, operand2)}`);
    operand1 = operate(operand1, operator, operand2);
  }
  console.log(`operand1's value is ${operand1}`);

  //output and store as first storedInput element
  inputHistory.textContent = '';
  input.textContent = `${operand1}`;
  tempNumber = '';
  storedInput = [operand1];
}

function getValue(e) {
  //console.log(e.target.value);
  storeInput(e.target.value);
}

function storeInput(value) {
  //check if value is part of a number or an operator
  if (value === '+' || value === '-' || value === '/' || value === '*') {
    if (tempNumber !== '') {
      storedInput.push(tempNumber);
    }
    checkConsecutiveOperators(value);
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


function begone() {
  tempNumber = '';
  storedInput = [];
  input.textContent = '';
  inputHistory.textContent = '';
}

function checkConsecutiveOperators(value) {
  for (let op of operatorList) {
    if(op === storedInput[storedInput.length - 1]) {
      storedInput.pop();
    }
  }
}