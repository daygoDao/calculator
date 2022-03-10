document.querySelector('.input').textContent = 'Y0';
document.querySelector('.inputHistory').textContent = 'Y0';

//operators
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function div(a, b) {
  return a / b;
}

function mult(a, b) {
  return a * b;
}

function operate(operator, operand1, operand2) {
  console.log(arguments[0], arguments[1], arguments[2]);
  if(operator === '+') {
    return add(operand1, operand2);
  } else if (operator === '-') {
    return sub(operand1, operand2);
  } else if (operator === '/') {
    return div(operand1, operand2);
  } else if (operator === '*') {
    return mult(operand1, operand2);
  }
}