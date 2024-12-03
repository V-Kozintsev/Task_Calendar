import { currentClickDiv } from "./currentClickDiv";

const currentDate = new Date();
let month: number = currentDate.getMonth();
let year: number = currentDate.getFullYear();

const firstDayIndex: number = new Date(year, month, 1).getDay();
const weeks: number = (firstDayIndex + 6) % 7;
let prevDayMonth = new Date(year, month, -weeks).getDate();

export async function renderCalendar() {
  let lastDay = new Date(year, month + 1, 0);
  let lastDate = lastDay.getDate();

  //отображаем месяц и год
  const monthRender: HTMLElement | null = document.getElementById("month");

  if (monthRender) {
    monthRender.textContent = currentDate.toLocaleDateString("ru-Ru", {
      month: "long",
      year: "numeric",
    });
  }

  const dayBox: HTMLElement | null = document.querySelector(
    ".container_calendar__box-day",
  );

  //цикл создает нужное колиство ячеек предыдущего месяца
  for (let prevCells = 0; prevCells < weeks; prevCells++) {
    const daysCells: HTMLDivElement = document.createElement("div");
    daysCells.className = "days daysPrevNext";
    dayBox?.appendChild(daysCells);
    prevDayMonth++;
    daysCells.textContent = prevDayMonth.toString();
  }
  const monthCurrent = currentDate.toLocaleString("ru-Ru", { month: "long" });
  const yearCurrent = currentDate.getFullYear();
  const dayCurrent = currentDate.getDate();
  //цикл создает нужное колиство ячеек текущего месяца
  for (let cells = 1; cells <= lastDate; cells++) {
    const daysCells: HTMLDivElement = document.createElement("div");
    const daysCellsDay: HTMLDivElement = document.createElement("div");

    daysCells.className = "days";
    daysCellsDay.className = "dayInCells";

    dayBox?.appendChild(daysCells);
    daysCells.appendChild(daysCellsDay);

    currentClickDiv(daysCells, daysCellsDay, monthRender);

    daysCellsDay.textContent = cells.toString();

    if (
      monthRender &&
      cells === dayCurrent &&
      monthRender.textContent === `${monthCurrent} ${yearCurrent} г.`
    ) {
      daysCellsDay.classList.add("currentDay");
    }
  }

  //цикл создает нужное колиство ячеек следующего месяца
  const allDivDays = document.querySelectorAll(".days");
  const nextDay = new Date(year, month + 1, 1);
  let nextN = nextDay.getDate();

  for (let nextCells = allDivDays.length; nextCells < 42; nextCells++) {
    const daysCells: HTMLDivElement = document.createElement("div");
    daysCells.className = "days daysPrevNext";
    dayBox?.appendChild(daysCells);
    daysCells.textContent = nextN.toString();
    nextN++;
  }

  //кнопка для пеерехода на следующий месяц
  function btnNextMonthYear() {
    document.querySelector(".next_month_btn")?.addEventListener("click", () => {
      if (dayBox) {
        dayBox.innerHTML = " ";
      }

      month += 1;
      if (month === 12) {
        month = 0;
        year += 1;
      }
      const currentMonthYear = new Date(year, month);
      if (monthRender) {
        monthRender.textContent = currentMonthYear.toLocaleDateString("ru-Ru", {
          month: "long",
          year: "numeric",
        });
      }
      lastDay = new Date(year, month + 1, 0);
      lastDate = lastDay.getDate();
      const firstDayIndex: number = new Date(year, month, 1).getDay();
      const weeks: number = (firstDayIndex + 6) % 7;
      let prevDayMonth = new Date(year, month, -weeks).getDate();

      for (let prevCells = 0; prevCells < weeks; prevCells++) {
        const daysCells: HTMLDivElement = document.createElement("div");
        daysCells.className = "days daysPrevNext";
        dayBox?.appendChild(daysCells);
        prevDayMonth++;
        daysCells.textContent = prevDayMonth.toString();
      }
      const monthCurrent = currentDate.toLocaleString("ru-Ru", {
        month: "long",
      });
      const yearCurrent = currentDate.getFullYear();
      const dayCurrent = currentDate.getDate();
      //цикл создает нужное колиство ячеек текущего месяца
      for (let cells = 1; cells <= lastDate; cells++) {
        const daysCells: HTMLDivElement = document.createElement("div");
        const daysCellsDay: HTMLDivElement = document.createElement("div");
        daysCells.className = "days";
        daysCellsDay.className = "dayInCells";
        dayBox?.appendChild(daysCells);
        daysCells.appendChild(daysCellsDay);
        daysCellsDay.textContent = cells.toString();

        if (
          monthRender &&
          cells === dayCurrent &&
          monthRender.textContent === `${monthCurrent} ${yearCurrent} г.`
        ) {
          daysCellsDay.classList.add("currentDay");
        }
        currentClickDiv(daysCells, daysCellsDay, monthRender);
      }

      const allDivDays = document.querySelectorAll(".days");
      const nextDay = new Date(year, month + 1, 1);
      let nextN = nextDay.getDate();
      //цикл создает нужное колиство ячеек следующего месяца
      for (let nextCells = allDivDays.length; nextCells < 42; nextCells++) {
        const daysCells: HTMLDivElement = document.createElement("div");
        daysCells.className = "days daysPrevNext";
        dayBox?.appendChild(daysCells);
        daysCells.textContent = nextN.toString();
        nextN++;
      }
    });
  }
  btnNextMonthYear();

  //кнопка для пеерехода на предыдущий месяц
  function btnPrevMonthYear() {
    document.querySelector(".prev_month_btn")?.addEventListener("click", () => {
      if (dayBox) {
        dayBox.innerHTML = " ";
      }
      month -= 1;
      if (month === 0) {
        month = 12;
        year -= 1;
      }
      const currentMonthYear = new Date(year, month);
      if (monthRender) {
        monthRender.textContent = currentMonthYear.toLocaleDateString("ru-Ru", {
          month: "long",
          year: "numeric",
        });
      }
      lastDay = new Date(year, month + 1, 0);
      lastDate = lastDay.getDate();
      const firstDayIndex: number = new Date(year, month, 1).getDay();
      const weeks: number = (firstDayIndex + 6) % 7;
      let prevDayMonth = new Date(year, month, -weeks).getDate();
      for (let prevCells = 0; prevCells < weeks; prevCells++) {
        const daysCells: HTMLDivElement = document.createElement("div");
        daysCells.className = "days daysPrevNext";
        dayBox?.appendChild(daysCells);
        prevDayMonth++;
        daysCells.textContent = prevDayMonth.toString();
      }

      const monthCurrent = currentDate.toLocaleString("ru-Ru", {
        month: "long",
      });
      const yearCurrent = currentDate.getFullYear();
      const dayCurrent = currentDate.getDate();
      //цикл создает нужное колиство ячеек текущего месяца
      for (let cells = 1; cells <= lastDate; cells++) {
        const daysCells: HTMLDivElement = document.createElement("div");
        const daysCellsDay: HTMLDivElement = document.createElement("div");
        daysCells.className = "days";
        daysCellsDay.className = "dayInCells";
        dayBox?.appendChild(daysCells);
        daysCells.appendChild(daysCellsDay);
        daysCellsDay.textContent = cells.toString();

        if (
          monthRender &&
          cells === dayCurrent &&
          monthRender.textContent === `${monthCurrent} ${yearCurrent} г.`
        ) {
          daysCellsDay.classList.add("currentDay");
        }
        currentClickDiv(daysCells, daysCellsDay, monthRender);
      }

      const allDivDays = document.querySelectorAll(".days");
      const nextDay = new Date(year, month + 1, 1);
      let nextN = nextDay.getDate();
      //цикл создает нужное колиство ячеек следующего месяца
      for (let nextCells = allDivDays.length; nextCells < 42; nextCells++) {
        const daysCells: HTMLDivElement = document.createElement("div");
        daysCells.className = "days daysPrevNext";
        dayBox?.appendChild(daysCells);
        daysCells.textContent = nextN.toString();
        nextN++;
      }
    });
  }
  btnPrevMonthYear();
}

export function dataInputValue(daysCells: HTMLElement) {
  const inputTitle: HTMLInputElement | null = document.getElementById(
    "title",
  ) as HTMLInputElement;
  const popupForm: HTMLElement | null = document.querySelector(".popup");
  const backgroundOverlay: HTMLElement | null =
    document.querySelector(".window-background");

  if (inputTitle && popupForm && backgroundOverlay) {
    const btn = document.getElementById("btn");
    btn?.addEventListener("click", (event) => {
      event.stopPropagation();
      //создаем блок для добавления задачи в ячейке
      const taskCellsDay: HTMLDivElement = document.createElement("div");
      taskCellsDay.className = "taskInCells";
      taskCellsDay.textContent = inputTitle.value;

      daysCells.appendChild(taskCellsDay);
      inputTitle.value = ""; // Очищаем инпут
      popupForm.style.display = "none"; // Скрыть popup
      backgroundOverlay.style.display = "none"; // Скрыть фон
    });
  }
}
