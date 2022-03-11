let storedInput = [];
let tempNumber = ''; //actually a string!
let operatorList = ['+', '-', '/', '*'];

let input = document.querySelector('.input');
let inputHistory = document.querySelector('.inputHistory');

// numbers and operators button
const keys = document.querySelectorAll('.keys');
for (let key of keys) {
  key.addEventListener('click', getValue);
}

// equals button
document.querySelector('.equals').addEventListener('click', calculateHistory);
// reset button
document.querySelector('.reset').addEventListener('click', begone);

/**
 * Simple add and return results 
 * @param {number} a 
 * @param {number} b 
 * @returns {number} sum of a and b 
 */
function add(a, b) {
  return a + b;
}

/**
 * Simple subtraction and return results 
 * @param {number} a 
 * @param {number} b 
 * @returns {number} difference of a and b 
 */
function sub(a, b) {
  return a - b;
}

/**
 * Simple divide and return results 
 * @param {number} a 
 * @param {number} b 
 * @returns {number} division of a and b 
 */
function div(a, b) {
  if (b === 0) {
    begone();
    alert('bug off');
    return 0;
  }
  return (a / b).toFixed(2);
}

/**
 * Simple multiply and return results 
 * @param {number} a 
 * @param {number} b 
 * @returns {number} multiplication of a and b 
 */
function mult(a, b) {
  return (a * b).toFixed(2);
}

/**
 * operate() will figure out the type of operator is used and 
 * invoke the appropiate functions to do the math! 
 * @param {number} operand1 
 * @param {string} operator 
 * @param {number} operand2 
 * @returns 
 */
function operate(operand1, operator, operand2) {
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
 * @returns 
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

/**
 * getValue is called when a number key is clicked and if the value 
 * is valid, storeInput will be invoked to store/record the input!
 * 
 * @param {*} e 
 * @returns {string} '' if value is invalid
 */
function getValue(e) {
  //console.log(e.target.value);
  //checks if there is only 1 element in the storedInput and its value is 0
  if (storedInput[0] === 0 && storedInput.length === 1) {
    console.log('funk you');
    storedInput.pop();
  }

  //if the first and only element of storedInput is from the a prior calculation and
  //the user enters a new number to start a fresh input history
  if(storedInput.length === 1 && tempNumber === '' && typeof storedInput[0] === 'number') {
    if (e.target.value !== '*' && e.target.value !== '/' && e.target.value !== '+' && e.target.value !== '-') {
      console.log('lets start a newnew');
      storedInput.pop();
    }
    
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

/**
 * storeInput will display to the user their input aswell as the history
 * of the current storedInput
 * 
 * @param {*} value 
 */
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
}

/**
 * begone() will reset the storedInput array, tempNumber value, the 
 * UI display of the input and the current inputs to be calculated
 */
function begone() {
  tempNumber = '';
  storedInput = [];
  input.textContent = '';
  inputHistory.textContent = '';
}

/**
 * checkConsecutiveOperators() will check if two operands are entered 
 * back to back and makes sure the oldest operator is discarded for the
 * new operator to be utilzed.
 *  
 * @param {*} value 
 */
function checkConsecutiveOperators(value) {
  for (let op of operatorList) {
    if (op === storedInput[storedInput.length - 1]) {
      storedInput.pop();
    }
  }
}

/**
 * checkEmptyHistory() will check when the '=' button is pressed and
 * if storedInput is empty it will help calculate() kick out
 * 
 * @returns {boolean} true if storedInpu is empty, false otherwise
 */
function checkEmptyHistory() {
  console.log(`storedInput.length: ${storedInput.length}`)
  if (storedInput.length === 0) {
    alert('empty history');
    begone();
    return true;
  }
  return false;
}