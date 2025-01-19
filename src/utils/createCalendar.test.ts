import { createCalendar } from "../components/render-calendar"; // Убедитесь, что путь правильный

describe("createCalendar", () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <div id="taskContainer"></div>
        <div class="calendar-grid"></div>
        <div id="month"></div>
        <input type="text" id="filter-title" />
        <input type="text" id="filter-tags" />
        <input type="date" id="start-date" />
        <input type="date" id="end-date" />
        <button id="filter-btn"></button>
        <div id="task-popup" style="display: none;"></div>
        <div id="close-popup"></div>
        <button id="save-task"></button>
        <div class="control-button-next"></div>
        <div class="control-button-prev"></div>
        <button id="task"></button>
        <div id="task-popupTasks" style="display: none;"></div>
        <div id="close-popupTasks"></div>
      `;
  });

  test("should initialize and render the calendar", async () => {
    await createCalendar();

    // Проверяем, что элемент календаря и контейнер задач были созданы
    const calendarGrid = document.querySelector(".calendar-grid");
    expect(calendarGrid).toBeTruthy();

    const taskContainer = document.getElementById("taskContainer");
    expect(taskContainer).toBeTruthy();

    // Проверяем, что btnTasks существует
    const btnTasks = document.getElementById("task");
    expect(btnTasks).toBeTruthy();

    // Убедиться, что попап задач скрыт
  });
});
