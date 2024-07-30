let correctAnswer;
let operation;
let digitCount;

function selectOperation(op) {
    operation = op;
    document.getElementById('digit-choice').style.display = 'block';
    document.getElementById('math-problem').textContent = '';
    document.getElementById('result').textContent = '';
    document.getElementById('answer-box').disabled = true;
    document.getElementById('submit-button').disabled = true;
}

function generateMathProblem(digits) {
    digitCount = digits;
    const num1 = generateNumber(digitCount);
    const num2 = generateNumber(digitCount);
    const mathProblemElement = document.getElementById('math-problem');
    const answerBox = document.getElementById('answer-box');
    const resultElement = document.getElementById('result');
    const submitButton = document.getElementById('submit-button');
    
    // Clear previous problem and result
    answerBox.value = '';
    resultElement.textContent = '';
    answerBox.disabled = false;
    submitButton.disabled = false;

    if (operation === 'addition') {
        correctAnswer = num1 + num2;
        mathProblemElement.textContent = `${num1} + ${num2} = ?`;
    } else if (operation === 'subtraction') {
        correctAnswer = num1 - num2;
        mathProblemElement.textContent = `${num1} - ${num2} = ?`;
    }
}

function generateNumber(digits) {
    if (digits === 'one') {
        return Math.floor(Math.random() * 10);
    } else if (digits === 'two') {
        return Math.floor(Math.random() * 90) + 10; // Two-digit number between 10 and 99
    }
}

function checkAnswer() {
    const answerBox = document.getElementById('answer-box');
    const userAnswer = parseInt(answerBox.value);
    const resultElement = document.getElementById('result');
    const submitButton = document.getElementById('submit-button');
    
    if (userAnswer === correctAnswer) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = `Incorrect. The correct answer was ${correctAnswer}.`;
        resultElement.style.color = 'red';
    }
    
    // Enable the problem type selection again after checking the answer
    document.getElementById('problem-type-choice').style.display = 'block';
    document.getElementById('digit-choice').style.display = 'none';
}
