export function currentClickDiv(cell: HTMLDivElement, day: HTMLDivElement) {
  const popupForm: HTMLElement | null = document.querySelector(".popup");
  const backgroundOverlay: HTMLElement | null =
    document.querySelector(".window-background");

  // Обработчик клика для ячейки
  cell.addEventListener("click", (event) => {
    event.stopPropagation(); // Остановить всплытие события
    if (popupForm && backgroundOverlay) {
      popupForm.style.display = "flex"; // Показать popup
      backgroundOverlay.style.display = "block"; // Показать фон
    }
    console.log("Кликнули по дню:", cell, day);
  });

  // Обработчик клика для кнопки закрытия
  const closeButton = document.querySelector(".close-btn");
  closeButton?.addEventListener("click", (event) => {
    event.stopPropagation(); // Остановить всплытие события
    if (popupForm && backgroundOverlay) {
      popupForm.style.display = "none"; // Скрыть popup
      backgroundOverlay.style.display = "none"; // Скрыть фон
    }
  });

  // Обработчик клика для фона
  backgroundOverlay?.addEventListener("click", () => {
    if (popupForm) {
      popupForm.style.display = "none"; // Скрыть popup
      backgroundOverlay.style.display = "none"; // Скрыть фон
    }
  });
}
