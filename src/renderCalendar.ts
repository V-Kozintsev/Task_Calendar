import {
  emptyCells,
  monthYear,
  currentDates,
  overlay,
  popup,
  setSelectedDate,
} from ".";
import { calendarApi } from "./api";
import { updateTask } from "./updateTask";

export async function renderCalendar() {
  if (!emptyCells || !monthYear) return;

  emptyCells.innerHTML = "";

  const month: number = currentDates.getMonth();
  const year: number = currentDates.getFullYear();
  const lastDayMonth: number = new Date(year, month + 1, 0).getDate();
  const firstDayIndex: number = new Date(year, month, 1).getDay();
  const weeks: number = (firstDayIndex + 6) % 7;

  monthYear.textContent = currentDates.toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });

  for (let i = 0; i < weeks; i++) {
    const divDay: HTMLDivElement = document.createElement("div");
    divDay.className = "days";
    emptyCells.appendChild(divDay);
  }

  for (let day = 1; day <= lastDayMonth; day++) {
    const divDay: HTMLDivElement = document.createElement("div");
    divDay.className = "days";
    divDay.textContent = day.toString();

    const dateKey: string = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayTasks = await calendarApi.getForDate(dateKey);

    if (dayTasks.length > 0) {
      dayTasks.forEach((task) => {
        const taskIndicator: HTMLDivElement = document.createElement("div");
        taskIndicator.className = "task-indicator";
        taskIndicator.textContent = task.title; // Показываем только заголовок задачи
        divDay.appendChild(taskIndicator);
      });
    }

    emptyCells.appendChild(divDay);
    divDay.addEventListener("click", () => {
      if (overlay && popup) {
        overlay.classList.add("show");
        popup.classList.add("show");
        setSelectedDate(dateKey);
        updateTask();
      }
    });
  }
}
