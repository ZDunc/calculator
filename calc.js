// Global Variables
let SCREEN = '';
let PREV_VALUE = 0;
let CURRENT_OPERATOR = null;
let STARTING_SECOND_ARGUMENT = false;

// Functions -------------------------------------------------------------------------

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function evaluate(op, x, y) {
    switch (op) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case 'x':
            return multiply(x, y);
        case '÷':
            if (y === 0)
                return 'Error';
            return divide(x, y);
        default:
            return 'Error';
    }
}

function updateScreen() {
    console.log(SCREEN);
    document.getElementById("screen").innerHTML = SCREEN;
}

// Number Buttons --------------------------------------------------------------------
const numbers = document.querySelectorAll('.num');

// adding the event listener by looping
numbers.forEach(num => {
    num.addEventListener('click', function() {
        if (STARTING_SECOND_ARGUMENT) {
            SCREEN = num.textContent;
            STARTING_SECOND_ARGUMENT = false;
        } else {
            SCREEN += num.textContent;
        }
        
        updateScreen();
    });
});

// Clear -----------------------------------------------------------------------------
const clear = document.querySelector('.clear').addEventListener('click', function() {
    SCREEN = '';
    PREV_VALUE = 0;
    CURRENT_OPERATOR = null;
    updateScreen();
});

// Delete ----------------------------------------------------------------------------
const backspace = document.querySelector('.delete').addEventListener('click', function() {
    if (SCREEN.length > 0) {
        SCREEN = SCREEN.slice(0, SCREEN.length - 1);
        updateScreen();
    }
});

// Operation Buttons -----------------------------------------------------------------
const operators = document.querySelectorAll('.operator');

// adding the event listener by looping
operators.forEach(op => {
    op.addEventListener('click', function() {
        CURRENT_OPERATOR = op.textContent;
        console.log(CURRENT_OPERATOR);

        PREV_VALUE = parseInt(SCREEN);
        STARTING_SECOND_ARGUMENT = true;
    });
});

// Equals ----------------------------------------------------------------------------
const equals = document.querySelector('.equals').addEventListener('click', function() {
    if (SCREEN === "") { // Ignore
        return;
    } else if (CURRENT_OPERATOR === null) {
        console.log("Invalid evaluation attempt");
        return;
    } else {
        console.log(PREV_VALUE + ' ' + CURRENT_OPERATOR + ' ' + parseInt(SCREEN));
        let result = evaluate(CURRENT_OPERATOR, PREV_VALUE, parseInt(SCREEN));
        SCREEN = result;
        updateScreen();

        PREV_VALUE = 0;
        CURRENT_OPERATOR = null;
    }
});