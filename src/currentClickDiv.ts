const inputValue = document.getElementById("title") as HTMLInputElement;
export function currentClickDiv(
  cell: HTMLDivElement,
  /* day: HTMLDivElement, */
  /* dateData: HTMLElement | null */
) {
  const popupForm: HTMLElement | null = document.querySelector(".popup");
  const backgroundOverlay: HTMLElement | null =
    document.querySelector(".window-background");

  // Обработчик клика для ячейки
  cell.addEventListener("click", (event) => {
    event.stopPropagation(); // Остановить всплытие события

    if (popupForm && backgroundOverlay) {
      inputValue.innerHTML = "";
      popupForm.style.display = "flex"; // Показать popup
      backgroundOverlay.style.display = "block"; // Показать фон
    }

    console.log("Кликнули по дню:", cell);
    console.log(cell.querySelector("days"));
    const currentCell = cell;
    document.getElementById("btn")?.addEventListener("click", () => {
      if (!currentCell.querySelector(".taskInCells")) {
        const newDiv = document.createElement("div");
        newDiv.className = "taskInCells";
        newDiv.textContent = inputValue.value; // Например, содержимое нового div

        // Добавление нового div в текущую ячейку
        cell.appendChild(newDiv);
      }
    });
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
