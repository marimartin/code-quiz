const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerEl = document.getElementById("question-container")
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')
const initialsInputEl = document.getElementById('initials-input')
const userInitials = document.getElementById('initials')
const timerEl = document.getElementById("timer")
const submitButton = document.getElementById("submitBtn")
const highScoreHeaderEl = document.getElementById("highScoresHeader")


let randomQuestions, currentQuestionIndex

var seconds = 75;
var timerInterval

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

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

highScoreHeaderEl.addEventListener('click', showScores)

function showScores() {

}


function startGame() {
    startTimer()
    startButton.classList.add('hide')
    randomQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')

    nextQuestion()
}

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

function submitScore() {
    localStorage.setItem()
}
// submit button adds score and initials to high scores list
// displays high scores list
// hides score input form
// saves to local storage until user removes it with a remove button

function nextQuestion() {
    resetState()
    showQuestion(randomQuestions[currentQuestionIndex])
}

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
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.corret)
    })
    if (randomQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        endTimer()
        questionContainerEl.classList.add('hide')
        initialsInputEl.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong)")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

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