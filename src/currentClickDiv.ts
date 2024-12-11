export let selected: HTMLDivElement;
export function currentClickDiv(cell: HTMLDivElement) {
  const inputValue = document.getElementById("title") as HTMLInputElement;
  const popupForm: HTMLElement | null = document.querySelector(".popup");

  const backgroundOverlay: HTMLElement | null =
    document.querySelector(".window-background");

  // Обработчик клика для ячейки
  cell.addEventListener("click", (event) => {
    // Приведение типа для event.target
    const target = event.target as HTMLElement;
    const isTaskInCells = target.classList.contains("taskInCells");
    const ine = target.classList.contains("date");
    console.log(ine);
    if (!isTaskInCells) {
      event.stopPropagation();
      selected = cell;
      if (popupForm && backgroundOverlay) {
        popupForm.style.display = "flex";
        backgroundOverlay.style.display = "block";
        inputValue.value = "";
      }
    } /* else {
      } */
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
