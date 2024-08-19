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

function homeToTrigonometry() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('trigonometry-select-screen').style.display = 'block';
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

function startUnitCircleQuiz() {
    document.getElementById('trigonometry-select-screen').style.display = 'none';
    document.getElementById('UnitCircleQuiz-screen').style.display = 'block';
    generateUnitCircleQuizQuestion();
}

function generateUnitCircleQuizQuestion() {
    const angles = ['0', 'π/6', 'π/4', 'π/3', 'π/2', '2π/3', '3π/4', '5π/6', 'π', '7π/6', '5π/4', '4π/3', '3π/2', '5π/3', '7π/4', '11π/6'];
    const trigFunctions = ['cos', 'sin'];

    const randomAngle = angles[Math.floor(Math.random() * angles.length)];
    const randomTrigFunction = trigFunctions[Math.floor(Math.random() * trigFunctions.length)];

    let answerText = '';

    // Calculate the correct answer based on the selected angle and trigonometric function
    switch (randomTrigFunction) {
        case 'sin':
            switch (randomAngle) {
                case '0': answerText = '0'; break;
                case 'π/6': answerText = '1/2'; break;
                case 'π/4': answerText = '√2/2'; break;
                case 'π/3': answerText = '√3/2'; break;
                case 'π/2': answerText = '1'; break;
                case '2π/3': answerText = '√3/2'; break;
                case '3π/4': answerText = '√2/2'; break;
                case '5π/6': answerText = '1/2'; break;
                case 'π': answerText = '0'; break;
                case '7π/6': answerText = '-1/2'; break;
                case '5π/4': answerText = '-√2/2'; break;
                case '4π/3': answerText = '-√3/2'; break;
                case '3π/2': answerText = '-1'; break;
                case '5π/3': answerText = '-√3/2'; break;
                case '7π/4': answerText = '-√2/2'; break;
                case '11π/6': answerText = '-1/2'; break;
                default: answerText = ''; break;
            }
            break;
        case 'cos':
            switch (randomAngle) {
                case '0': answerText = '1'; break;
                case 'π/6': answerText = '√3/2'; break;
                case 'π/4': answerText = '√2/2'; break;
                case 'π/3': answerText = '1/2'; break;
                case 'π/2': answerText = '0'; break;
                case '2π/3': answerText = '-1/2'; break;
                case '3π/4': answerText = '-√2/2'; break;
                case '5π/6': answerText = '-√3/2'; break;
                case 'π': answerText = '-1'; break;
                case '7π/6': answerText = '-√3/2'; break;
                case '5π/4': answerText = '-√2/2'; break;
                case '4π/3': answerText = '-1/2'; break;
                case '3π/2': answerText = '0'; break;
                case '5π/3': answerText = '1/2'; break;
                case '7π/4': answerText = '√2/2'; break;
                case '11π/6': answerText = '√3/2'; break;
                default: answerText = ''; break;
            }
            break;
    }

    window.currentAnswer = answerText;

    const questionText = `What is ${randomTrigFunction}(${randomAngle})?`;

    document.getElementById('UnitCircleQuiz-question').innerHTML = questionText;
    document.getElementById('UnitCircleQuiz-result').textContent = '';
    document.getElementById('UnitCircleQuiz-answer').value = '';
    document.getElementById('UnitCircleQuiz-next-question').style.display = 'none';
}

function checkUnitCircleQuizAnswer() {
    const userAnswer = document.getElementById('UnitCircleQuiz-answer').value.trim();

    const resultText = userAnswer === window.currentAnswer ? 'Correct!' : 'Incorrect, try again.';
    document.getElementById('UnitCircleQuiz-result').textContent = resultText;

    if (userAnswer === window.currentAnswer) {
        document.getElementById('UnitCircleQuiz-next-question').style.display = 'inline';
    }
}

function startDoubleAngleIdentitiesEasy() {
    document.getElementById('DoubleAngleIdentitiesMedium-screen').style.display = 'none'; // Hide the medium screen
    document.getElementById('trigonometry-select-screen').style.display = 'none'; // Hide the medium screen
    document.getElementById('DoubleAngleIdentitiesEasy-screen').style.display = 'block';
    document.getElementById('DoubleAngleIdentitiesEasy-difficulty').style.display = 'block';
    selectDifficulty('easy');
    generateDoubleAngleIdentitiesEasyQuestion();
}


function generateDoubleAngleIdentitiesEasyQuestion() {
    // Array of question and answer pairs for double angle identities
    const identities = [
        { question: "2sinxcosx = ?", answer: "sin2x" },
        { question: "cos<sup>2</sup>x - sin<sup>2</sup>x = ?", answer: "cos2x" },
        { question: "2cos<sup>2</sup>x - 1 = ?", answer: "cos2x" },
        { question: "1 - 2sin<sup>2</sup>x = ?", answer: "cos2x" },
        { question: "<div style='display: inline-block;'><div style='text-align: center;'>2tanx</div><hr style='margin: 0;'><div style='text-align: center;'>1 - tan<sup>2</sup>x</div></div> = ?", answer: "tan2x" }
    ];

    // Randomly select one identity
    const randomIndex = Math.floor(Math.random() * identities.length);
    const selectedIdentity = identities[randomIndex];

    // Set the question and correct answer
    window.currentAnswer = selectedIdentity.answer;

    document.getElementById('DoubleAngleIdentitiesEasy-question').innerHTML = selectedIdentity.question;
    document.getElementById('DoubleAngleIdentitiesEasy-result').textContent = '';
    document.getElementById('DoubleAngleIdentitiesEasy-answer').value = '';
    document.getElementById('DoubleAngleIdentitiesEasy-next-question').style.display = 'none';
}

function checkDoubleAngleIdentitiesEasyAnswer() {
    let userAnswer = document.getElementById('DoubleAngleIdentitiesEasy-answer').value.trim();

    // Normalize user answer to accept both sin(x) and sinx as valid
    userAnswer = userAnswer.replace(/\s+/g, ''); // Remove spaces
    userAnswer = userAnswer.replace(/\((.*?)\)/g, '$1'); // Remove parentheses around the argument

    // Normalize correct answer similarly
    let correctAnswer = window.currentAnswer.replace(/\s+/g, '').replace(/\((.*?)\)/g, '$1');

    const resultText = userAnswer === correctAnswer ? 'Correct!' : 'Incorrect, try again.';
    document.getElementById('DoubleAngleIdentitiesEasy-result').textContent = resultText;

    if (userAnswer === correctAnswer) {
        document.getElementById('DoubleAngleIdentitiesEasy-next-question').style.display = 'inline';
    }
}

function startDoubleAngleIdentitiesMedium() {
    document.getElementById('DoubleAngleIdentitiesEasy-screen').style.display = 'none';
    document.getElementById('DoubleAngleIdentitiesMedium-screen').style.display = 'block';
    document.getElementById('DoubleAngleIdentitiesEasy-difficulty').style.display = 'block'; // Show difficulty buttons
    generateDoubleAngleIdentitiesMediumQuestion();
}

function generateDoubleAngleIdentitiesMediumQuestion() {
    const identities = [
        { question: "sin2x = ?", answer: "2sin(x)cos(x)" },
        { question: "cos2x (1) = ?", answer: "cos^2(x) - sin^2(x)" },
        { question: "cos2x (2) = ?", answer: "2cos^2(x) - 1" },
        { question: "cos2x (3) = ?", answer: "1 - 2sin^2(x)" },
        { question: "tan2x = ?", answer: "2tan(x) / (1 - tan^2(x))" }
    ];

    const randomIndex = Math.floor(Math.random() * identities.length);
    const selectedIdentity = identities[randomIndex];

    window.currentAnswer = selectedIdentity.answer;

    document.getElementById('DoubleAngleIdentitiesMedium-question').innerHTML = selectedIdentity.question;
    document.getElementById('DoubleAngleIdentitiesMedium-result').textContent = '';
    document.getElementById('DoubleAngleIdentitiesMedium-answer').value = '';
    document.getElementById('DoubleAngleIdentitiesMedium-next-question').style.display = 'none';
}


function checkDoubleAngleIdentitiesMediumAnswer() {
    let userAnswer = document.getElementById('DoubleAngleIdentitiesMedium-answer').value.trim();

    // Normalize user answer to accept both sin(x) and sinx as valid
    userAnswer = userAnswer.replace(/\s+/g, ''); // Remove spaces
    userAnswer = userAnswer.replace(/\((.*?)\)/g, '$1'); // Remove parentheses around the argument

    // Normalize correct answer similarly
    let correctAnswer = window.currentAnswer.replace(/\s+/g, '').replace(/\((.*?)\)/g, '$1');

    const resultText = userAnswer === correctAnswer ? 'Correct!' : 'Incorrect, try again.';
    document.getElementById('DoubleAngleIdentitiesMedium-result').textContent = resultText;

    if (userAnswer === correctAnswer) {
        document.getElementById('DoubleAngleIdentitiesMedium-next-question').style.display = 'inline';
    }
}

// Back button section!
function AlgebraSelectBackToHome() {
    document.getElementById('algebra-select-screen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
}

function ArithmeticSelectBackToHome() {
    document.getElementById('arithmetic-select-screen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
}

function TrigonometrySelectBackToHome() {
    document.getElementById('trigonometry-select-screen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
}

function ArithmeticBackToArithmeticSelect() {
    document.getElementById('arithmetic-screen').style.display = 'none';
    document.getElementById('arithmetic-select-screen').style.display = 'block';
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

function UnitCircleQuizBackToTrigonometrySelect() {
    document.getElementById('UnitCircleQuiz-screen').style.display = 'none';
    document.getElementById('trigonometry-select-screen').style.display = 'block';
}

function DoubleAngleIdentitiesEasyBackToTrigonometrySelect() {
    document.getElementById('DoubleAngleIdentitiesEasy-screen').style.display = 'none';
    document.getElementById('DoubleAngleIdentitiesEasy-difficulty').style.display = 'none';
    document.getElementById('trigonometry-select-screen').style.display = 'block';
    selectDifficulty('easy');
}

function DoubleAngleIdentitiesMediumBackToTrigonometrySelect() {
    document.getElementById('DoubleAngleIdentitiesMedium-screen').style.display = 'none';
    document.getElementById('DoubleAngleIdentitiesEasy-difficulty').style.display = 'none'; // Hide the difficulty buttons
    document.getElementById('trigonometry-select-screen').style.display = 'block';
    selectDifficulty('easy');
}

// difficulty buttons
function selectDifficulty(difficulty) {
    document.getElementById('easy-button').classList.remove('button-selected');
    document.getElementById('medium-button').classList.remove('button-selected');
    document.getElementById('hard-button').classList.remove('button-selected');
    
    if (difficulty === 'easy') {
        document.getElementById('easy-button').classList.add('button-selected');
    } else if (difficulty === 'medium') {
        document.getElementById('medium-button').classList.add('button-selected');
    } else if (difficulty === 'hard') {
        document.getElementById('hard-button').classList.add('button-selected');
        // Implement the logic for starting hard questions here
    }
}

