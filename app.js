const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const missed = 0;
const startButton = document.querySelector(".btn__reset");

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
const checkLetter = btnGuess => {
  const letter = document.querySelectorAll(".letter");
  let match = null;
  for (let i = 0; i < letter.length; i++) {
    if (letter[i].textContent === btnGuess.textContent) {
      letter[i].classList.add("show");
      match = btnGuess.textContent;
    }
  }
  return match;
};

qwerty.addEventListener("click", btn => {
  const button = btn.target;
  if (button.tagName === "BUTTON" && button.className !== "chosen") {
    button.className = "chosen";
    const letterFound = checkLetter(button);
  } else if (button.tagName === "BUTTON" || button.className === "chosen") {
    button.setAttribute("disabled", "");
  }
});
