import { CalendarManager } from "./localStorageManager"; //CalendarManager() FirebaseManager()
/* import { FirebaseManager } from "./firebaseManager"; */
import { Task } from "./interface";

export async function createCalendar() {
  const apiTask = new CalendarManager();
  const currentDate: Date = new Date();
  let currentMonth: number = currentDate.getMonth();
  let currentYear: number = currentDate.getFullYear();
  let selectedDate: string | null = null;

  const listTask = document.getElementById("taskContainer") as HTMLDivElement;

  // Функция для рендеринга задач
  async function renderTasks() {
    listTask.innerHTML = "";
    const lastTask: Task[] = await apiTask.showTask();
    const tasksByDate: Record<string, Task[]> = {};

    // Получаем фильтры
    const titleFilter = (
      document.getElementById("filter-title") as HTMLInputElement
    ).value.trim();
    const tagsFilter = (
      document.getElementById("filter-tags") as HTMLInputElement
    ).value.trim();
    const startDateFilter = (
      document.getElementById("start-date") as HTMLInputElement
    ).value;
    const endDateFilter = (
      document.getElementById("end-date") as HTMLInputElement
    ).value;

    // Фильтруем задачи
    const filteredTasks = await apiTask.filterTasks(
      titleFilter,
      tagsFilter,
      startDateFilter,
      endDateFilter,
    );

    // Проходим по отфильтрованным задачам и добавляем их в список
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

      titleInput.value = task.title; // Заполняем заголовок
      descriptionInput.value = task.description; // Заполняем описание

      // Показываем попап
      taskPopupDetail.style.display = "block";

      const saveChangesButton = document.getElementById(
        "save-changes",
      ) as HTMLButtonElement;
      saveChangesButton.onclick = async () => {
        const newTitle = titleInput.value.trim();
        const newDescription = descriptionInput.value.trim();

        if (newTitle && newDescription) {
          await apiTask.editTask(task.title, newTitle, newDescription);
          await renderTasks(); // Обновляем задачи
          taskPopupDetail.style.display = "none"; // Закрываем попап
        } else {
          alert("Пожалуйста, заполните все поля.");
        }
      };

      const deleteButton = document.getElementById(
        "delete-task",
      ) as HTMLButtonElement;
      deleteButton.onclick = async () => {
        await apiTask.deleteTask(task.title);
        await renderTasks(); // Обновляем задачи
        taskPopupDetail.style.display = "none"; // Закрываем попап
      };

      const closePopupDetail = document.getElementById(
        "close-popupDetail",
      ) as HTMLSpanElement;
      closePopupDetail?.addEventListener("click", () => {
        taskPopupDetail.style.display = "none"; // Скрываем попап
      });
    }

    lastTask.forEach((task) => {
      const date = task.date;
      if (!tasksByDate[date]) {
        tasksByDate[date] = [];
      }
      tasksByDate[date].push(task);
    });

    const filterButton = document.getElementById(
      "filter-btn",
    ) as HTMLButtonElement;
    filterButton.onclick = async () => {
      await renderTasks(); // Перерисовываем только отфильтрованные задачи
    };

    const calendarCells = document.querySelectorAll(
      ".calendar-cell[data-date]",
    );
    calendarCells.forEach((cell) => {
      const date = cell.getAttribute("data-date");
      if (!date) return;

      const fullDate = `${currentYear}-${currentMonth + 1}-${date}`;

      // Удаляем список задач, если он есть
      const existingTasksList = cell.querySelector(".tasks-list");
      if (existingTasksList) {
        existingTasksList.remove();
      }

      // Создаем новый элемент списка задач
      const tasks = tasksByDate[fullDate];
      if (tasks) {
        const tasksElement = document.createElement("div");
        tasksElement.classList.add("tasks-list");

        tasks.forEach((task) => {
          const taskTitleElement = document.createElement("div");
          taskTitleElement.className = "current-task";
          taskTitleElement.textContent = task.title;
          taskTitleElement.addEventListener("click", () => {
            openTaskDetailPopup(task);
          });
          tasksElement.appendChild(taskTitleElement);
        });

        cell.appendChild(tasksElement);
      }
    });
  }

  await renderTasks(); // Вызываем асинхронно для инициализации задач

  const saveTask = document.getElementById("save-task");
  saveTask?.addEventListener("click", async (e) => {
    e.preventDefault();
    const taskTitle = document.getElementById("task-title") as HTMLInputElement;
    const taskDescription = document.getElementById(
      "task-description",
    ) as HTMLTextAreaElement;

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (title && description && selectedDate) {
      await apiTask.createTask(title, description, selectedDate);
      await renderTasks(); // Обновляем отображение задач
      taskTitle.value = "";
      taskDescription.value = "";
      selectedDate = null; // Сбрасываем выбранную дату
    } else {
      alert("Пожалуйста, заполните все поля.");
    }
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

    calendarGrid.innerHTML = ""; // Очищаем сетку календаря

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
        taskPopup.style.display = "block"; // Показываем попап задач
      }
    }

    function closePopupHandler() {
      if (taskPopup) {
        taskPopup.style.display = "none"; // Скрываем попап
        selectedDate = null; // Сбрасываем выбранную дату при закрытии
      }
    }

    closePopup?.addEventListener("click", closePopupHandler);

    dateCells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        if (!target.closest(".tasks-list")) {
          const date = cell.getAttribute("data-date");

          if (date) {
            selectedDate = `${currentYear}-${currentMonth + 1}-${date}`;
            openPopup();
          }
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
      popupTasks.style.display = "block"; // Показываем попап со списком задач
    });

    closeTasks.addEventListener("click", () => {
      popupTasks.style.display = "none"; // Скрываем попап со списком задач
    });

    renderTasks(); // Рендерим задачи на календаре
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

    currentDate.setFullYear(currentYear, currentMonth);
    renderCalendar(); // Перерисовываем календарь
  }

  document
    .querySelector(".control-button-next")
    ?.addEventListener("click", () => changeMonth(1));
  document
    .querySelector(".control-button-prev")
    ?.addEventListener("click", () => changeMonth(-1));

  renderCalendar(); // Инициализируем рендеринг календаря
}
