import "./main.css";

let selected: HTMLDivElement;

const currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();
const currentMonth = document.getElementById("month") as HTMLDivElement;

function renderCalendar() {
  const containerCells = document.querySelector(
    ".container_calendar__box-day",
  ) as HTMLDivElement;

  containerCells.innerHTML = "";

  const firstDayIndex = new Date(year, month, 1).getDay();
  const dayInMonth = new Date(year, month + 1, 0).getDate(); //общее кол-во дней текущего месяца
  const prevMonthDays = new Date(year, month, 0).getDate(); //общее кол-во дней предыдущего месяца
  const weeks = (firstDayIndex + 6) % 7;
  let prevMonthDaysCells = prevMonthDays - weeks;
  let numberPrev = 0;
  let numberNext = 1;
  //ячейки предыдущего месяца
  for (let prevCells = 1; prevCells <= weeks; prevCells++) {
    numberPrev++;
    const cells = document.createElement("div");
    cells.className = "days daysPrevNext";
    prevMonthDaysCells += 1;
    cells.textContent = prevMonthDaysCells.toString();
    containerCells?.appendChild(cells);
  }

  //ячейки текущего месяца
  for (let cells = 1; cells <= dayInMonth; cells++) {
    const newCells = document.createElement("div");
    newCells.className = "days";
    containerCells?.appendChild(newCells);
    const dateCells = document.createElement("div");
    dateCells.className = "date";
    dateCells.textContent = cells.toString();
    newCells.appendChild(dateCells);

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

  updateMonthYearDisplay();

  function saveBtnTask() {
    const popupForm = document.querySelector(".popup") as HTMLDivElement;
    const backgroundOverlay = document.querySelector(
      ".window-background",
    ) as HTMLDivElement;
    document.getElementById("btnSave")?.addEventListener("click", (e) => {
      const inputText = document.getElementById("title") as HTMLInputElement;
      const taskText = inputText.value.trim();
      e.preventDefault();
      if (taskText) {
        const taskTitle = document.createElement("div");
        taskTitle.className = "taskInCells";
        selected.appendChild(taskTitle);
        taskTitle.textContent = taskText;
        popupForm.style.display = "none";
        backgroundOverlay.style.display = "none";
        inputText.value = "";
      }
    });
  }
  saveBtnTask();
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
function prevMonth() {
  document.getElementById("prevBtn")?.addEventListener("click", () => {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    renderCalendar();
  });
}
prevMonth();

function currentClickDiv(cell: HTMLDivElement) {
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
