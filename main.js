const moviesObject = {
    "✈ 🪖 🪂": "Top Gun",
    "🪄 👓 ⚡": "Harry Potter",
    "🦇 🃏 🤡": "Joker",
    "👩‍❤️‍👨 🚢 🥶": "Titanic",
    "🥇 🏃‍♂️ 🍤": "Forrest Gump",
    "🐀 👨‍🍳 🍝": "Ratatouille",
    "👩‍👧‍👦 👜 ☂": "Mary Poppins",
    "😰 🫅 💬": "El Discurso Del Rey",
    "📱 🍎": "Jobs",
    "👑 🎼 🎤 🎸": "Elvis",
    "🌈 👠 👩": "Barbie",
    "👨‍🏫 💣 🗾": "Oppenheimer",
    "🏎 🏆 👨‍🔧": "Ford Vs Ferrari",
    "🫣🔝🌍 ☄": "No Mires Arriba",
};

const container = document.querySelector(".container");
const controls = document.querySelector(".controls-container");
const startButton = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInputSection = document.getElementById("userInputSection");
const resultText = document.getElementById("result");
const chanceCount = document.getElementById("chanceCount");
const hints = Object.keys(moviesObject);
let randomHint = "",
    randomWord = "";
let winCount = 0,
    lossCount = 5;

const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

const blocker = () => {
    let letterButtons = document.querySelectorAll(".letters");
    letterButtons.forEach((button) => {
        button.disabled = true;
    });
    stopGame();
};

startButton.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
});

const stopGame = () => {
    controls.classList.remove("hide");
};

const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";
    randomHint = hints[generateRandomValue(hints)];
    randomWord = moviesObject[randomHint];
    container.innerHTML = `<div id="movieHint">${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
        if (value == " ") {
            winCount += 1;
            displayItem += `<span class="inputSpace">&nbsp;</span>`;
        } else {
            displayItem += `<span class="inputSpace">_</span>`;
        }
    });
    userInputSection.innerHTML = displayItem;
};

const init = () => {
    winCount = 0;
    lossCount = 5;
    chanceCount.innerHTML = `<span>Intentos: </span>${lossCount}`;
    randomHint = null;
    randomWord = "";
    userInputSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");

        button.innerText = String.fromCharCode(i);

        button.addEventListener("click", () => {
            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace");
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    if (char === button.innerText) {
                        button.classList.add("used");
                        inputSpace[index].innerText = char;
                        winCount += 1;
                        if (winCount == charArray.length) {
                            resultText.innerHTML = "¡🤩 Felicitaciones, adivinaste! 🏆";
                            blocker();
                            localStorage.setItem("winCount", winCount);
                        }
                    }
                });
            } else {
                lossCount -= 1;
                chanceCount.innerHTML = `<span>Intentos:</span> ${lossCount}`;
                button.classList.add("used");
                if (lossCount == 0) {
                    resultText.innerHTML = "¡Uy! 😞 Perdiste, intentalo de nuevo";
                    blocker();
                }
            }
            button.disabled = true;
        });
        letterContainer.appendChild(button);
    }
};

window.onload = () => {
    winCount = localStorage.getItem("winCount") || 0;
    init();
};

