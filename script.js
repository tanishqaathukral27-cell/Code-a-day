// ================================
// INDEX PAGE
// ================================

// Restart Code-a-Day when the browser is refreshed
if (performance.getEntriesByType("navigation")[0].type === "reload") {

    if (!window.location.pathname.endsWith("index.html")) {
        window.location.href = "index.html";
    }

}

const welcomeButton = document.getElementById("welcome-btn");

if (welcomeButton) {

    welcomeButton.addEventListener("click", function() {
        window.location.href = "loading.html";
    });

}


// ================================
// LOADING PAGE
// ================================

const loadingSection = document.getElementById("loading");

if (loadingSection) {

    setTimeout(function() {
        window.location.href = "category.html";
    }, 2000);

}


// ================================
// CATEGORY PAGE
// ================================

const categoryButton = document.getElementById("category-btn");

if (categoryButton) {

    categoryButton.addEventListener("click", function() {
        window.location.href = "type.html";
    });

}


// ================================
// TYPE PAGE
// ================================

// ================================
// TYPE PAGE
// ================================

const moviesButton = document.getElementById("movies-btn");
const popButton = document.getElementById("pop-btn");
const gkButton = document.getElementById("gk-btn");

let selectedType = sessionStorage.getItem("selectedType") || "";


if (moviesButton) {

    moviesButton.addEventListener("click", function() {

        selectedType = "movies";

        sessionStorage.setItem("selectedType", selectedType);

        window.location.href = "character.html";

    });

}


if (popButton) {

    popButton.addEventListener("click", function() {

        selectedType = "pop";

        sessionStorage.setItem("selectedType", selectedType);

        window.location.href = "character.html";

    });

}


if (gkButton) {

    gkButton.addEventListener("click", function() {

        selectedType = "gk";

        sessionStorage.setItem("selectedType", selectedType);

        window.location.href = "character.html";

    });

}


// ================================
// CHARACTER PAGE
// ================================

const dawnButton = document.getElementById("character1-btn");
const serenaButton = document.getElementById("character2-btn");
const mistyButton = document.getElementById("character3-btn");

let selectedCharacter = sessionStorage.getItem("selectedCharacter") || "";

if (dawnButton) {

    dawnButton.addEventListener("click", function() {

        selectedCharacter = "dawn";
        sessionStorage.setItem("selectedCharacter", "dawn");

        console.log("Dawn clicked!");

        window.location.href = "morning-loading.html";

    });

}
function showCharacter() {
    const characterImage = document.getElementById("character-image");

    if (!characterImage || !selectedCharacter) {
        return;
    }

    if (selectedCharacter === "dawn") {
        characterImage.src = "assets/dawn.png";
    }
    else if (selectedCharacter === "serena") {
        characterImage.src = "assets/serena.png";
    }
    else if (selectedCharacter === "misty") {
        characterImage.src = "assets/misty.png";
    }
}
showCharacter();
const morningLoading = document.getElementById("morning-loading");

if (morningLoading) {

    setTimeout(function() {
        window.location.href = "morning.html";
    }, 5000);

}
if (serenaButton) {

    serenaButton.addEventListener("click", function() {

        selectedCharacter = "serena";
          sessionStorage.setItem("selectedCharacter", "serena");

        console.log("Serena clicked!");

        window.location.href = "morningloading2.html";

    });

}

if (mistyButton) {

    mistyButton.addEventListener("click", function() {

        selectedCharacter = "misty";

          sessionStorage.setItem("selectedCharacter", "misty");

        console.log("Misty clicked!");

        window.location.href = "morningloading3.html";

    });

}


const morningLoading2 = document.getElementById("morningloading2");


if (morningLoading2) {

    setTimeout(function() {
        window.location.href = "morning.html";
    }, 5000);

}
const morningLoading3 = document.getElementById("morningloading3");

if (morningLoading3) {

    setTimeout(function() {
        window.location.href = "morning.html";
    }, 5000);

}


// ================================
// QUESTION DATA
// ================================

const questions = {

    // ========================================
    // 🎬 MOVIES
    // ========================================

    movies: {

        morning: [

            {
                question: "What was the name of the magazine Andie worked for in How to Lose a Guy in 10 Days?",
                options: [
                    "Vogue",
                    "Composure",
                    "Cosmopolitan",
                    "Harper's Bazaar"
                ],
                answer: "Composure"
            },

            {
                question: "What does Harry use to breathe underwater during the second task of the Triwizard Tournament?",
                options: [
                    "Bubble-Head Charm",
                    "Gillyweed",
                    "Mandrake",
                    "Fire Fern"
                ],
                answer: "Gillyweed"
            },

            {
                question: "What is Rahul's childhood nickname in Kabhi Khushi Kabhie Gham?",
                options: [
                    "Rohan",
                    "Raju",
                    "Rahul",
                    "Laddoo"
                ],
                answer: "Laddoo"
            }

        ],

        afternoon: [

            {
                question: "In The Notebook, what is Noah's job when he returns to Seabrook?",
                options: [
                    "Teacher",
                    "Lumber worker",
                    "Mechanic",
                    "Architect"
                ],
                answer: "Lumber worker"
            },

            {
                question: "What house does Harry Potter belong to at Hogwarts?",
                options: [
                    "Slytherin",
                    "Ravenclaw",
                    "Gryffindor",
                    "Hufflepuff"
                ],
                answer: "Gryffindor"
            },

            {
                question: "In Zindagi Na Milegi Dobara, which country do the three friends travel through?",
                options: [
                    "Italy",
                    "Spain",
                    "France",
                    "Greece"
                ],
                answer: "Spain"
            }

        ],

        evening: [

            {
                question: "In La La Land, what instrument does Sebastian primarily play?",
                options: [
                    "Guitar",
                    "Piano",
                    "Violin",
                    "Drums"
                ],
                answer: "Piano"
            },

            {
                question: "What is the name of Harry Potter's owl?",
                options: [
                    "Crookshanks",
                    "Hedwig",
                    "Fawkes",
                    "Scabbers"
                ],
                answer: "Hedwig"
            },

            {
                question: "In Om Shanti Om, what is Om's profession at the beginning of the film?",
                options: [
                    "Director",
                    "Actor",
                    "Junior artist",
                    "Producer"
                ],
                answer: "Junior artist"
            }

        ],

        night: [

            {
                question: "In How to Lose a Guy in 10 Days, what does Benjamin bet his friends he can make Andie do?",
                options: [
                    "Fall in love with him",
                    "Quit her job",
                    "Move to New York",
                    "Write about him"
                ],
                answer: "Fall in love with him"
            },

            {
                question: "What position does Harry play on the Gryffindor Quidditch team?",
                options: [
                    "Keeper",
                    "Beater",
                    "Chaser",
                    "Seeker"
                ],
                answer: "Seeker"
            },

            {
                question: "In Dilwale Dulhania Le Jayenge, where does Raj first meet Simran?",
                options: [
                    "London",
                    "Paris",
                    "Switzerland",
                    "Rome"
                ],
                answer: "London"
            }

        ]

    },


    // ========================================
    // 🎤 POP CULTURE / MUSIC
    // ========================================

    pop: {

        morning: [

            {
                question: "Which singer released the hit song 'Espresso'?",
                options: [
                    "Olivia Rodrigo",
                    "Sabrina Carpenter",
                    "Tate McRae",
                    "Dua Lipa"
                ],
                answer: "Sabrina Carpenter"
            },

            {
                question: "Which artist is known for the albums 'SOUR' and 'GUTS'?",
                options: [
                    "Billie Eilish",
                    "Olivia Rodrigo",
                    "Sabrina Carpenter",
                    "Chappell Roan"
                ],
                answer: "Olivia Rodrigo"
            },

            {
                question: "Which group includes RM, Jin, SUGA, j-hope, Jimin, V and Jung Kook?",
                options: [
                    "BLACKPINK",
                    "Stray Kids",
                    "BTS",
                    "SEVENTEEN"
                ],
                answer: "BTS"
            }

        ],

        afternoon: [

            {
                question: "Which singer is known for the album 'HIT ME HARD AND SOFT'?",
                options: [
                    "Billie Eilish",
                    "Taylor Swift",
                    "Ariana Grande",
                    "Sabrina Carpenter"
                ],
                answer: "Billie Eilish"
            },

            {
                question: "Which singer is behind the song 'greedy'?",
                options: [
                    "Tate McRae",
                    "Sabrina Carpenter",
                    "Dua Lipa",
                    "Ariana Grande"
                ],
                answer: "Tate McRae"
            },

            {
                question: "Which artist is famous for the songs 'bad guy' and 'Happier Than Ever'?",
                options: [
                    "Olivia Rodrigo",
                    "Billie Eilish",
                    "Lana Del Rey",
                    "Lady Gaga"
                ],
                answer: "Billie Eilish"
            }

        ],

        evening: [

            {
                question: "Which artist released the album 'The Tortured Poets Department'?",
                options: [
                    "Taylor Swift",
                    "Ariana Grande",
                    "Lady Gaga",
                    "Sabrina Carpenter"
                ],
                answer: "Taylor Swift"
            },

            {
                question: "Which singer plays Glinda in the Wicked films?",
                options: [
                    "Sabrina Carpenter",
                    "Ariana Grande",
                    "Dua Lipa",
                    "Selena Gomez"
                ],
                answer: "Ariana Grande"
            },

            {
                question: "Which artist is associated with the hit song 'APT.' with Bruno Mars?",
                options: [
                    "Jennie",
                    "Rosé",
                    "Lisa",
                    "Jisoo"
                ],
                answer: "Rosé"
            }

        ],

        night: [

            {
                question: "Which artist released 'Manchild'?",
                options: [
                    "Sabrina Carpenter",
                    "Tate McRae",
                    "Olivia Rodrigo",
                    "Chappell Roan"
                ],
                answer: "Sabrina Carpenter"
            },

            {
                question: "Which singer is behind the song 'Pink Pony Club'?",
                options: [
                    "Chappell Roan",
                    "Billie Eilish",
                    "Lorde",
                    "Sabrina Carpenter"
                ],
                answer: "Chappell Roan"
            },

            {
                question: "Which artist released the 2026 hit 'Drop Dead'?",
                options: [
                    "Olivia Rodrigo",
                    "Taylor Swift",
                    "Ariana Grande",
                    "Tate McRae"
                ],
                answer: "Olivia Rodrigo"
            }

        ]

    },


    // ========================================
    // 🧠 GENERAL KNOWLEDGE
    // ========================================

    gk: {

        morning: [

            {
                question: "What is the capital of France?",
                options: [
                    "Madrid",
                    "Paris",
                    "Rome",
                    "Berlin"
                ],
                answer: "Paris"
            },

            {
                question: "How many continents are there?",
                options: [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                answer: "7"
            },

            {
                question: "Which planet is known as the Red Planet?",
                options: [
                    "Venus",
                    "Mars",
                    "Jupiter",
                    "Mercury"
                ],
                answer: "Mars"
            }

        ],

        afternoon: [

            {
                question: "What is the largest ocean on Earth?",
                options: [
                    "Atlantic Ocean",
                    "Indian Ocean",
                    "Pacific Ocean",
                    "Arctic Ocean"
                ],
                answer: "Pacific Ocean"
            },

            {
                question: "Who wrote Romeo and Juliet?",
                options: [
                    "Charles Dickens",
                    "William Shakespeare",
                    "Jane Austen",
                    "George Orwell"
                ],
                answer: "William Shakespeare"
            },

            {
                question: "What is the chemical symbol for gold?",
                options: [
                    "Ag",
                    "Fe",
                    "Au",
                    "Cu"
                ],
                answer: "Au"
            }

        ],

        evening: [

            {
                question: "Which is the largest planet in our solar system?",
                options: [
                    "Earth",
                    "Saturn",
                    "Jupiter",
                    "Neptune"
                ],
                answer: "Jupiter"
            },

            {
                question: "How many players are there on a football team on the field?",
                options: [
                    "9",
                    "10",
                    "11",
                    "12"
                ],
                answer: "11"
            },

            {
                question: "What is the currency of Japan?",
                options: [
                    "Won",
                    "Yuan",
                    "Yen",
                    "Ringgit"
                ],
                answer: "Yen"
            }

        ],

        night: [

            {
                question: "Which is the fastest land animal?",
                options: [
                    "Lion",
                    "Cheetah",
                    "Horse",
                    "Leopard"
                ],
                answer: "Cheetah"
            },

            {
                question: "How many days are there in a leap year?",
                options: [
                    "364",
                    "365",
                    "366",
                    "367"
                ],
                answer: "366"
            },

            {
                question: "Which country is famous for the Great Pyramids of Giza?",
                options: [
                    "Greece",
                    "Egypt",
                    "Mexico",
                    "India"
                ],
                answer: "Egypt"
            }

        ]

    }

};
// ================================
// MORNING QUESTIONS
// ================================

// ================================
// DAY QUESTIONS
// ================================

const page = document.body.dataset.page;

const questionCards = document.querySelectorAll(".question-card");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const questionArea = document.getElementById("question-area");
const answerResult = document.getElementById("answer-result");

const currentType = sessionStorage.getItem("selectedType");


// ================================
// CHOICE DATA
// ================================

const morningChoices = {

    good: [
        "Have a proper breakfast.",
        "Get ready while listening to music.",
        "Take some quiet time before starting the day"
    ],

    bad: [
        "Keep snoozing your alarm.",
        "Scroll through your phone instead of getting ready.",
        "Rush through the morning without eating."
    ]

};


const afternoonChoices = {

    good: [
        "Have lunch and take a proper break",
        "Get some work done before relaxing",
        "Go out and do something fun"
    ],

    bad: [
        "Put everything off until later",
        "Spend the whole afternoon scrolling",
        "Forget to take a break and burn yourself out"
    ]

};


const eveningChoices = {

    good: [
        "Go for an evening walk",
        "Hang out with friends or family",
        "Do something you've been looking forward to"
    ],

    bad: [
        "Stay in your room all evening",
        "Keep scrolling instead of doing anything",
        "Leave everything until the last minute"
    ]

};


const nightChoices = {

    good: [
        "Watch something comforting before bed",
        "Write down how your day went",
        "Put your phone away and wind down"
    ],

    bad: [
        "Stay up scrolling for hours",
        "Procrastinate until way too late",
        "Go to bed without winding down"
    ]

};


// ================================
// ALL CHOICES IN ONE OBJECT
// ================================

const choicesByTime = {

    morning: morningChoices,
    afternoon: afternoonChoices,
    evening: eveningChoices,
    night: nightChoices

};


// ================================
// QUESTION SYSTEM
// ================================

if (
    questionCards.length > 0 &&
    questionText &&
    answerButtons &&
    questionArea &&
    answerResult &&
    currentType &&
    page
) {

    const currentQuestions = questions[currentType][page];

    questionCards.forEach(function(card, index) {

        card.addEventListener("click", function() {

            const currentQuestion = currentQuestions[index];

            // Hide the question cards
            document.getElementById("question-cards").style.display = "none";

            // Show the selected question
            questionText.textContent = currentQuestion.question;

            answerButtons.innerHTML = "";

            answerResult.textContent = "";

            currentQuestion.options.forEach(function(option) {

                const button = document.createElement("button");

                button.textContent = option;

                button.addEventListener("click", function() {

                    if (option === currentQuestion.answer) {

                        answerResult.textContent = "Correct!";

                        // Hide the question
                        questionArea.style.display = "none";

                        // Show good choices
                        showChoices(
                            choicesByTime[page].good,
                            page
                        );

                    } else {

                        answerResult.textContent = "Wrong!";

                        // Hide the question
                        questionArea.style.display = "none";

                        // Show bad choices
                        showChoices(
                            choicesByTime[page].bad,
                            page
                        );

                    }

                });

                answerButtons.appendChild(button);

            });

            questionArea.style.display = "block";

        });

    });

}


// ================================
// SHOW CHOICES
// ================================

function showChoices(choices, timeOfDay) {

    const choicesTitle = document.getElementById("choices-title");
    const choiceButtons = document.getElementById("choice-buttons");
    const choicesArea = document.getElementById("choices-area");

    choicesTitle.textContent = "Choose what you want to do:";

    choiceButtons.innerHTML = "";

    choices.forEach(function(choice) {

        const button = document.createElement("button");

        button.textContent = choice;

        button.addEventListener("click", function() {

            // Save the choice
            sessionStorage.setItem(
                timeOfDay + "Choice",
                choice
            );

            // Move to the next page

            if (timeOfDay === "morning") {

                window.location.href = "afternoon.html";

            }

            else if (timeOfDay === "afternoon") {

                window.location.href = "evening.html";

            }

            else if (timeOfDay === "evening") {

                window.location.href = "night.html";

            }

            else if (timeOfDay === "night") {

                window.location.href = "final.html";

            }

        });

        choiceButtons.appendChild(button);

    });

    choicesArea.style.display = "block";
}

// ================================
// FINAL PAGE
// ================================

if (page === "final") {

    document.getElementById("morning-choice").textContent =
        sessionStorage.getItem("morningChoice");

    document.getElementById("afternoon-choice").textContent =
        sessionStorage.getItem("afternoonChoice");

    document.getElementById("evening-choice").textContent =
        sessionStorage.getItem("eveningChoice");

    document.getElementById("night-choice").textContent =
        sessionStorage.getItem("nightChoice");
}