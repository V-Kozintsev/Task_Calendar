import { currentDateHolder, RunTask } from "./api";
export let selected: HTMLDivElement;
export let dateClicked: string;

export async function currentClickDiv(cell: HTMLDivElement) {
  const dateMonthYear = document.querySelector(
    ".dateMonthYear",
  ) as HTMLDivElement;
  const dayMonthYear = new Date(currentDateHolder.year, currentDateHolder.month);
  const currentDayCalendar = dayMonthYear.toLocaleDateString("ru-Ru", {
    month: "numeric",
    year: "numeric",
  });
  let clickedDay: string | null | undefined;

  const inputValue = document.getElementById("title") as HTMLInputElement;
  const popupForm: HTMLElement | null = document.querySelector(".popup");

  const backgroundOverlay: HTMLElement | null =
    document.querySelector(".window-background");

  // Обработчик клика для ячейки
  cell.addEventListener("click", (event) => {
    // Приведение типа для event.target
    const target = event.target as HTMLElement;
    const isTaskInCells = target.classList.contains("taskInCells");

    if (!isTaskInCells) {
      event.stopPropagation();
      selected = cell;

      if (popupForm && backgroundOverlay) {
        popupForm.style.display = "flex";
        backgroundOverlay.style.display = "block";
        inputValue.value = "";
        clickedDay = selected.firstElementChild?.textContent;
        dateMonthYear.textContent = `${clickedDay}.${currentDayCalendar}`;
      }
    } /* else {
      } */
    dateClicked = `${clickedDay}.${currentDayCalendar}`;
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
