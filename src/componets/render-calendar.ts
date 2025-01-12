import { CalendarManager } from "../componets/localStorageManager.ts";
import { Task } from "../componets/interface.js";

export function createCalendar() {
  const apiTask = new CalendarManager();
  const currentDate: Date = new Date();
  let currentMonth: number = currentDate.getMonth();
  let currentYear: number = currentDate.getFullYear();
  let selectedDate: string | null = null;

  const listTask = document.getElementById("taskContainer") as HTMLDivElement;

  function renderTasks() {
    listTask.innerHTML = "";
    const lastTask: Task[] = apiTask.showTask(); // Явно указываем тип

    if (!Array.isArray(lastTask)) {
      console.error("lastTask is not an array:", lastTask);
      return;
    }
    const tasksByDate: Record<string, string[]> = {};

    lastTask.forEach((task) => {
      const date = task.date;
      if (!tasksByDate[date]) {
        tasksByDate[date] = [];
      }
      tasksByDate[date].push(task.title);

      // Создаем элемент для задачи
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");

      const titleElement = document.createElement("h3");
      titleElement.textContent = task.title;

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = task.description;

      taskElement.appendChild(titleElement);
      taskElement.appendChild(descriptionElement);
      listTask.appendChild(taskElement);
    });

    const calendarCells = document.querySelectorAll(
      ".calendar-cell[data-date]",
    );
    calendarCells.forEach((cell) => {
      const date = cell.getAttribute("data-date");
      if (date) {
        const fullDate = `${currentYear}-${currentMonth + 1}-${date}`;
        if (tasksByDate[fullDate]) {
          const tasksElement = document.createElement("div");
          tasksElement.classList.add("tasks-list");
          tasksByDate[fullDate].forEach((title) => {
            const taskTitleElement = document.createElement("div");
            taskTitleElement.textContent = title;
            tasksElement.appendChild(taskTitleElement);
          });
          cell.appendChild(tasksElement); // Добавляем элементы задач в ячейку
        }
      }
    });
  }
  renderTasks();

  const saveTask = document.getElementById("save-task");
  saveTask?.addEventListener("click", (e) => {
    e.preventDefault();
    const taskTitle = document.getElementById("task-title") as HTMLInputElement;
    const taskDescription = document.getElementById(
      "task-description",
    ) as HTMLTextAreaElement;

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (title && description && selectedDate) {
      apiTask.createTask(title, description, selectedDate);
      renderTasks();
      taskTitle.value = "";
      taskDescription.value = "";
    }
    selectedDate = null;
  });

  function renderCalendar() {
    const calendarGrid = document.querySelector(
      ".calendar-grid",
    ) as HTMLDivElement;
    const currentMonthDisplay = document.getElementById(
      "month",
    ) as HTMLDivElement;

    currentMonthDisplay.textContent = currentDate.toLocaleString("ru-RU", {
      month: "long",
      year: "numeric",
    });

    calendarGrid.innerHTML = "";

    // Добавление заголовков дней недели
    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    daysOfWeek.forEach((day) => {
      calendarGrid.innerHTML += `<div class="calendar-cell calendar-cell--header">${day}</div>`;
    });

    const lastDayCurrentMonth = new Date(
      currentYear,
      currentMonth + 1,
      0,
    ).getDate();
    const firstDayCurrentMonth = new Date(
      currentYear,
      currentMonth,
      1,
    ).getDay();
    const lastDayPreviousMonth = new Date(
      currentYear,
      currentMonth,
      0,
    ).getDate();

    // Добавляем ячейки предыдущего месяца
    for (let i = firstDayCurrentMonth - 1; i >= 0; i--) {
      const day = lastDayPreviousMonth - i;
      calendarGrid.innerHTML += `<div class="calendar-cell calendar-cell--previous">${day}</div>`;
    }

    // Добавляем ячейки текущего месяца
    for (let day = 1; day <= lastDayCurrentMonth; day++) {
      calendarGrid.innerHTML += `<div class="calendar-cell" data-date="${day}">${day}</div>`;
    }

    const totalDaysToDisplay = 42;
    const currentCellsCount = firstDayCurrentMonth + lastDayCurrentMonth;
    const daysToAddFromNextMonth = totalDaysToDisplay - currentCellsCount;

    // Добавляем ячейки следующего месяца
    for (let day = 1; day <= daysToAddFromNextMonth; day++) {
      calendarGrid.innerHTML += `<div class="calendar-cell calendar-cell--next">${day}</div>`;
    }

    const taskPopup = document.getElementById("task-popup") as HTMLDivElement;
    const closePopup = document.getElementById("close-popup") as HTMLDivElement;
    const dateCells = document.querySelectorAll(".calendar-cell[data-date]");

    function openPopup() {
      if (taskPopup) {
        // Очистим предыдущее значение перед открытием
        const taskTitle = document.getElementById(
          "task-title",
        ) as HTMLInputElement;
        const taskDescription = document.getElementById(
          "task-description",
        ) as HTMLTextAreaElement;

        taskTitle.value = ""; // Очищаем поле заголовка
        taskDescription.value = ""; // Очищаем описания

        taskPopup.style.display = "block";
      }
    }

    function closePopupHandler() {
      if (taskPopup) {
        taskPopup.style.display = "none";
        selectedDate = null; // Обнуляем выбранную дату при закрытии
      }
    }

    closePopup?.addEventListener("click", closePopupHandler);

    dateCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const date = cell.getAttribute("data-date");
        if (date) {
          console.log(`Выбранная дата: ${date}`);
          selectedDate = `${currentYear}-${currentMonth + 1}-${date}`;
          openPopup();
        } else {
          console.log("Атрибут data-date не найден.");
        }
      });
    });

    const btnTasks = document.getElementById("task") as HTMLDivElement;
    const popupTasks = document.getElementById(
      "task-popupTasks",
    ) as HTMLDivElement;
    const closeTasks = document.getElementById(
      "close-popupTasks",
    ) as HTMLDivElement;

    btnTasks.addEventListener("click", () => {
      popupTasks.style.display = "block";
    });

    closeTasks.addEventListener("click", () => {
      popupTasks.style.display = "none";
    });

    renderTasks();
  }

  function changeMonth(change: number) {
    currentMonth += change;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    } else if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }

    currentDate.setFullYear(currentYear, currentMonth); // Обновляем объект date
    renderCalendar();
  }

  document
    .querySelector(".control-button-next")
    ?.addEventListener("click", () => changeMonth(1));
  document
    .querySelector(".control-button-prev")
    ?.addEventListener("click", () => changeMonth(-1));

  renderCalendar();
}
