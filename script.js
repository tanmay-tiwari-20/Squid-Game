const questions = [
  {
    question:
      "When you encounter a critical bug in production, what's your first move?",
    options: [
      {
        text: "Panic and immediately start fixing without planning",
        character: "gihun",
      },
      {
        text: "Systematically analyze the issue and create a strategic fix",
        character: "sangwoo",
      },
      {
        text: "Stay calm and quietly work on a solution",
        character: "saebyeok",
      },
      {
        text: "Take control and coordinate the team's response",
        character: "frontman",
      },
    ],
  },
  {
    question: "Your preferred coding environment is:",
    options: [
      {
        text: "Chaotic but creative - multiple monitors, snacks everywhere",
        character: "gihun",
      },
      {
        text: "Perfectly organized with premium tools and setup",
        character: "sangwoo",
      },
      {
        text: "Minimal and efficient - just what you need",
        character: "saebyeok",
      },
      {
        text: "High-end everything - the best money can buy",
        character: "frontman",
      },
    ],
  },
  {
    question: "When working in a team, you usually:",
    options: [
      {
        text: "Try to help everyone, even if it slows you down",
        character: "gihun",
      },
      {
        text: "Focus on what benefits you and your goals most",
        character: "sangwoo",
      },
      {
        text: "Work independently but share when necessary",
        character: "saebyeok",
      },
      {
        text: "Lead and make sure everyone follows your vision",
        character: "frontman",
      },
    ],
  },
  {
    question: "Your approach to learning new technologies:",
    options: [
      {
        text: "Jump in headfirst and learn by making mistakes",
        character: "gihun",
      },
      {
        text: "Research thoroughly and choose only the most valuable skills",
        character: "sangwoo",
      },
      {
        text: "Learn what's necessary to survive and advance",
        character: "saebyeok",
      },
      {
        text: "Master everything to maintain your position",
        character: "frontman",
      },
    ],
  },
  {
    question: "During code reviews, you:",
    options: [
      {
        text: "Try to be encouraging and helpful to junior developers",
        character: "gihun",
      },
      {
        text: "Point out flaws strategically to show your expertise",
        character: "sangwoo",
      },
      {
        text: "Give honest, direct feedback without drama",
        character: "saebyeok",
      },
      {
        text: "Set high standards and expect perfection",
        character: "frontman",
      },
    ],
  },
  {
    question: "Your biggest motivation for coding is:",
    options: [
      {
        text: "The joy of creating something that helps people",
        character: "gihun",
      },
      {
        text: "Recognition, career advancement, and financial success",
        character: "sangwoo",
      },
      {
        text: "Independence and the ability to support yourself",
        character: "saebyeok",
      },
      { text: "Power and control over complex systems", character: "frontman" },
    ],
  },
  {
    question: "When facing an impossible deadline:",
    options: [
      {
        text: "Work overtime and stress out but try to deliver",
        character: "gihun",
      },
      {
        text: "Negotiate smartly or find ways to make others do the work",
        character: "sangwoo",
      },
      {
        text: "Focus on the most critical features and deliver those",
        character: "saebyeok",
      },
      {
        text: "Restructure the entire project to meet your timeline",
        character: "frontman",
      },
    ],
  },
  {
    question: "Your ideal career outcome is:",
    options: [
      {
        text: "Working on meaningful projects with good people",
        character: "gihun",
      },
      {
        text: "Becoming a successful tech executive or entrepreneur",
        character: "sangwoo",
      },
      {
        text: "Achieving financial stability and personal freedom",
        character: "saebyeok",
      },
      { text: "Running your own tech empire", character: "frontman" },
    ],
  },
];

const characters = {
  gihun: {
    name: "GI-HUN",
    role: "The Hopeful Developer",
    description:
      "You're the heart of every dev team. Despite setbacks and bugs, you maintain optimism and genuinely care about your colleagues. You might not always have the cleanest code, but your compassion and determination make you invaluable. You code with your heart.",
    icon: "😊",
    percentage: 95,
  },
  sangwoo: {
    name: "SANG-WOO",
    role: "The Strategic Architect",
    description:
      "You're brilliant and calculated. Every line of code serves a purpose in your master plan. You know how to play the corporate game and aren't afraid to make tough decisions. Your solutions are elegant, but your methods can be ruthless.",
    icon: "🧠",
    percentage: 92,
  },
  saebyeok: {
    name: "SAE-BYEOK",
    role: "The Survivor Coder",
    description:
      "You're resourceful and pragmatic. You write code that works under any conditions and never breaks. You don't need the fanciest tools - you make magic happen with whatever you have. You're the definition of efficient and reliable.",
    icon: "⚡",
    percentage: 88,
  },
  frontman: {
    name: "FRONT MAN",
    role: "The System Administrator",
    description:
      "You control the entire stack. Every service, every deployment, every user permission goes through you. You maintain order in the chaos of development. Others might fear your authority, but they respect your ability to keep everything running perfectly.",
    icon: "🎭",
    percentage: 98,
  },
};

let currentQuestion = 0;
let scores = { gihun: 0, sangwoo: 0, saebyeok: 0, frontman: 0 };
let timeLeft = 25;
let timer;
let gameAudio;
let isAudioPlaying = false;

// Initialize audio element
function initializeAudio() {
  gameAudio = document.getElementById("gameAudio");
  gameAudio.volume = 0.3; // Set volume to 30% to not be too loud

  // Handle audio loading errors
  gameAudio.addEventListener("error", function (e) {
    console.log("Audio failed to load:", e);
    // Fallback - hide audio controls if file doesn't exist
    document.querySelector(".audio-controls").style.display = "none";
  });

  // Handle successful audio loading
  gameAudio.addEventListener("canplaythrough", function () {
    console.log("Audio loaded successfully");
  });
}

function toggleAudio() {
  const audioBtn = document.getElementById("audioBtn");
  const visualizer = document.getElementById("audioVisualizer");

  if (!gameAudio) {
    initializeAudio();
  }

  if (isAudioPlaying) {
    // Stop audio
    gameAudio.pause();
    isAudioPlaying = false;
    audioBtn.textContent = "🔇";
    audioBtn.classList.add("muted");
    visualizer.classList.remove("active");
  } else {
    // Start audio
    gameAudio
      .play()
      .then(() => {
        isAudioPlaying = true;
        audioBtn.textContent = "🔊";
        audioBtn.classList.remove("muted");
        visualizer.classList.add("active");
      })
      .catch((error) => {
        console.log("Audio play failed:", error);
        // Handle autoplay restrictions
        alert("Click the audio button to enable background music!");
      });
  }
}

function startQuiz() {
  // Initialize audio when game starts
  initializeAudio();

  // Auto-start music when game begins (with user gesture)
  if (!isAudioPlaying) {
    toggleAudio();
  }

  gsap.to("#introScreen", {
    duration: 0.5,
    opacity: 0,
    y: -50,
    onComplete: () => {
      document.getElementById("introScreen").style.display = "none";
      document.getElementById("quizContainer").style.display = "block";
      gsap.fromTo(
        "#quizContainer",
        { opacity: 0, y: 50 },
        { duration: 0.5, opacity: 1, y: 0 }
      );
      showQuestion();
    },
  });
}

function showQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("questionText").textContent = question.question;
  document.getElementById("questionNumber").textContent = `Question ${
    currentQuestion + 1
  } of ${questions.length}`;

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progressFill").style.width = progress + "%";

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = "option";
    optionElement.textContent = option.text;
    optionElement.onclick = () => selectOption(option.character);

    gsap.fromTo(
      optionElement,
      { opacity: 0, x: -30 },
      { duration: 0.3, opacity: 1, x: 0, delay: index * 0.1 }
    );

    container.appendChild(optionElement);
  });

  // Start timer for extra tension
  startTimer();
}

function startTimer() {
  const duration = 25; // Total time in seconds
  const timerElement = document.getElementById("timer");
  timerElement.classList.add("active");

  const startTime = Date.now();

  function updateTimer() {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    const remaining = duration - elapsed;

    timerElement.textContent = `⏰ ${remaining}`;

    if (remaining <= 0) {
      timerElement.textContent = `⏰ 0`;
      timerElement.classList.remove("active");

      // Auto-select random option if time runs out
      const randomIndex = Math.floor(
        Math.random() * questions[currentQuestion].options.length
      );
      selectOption(questions[currentQuestion].options[randomIndex].character);
    } else {
      requestAnimationFrame(updateTimer);
    }
  }

  requestAnimationFrame(updateTimer);
}

function selectOption(character) {
  clearInterval(timer);
  document.getElementById("timer").classList.remove("active");

  scores[character]++;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;

    gsap.to("#quizContainer", {
      duration: 0.3,
      opacity: 0,
      x: -30,
      onComplete: () => {
        gsap.fromTo(
          "#quizContainer",
          { opacity: 0, x: 30 },
          { duration: 0.3, opacity: 1, x: 0 }
        );
        showQuestion();
      },
    });
  } else {
    showResult();
  }
}

function showResult() {
  const winner = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );
  const character = characters[winner];

  gsap.to("#quizContainer", {
    duration: 0.5,
    opacity: 0,
    y: -50,
    ease: "power2.inOut",
    onComplete: () => {
      document.getElementById("quizContainer").style.display = "none";
      document.getElementById("resultScreen").style.display = "block";

      document.getElementById("characterName").textContent = character.name;
      document.getElementById("characterRole").textContent = character.role;
      document.getElementById("characterDescription").textContent =
        character.description;
      document.getElementById("characterIcon").textContent = character.icon;

      gsap.fromTo(
        "#resultScreen",
        { opacity: 0, y: 50 },
        { duration: 0.7, opacity: 1, y: 0, ease: "power3.out" }
      );

      // Animate percentage counter
      setTimeout(() => {
        let count = 0;
        const target = character.percentage;
        const counter = setInterval(() => {
          count += 2;
          if (count >= target) {
            count = target;
            clearInterval(counter);
          }
          document.getElementById("matchPercentage").textContent = count + "%";
        }, 25);
      }, 1000);
    },
  });
}

function shareResult() {
  const character = document.getElementById("characterName").textContent;
  const role = document.getElementById("characterRole").textContent;
  const percentage = document.getElementById("matchPercentage").textContent;

  const shareText = `I just discovered I'm ${character} - ${role} with ${percentage} match in the Squid Game for Developers quiz! 🎮👨‍💻`;

  if (navigator.share) {
    navigator.share({
      title: "Squid Game for Developers Result",
      text: shareText,
      url: window.location.href,
    });
  } else {
    // Fallback - copy to clipboard
    navigator.clipboard
      .writeText(shareText + " " + window.location.href)
      .then(() => {
        alert("Result copied to clipboard! Share it with your dev friends! 🚀");
      });
  }
}

function restartQuiz() {
  currentQuestion = 0;
  scores = { gihun: 0, sangwoo: 0, saebyeok: 0, frontman: 0 };

  // Stop music when restarting
  if (isAudioPlaying && gameAudio) {
    gameAudio.pause();
    isAudioPlaying = false;
    document.getElementById("audioBtn").textContent = "🔇";
    document.getElementById("audioBtn").classList.add("muted");
    document.getElementById("audioVisualizer").classList.remove("active");
  }

  gsap.to("#resultScreen", {
    duration: 0.5,
    opacity: 0,
    y: 50,
    onComplete: () => {
      document.getElementById("resultScreen").style.display = "none";
      document.getElementById("introScreen").style.display = "block";
      gsap.fromTo(
        "#introScreen",
        { opacity: 0, y: -50 },
        { duration: 0.5, opacity: 1, y: 0 }
      );
    },
  });
}

// Add some interactive effects to shapes
document.querySelectorAll(".shape").forEach((shape) => {
  shape.addEventListener("click", () => {
    gsap.to(shape, {
      duration: 0.3,
      rotation: 360,
      scale: 1.5,
      yoyo: true,
      repeat: 1,
    });
  });
});

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (document.getElementById("quizContainer").style.display === "block") {
    const options = document.querySelectorAll(".option");
    if (e.key >= "1" && e.key <= "4" && options[e.key - 1]) {
      options[e.key - 1].click();
    }
  }
});
