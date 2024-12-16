export function taskWindow() {
  const boxTask = document.getElementById("task-block") as HTMLDivElement;
  const backgroundOverlay: HTMLElement | null =
    document.querySelector(".window-background");
  const closeButton = document.querySelector(".close-btn-task");
  if (boxTask && backgroundOverlay) {
    boxTask.style.display = "block";
    backgroundOverlay.style.display = "block";
  }

  closeButton?.addEventListener("click", (event) => {
    event.stopPropagation(); // Остановить всплытие события
    if (boxTask && backgroundOverlay) {
      boxTask.style.display = "none"; // Скрыть popup
      backgroundOverlay.style.display = "none"; // Скрыть фон
    }
  });
  backgroundOverlay?.addEventListener("click", () => {
    if (boxTask) {
      boxTask.style.display = "none"; // Скрыть popup
      backgroundOverlay.style.display = "none"; // Скрыть фон
    }
  });
}
