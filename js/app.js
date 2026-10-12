/* ========================================
   OPERATION: MAKE PRIYANSHI SMILE
   PERSONAL MEMORY VIEWER
======================================== */

(() => {
  "use strict";

  const memories = [
    {
      image: "assets/images/memory-1.jpg",
      title: "The Beginning of Us",
      date: "04 September 2023",
      caption:
        "Every beautiful story has a beginning. This is one little piece of ours. 💛"
    },
    {
      image: "assets/images/memory-2.jpg",
      title: "Miles Apart, Close at Heart",
      date: "29 February 2024",
      caption:
        "Distance may separate places, but it doesn't have to separate two good friends. ✨"
    },
    {
      image: "assets/images/memory-3.jpg",
      title: "A Memory to Keep",
      date: "A moment worth remembering",
      caption:
        "Some moments become memories, and some memories always deserve a special place. ♡"
    }
  ];

  const viewer = document.getElementById("memory-viewer");
  const image = document.getElementById("memory-viewer-image");
  const title = document.getElementById("memory-viewer-title");
  const date = document.getElementById("memory-viewer-date");
  const caption = document.getElementById("memory-viewer-caption");
  const counter = document.getElementById("memory-counter");
  const closeButton = document.getElementById("close-memory");
  const previousButton = document.getElementById("previous-memory");
  const nextButton = document.getElementById("next-memory");

  // Stop safely if the complete viewer HTML isn't present.
  if (
    !viewer ||
    !image ||
    !title ||
    !date ||
    !caption ||
    !counter ||
    !closeButton ||
    !previousButton ||
    !nextButton
  ) {
    console.error(
      "Memory Viewer: Required HTML elements are missing. Check index.html."
    );
    return;
  }

  let currentIndex = 0;
  let lastFocusedElement = null;

  function displayMemory(index) {
    currentIndex = (index + memories.length) % memories.length;

    const memory = memories[currentIndex];

    image.src = memory.image;
    image.alt = memory.title;
    title.textContent = memory.title;
    date.textContent = memory.date;
    caption.textContent = memory.caption;

    counter.textContent =
      `${String(currentIndex + 1).padStart(2, "0")} / ` +
      `${String(memories.length).padStart(2, "0")}`;

    image.onerror = () => {
      console.error("Unable to load photo:", memory.image);
      caption.textContent =
        "This photo couldn't be loaded. Please check its filename and location.";
    };

    image.onload = () => {
      caption.textContent = memory.caption;
    };
  }

  function openMemory(index) {
    lastFocusedElement = document.activeElement;

    displayMemory(index);

    viewer.classList.add("open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.classList.add("memory-open");

    closeButton.focus();
  }

  function closeMemory() {
    viewer.classList.remove("open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("memory-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  // Attach click events to all memory cards.
  const memoryCards = document.querySelectorAll(".memory-item");

  memoryCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      openMemory(index);
    });
  });

  previousButton.addEventListener("click", () => {
    displayMemory(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    displayMemory(currentIndex + 1);
  });

  closeButton.addEventListener("click", closeMemory);

  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
      closeMemory();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!viewer.classList.contains("open")) return;

    if (event.key === "Escape") {
      closeMemory();
    } else if (event.key === "ArrowRight") {
      displayMemory(currentIndex + 1);
    } else if (event.key === "ArrowLeft") {
      displayMemory(currentIndex - 1);
    }
  });

  console.log("Personal Memory Viewer initialized successfully.");
})();

/* ==========================================
   STEP 5 — FRIENDSHIP LETTER INTERACTION
========================================== */

(() => {
  "use strict";

  const envelopeButton = document.getElementById(
    "open-friendship-letter"
  );

  const letter = document.getElementById(
    "friendship-letter"
  );

  const tapHint = document.getElementById(
    "envelope-tap"
  );

  const intro = document.getElementById(
    "letter-intro"
  );

  if (!envelopeButton || !letter || !tapHint) {
    console.warn(
      "Friendship Letter: Required HTML elements were not found."
    );
    return;
  }

  let opened = false;

  envelopeButton.addEventListener("click", () => {
    if (opened) return;

    opened = true;

    // Animate the envelope opening.
    envelopeButton.classList.add("is-open");

    envelopeButton.setAttribute(
      "aria-expanded",
      "true"
    );

    // Update the instruction.
    tapHint.textContent =
      "A LITTLE SURPRISE, JUST FOR YOU ✨";

    // Reveal the letter.
    letter.removeAttribute("inert");

    letter.setAttribute(
      "aria-hidden",
      "false"
    );

    letter.classList.add("revealed");

    // Update the introduction.
    if (intro) {
      intro.textContent =
        "Take your time. This little letter was made just for you. 💛";
    }

    // Smoothly scroll towards the letter.
    window.setTimeout(() => {
      letter.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 450);
  });

  console.log(
    "Friendship Letter interaction initialized successfully."
  );
})();
/* ==========================================
   SECTION 8 — APOLOGY INTERACTIONS
========================================== */

(() => {
  "use strict";

  const envelopeButton = document.getElementById("open-apology");
  const letter = document.getElementById("apology-letter");
  const tapHint = document.getElementById("apology-tap");
  const intro = document.getElementById("apology-intro");

  const hugButton = document.getElementById("apology-hug");
  const hugMessage = document.getElementById("apology-hug-message");

  const nextButton = document.getElementById("continue-to-gratitude");

  if (
    !envelopeButton ||
    !letter ||
    !tapHint ||
    !hugButton ||
    !hugMessage ||
    !nextButton
  ) {
    console.warn(
      "Apology Scene: Some required HTML elements are missing."
    );
    return;
  }

  let opened = false;

  envelopeButton.addEventListener("click", () => {
    if (opened) return;

    opened = true;

    envelopeButton.classList.add("is-open");
    envelopeButton.setAttribute("aria-expanded", "true");

    tapHint.textContent = "A LITTLE NOTE FROM MY HEART ♡";

    letter.removeAttribute("inert");
    letter.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
      letter.classList.add("revealed");

      if (intro) {
        intro.textContent =
          "Take your time. I wanted you to know this. 💛";
      }

      hugButton.hidden = false;

      window.setTimeout(() => {
        letter.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 250);
    }, 500);
  });

  hugButton.addEventListener("click", () => {
    hugMessage.textContent =
      "Sending you the warmest long-distance hug. You deserve kindness, care, and happiness. 💛🫂";

    hugButton.textContent = "HUG SENT WITH LOVE ♡";

    hugButton.disabled = true;

    // Gentle floating-heart celebration.
    const heart = document.createElement("span");

    heart.textContent = " 💛";
    heart.setAttribute("aria-hidden", "true");

    hugMessage.appendChild(heart);
  });

  nextButton.addEventListener("click", () => {
    /*
      This button is ready to connect to Section 9.
      Until Section 9 exists, show a friendly message
      instead of navigating to a missing scene.
    */
    const gratitudeScene = document.getElementById("gratitude");

    if (gratitudeScene) {
      gratitudeScene.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else {
      nextButton.querySelector("span").textContent =
        "YOUR THANK-YOU CHAPTER IS COMING NEXT ♡";

      window.setTimeout(() => {
        nextButton.querySelector("span").textContent =
          "ONE MORE THING I WANT YOU TO KNOW";
      }, 2200);
    }
  });

  console.log("Apology Scene initialized successfully.");
})();
/* ==========================================
   SECTION 9 — GRATITUDE NAVIGATION
========================================== */

(() => {
  "use strict";

  const button = document.getElementById("continue-to-agreement");

  if (!button) {
    console.warn(
      "Gratitude Scene: Continue button not found."
    );
    return;
  }

  button.addEventListener("click", () => {
    const agreementScene = document.getElementById("agreement");

    if (agreementScene) {
      agreementScene.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }

    const label = button.querySelector("span");

    if (label) {
      const originalText = label.textContent;

      label.textContent =
        "OUR FRIENDSHIP AGREEMENT IS NEXT ♡";

      window.setTimeout(() => {
        label.textContent = originalText;
      }, 2200);
    }
  });

  console.log("Gratitude Scene initialized successfully.");
})();
/* ==========================================
   SECTION 10 — FRIENDSHIP AGREEMENT LOGIC
========================================== */

(() => {
  "use strict";

  const signButton = document.getElementById(
    "sign-friendship-agreement"
  );

  const priyanshiInput = document.getElementById(
    "signature-priyanshi"
  );

  const aviralInput = document.getElementById(
    "signature-aviral"
  );

  const dateElement = document.getElementById(
    "agreement-date"
  );

  const validation = document.getElementById(
    "agreement-validation"
  );

  const success = document.getElementById(
    "agreement-success"
  );

  const nextButton = document.getElementById(
    "continue-to-keepsakes"
  );

  if (
    !signButton ||
    !priyanshiInput ||
    !aviralInput ||
    !dateElement ||
    !validation ||
    !success ||
    !nextButton
  ) {
    console.warn(
      "Friendship Agreement: Required HTML elements are missing."
    );
    return;
  }

  // Display the date in a readable format.
  dateElement.textContent = new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  ).format(new Date());

  let signed = false;

  signButton.addEventListener("click", () => {
    if (signed) return;

    const priyanshiSignature = priyanshiInput.value.trim();
    const aviralSignature = aviralInput.value.trim();

    if (!priyanshiSignature || !aviralSignature) {
      validation.textContent =
        "Both signature fields need a name before the pact can be signed. ♡";

      if (!priyanshiSignature) {
        priyanshiInput.focus();
      } else {
        aviralInput.focus();
      }

      return;
    }

    signed = true;

    validation.textContent = "";

    success.removeAttribute("inert");
    success.setAttribute("aria-hidden", "false");
    success.classList.add("is-visible");

    signButton.disabled = true;
    signButton.querySelector("span").textContent =
      "FRIENDSHIP PACT SIGNED ✓";

    signButton.style.opacity = "0.7";
    signButton.style.cursor = "default";

    success.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    console.log("Friendship Agreement signed for this session.");
  });

  nextButton.addEventListener("click", () => {
    const keepsakeScene = document.getElementById("keepsakes");

    if (keepsakeScene) {
      keepsakeScene.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }

    const label = nextButton.querySelector("span");

    if (label) {
      const originalText = label.textContent;

      label.textContent =
        "OUR KEEPSAKE GALLERY IS COMING NEXT ♡";

      window.setTimeout(() => {
        label.textContent = originalText;
      }, 2200);
    }
  });

  console.log("Friendship Agreement initialized successfully.");
})();

/* ==================================
   KEEPSAKE MUSEUM — EXHIBIT CONTROLS
================================== */

(() => {
  const museum = document.getElementById("keepsake-museum");

  if (!museum) return;

  const revealButtons = museum.querySelectorAll(".museum-reveal");

  revealButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const noteId = button.getAttribute("aria-controls");
      const note = document.getElementById(noteId);

      if (!note) return;

      const isOpening = button.getAttribute("aria-expanded") !== "true";

      button.setAttribute("aria-expanded", String(isOpening));
      note.hidden = !isOpening;

      const arrow = button.querySelector("span");

      if (arrow) {
        arrow.textContent = isOpening ? "↙" : "↗";
      }
    });
  });
})();

/* =================================
   OPERATION: FRIENDSHIP SOUNDTRACK
================================= */

(() => {
  if (document.getElementById("friendship-music-control")) {
    return;
  }

  const music = new Audio("assets/music/friendship-theme.mp3");

  music.loop = true;
  music.volume = 0.35;
  music.preload = "none";

  const button = document.createElement("button");

  button.id = "friendship-music-control";
  button.type = "button";
  button.setAttribute("aria-label", "Play background music");
  button.setAttribute("aria-pressed", "false");

  button.innerHTML = `
    <span class="music-icon" aria-hidden="true">♫</span>
    <span class="music-label">PLAY MUSIC</span>
  `;

  document.body.appendChild(button);

  const icon = button.querySelector(".music-icon");
  const label = button.querySelector(".music-label");

  function updateMusicButton(isPlaying) {
    button.classList.toggle("is-playing", isPlaying);

    icon.textContent = isPlaying ? "♫" : "♪";
    label.textContent = isPlaying ? "PAUSE MUSIC" : "PLAY MUSIC";

    button.setAttribute("aria-pressed", String(isPlaying));
    button.setAttribute(
      "aria-label",
      isPlaying ? "Pause background music" : "Play background music"
    );
  }

  button.addEventListener("click", async () => {
    if (!music.paused) {
      music.pause();
      updateMusicButton(false);
      return;
    }

    try {
      await music.play();
      updateMusicButton(true);
    } catch (error) {
      updateMusicButton(false);
      label.textContent = "CHECK AUDIO";
      button.setAttribute(
        "aria-label",
        "Audio could not play. Check the music file."
      );

      console.error(
        "Friendship soundtrack could not play. Check the audio file path.",
        error
      );
    }
  });

  music.addEventListener("ended", () => {
    updateMusicButton(false);
  });
})();

/* =========================================
   ULTIMATE CHAOS MODE — GAME ENGINE
========================================= */

(() => {
  const game = document.getElementById("chaos-game");
  if (!game || game.dataset.initialized === "true") return;

  game.dataset.initialized = "true";

  const arena = game.querySelector("#chaos-arena");
  const startOverlay = game.querySelector("#chaos-start-overlay");
  const startButton = game.querySelector("#chaos-start");
  const replayButton = game.querySelector("#chaos-replay");
  const scoreDisplay = game.querySelector("#chaos-score");
  const timerDisplay = game.querySelector("#chaos-timer");
  const treasureDisplay = game.querySelector("#chaos-treasure");
  const resultPanel = game.querySelector("#chaos-result");
  const resultIcon = game.querySelector("#chaos-result-icon");
  const resultTitle = game.querySelector("#chaos-result-title");
  const resultMessage = game.querySelector("#chaos-result-message");
  const finalScoreDisplay = game.querySelector("#chaos-final-score");
  const bonusButton = game.querySelector("#chaos-bonus");
  const floatMessage = game.querySelector("#chaos-float-message");

  const targets = [
    game.querySelector("#target-joey"),
    game.querySelector("#target-marky"),
    game.querySelector("#target-dee")
  ].filter(Boolean);

  const funnyMessages = [
    "JOEY GOT CAUGHT! 😂",
    "MARKY, TOO SLOW! 💥",
    "DEE HAS ENTERED PANIC MODE! 🪳",
    "OGGY IS PROUD OF YOU! 🐱",
    "PRIYANSHI IS TOO POWERFUL! 👑",
    "THE CHAOS CREW IS RUNNING! 🤣"
  ];

  let score = 0;
  let secondsLeft = 30;
  let timerInterval = null;
  let movementInterval = null;
  let bonusTimeout = null;
  let bonusVisible = false;
  let running = false;
  let messageTimeout = null;

  function randomPosition(element, margin = 12) {
    const arenaWidth = arena.clientWidth;
    const arenaHeight = arena.clientHeight;

    const elementWidth = element.offsetWidth || 65;
    const elementHeight = element.offsetHeight || 65;

    const minX = Math.min(
      10 + (elementWidth / arenaWidth) * 50,
      45
    );

    const maxX = Math.max(
      55,
      90 - (elementWidth / arenaWidth) * 50
    );

    const minY = Math.min(
      18 + (elementHeight / arenaHeight) * 50,
      40
    );

    const maxY = Math.max(
      55,
      84 - (elementHeight / arenaHeight) * 50
    );

    element.style.left =
      (minX + Math.random() * (maxX - minX)) + "%";

    element.style.top =
      (minY + Math.random() * (maxY - minY)) + "%";
  }

  function updateScore() {
    scoreDisplay.textContent = String(score).padStart(2, "0");

    const percentage = Math.min(100, score);
    treasureDisplay.textContent = percentage + "%";
  }

  function showMessage(message) {
    floatMessage.textContent = message;

    if (messageTimeout) {
      clearTimeout(messageTimeout);
    }

    messageTimeout = setTimeout(() => {
      if (running) {
        floatMessage.textContent = "CATCH THEM ALL! 🪳";
      }
    }, 1100);
  }

  function clearGameTimers() {
    clearInterval(timerInterval);
    clearInterval(movementInterval);
    clearTimeout(bonusTimeout);
    clearTimeout(messageTimeout);

    timerInterval = null;
    movementInterval = null;
    bonusTimeout = null;
    messageTimeout = null;
  }

  function moveTargets() {
    if (!running) return;

    targets.forEach((target) => {
      randomPosition(target);
      target.classList.remove("caught");
    });
  }

  function showBonus() {
    if (!running || bonusVisible) return;

    bonusVisible = true;
    randomPosition(bonusButton);
    bonusButton.style.display = "grid";

    bonusTimeout = setTimeout(() => {
      bonusVisible = false;
      bonusButton.style.display = "";
    }, 1800);
  }

  function finishGame() {
    if (!running) return;

    running = false;
    clearGameTimers();

    arena.classList.remove("game-running");
    startOverlay.hidden = true;
    resultPanel.hidden = false;

    bonusButton.style.display = "";
    bonusVisible = false;

    targets.forEach((target) => {
      target.classList.remove("caught");
    });

    finalScoreDisplay.textContent = score;

    if (score >= 20) {
      resultIcon.textContent = "👑";
      resultTitle.textContent = "CHAOS QUEEN!";
      resultMessage.textContent =
        "Joey, Marky and Dee never stood a chance! Oggy officially needs YOU on his team!";
    } else if (score >= 10) {
      resultIcon.textContent = "🏆";
      resultTitle.textContent = "MISSION ACCOMPLISHED!";
      resultMessage.textContent =
        "What a performance! Oggy and the crew are celebrating your legendary effort!";
    } else {
      resultIcon.textContent = "😂";
      resultTitle.textContent = "THE COCKROACHES ESCAPED!";
      resultMessage.textContent =
        "Joey is celebrating a little too early. Ready for a rematch?";
    }

    showMessage("MISSION COMPLETE! 💌");
  }

  function startGame() {
    clearGameTimers();

    score = 0;
    secondsLeft = 30;
    bonusVisible = false;
    running = true;

    resultPanel.hidden = true;
    startOverlay.hidden = true;

    scoreDisplay.textContent = "00";
    timerDisplay.textContent = "30";
    treasureDisplay.textContent = "0%";

    bonusButton.style.display = "";
    arena.classList.add("game-running");

    moveTargets();
    showMessage("GO GO GO! 💥");

    movementInterval = setInterval(moveTargets, 850);

    timerInterval = setInterval(() => {
      secondsLeft--;
      timerDisplay.textContent = String(secondsLeft);

      if (secondsLeft === 10) {
        showMessage("ONLY 10 SECONDS LEFT! ⚡");
      }

      if (secondsLeft <= 0) {
        timerDisplay.textContent = "00";
        finishGame();
      }
    }, 1000);

    bonusTimeout = setTimeout(function bonusCycle() {
      if (!running) return;

      showBonus();

      bonusTimeout = setTimeout(bonusCycle, 4500);
    }, 1800);
  }

  targets.forEach((target) => {
    target.addEventListener("click", () => {
      if (!running || target.classList.contains("caught")) return;

      score += 1;
      updateScore();

      target.classList.add("caught");

      showMessage(
        funnyMessages[Math.floor(Math.random() * funnyMessages.length)]
      );
    });
  });

  bonusButton.addEventListener("click", () => {
    if (!running || !bonusVisible) return;

    score += 5;
    updateScore();

    bonusVisible = false;
    clearTimeout(bonusTimeout);
    bonusButton.style.display = "";

    showMessage("TREASURE BONUS! +5 POINTS! 🎁");

    bonusTimeout = setTimeout(() => {
      if (running) showBonus();
    }, 2500);
  });

  startButton.addEventListener("click", startGame);
  replayButton.addEventListener("click", startGame);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && running) {
      finishGame();
    }
  });
})();

