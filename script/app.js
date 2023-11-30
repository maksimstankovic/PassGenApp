const slider = document.getElementById("slider");
const output = document.getElementById("output");
slider.addEventListener("input", () => {
  const sliderValue = slider.value;
  output.textContent = `${sliderValue}`;
});

const textInput = document.getElementById("textInput");
const message = document.getElementById("message");
const copyButton = document.getElementById("copyButton");

const bars = ["bar1", "bar2", "bar3", "bar4"];
function applyClassToBars(classNames) {
  for (let i = 0; i < bars.length; i++) {
    const element = document.getElementById(bars[i]);
    if (element) {
      element.className = classNames[i];
    }
  }
}
function removeClass() {
  applyClassToBars(["", "", "", ""]);
}
function tooWeak() {
  removeClass();
  applyClassToBars(["tooweak", "", "", ""]);
}
function weak() {
  removeClass();
  applyClassToBars(["weak", "weak", "", ""]);
}
function medium() {
  removeClass();
  applyClassToBars(["medium", "medium", "medium", ""]);
}
function strong() {
  removeClass();
  applyClassToBars(["strong", "strong", "strong", "strong"]);
}

const generateButton = document.getElementById("generate");

const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
const lowerCaseChars = "abcdefghijklmnopqrstuvxyz";
const numbersChars = "0123456789";
const specialChars = "£$&()*+[]@#^-_!?";

generateButton.addEventListener("click", () => {
  const desiredLength = parseInt(slider.value);
  let selectedChars = "";

  if (document.getElementById("uppercase").checked) {
    selectedChars += upperCaseChars;
  }
  if (document.getElementById("lowercase").checked) {
    selectedChars += lowerCaseChars;
  }
  if (document.getElementById("numbers").checked) {
    selectedChars += numbersChars;
  }
  if (document.getElementById("symbols").checked) {
    selectedChars += specialChars;
  }

  let generatedString = "";
  for (let i = 0; i < desiredLength; i++) {
    const randomIndex = Math.floor(Math.random() * selectedChars.length);
    generatedString += selectedChars[randomIndex];
  }

  estimateStrength(generatedString);
  textInput.value = generatedString;
  textInput.disabled = false;
});

const passwordStrength = document.getElementById("strength");

const estimateStrength = (generatedString) => {
  let score = zxcvbn(generatedString).score;

  if (score <= 1) {
    passwordStrength.textContent = "too weak!";
    tooWeak();
  } else if (score === 2) {
    passwordStrength.textContent = "weak";
    weak();
  } else if (score === 3) {
    passwordStrength.textContent = "medium";
    medium();
  } else {
    passwordStrength.textContent = "strong";
    strong();
  }
};

copyButton.addEventListener("click", () => {
  const copiedText = textInput.value;
  if (textInput.value === "") {
    message.style.display = "block";
    message.textContent = "Nothing to copy!";
    setTimeout(() => {
      message.style.display = "none";
    }, 1500);
  } else {
    navigator.clipboard.writeText(copiedText).then(() => {
      message.textContent = "Copied!";
      message.style.display = "block";
      setTimeout(() => {
        message.style.display = "none";
      }, 1500);
    });
  }
});
