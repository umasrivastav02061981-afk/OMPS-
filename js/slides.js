(() => {
  const scenes = Array.from(document.querySelectorAll(".scene"));
  const controls = document.getElementById("presentation-controls");
  const previousButton = document.getElementById("previous-scene");
  const nextButton = document.getElementById("next-scene");
  const currentNumber = document.getElementById("current-scene-number");
  const totalNumber = document.getElementById("total-scene-number");
  const progressFill = document.getElementById("progress-fill");
  const curtain = document.getElementById("transition-curtain");

  let currentIndex = 0;
  let transitionBusy = false;
  let unlocked = false;

  const pad = (number) => String(number).padStart(2, "0");

  function renderScene(index) {
    scenes.forEach((scene, i) => {
      const isActive = i === index;

      scene.classList.toggle("active", isActive);
      scene.setAttribute("aria-hidden", String(!isActive));
    });

    currentIndex = index;

    // Only show controls after the cinematic opening.
    controls.classList.toggle("visible", index > 0 && unlocked);

    currentNumber.textContent = pad(index + 1);
    totalNumber.textContent = pad(scenes.length);
    progressFill.style.width = `${((index + 1) / scenes.length) * 100}%`;

    previousButton.disabled = index <= 1;
    nextButton.disabled = index >= scenes.length - 1;

    previousButton.style.opacity = previousButton.disabled ? "0.35" : "1";
    nextButton.style.opacity = nextButton.disabled ? "0.35" : "1";
  }

  function goToScene(index) {
    if (transitionBusy || index < 0 || index >= scenes.length) return;

    // The password gate and story are not accessible until unlocked.
    if (!unlocked && index > 0) return;

    if (index === currentIndex) return;

    transitionBusy = true;
    curtain.classList.remove("active");

    // Restart the transition animation.
    void curtain.offsetWidth;
    curtain.classList.add("active");

    window.setTimeout(() => {
      renderScene(index);

      window.setTimeout(() => {
        curtain.classList.remove("active");
        transitionBusy = false;
      }, 350);
    }, 350);
  }

  function unlockAndStart() {
    unlocked = true;
    goToScene(1);
  }

  previousButton.addEventListener("click", () => {
    if (currentIndex > 1) goToScene(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < scenes.length - 1) goToScene(currentIndex + 1);
  });

  document.getElementById("begin-mission").addEventListener("click", () => {
    unlockAndStart();
  });

  function goToSceneById(sceneId) {
  const targetIndex = scenes.findIndex(
    (scene) => scene.id === sceneId
  );

  if (targetIndex !== -1) {
    goToScene(targetIndex);
  }
}
// Enter the Keepsake Museum from the agreement scene
const museumEntry = document.getElementById("continue-to-keepsakes");

if (museumEntry) {
  museumEntry.addEventListener("click", () => {
    goToSceneById("keepsake-museum");
  });
}

// Leave the museum and enter Ultimate Chaos Mode
const museumExit = document.getElementById("museum-continue");

if (museumExit) {
  museumExit.addEventListener("click", () => {
    goToSceneById("chaos-game");
  });
}

// Continue from the game to the finale
const gameContinue = document.getElementById("game-continue");

if (gameContinue) {
  gameContinue.addEventListener("click", () => {
    goToSceneById("finale");
  });
}
// Continue from the memory cards to the next scene
const memoryNext = document.getElementById("memory-next");

if (memoryNext) {
  memoryNext.addEventListener("click", () => {
    goToSceneById("letter");
  });
}

document.getElementById("continue-story").addEventListener("click", () => {
  goToSceneById("secret-gate");
});



document.getElementById("open-memories").addEventListener("click", () => {
  goToSceneById("memories");
});

document.getElementById("open-letter").addEventListener("click", () => {
  goToSceneById("letter");
});

document.getElementById("show-finale").addEventListener("click", () => {
  goToSceneById("apology");
});

  document.getElementById("replay-mission").addEventListener("click", () => {
    goToScene(0);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && currentIndex < scenes.length - 1) {
      goToScene(currentIndex + 1);
    }

    if (event.key === "ArrowLeft" && currentIndex > 1) {
      goToScene(currentIndex - 1);
    }

    if (event.key === "Escape" && currentIndex > 0) {
      goToScene(0);
    }
  });

  window.PriyanshiPresentation = {
    goToScene,
    unlockAndStart,
    getCurrentIndex: () => currentIndex,
    getUnlocked: () => unlocked
  };

  renderScene(0);
})();
