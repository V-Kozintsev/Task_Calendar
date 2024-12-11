import "./main.css";

import { RunTask } from "./api";
import { updateMonthYearDisplay } from "./updateMonthYearDisplay";
import { currentClickDiv } from "./currentClickDiv";
import { saveBtnTask } from "./saveBtnTask";
import { nextMonth, prevMonth } from "./nextMonthAndPrevMonth";

export const currentMonth = document.getElementById("month") as HTMLDivElement;

export function renderCalendar() {
  const containerCells = document.querySelector(
    ".container_calendar__box-day",
  ) as HTMLDivElement;
  containerCells.innerHTML = "";

  const firstDayIndex = new Date(RunTask.year, RunTask.month, 1).getDay();
  const dayInMonth = new Date(RunTask.year, RunTask.month + 1, 0).getDate(); //общее кол-во дней текущего месяца
  const prevMonthDays = new Date(RunTask.year, RunTask.month, 0).getDate(); //общее кол-во дней предыдущего месяца
  const weeks = (firstDayIndex + 6) % 7;
  let prevMonthDaysCells = prevMonthDays - weeks;
  let numberPrev = 0;
  let numberNext = 1;

  const currentDayMontYear = new Date();
  const curDay = currentDayMontYear.getDate();
  const currentDayCalendar = currentDayMontYear.toLocaleDateString("ru-Ru", {
    month: "long",
    year: "numeric",
  });
  //ячейки предыдущего месяца
  for (let prevCells = 1; prevCells <= weeks; prevCells++) {
    numberPrev++;
    const cells = document.createElement("div");
    cells.className = "days daysPrevNext";
    prevMonthDaysCells += 1;
    cells.textContent = prevMonthDaysCells.toString();
    containerCells?.appendChild(cells);
  }

  updateMonthYearDisplay();
  //ячейки текущего месяца
  for (let cells = 1; cells <= dayInMonth; cells++) {
    const newCells = document.createElement("div");
    newCells.className = "days";
    containerCells?.appendChild(newCells);
    const dateCells = document.createElement("div");
    dateCells.className = "date";
    dateCells.textContent = cells.toString();
    newCells.appendChild(dateCells);
    console.log();
    if (currentDayCalendar === currentMonth.textContent && curDay === cells) {
      dateCells.className = "date curDate";
    }
    currentClickDiv(newCells);
  }

  //ячейки следующего месяца
  for (let cells = dayInMonth + numberPrev; cells < 42; cells++) {
    const newCells = document.createElement("div");
    newCells.className = "days daysPrevNext";
    containerCells?.appendChild(newCells);
    const dateCells = document.createElement("div");
    dateCells.className = "date";
    dateCells.textContent = numberNext.toString();
    numberNext++;
    newCells.appendChild(dateCells);
    currentClickDiv(newCells);
  }

  saveBtnTask();
}
renderCalendar();

nextMonth();
prevMonth();
