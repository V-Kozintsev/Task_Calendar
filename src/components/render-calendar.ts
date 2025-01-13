import { CalendarManager } from "./localStorageManager.ts";
import { Task } from "./interface";
/* import Fuse from "fuse.js"; */

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
    const tasksByDate: Record<string, Task[]> = {};
    const titleFilter = (
      document.getElementById("filter-title") as HTMLInputElement
    ).value.trim();
    const tagsFilter = (
      document.getElementById("filter-tags") as HTMLInputElement
    ).value.trim();
    const dateFilter = (
      document.getElementById("filter-date") as HTMLInputElement
    ).value;

    const filteredTasks = apiTask.filterTasks(
      titleFilter,
      tagsFilter,
      dateFilter,
    );

    filteredTasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");

      const titleElement = document.createElement("h3");
      titleElement.textContent = task.title;
      titleElement.addEventListener("click", () => {
        openTaskDetailPopup(task);
      });

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = task.description;

      const assignedDateElement = document.createElement("p");
      assignedDateElement.textContent = `Назначенная дата: ${task.date}`;

      taskElement.appendChild(titleElement);
      taskElement.appendChild(descriptionElement);
      taskElement.appendChild(assignedDateElement);
      listTask.appendChild(taskElement);
    });

    function openTaskDetailPopup(task: Task) {
      const taskPopupDetail = document.getElementById(
        "task-popupDetail",
      ) as HTMLDivElement;
      const titleInput = document.getElementById(
        "edit-title",
      ) as HTMLInputElement;
      const descriptionInput = document.getElementById(
        "edit-description",
      ) as HTMLTextAreaElement;

      // Заполняем поля ввода текущими значениями задачи
      titleInput.value = task.title;
      descriptionInput.value = task.description;

      // Показываем попап
      taskPopupDetail.style.display = "block";

      // Обработка кнопки "Сохранить изменения"
      const saveChangesButton = document.getElementById(
        "save-changes",
      ) as HTMLButtonElement;
      saveChangesButton.onclick = () => {
        const newTitle = titleInput.value.trim();
        const newDescription = descriptionInput.value.trim();

        if (newTitle && newDescription) {
          apiTask.editTask(task.title, newTitle, newDescription);
          renderTasks(); // Обновляем отображение задач после редактирования
          taskPopupDetail.style.display = "none"; // Закрываем попап
        } else {
          alert("Пожалуйста, заполните все поля.");
        }
      };

      // Кнопка "Удалить задачу"
      const deleteButton = document.getElementById(
        "delete-task",
      ) as HTMLButtonElement;
      deleteButton.onclick = () => {
        apiTask.deleteTask(task.title); // Удаляем задачу по заголовку
        renderTasks(); // Обновляем отображение задач после удаления
        taskPopupDetail.style.display = "none"; // Закрываем попап
      };

      // Показываем попап
      taskPopupDetail.style.display = "block";
    }

    // Обработчик для закрытия попапа
    const closePopupDetail = document.getElementById(
      "close-popupDetail",
    ) as HTMLSpanElement;

    closePopupDetail?.addEventListener("click", () => {
      const taskPopupDetail = document.getElementById(
        "task-popupDetail",
      ) as HTMLDivElement;
      taskPopupDetail.style.display = "none"; // Скрываем попап
    });

    lastTask.forEach((task) => {
      const date = task.date; // Используем дату, назначенную для задачи из календаря
      if (!tasksByDate[date]) {
        tasksByDate[date] = [];
      }
      tasksByDate[date].push(task);

      // Создаем элемент для задачи
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");

      const titleElement = document.createElement("h3");
      titleElement.textContent = task.title;
      titleElement.addEventListener("click", () => {
        openTaskDetailPopup(task); // Передаем текущую задачу в функцию открытия попапа
      });

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = task.description;

      const assignedDateElement = document.createElement("p"); // Изменяем название для ясности
      assignedDateElement.textContent = `Назначенная дата: ${task.date}`; // Отображаем дату, назначенную в календаре

      taskElement.appendChild(titleElement);
      taskElement.appendChild(descriptionElement);
      taskElement.appendChild(assignedDateElement); // Добавляем элемент назначенной даты в задачу
      listTask.appendChild(taskElement);
    });
    const filterButton = document.getElementById(
      "filter-btn",
    ) as HTMLButtonElement;
    filterButton.addEventListener("click", () => {
      renderTasks();
    });

    const calendarCells = document.querySelectorAll(
      ".calendar-cell[data-date]",
    );
    calendarCells.forEach((cell) => {
      const date = cell.getAttribute("data-date");

      if (!date) return; // Прекращаем выполнение, если даты нет

      const fullDate = `${currentYear}-${currentMonth + 1}-${date}`;

      // Удаляем существующий список задач, если он есть
      const existingTasksList = cell.querySelector(".tasks-list");
      if (existingTasksList) {
        existingTasksList.remove();
      }

      // Если есть задачи для текущей даты, создаем и добавляем новый элемент списка задач
      const tasks = tasksByDate[fullDate];
      if (tasks) {
        const tasksElement = document.createElement("div");
        tasksElement.classList.add("tasks-list");

        tasks.forEach((task) => {
          const taskTitleElement = document.createElement("div");
          taskTitleElement.className = "current-task";
          taskTitleElement.textContent = task.title;
          taskTitleElement.addEventListener("click", () => {
            openTaskDetailPopup(task); // Вызываем попап для задачи
          });
          tasksElement.appendChild(taskTitleElement);
        });

        cell.appendChild(tasksElement); // Добавляем элементы задач в ячейку
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
      cell.addEventListener("click", (e) => {
        // Проверяем, произошло ли это на элементах с классом tasks-list
        const target = e.target as HTMLElement;

        if (!target.closest(".tasks-list")) {
          const date = cell.getAttribute("data-date");

          if (date) {
            console.log(`Выбранная дата: ${date}`);
            selectedDate = `${currentYear}-${currentMonth + 1}-${date}`;
            openPopup();
          } else {
            console.log("Атрибут data-date не найден.");
          }
        } else {
          console.log("Вы кликнули по задачам, попап не будет открыт.");
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
