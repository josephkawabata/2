document.addEventListener('DOMContentLoaded', function() {
    generateMathProblem();
});

let correctAnswer;

function generateMathProblem() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    correctAnswer = num1 + num2;
    const mathProblemElement = document.getElementById('math-problem');
    mathProblemElement.textContent = `What is ${num1} + ${num2}?`;
}

function checkAnswer() {
    const answerBox = document.getElementById('answer-box');
    const userAnswer = parseInt(answerBox.value);
    const resultElement = document.getElementById('result');
    
    if (userAnswer === correctAnswer) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = `Incorrect. The correct answer was ${correctAnswer}.`;
        resultElement.style.color = 'red';
    }
}
