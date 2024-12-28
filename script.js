// Quiz data
const questions = [
    {
        question: "What is the longest river in the world?",
        options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
        correct: 0,
        category: "Geography",
        difficulty: 2
    },
    {
        question: "What is the most abundant element in the universe?",
        options: ["Hydrogen", "Helium", "Oxygen", "Carbon"],
        correct: 0,
        category: "Chemistry",
        difficulty: 2
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
        correct: 0,
        category: "History",
        difficulty: 0
    },
    {
        question: "Who wrote '1984'?",
        options: ["George Orwell", "Charles Dickens", "Voltaire", "Augustus Fitch"],
        correct: 0,
        category: "Literature",
        difficulty: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Saturn", "Jupiter", "Mercury"],
        correct: 0,
        category: "Astronomy",
        difficulty: 0
    },
    {
        question: "What is the capital of Australia?",
        options: ["Canberra", "Sydney", "Perth", "Melbourne"],
        correct: 0,
        category: "Geography",
        difficulty: 1
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ti", "Se", "Go"],
        correct: 0,
        category: "Chemistry",
        difficulty: 1
    },
    {
        question: "Who proposed the heliocentric model of the solar system?",
        options: ["Nicolaus Copernicus", "Galileo Galilei", "Johannes Kepler", "Tycho Brahe"],
        correct: 0,
        category: "Astronomy",
        difficulty: 2
    },
    {
        question: "What is the present largest mammal?",
        options: ["Blue Whale", "Giant-Squid", "Whale Shark", "Hippopotamus"],
        correct: 0,
        category: "General",
        difficulty: 0
    },
    {
        question: "What is the chemical formula for sulfuric acid?",
        options: ["H2SO4", "HCI", "NaOH", "CH3COOH"],
        correct: 0,
        category: "Chemistry",
        difficulty: 2
    },
    {
        question: "What is the Smallest Prime Number?",
        options: ["2", "3", "1.5", "5"],
        correct: 0,
        category: "Math",
        difficulty: 2
    },
    {
        question: "Who founded psychoanalysis?",
        options: ["Sigmund Freud", "Carl Jung", "B.F. Skinner", "William James"],
        correct: 0,
        category: "Psychology",
        difficulty: 1
    },
    {
        question: "What is classical conditioning?",
        options: ["Learning through association", "Complex Thinking", "Direct Learning", "Problem Solving"],
        correct: 0,
        category: "Psychology",
        difficulty: 1
    },
    {
        question: "What is metacognition?",
        options: ["Thinking about thinking", "Basic Thought", "Memory Recall", "Problem Solving"],
        correct: 0,
        category: "Psych",
        difficulty: 2
    },
    {
        question: "What is alexithymia?",
        options: ["Cannot properly identify emotions", "Memory Disorder", "Learning Disability", "Attention Deficit"],
        correct: 0,
        category: "Psych",
        difficulty: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = new Set();

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const quizContainer = document.getElementById('quiz');
    
    const questionHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="category-badge">${question.category}</span>
                <div class="difficulty">
                    ${Array(3).fill(0).map((_, i) => 
                        `<span class="difficulty-dot ${i <= question.difficulty ? 'active' : ''}"></span>`
                    ).join('')}
                </div>
            </div>
            <div class="question-text">${question.question}</div>
            <div class="options-grid">
                ${question.options.map((option, index) => `
                    <div class="option" data-index="${index}" onclick="selectOption(${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <div class="controls">
                <button onclick="previousQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>Previous</button>
                <button onclick="nextQuestion()" ${!answeredQuestions.has(currentQuestionIndex) ? 'disabled' : ''}>
                    ${currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    `;
    
    quizContainer.innerHTML = questionHTML;
    updateProgress();
}

function selectOption(optionIndex) {
    if (answeredQuestions.has(currentQuestionIndex)) return;

    const options = document.querySelectorAll('.option');
    const currentQuestion = questions[currentQuestionIndex];
    
    options.forEach(option => option.classList.remove('selected'));
    options[optionIndex].classList.add('selected');
    
    setTimeout(() => {
        options[currentQuestion.correct].classList.add('correct');
        if (optionIndex !== currentQuestion.correct) {
            options[optionIndex].classList.add('incorrect');
        } else {
            score++;
            document.getElementById('score').textContent = score;
        }
        
        answeredQuestions.add(currentQuestionIndex);
        document.querySelector('.controls button:last-child').disabled = false;
    }, 500);
}

function updateProgress() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = questions.length;
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('final-score').textContent = score;
    document.getElementById('max-score').textContent = questions.length;

    // Calculate category scores
    const categoryScores = {};
    questions.forEach((q, index) => {
        if (!categoryScores[q.category]) {
            categoryScores[q.category] = { correct: 0, total: 0 };
        }
        categoryScores[q.category].total++;
        if (answeredQuestions.has(index) && questions[index].correct === Array.from(document.querySelectorAll('.option')).findIndex(opt => opt.classList.contains('selected'))) {
            categoryScores[q.category].correct++;
        }
    });

    const categoryBreakdown = document.getElementById('category-scores');
    categoryBreakdown.innerHTML = Object.entries(categoryScores)
        .map(([category, scores]) => `
            <div class="category-score">
                <h3>${category}</h3>
                <p>${scores.correct}/${scores.total} correct</p>
            </div>
        `).join('');
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answeredQuestions = new Set();
    document.getElementById('score').textContent = '0';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    displayQuestion();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        if (optionIndex < questions[currentQuestionIndex].options.length) {
            selectOption(optionIndex);
        }
    }
});

// Initialize quiz
document.addEventListener('DOMContentLoaded', () => {
    displayQuestion();
}); 