const currentDate = new Date();
let month: number = currentDate.getMonth();
let year = currentDate.getFullYear();
const firstDayIndex: number = new Date(year, month, 1).getDay();
const weeks: number = (firstDayIndex + 6) % 7;

export function renderCalendar() {
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
  let newD = lastDate;

  //цикл создает нужное колиство ячеек предыдущего месяца
  for (let prevCells = 0; prevCells < weeks; prevCells++) {
    const daysCells: HTMLDivElement = document.createElement("div");
    daysCells.className = "days";
    dayBox?.appendChild(daysCells);
    newD--;

    console.log(newD);

    daysCells.textContent = newD.toString();
  }
  //цикл создает нужное колиство ячеек
  for (let cells = 1; cells <= lastDate; cells++) {
    const daysCells: HTMLDivElement = document.createElement("div");
    daysCells.className = "days";
    dayBox?.appendChild(daysCells);
    daysCells.textContent = cells.toString();
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
      for (let prevCells = 0; prevCells < weeks; prevCells++) {
        const daysCells: HTMLDivElement = document.createElement("div");
        daysCells.className = "days";
        dayBox?.appendChild(daysCells);
      }
      for (let cells = 1; cells <= lastDate; cells++) {
        const daysCells: HTMLDivElement = document.createElement("div");
        daysCells.className = "days";
        dayBox?.appendChild(daysCells);
        daysCells.textContent = cells.toString();
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
      for (let prevCells = 0; prevCells < weeks; prevCells++) {
        const daysCells: HTMLDivElement = document.createElement("div");
        daysCells.className = "days";
        dayBox?.appendChild(daysCells);
      }
      for (let cells = 1; cells <= lastDate; cells++) {
        const daysCells: HTMLDivElement = document.createElement("div");
        daysCells.className = "days";
        dayBox?.appendChild(daysCells);
        daysCells.textContent = cells.toString();
      }
    });
  }
  btnPrevMonthYear();
}
