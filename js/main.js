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
  let operand1 = +storedInput[0];
  let operand2 = 0;
  let operator = '';

  //take recent input and  add to storedInput array to calculate!  
  if (tempNumber !== '') {
    console.log(`tempNumber to be pushed into storedInput ${tempNumber}`)
    storedInput.push(tempNumber);
  }
  // if only 1 element within stored array we will display and store the value
  if (storedInput.length === 1) {
    console.log('one element only!');
    inputHistory.textContent = '';
    input.textContent = `${storedInput[0]}`;
    tempNumber = '';
    storedInput = [storedInput[0]];
    return '';
  }
  //check if history is empty and if an operator was the most recent input
  if (checkEmptyHistory()) {
    return '';
  }

  // do math
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
  tempNumber = '';
  input.textContent = `${operand1}`;
  storedInput = [operand1];
}

function getValue(e) {
  //console.log(e.target.value);
  //checks if there is only 1 element in the storedInput and its value is 0
  if (storedInput[0] === 0 && storedInput.length === 1) {
    console.log('funk you');
    storedInput.pop();
  }

  //check if the first value is an operator which, if so, will not register
  for (let op of operatorList) {
    if (storedInput.length === 0 && op === e.target.value && tempNumber == '') {
      alert('dont start with an operator :(');
      return '';
    }
  }

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
    if (op === storedInput[storedInput.length - 1]) {
      storedInput.pop();
    }
  }
}

function checkEmptyHistory() {
  console.log(`storedInput.length: ${storedInput.length}`)
  if (storedInput.length === 0) {
    alert('empty history');
    begone();
    return true;
  }
  return false;
}