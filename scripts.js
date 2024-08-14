function homeToAlgebra() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('algebra-select-screen').style.display = 'block';
}

function homeToArithmetic() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('arithmetic-select-screen').style.display = 'block';
}

function startBasicAlgebra() {
    window.selectedAttributes = {
        addition: true,
        subtraction: true,
    };

    document.getElementById('algebra-select-screen').style.display = 'none';
    document.getElementById('basic-algebra-screen').style.display = 'block';
    generateBasicAlgebraQuestion();
}

function startArithmetic() {
    const additionSelected = document.getElementById('arithmetic-addition-checkbox').checked;
    const subtractionSelected = document.getElementById('arithmetic-subtraction-checkbox').checked;

    if (!additionSelected && !subtractionSelected) {
        alert('Please select at least one attribute!');
        return;
    }

    window.selectedAttributes = {
        addition: additionSelected,
        subtraction: subtractionSelected,
    };

    document.getElementById('arithmetic-select-screen').style.display = 'none';
    document.getElementById('arithmetic-screen').style.display = 'block';
    generateArithmeticQuestion();
}

function getRandomDigit() {
    return Math.floor(Math.random() * 9) + 1;
}

function getRandomDigitMax3() {
    return Math.floor(Math.random() * 3) + 1;
}

function getRandomDigitPosorNeg() {
    const digit = Math.floor(Math.random() * 9) + 1; // Get a random digit between 1 and 9
    const sign = Math.random() < 0.5 ? -1 : 1; // Randomly choose -1 or 1
    return digit * sign; // Return the digit with a random sign
}

function generateBasicAlgebraQuestion() {
    const digit1 = getRandomDigit();
    const digit2 = getRandomDigit();
    let questionText;
    let randomOperator = Math.random() < 0.5 ? '+' : '-';
    let xIsFirst = Math.random() < 0.5;

    if (window.selectedAttributes.addition && window.selectedAttributes.subtraction) {
        if (xIsFirst) {
            // Format: x +/- a = b
            if (randomOperator === '+') {
                window.currentAnswer = digit2 - digit1;
                questionText = `x + ${digit1} = ${digit2}`;
            } else {
                window.currentAnswer = digit2 + digit1;
                questionText = `x - ${digit1} = ${digit2}`;
            }
        } else {
            // Format: a +/- x = b
            if (randomOperator === '+') {
                window.currentAnswer = digit2 - digit1;
                questionText = `${digit1} + x = ${digit2}`;
            } else {
                window.currentAnswer = digit1 - digit2;
                questionText = `${digit1} - x = ${digit2}`;
            }
        }
    }

    document.getElementById('question').textContent = questionText;
    document.getElementById('result').textContent = '';
    document.getElementById('answer').value = '';
    document.getElementById('next-question').style.display = 'none';
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    const resultText = userAnswer === window.currentAnswer ? 'Correct!' : 'Incorrect, try again.';
    document.getElementById('result').textContent = resultText;
    if (userAnswer === window.currentAnswer) {
        document.getElementById('next-question').style.display = 'inline';
    }
}

function startFactoringQuadraticsOneRoot() {
    document.getElementById('algebra-select-screen').style.display = 'none';
    document.getElementById('FactoringQuadraticsOneRoot-screen').style.display = 'block';
    generateFactoringQuadraticsOneRootQuestion();
}

function generateFactoringQuadraticsOneRootQuestion() {
    const a = 1;  // Allow 'a' to be any digit from 1 to 9
    const b = getRandomDigitPosorNeg() * 2 * a;  // Ensure 'b' is a multiple of 2*a for simpler calculations
    const c = Math.pow(b / 2 , 2)/a;  // Calculate 'c' to ensure the discriminant is zero
    
    window.currentAnswer = -(b / (2 * a));  // The single real root

    // If 'a' is 1, we don't need to display it
    const aText = a === 1 ? '' : a;

    let questionText;
    if (b < 0){
        questionText = `${aText}x<sup>2</sup> - ${-b}x + ${c} = 0`;}
    else {
        questionText = `${aText}x<sup>2</sup> + ${b}x + ${c} = 0`;}

    document.getElementById('FactoringQuadraticsOneRoot-question').innerHTML = questionText;
    document.getElementById('FactoringQuadraticsOneRoot-result').textContent = '';
    document.getElementById('FactoringQuadraticsOneRoot-answer').value = '';
    document.getElementById('FactoringQuadraticsOneRoot-next-question').style.display = 'none';
}

function checkFactoringQuadraticsOneRootAnswer() {
    const userAnswer = parseFloat(document.getElementById('FactoringQuadraticsOneRoot-answer').value);
    const resultText = userAnswer === window.currentAnswer ? 'Correct!' : 'Incorrect, try again.';
    document.getElementById('FactoringQuadraticsOneRoot-result').textContent = resultText;
    if (userAnswer === window.currentAnswer) {
        document.getElementById('FactoringQuadraticsOneRoot-next-question').style.display = 'inline';
    }
}

function generateArithmeticQuestion() {
    const digit1 = getRandomDigit();
    const digit2 = getRandomDigit();
    let questionText;

    if (window.selectedAttributes.addition && window.selectedAttributes.subtraction) {
        const isAddition = Math.random() < 0.5;
        if (isAddition) {
            window.currentAnswer = digit1 + digit2;
            questionText = `What is ${digit1} + ${digit2}?`;
        } else {
            if (digit1 < digit2) {
                window.currentAnswer = digit2 - digit1;
                questionText = `What is ${digit2} - ${digit1}?`;
            } else {
                window.currentAnswer = digit1 - digit2;
                questionText = `What is ${digit1} - ${digit2}?`;
            }
        }
    } else if (window.selectedAttributes.addition) {
        window.currentAnswer = digit1 + digit2;
        questionText = `What is ${digit1} + ${digit2}?`;
    } else if (window.selectedAttributes.subtraction) {
        if (digit1 < digit2) {
            window.currentAnswer = digit2 - digit1;
            questionText = `What is ${digit2} - ${digit1}?`;
        } else {
            window.currentAnswer = digit1 - digit2;
            questionText = `What is ${digit1} - ${digit2}?`;
        }
    }

    document.getElementById('arithmetic-question').textContent = questionText;
    document.getElementById('arithmetic-result').textContent = '';
    document.getElementById('arithmetic-answer').value = '';
    document.getElementById('arithmetic-next-question').style.display = 'none';
}

function checkArithmeticAnswer() {
    const userAnswer = parseInt(document.getElementById('arithmetic-answer').value, 10);
    const resultText = userAnswer === window.currentAnswer ? 'Correct!' : 'Incorrect, try again.';
    document.getElementById('arithmetic-result').textContent = resultText;
    if (userAnswer === window.currentAnswer) {
        document.getElementById('arithmetic-next-question').style.display = 'inline';
    }
}

// Initialize the home screen when the page loads
window.onload = function() {
    console.log('Page loaded');
    document.getElementById('home-screen').style.display = 'block';
};

// Back button section!
function ArithmeticSelectBackToHome() {
    document.getElementById('arithmetic-select-screen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
}

function ArithmeticBackToArithmeticSelect() {
    document.getElementById('arithmetic-screen').style.display = 'none';
    document.getElementById('arithmetic-select-screen').style.display = 'block';
}

function AlgebraSelectBackToHome() {
    document.getElementById('algebra-select-screen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
}

function BasicAlgebraBackToAlgebraSelect() {
    document.getElementById('basic-algebra-screen').style.display = 'none';
    document.getElementById('algebra-select-screen').style.display = 'block';
}

function FactoringQuadraticsOneRootBackToAlgebraSelect() {
    document.getElementById('FactoringQuadraticsOneRoot-screen').style.display = 'none';
    document.getElementById('algebra-select-screen').style.display = 'block';
}
