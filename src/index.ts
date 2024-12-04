import "./main.css";

const currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();
const currentMonth = document.getElementById("month") as HTMLDivElement;

function renderCalendar() {
  const boxDay = document.querySelector(
    ".container_calendar__box-day",
  ) as HTMLDivElement;

  boxDay.innerHTML = "";

  const firstDayIndex = new Date(year, month, 1).getDay();
  const dayInMonth = new Date(year, month + 1, 0).getDate(); //общее кол-во дней текущего месяца
  const prevMonthDays = new Date(year, month, 0).getDate(); //общее кол-во дней предыдущего месяца
  const weeks = (firstDayIndex + 6) % 7;
  let prevMonthDaysCells = prevMonthDays - weeks;

  //ячейки предыдущего месяца
  for (let prevCells = 1; prevCells <= weeks; prevCells++) {
    const cells = document.createElement("div");
    cells.className = "days daysPrevNext";
    prevMonthDaysCells += 1;
    cells.textContent = prevMonthDaysCells.toString();
    boxDay?.appendChild(cells);
  }

  //ячейки текущего месяца
  for (let prevCells = 1; prevCells <= dayInMonth; prevCells++) {
    const cells = document.createElement("div");
    cells.className = "days";
    cells.textContent = prevCells.toString();

    clickCell(cells);
    boxDay?.appendChild(cells);
  }
  updateMonthYearDisplay();
}
renderCalendar();

function updateMonthYearDisplay() {
  const renderMonthYear = new Date(year, month);
  currentMonth.textContent = renderMonthYear.toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });
}

function nextMonth() {
  document.getElementById("nextBtn")?.addEventListener("click", () => {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    renderCalendar();
  });
}
nextMonth();

/* class task {
  storageKey = "tasks";

  getTask() {
    const taskJson = localStorage.getItem(this.storageKey);
    return taskJson ? JSON.parse(taskJson) : [];
  }
  saveTasks(tasks: unknown) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
} */

/* const newTask = new task(); */

function clickCell(event: HTMLDivElement) {
  event.addEventListener("click", () => {
    if (event) {
      /* const taskInCells = document.createElement("div");
      taskInCells.className = "taskInCells";
      event.appendChild(taskInCells); */
    }
  });
}
