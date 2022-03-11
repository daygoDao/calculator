# Calculator

## Description 
The plot of this program is to mimic a simple calculator with the standard functions that include adding, subtracting, dividing, and multiplying.
This calculator should be able to store user input and continue calculations until a new set of operations is initiated or if the calculator is 'cleared'.

### plan of attack 
- [&check;] built the UI skeleton with html with all the appropriate sections and buttons in their place 
- [&check;] create functions for operators add, sub, div, and multi
  - [&check;] this will be outputted to the console inititally, then implemented into UI 
- [&check;] create a function operate() that takes an operator and 2 numbers and then calls one of the functions(add, sub, div, mult). 
- [&check;] UI of calculator should have
  - a clear button
  - buttons for each digit
  - buttons for each of the 4 operator functions
  - button for the 'equals' key
- [&check;] create a function that displays and populates when numbers are clicked
  - values should be stored somewhere
- [&check;] make calculator work! store first number that is input into the calc when user presses an operator. ALSO save when operation has been chosen and thenn operate() on them when user pressese the '=' key
  - code should already populate the display, so once operate() is invoked, update the display with the solution to the operation
  - (hard) figure out how to store all the values and call operate() with them

  *Gotchas: watch out for and fix these bugs if they show up in your code:*
    + [_] implement a negative button for the user to input negative numbers!
    + [&check;] Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42. An example of the behavior we’re looking for would be this student solution.
    + [_] Your calculator should not evaluate more than a single pair of numbers at a time. Example: you press a number button (12), followed by an operator button (+), a second number button (7), and finally a second operator button (-). Your calculator should then do the following: first, evaluate the first pair of numbers (12 + 7), second, display the result of that calculation (19), and finally, use that result (19) as the first number in your new calculation, along with the next operator (-).
    + [_] You should round answers with long decimals so that they don’t overflow the screen.
    + [&check;] Pressing = before entering all of the numbers or an operator could cause problems!
    + [&check;] Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
    + [&check;] Display a snarky error message if the user tries to divide by 0… don’t let it crash your calculator!

