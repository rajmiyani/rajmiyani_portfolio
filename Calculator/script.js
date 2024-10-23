const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function updateDisplay(value) {
    display.textContent = value;
}

function handleNumber(number) {
    if (currentInput.length < 10) {
        currentInput += number;
        updateDisplay(currentInput);
    }
}

function handleOperator(op) {
    if (currentInput === '' && op === '-') {
        currentInput = '-';
        updateDisplay(currentInput);
        return;
    }
    if (currentInput !== '') {
        if (previousInput !== '') {
            calculate();
        } else {
            previousInput = currentInput;
        }
        currentInput = '';
        operator = op;
    }
}

function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case 'X':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}

function handlePercent() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }
}

function handlePlusMinus() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }
}

document.querySelectorAll('.all-btn span').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value)) {
            handleNumber(value);
        } else if (value === 'AC') {
            clear();
        } else if (value === '+/-') {
            handlePlusMinus();
        } else if (value === '%') {
            handlePercent();
        } else if (value === '=') {
            calculate();
        } else {
            handleOperator(value);
        }
    });
});