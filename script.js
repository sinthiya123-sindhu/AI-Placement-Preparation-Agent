// =====================================
// AI PLACEMENT PREPARATION AGENT
// =====================================


// CURRENT USER

let user = {

    name: "",

    role: "",

    skills: []

};


// CURRENT PRACTICE

let currentType = "";

let currentQuestion = 0;

let score = 0;


// =====================================
// QUESTIONS
// =====================================


const aptitudeQuestions = [

    {
        question: "What is 20% of 150?",
        options: ["20", "30", "40", "50"],
        answer: 1
    },

    {
        question: "If 5 pens cost ₹50, what is the cost of 1 pen?",
        options: ["₹5", "₹10", "₹15", "₹20"],
        answer: 1
    },

    {
        question: "What is the average of 10, 20 and 30?",
        options: ["15", "20", "25", "30"],
        answer: 1
    },

    {
        question: "What is 25% of 200?",
        options: ["25", "40", "50", "75"],
        answer: 2
    },

    {
        question: "What is 12 × 8?",
        options: ["86", "96", "108", "112"],
        answer: 1
    },

    {
        question: "What is the next number: 2, 4, 8, 16, ?",
        options: ["20", "24", "32", "36"],
        answer: 2
    },

    {
        question: "A train travels 60 km in 2 hours. Speed?",
        options: ["20 km/h", "30 km/h", "40 km/h", "60 km/h"],
        answer: 1
    },

    {
        question: "Find the odd one: Apple, Mango, Carrot, Banana",
        options: ["Apple", "Mango", "Carrot", "Banana"],
        answer: 2
    },

    {
        question: "If today is Monday, after 3 days?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        answer: 2
    },

    {
        question: "What is 10 × 10?",
        options: ["10", "50", "100", "1000"],
        answer: 2
    }

];


const technicalQuestions = [

    {
        question: "Which keyword defines a function in Python?",
        options: ["function", "def", "fun", "define"],
        answer: 1
    },

    {
        question: "Which is ordered and changeable in Python?",
        options: ["Tuple", "Set", "List", "String"],
        answer: 2
    },

    {
        question: "What does SQL stand for?",
        options: [
            "Structured Query Language",
            "Simple Query Language",
            "System Query Language",
            "Standard Question Language"
        ],
        answer: 0
    },

    {
        question: "Which SQL command retrieves data?",
        options: ["GET", "SELECT", "FETCH", "SHOW"],
        answer: 1
    },

    {
        question: "Which symbol is used for Python comments?",
        options: ["//", "#", "/*", "--"],
        answer: 1
    },

    {
        question: "Which HTML tag creates a paragraph?",
        options: ["<p>", "<para>", "<text>", "<paragraph>"],
        answer: 0
    },

    {
        question: "Which CSS property changes text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "text-style"
        ],
        answer: 2
    },

    {
        question: "What is OOP?",
        options: [
            "Object Oriented Programming",
            "Object Operating Program",
            "Open Object Programming",
            "Object Ordered Programming"
        ],
        answer: 0
    },

    {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: 1
    },

    {
        question: "Which command removes all rows?",
        options: ["DELETE", "DROP", "TRUNCATE", "REMOVE"],
        answer: 2
    }

];


const codingQuestions = [

    "Write a Python program to check even or odd.",

    "Write a Python program to find the largest number.",

    "Write a Python program to reverse a string.",

    "Write a Python program to check prime number.",

    "Write a Python program to find factorial.",

    "Write a Python program to find sum of a list.",

    "Write a Python program to count vowels.",

    "Write a Python program to check palindrome.",

    "Write a Python program to find largest in a list.",

    "Write a Python program for Fibonacci series."

];


const interviewQuestions = [

    "Tell me about yourself.",

    "What are your strengths?",

    "What is your weakness?",

    "Why should we hire you?",

    "Why do you want to join our company?",

    "Where do you see yourself in five years?",

    "Explain your final year project.",

    "Why did you choose your technical field?",

    "Tell me about a challenge you faced.",

    "Do you have any questions for us?"

];


// =====================================
// USER STORAGE KEY
// =====================================

function getUserKey() {

    return "placement_" +

        user.name

            .trim()

            .toLowerCase()

            .replace(/\s+/g, "_");

}


// =====================================
// GET USER DATA
// =====================================

function getSavedData() {

    return JSON.parse(

        localStorage.getItem(

            getUserKey()

        )

    ) || {

        user: user,

        progress: {}

    };

}


// =====================================
// SAVE DATA
// =====================================

function saveData(data) {

    localStorage.setItem(

        getUserKey(),

        JSON.stringify(data)

    );

}


// =====================================
// SETUP FORM
// =====================================

document

    .getElementById("setupForm")

    .addEventListener(

        "submit",

        function(event) {


            event.preventDefault();


            let name =

                document

                    .getElementById("userName")

                    .value

                    .trim();


            let role =

                document

                    .getElementById("targetRole")

                    .value;


            let skills =

                [

                    ...document

                        .querySelectorAll(

                            ".skills input:checked"

                        )

                ]

                .map(

                    input => input.value

                );


            user = {

                name: name,

                role: role,

                skills: skills

            };


            let savedData = getSavedData();


            // If this is an existing user,

            // preserve old progress.

            if (

                savedData.progress &&

                Object.keys(

                    savedData.progress

                ).length > 0

            ) {


                user = savedData.user;


                showWelcomeBack();


            }


            else {


                saveData({

                    user: user,

                    progress: {}

                });


                openApp();

            }

        }

    );


// =====================================
// OPEN APP
// =====================================

function openApp() {


    document

        .getElementById("setupScreen")

        .classList

        .add("hidden");


    document

        .getElementById("app")

        .classList

        .remove("hidden");


    loadDashboard();

}


// =====================================
// WELCOME BACK
// =====================================

function showWelcomeBack() {


    let data = getSavedData();


    let progress = data.progress;


    let message = "";


    let found = false;


    for (

        let type in progress

    ) {


        if (

            progress[type].question > 0 &&

            progress[type].question < 10

        ) {


            let displayName =

                type.charAt(0)

                    .toUpperCase() +

                type.slice(1);


            message += `

                <div class="continue-box">

                    <h2>

                        Welcome back, ${user.name}! 👋

                    </h2>

                    <p>

                        You completed

                        <b>

                            ${progress[type].question}

                        </b>

                        ${displayName} questions.

                        Your score is

                        <b>

                            ${progress[type].score}

                        </b>.

                    </p>

                    <p>

                        Continue from

                        <b>

                            Question

                            ${progress[type].question + 1}

                        </b>

                        🚀

                    </p>

                </div>

            `;


            found = true;

        }

    }


    openApp();


    if (found) {


        document

            .getElementById("continueCard")

            .innerHTML = message;

    }

}


// =====================================
// LOAD DASHBOARD
// =====================================

function loadDashboard() {


    document

        .getElementById("welcomeText")

        .innerText =

        `Welcome back, ${user.name} 👋`;


    document

        .getElementById("profileName")

        .innerText =

        user.name;


    document

        .getElementById("role")

        .innerText =

        user.role;


    document

        .getElementById("agentMessage")

        .innerText =

        `Your AI preparation plan is ready for your goal of becoming a ${user.role}.`;


    createSkillAnalysis();


    createRoadmap();


    updateStats();


    createContinueCard();

}


// =====================================
// CONTINUE CARD
// =====================================

function createContinueCard() {


    let data = getSavedData();


    let progress = data.progress;


    let html = "";


    for (

        let type in progress

    ) {


        let item = progress[type];


        if (

            item.question > 0 &&

            item.question < 10

        ) {


            let title =

                type.charAt(0)

                    .toUpperCase() +

                type.slice(1);


            html += `

                <div class="continue-box">

                    <h2>

                        🔄 Continue ${title}

                    </h2>

                    <p>

                        You completed

                        ${item.question}/10 questions.

                    </p>

                    <p>

                        Score:

                        ${item.score}

                    </p>

                    <button

                        class="primary-btn"

                        onclick="startPractice('${type}')">

                        Continue from Question

                        ${item.question + 1}

                        →

                    </button>

                </div>

            `;

        }

    }


    document

        .getElementById("continueCard")

        .innerHTML = html;

}


// =====================================
// START PRACTICE
// =====================================

function startPractice(type) {


    currentType = type;


    let data = getSavedData();


    let savedProgress =

        data.progress[type];


    if (savedProgress) {


        currentQuestion =

            savedProgress.question;


        score =

            savedProgress.score;

    }


    else {


        currentQuestion = 0;

        score = 0;

    }


    document

        .getElementById("dashboardSection")

        .classList

        .add("hidden");


    document

        .getElementById("progressSection")

        .classList

        .add("hidden");


    document

        .getElementById("practiceSection")

        .classList

        .remove("hidden");


    document

        .getElementById("practiceTitle")

        .innerText =

        type.toUpperCase();


    loadQuestion();

}


// =====================================
// LOAD QUESTION
// =====================================

function loadQuestion() {


    let questions;


    if (

        currentType === "aptitude"

    ) {

        questions = aptitudeQuestions;

    }


    else if (

        currentType === "technical"

    ) {

        questions = technicalQuestions;

    }


    else if (

        currentType === "coding"

    ) {

        questions = codingQuestions;

    }


    else {

        questions = interviewQuestions;

    }


    if (

        currentQuestion >= 10

    ) {


        showCompleted();

        return;

    }


    document

        .getElementById("questionNumber")

        .innerText =

        `Question ${currentQuestion + 1} / 10`;


    document

        .getElementById("questionProgress")

        .style.width =

        `${((currentQuestion + 1) / 10) * 100}%`;


    document

        .getElementById("feedback")

        .innerHTML = "";


    document

        .getElementById("nextButton")

        .classList

        .add("hidden");


    let question =

        questions[currentQuestion];


    if (

        currentType === "aptitude" ||

        currentType === "technical"

    ) {


        document

            .getElementById("questionText")

            .innerText =

            question.question;


        let html = "";


        question.options

            .forEach(

                function(option, index) {


                    html += `

                        <button

                            class="option"

                            onclick="checkAnswer(${index})">

                            ${option}

                        </button>

                    `;

                }

            );


        document

            .getElementById("answerArea")

            .innerHTML = html;

    }


    else {


        document

            .getElementById("questionText")

            .innerText =

            question;


        document

            .getElementById("answerArea")

            .innerHTML = `

                <textarea

                    id="userAnswer"

                    placeholder="Write your answer here...">

                </textarea>

                <button

                    class="primary-btn"

                    onclick="submitTextAnswer()">

                    Submit Answer 🤖

                </button>

            `;

    }

}


// =====================================
// CHECK ANSWER
// =====================================

function checkAnswer(selected) {


    let questions =

        currentType === "aptitude"

            ? aptitudeQuestions

            : technicalQuestions;


    let question =

        questions[currentQuestion];


    let options =

        document

            .querySelectorAll(".option");


    options

        .forEach(

            button => {

                button.disabled = true;

            }

        );


    if (

        selected === question.answer

    ) {


        score++;


        options[selected]

            .classList

            .add("correct");


        showFeedback(

            "✅ Correct! Excellent work.",

            true

        );

    }


    else {


        options[selected]

            .classList

            .add("wrong");


        options[question.answer]

            .classList

            .add("correct");


        showFeedback(

            "❌ Incorrect. Keep learning and try again.",

            false

        );

    }


    saveProgress();


    document

        .getElementById("nextButton")

        .classList

        .remove("hidden");

}


// =====================================
// TEXT ANSWER
// =====================================

function submitTextAnswer() {


    let answer =

        document

            .getElementById("userAnswer")

            .value

            .trim();


    if (!answer) {


        alert(

            "Please write your answer first."

        );


        return;

    }


    score++;


    showFeedback(

        "🤖 Good answer! Keep improving your explanation.",

        true

    );


    saveProgress();


    document

        .getElementById("nextButton")

        .classList

        .remove("hidden");

}


// =====================================
// SAVE PROGRESS
// =====================================

function saveProgress() {


    let data = getSavedData();


    data.user = user;


    data.progress[currentType] = {


        question: currentQuestion + 1,


        score: score

    };


    saveData(data);

}


// =====================================
// NEXT QUESTION
// =====================================

function nextQuestion() {


    currentQuestion++;


    if (

        currentQuestion >= 10

    ) {


        let data = getSavedData();


        data.progress[currentType] = {


            question: 10,


            score: score,


            completed: true

        };


        saveData(data);


        showCompleted();


        return;

    }


    saveProgress();


    loadQuestion();

}


// =====================================
// COMPLETED
// =====================================

function showCompleted() {


    document

        .getElementById("questionText")

        .innerText =

        "🎉 Practice Completed!";


    document

        .getElementById("answerArea")

        .innerHTML = `

            <div class="feedback success">

                <h2>

                    Your Score:

                    ${score} / 10

                </h2>

                <br>

                Great job! Keep preparing for your placement 🚀

            </div>

        `;


    document

        .getElementById("feedback")

        .innerHTML = "";


    document

        .getElementById("nextButton")

        .classList

        .add("hidden");

}


// =====================================
// FEEDBACK
// =====================================

function showFeedback(message, success) {


    document

        .getElementById("feedback")

        .innerHTML = `

            <div class="feedback

                ${success ? "success" : "error"}">

                ${message}

            </div>

        `;

}


// =====================================
// DASHBOARD
// =====================================

function showDashboard() {


    document

        .getElementById("practiceSection")

        .classList

        .add("hidden");


    document

        .getElementById("progressSection")

        .classList

        .add("hidden");


    document

        .getElementById("dashboardSection")

        .classList

        .remove("hidden");


    loadDashboard();

}


// =====================================
// PROGRESS
// =====================================

function showProgress() {


    document

        .getElementById("dashboardSection")

        .classList

        .add("hidden");


    document

        .getElementById("practiceSection")

        .classList

        .add("hidden");


    document

        .getElementById("progressSection")

        .classList

        .remove("hidden");


    let data = getSavedData();


    let progress = data.progress;


    let html = "";


    let types = [

        "aptitude",

        "technical",

        "coding",

        "interview"

    ];


    types.forEach(

        function(type) {


            let item =

                progress[type];


            let completed =

                item

                    ? item.question

                    : 0;


            let score =

                item

                    ? item.score

                    : 0;


            html += `

                <div

                    class="progress-item">

                    <h3>

                        ${type.toUpperCase()}

                    </h3>

                    <p>

                        Completed:

                        ${completed} / 10

                    </p>

                    <p>

                        Score:

                        ${score}

                    </p>

                </div>

            `;

        }

    );


    document

        .getElementById("progressContent")

        .innerHTML = html;

}


// =====================================
// STATS
// =====================================

function updateStats() {


    let data = getSavedData();


    let total = 0;


    Object

        .values(data.progress)

        .forEach(

            item => {

                total +=

                    item.question || 0;

            }

        );


    let readiness =

        Math.round(

            (total / 40) * 100

        );


    document

        .getElementById("solved")

        .innerText = total;


    document

        .getElementById("readiness")

        .innerText =

        readiness + "%";

}


// =====================================
// SKILLS
// =====================================

function createSkillAnalysis() {


    let skills =

        user.skills.length

            ? user.skills

            : [

                "Python",

                "SQL",

                "Communication"

            ];


    let html = "";


    skills.forEach(

        function(skill, index) {


            let percentage =

                45 + index * 10;


            html += `

                <div

                    class="skill-row">

                    <div

                        class="skill-info">

                        <span>

                            ${skill}

                        </span>

                        <b>

                            ${percentage}%

                        </b>

                    </div>

                    <div

                        class="skill-bar">

                        <div

                            class="skill-fill"

                            style="width:${percentage}%">

                        </div>

                    </div>

                </div>

            `;

        }

    );


    document

        .getElementById("skillAnalysis")

        .innerHTML = html;

}


// =====================================
// ROADMAP
// =====================================

function createRoadmap() {


    let roadmap = [

        "Build strong programming fundamentals",

        "Practice aptitude and reasoning",

        "Improve technical knowledge",

        "Solve coding problems",

        "Practice mock interviews"

    ];


    let html = "";


    roadmap.forEach(

        function(item, index) {


            html += `

                <div

                    class="roadmap-item">

                    <div

                        class="roadmap-number">

                        ${index + 1}

                    </div>

                    <div>

                        <b>

                            ${item}

                        </b>

                        <p>

                            AI recommended preparation step.

                        </p>

                    </div>

                </div>

            `;

        }

    );


    document

        .getElementById("roadmap")

        .innerHTML = html;

}


// =====================================
// CHANGE USER
// =====================================

function resetUser() {


    // IMPORTANT:

    // This only removes the current user's data.

    // It does not affect other users.

    localStorage.removeItem(

        getUserKey()

    );


    location.reload();

}


// =====================================
// INITIAL LOAD
// =====================================

// Always show the name screen first.

document

    .getElementById("setupScreen")

    .classList

    .remove("hidden");


document

    .getElementById("app")

    .classList

    .add("hidden");
