// Initialize the home screen when the page loads
window.onload = function() {
    console.log('Page loaded');
    document.getElementById('home-screen').style.display = 'block';
};

function getRandomDigit() {
    return Math.floor(Math.random() * 9) + 1;
}

function getRandomDigitMax3() {
    return Math.floor(Math.random() * 3) + 1;
}

function getRandomDigitMax5PosorNeg() {
    const digit = Math.floor(Math.random() * 5) + 1; // Get a random digit between 1 and 9
    const sign = Math.random() < 0.5 ? -1 : 1; // Randomly choose -1 or 1
    return digit * sign; // Return the digit with a random sign
}

function getRandomDigitPosorNeg() {
    const digit = Math.floor(Math.random() * 9) + 1; // Get a random digit between 1 and 9
    const sign = Math.random() < 0.5 ? -1 : 1; // Randomly choose -1 or 1
    return digit * sign; // Return the digit with a random sign
}

function homeToAlgebra() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('algebra-select-screen').style.display = 'block';
}

function homeToArithmetic() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('arithmetic-select-screen').style.display = 'block';
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

function startBasicAlgebra() {
    window.selectedAttributes = {
        addition: true,
        subtraction: true,
    };

    document.getElementById('algebra-select-screen').style.display = 'none';
    document.getElementById('basic-algebra-screen').style.display = 'block';
    generateBasicAlgebraQuestion();
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
    const a = getRandomDigitMax3(); 
    let b;
    if (a === 3){
        b = getRandomDigitMax5PosorNeg() * 2 * a;
    }
    else {
        b = getRandomDigitPosorNeg() * 2 * a;
    }
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

function startFactoringQuadratics2Roots() {
    document.getElementById('algebra-select-screen').style.display = 'none';
    document.getElementById('FactoringQuadratics2Roots-screen').style.display = 'block';
    generateFactoringQuadratics2RootsQuestion();
}

function generateFactoringQuadratics2RootsQuestion() {
    const x1 = getRandomDigitPosorNeg(); 
    let x2 = getRandomDigitPosorNeg();
    if (x2 === x1){
        x2 = 5
    }
    const a = 1;

    window.currentAnswer = [-(x1), -(x2)];

    const aText = a === 1 ? '' : a;

    // Function to format the coefficient with proper sign
    function formatCoefficient(coef) {
        if (coef > 0) {
            return `+ ${coef}`;
        } else if (coef < 0) {
            return `- ${Math.abs(coef)}`;
        }
        return ''; // Return an empty string for a coefficient of 0
    }

    const x1x2Sum = x1 + x2;
    const x1x2Product = x1 * x2;

    // Generate the question text, omitting the middle term if its coefficient is 0
    let questionText = `${aText}x<sup>2</sup>`;
    
    if (x1x2Sum !== 0) {
        questionText += ` ${formatCoefficient(x1x2Sum)}x`;
    }
    
    questionText += ` ${formatCoefficient(x1x2Product)} = 0`;

    document.getElementById('FactoringQuadratics2Roots-question').innerHTML = questionText;
    document.getElementById('FactoringQuadratics2Roots-result').textContent = '';
    document.getElementById('FactoringQuadratics2Roots-answer').value = '';
    document.getElementById('FactoringQuadratics2Roots-next-question').style.display = 'none';
}



function checkFactoringQuadratics2RootsAnswer() {
    const userAnswer = document.getElementById('FactoringQuadratics2Roots-answer').value
                        .split(',')
                        .map(num => parseFloat(num.trim()));

    const correctAnswer1 = window.currentAnswer[0];
    const correctAnswer2 = window.currentAnswer[1];
    
    const isCorrect = (userAnswer.includes(correctAnswer1) && userAnswer.includes(correctAnswer2)) && userAnswer.length === 2;

    const resultText = isCorrect ? 'Correct!' : 'Incorrect, try again.';
    document.getElementById('FactoringQuadratics2Roots-result').textContent = resultText;
    
    if (isCorrect) {
        document.getElementById('FactoringQuadratics2Roots-next-question').style.display = 'inline';
    }
}

function startCompleteTheSquare() {
    document.getElementById('algebra-select-screen').style.display = 'none';
    document.getElementById('CompleteTheSquare-screen').style.display = 'block';
    generateCompleteTheSquareQuestion();
}

function generateCompleteTheSquareQuestion() {
    const a = 1; 
    const b = getRandomDigitPosorNeg() * 2;
    const c = Math.pow(b / 2 , 2) / a;
    const d = getRandomDigit();

    let answerText;
    if (b < 0) {
        if ((c - d) < 0) {
            answerText = `(x-${Math.abs(b / 2)})^2 + ${Math.abs(d - c)}`;
        } else {
            answerText = `(x-${Math.abs(b / 2)})^2 - ${Math.abs(c - d)}`;
        }
    } else {
        if ((c - d) < 0) {
            answerText = `(x+${b / 2})^2 + ${Math.abs(d - c)}`;
        } else {
            answerText = `(x+${b / 2})^2 - ${Math.abs(c - d)}`;
        }
    }

    window.currentAnswer = answerText;

    const aText = a === 1 ? '' : a;
    let questionText;
    if (b < 0) {
        questionText = `${aText}x<sup>2</sup> - ${Math.abs(b)}x + ${d}`;
    } else {
        questionText = `${aText}x<sup>2</sup> + ${b}x + ${d}`;
    }

    document.getElementById('CompleteTheSquare-question').innerHTML = questionText;
    document.getElementById('CompleteTheSquare-result').textContent = '';
    document.getElementById('CompleteTheSquare-answer').value = '';
    document.getElementById('CompleteTheSquare-next-question').style.display = 'none';
}


function formatExponent() {
    const input = document.getElementById('CompleteTheSquare-answer');
    input.value = input.value.replace(/\^2/g, '²');
}

function checkCompleteTheSquareAnswer() {
    const input = document.getElementById('CompleteTheSquare-answer');
    let userAnswer = input.value.trim();

    // Convert superscript ² back to ^2 for comparison and remove spaces
    const standardizedAnswer = userAnswer.replace(/²/g, '^2').replace(/\s+/g, '');
    const correctAnswer = window.currentAnswer.replace(/\s+/g, '');

    const resultText = standardizedAnswer === correctAnswer ? 'Correct!' : 'Incorrect, try again.';
    document.getElementById('CompleteTheSquare-result').textContent = resultText;

    if (standardizedAnswer === correctAnswer) {
        document.getElementById('CompleteTheSquare-next-question').style.display = 'inline';
    }
}


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

function FactoringQuadratics2RootsBackToAlgebraSelect() {
    document.getElementById('FactoringQuadratics2Roots-screen').style.display = 'none';
    document.getElementById('algebra-select-screen').style.display = 'block';
}

function CompleteTheSquareBackToAlgebraSelect() {
    document.getElementById('CompleteTheSquare-screen').style.display = 'none';
    document.getElementById('algebra-select-screen').style.display = 'block';
}
