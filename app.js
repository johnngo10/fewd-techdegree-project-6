const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startButton = document.querySelector(".btn__reset");
const scoreboard = document.querySelector("#scoreboard");
var missed = 0;

const phrases = [
  "javascript is fun",
  "sass makes css better",
  "i like tacos",
  "i want to travel",
  "code all day"
];

// Start the game
startButton.addEventListener("click", () => {
  document.querySelector("#overlay").style.display = "none";
});

// Get a random phrase and split it into an array
function getRandomPhraseAsArray(arr) {
  let random = arr[Math.floor(Math.random() * arr.length)];
  return random.split("");
}

getRandomPhraseAsArray(phrases);

// Add phrase to the display
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    let char = arr[i];
    const li = document.createElement("li");
    li.textContent = char;
    phrase.appendChild(li);
    if (char !== " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Check players buttons against correct letters
function checkLetter(btnGuess) {
  const letter = document.querySelectorAll(".letter");
  let match = null;
  for (let i = 0; i < letter.length; i++) {
    if (letter[i].textContent === btnGuess.textContent) {
      letter[i].classList.add("show");
      match = btnGuess.textContent;
    }
  }
  return match;
}

// Listen for players button press and score
qwerty.addEventListener("click", btn => {
  const button = btn.target;
  if (button.tagName === "BUTTON" && button.className !== "chosen") {
    button.className = "chosen";
  } else if (button.tagName === "BUTTON" || button.className === "chosen") {
    button.setAttribute("disabled", "");
  }
  const letterFound = checkLetter(button);
  if (letterFound === null) {
    const tries = scoreboard.firstElementChild;
    tries.removeChild(tries.firstElementChild);
    missed += 1;
  }
  checkWin(button);
});

// Check for win or loss
function checkWin() {
  const letter = document.querySelectorAll(".letter");
  const show = document.querySelectorAll(".show");
  const overlay = document.querySelector("#overlay");
  if (letter.length === show.length) {
    overlay.className = "win";
    overlay.firstElementChild.textContent = "You Won!";
    overlay.style.display = "flex";
  } else if (missed > 4) {
    overlay.className = "lose";
    overlay.firstElementChild.textContent = "Try Again!";
    overlay.style.display = "flex";
  }
}
