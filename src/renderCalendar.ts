import { currentDateHolder } from "./api";
import { currentClickDiv } from "./currentClickDiv";
import { saveBtnTask } from "./saveBtnTask";
import { taskWindow } from "./taskWindow";

export async function renderCalendar() {
  //кнопка открытия окна списка задач
  const btnTask = document.getElementById("task") as HTMLDivElement;
  btnTask.addEventListener("click", (elem) => {
    elem.preventDefault();
    taskWindow();
  });

  const currentMonth = document.getElementById("month") as HTMLDivElement;

  const containerCells = document.querySelector(
    ".container_calendar__box-day",
  ) as HTMLDivElement;
  containerCells.innerHTML = "";

  const firstDayIndex = new Date(
    currentDateHolder.year,
    currentDateHolder.month,
    1,
  ).getDay();
  const dayInMonth = new Date(
    currentDateHolder.year,
    currentDateHolder.month + 1,
    0,
  ).getDate(); //общее кол-во дней текущего месяца
  const prevMonthDays = new Date(
    currentDateHolder.year,
    currentDateHolder.month,
    0,
  ).getDate(); //общее кол-во дней предыдущего месяца
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

  function updateMonthYearDisplay() {
    const renderMonthYear = new Date(
      currentDateHolder.year,
      currentDateHolder.month,
    );
    currentMonth.textContent = renderMonthYear.toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    });
  }
  updateMonthYearDisplay();

  //ячейки текущего месяца
  for (let cells = 1; cells <= dayInMonth; cells++) {
    const newCells = document.createElement("div");
    newCells.className = "days";
    containerCells?.appendChild(newCells);
    newCells.setAttribute(
      "data-date",
      `${cells}.${currentDateHolder.month + 1}.${currentDateHolder.year}`,
    );
    const dateCells = document.createElement("div");
    dateCells.className = "date";
    dateCells.textContent = cells.toString();
    newCells.appendChild(dateCells);
    console.log();
    if (currentDayCalendar === currentMonth.textContent && curDay === cells) {
      dateCells.className = "date curDate";
    }
    await currentClickDiv(newCells);
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

  await saveBtnTask();
}
