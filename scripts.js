let correctAnswer;
let operation;

function generateMathProblem(op) {
    operation = op;
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
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
    
    // Disable input and submit button after checking the answer
    answerBox.disabled = true;
    submitButton.disabled = true;
}
