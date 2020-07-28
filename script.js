// Buttons
const startButton = document.getElementById("start-btn")
const submitButton = document.getElementById("submitBtn")
const restartButton = document.getElementById("restart-btn")
const clearButton = document.getElementById("clear-btn")

// Elements to hide and/or display
const questionContainerEl = document.getElementById("question-container")
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')
const correctIncorrectEl = document.getElementById("right-wrong")

// Score Recording/Displaying Elements
const initialsInputEl = document.getElementById('initials-input')
const userInitials = document.getElementById('initials')
const timerEl = document.getElementById("timer")
const highScoreHeaderEl = document.getElementById("high-scores-header")
const notScoresEl = document.getElementById("not-scores")
const highScoresEl = document.getElementById('high-scores')


let randomQuestions, currentQuestionIndex

// High Score in Header
highScoreHeaderEl.addEventListener('click', showScores)

function showScores() {
    notScoresEl.classList.add('hide')
    highScoresEl.classList.remove('hide')
}

// Start Game
startButton.addEventListener('click', startGame)

function startGame() {
    startTimer()
    startButton.classList.add('hide')
    randomQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')

    nextQuestion()
}

// Timer Variables
var seconds = 75;
var timerInterval

// Timer Functions
function startTimer() {
    timeInterval = setInterval(function () {
        seconds--
        if (seconds < 0) {
            endTimer()
            questionContainerEl.classList.add('hide')
            initialsInputEl.classList.remove('hide')
        } else {
            timerEl.innerText = seconds
        }
    }, 1000)
}

function endTimer() {
    clearInterval(timeInterval)
    // opens score input form
}

// Submit Score
submitButton.addEventListener('click', function (event) {
    event.preventDefault()
    var initials = userInitials.value
    console.log(initials)
    var initialsArray = JSON.parse(localStorage.getItem("initials")) || []
    var scoreArray = [
        initials, seconds
    ]
    initialsArray.push(scoreArray)
    localStorage.setItem("initials", JSON.stringify(initialsArray))
})

function submitScore() {
    localStorage.setItem()
}

// Restart Game
restartButton.addEventListener('click', restartGame)

function restartGame() {
    highScoresEl.classList.add('hide')
    startButton.classList.remove('hide')
}

// Clear High Scores
clearButton.addEventListener('click', clearScores)

function clearScores() {
    localStorage.clear();
}

// Question Functions
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.getAttribute("data-correct");
    if (correct === "true") {
        correctIncorrectEl.textContent = "correct";
        // alert("that's right")
    }
    else {
        correctIncorrectEl.textContent = "incorrect";
        // alert("that's incorrect")
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.corret)
    })
    if (randomQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++
        nextQuestion()
    } else {
        endTimer()
        questionContainerEl.classList.add('hide')
        initialsInputEl.classList.remove('hide')
    }
}

function nextQuestion() {
    setTimeout(() => {
        correctIncorrectEl.textContent = "";
        resetState()
        showQuestion(randomQuestions[currentQuestionIndex])
    }, 1000)
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

// Questions
const questions = [
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        answers: [
            { text: "Numbers and Strings", correct: false },
            { text: "Other arrays", correct: false },
            { text: "Booleans", correct: false },
            { text: "All of the above", correct: true }
        ]
    },

    {
        question: 'String values must be enclosed within ____ when being assigned to variable.',
        answers: [
            { text: "Commas", correct: false },
            { text: "Curly Brackets", correct: false },
            { text: "Quotes", correct: true },
            { text: "Parentheses", correct: false }
        ]
    },

    {
        question: 'The condition in an if/else statement is enclosed within ___.',
        answers: [
            { text: "Quotes", correct: false },
            { text: "Parantheses", correct: true },
            { text: "Curly Brackets", correct: false },
            { text: "Square Brackets", correct: false }
        ]
    },

    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            { text: "Alerts", correct: true },
            { text: "Strings", correct: false },
            { text: "Booleans", correct: false },
            { text: "Numbers", correct: false }
        ]
    },

    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            { text: "JavaScript", correct: false },
            { text: "Terminal/Base", correct: false },
            { text: "For Loops", correct: false },
            { text: "Console.log", correct: true }
        ]
    },

]