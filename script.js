const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const sound = document.getElementById("click-sound");
const themeBtn = document.getElementById("theme-toggle");
const soundBtn = document.getElementById("sound-toggle");

let soundOn = true;

// Button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (soundOn && sound) {
      sound.currentTime = 0;
      sound.play().catch(e => console.log("Sound error:", e));
    }

    if (value === "=") {
      try {
        let expression = display.value.replace(/×/g, "*");
        display.value = eval(expression);
      } catch {
        display.value = "Error";
      }
    } else if (value === "C") {
      display.value = "";
    } else if (value === "←") {
      display.value = display.value.slice(0, -1);
    } else {
      display.value += value;
    }
  });
});

// Keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (soundOn && sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Sound error:", e));
  }

  if (!isNaN(key) || ["+", "-", "*", "÷", "%", "."].includes(key)) {
    display.value += key;
  } else if (key === "Enter") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (key === "Escape") {
    display.value = "";
  }
});

// Theme toggle
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// Sound toggle
soundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  soundBtn.textContent = soundOn ? "🔊" : "🔇";
});
