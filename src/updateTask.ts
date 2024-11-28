import {
  currentTaskContainer,
  currentButton,
  inputHeading,
  inputDescription,
  tasks,
  selectedDate,
  setEditingTaskIndex,
} from ".";
import { calendarApi } from "./api";
import { deleteTask } from "./deleteTask";

export async function updateTask() {
  if (!currentTaskContainer || !currentButton) return;

  currentTaskContainer.innerHTML = "";
  currentButton.innerHTML = "";
  if (inputHeading && inputDescription) {
    inputHeading.value = "";
    inputDescription.value = "";
  }

  const filteredTasks = await calendarApi.getForDate(selectedDate!);

  filteredTasks.forEach((task) => {
    const divDay: HTMLDivElement = document.createElement("div");
    divDay.className = "added-task";
    divDay.textContent = `${task.title}: ${task.description}`;
    currentTaskContainer?.appendChild(divDay);

    const divDayB: HTMLButtonElement = document.createElement("button");
    divDayB.textContent = "Удалить";
    divDayB.addEventListener("click", () => {
      deleteTask(tasks.indexOf(task)); // Удаляем задачу по индексу
    });
    currentButton?.appendChild(divDayB);

    const divDayR: HTMLButtonElement = document.createElement("button");
    divDayR.textContent = "Редактировать";
    divDayR.type = "button";
    divDayR.addEventListener("click", () => {
      setEditingTaskIndex(tasks.indexOf(task)); // Сохраняем индекс редактируемой задачи
      if (inputHeading && inputDescription) {
        inputHeading.value = task.title;
        inputDescription.value = task.description;
      }
    });
    currentButton?.appendChild(divDayR);
  });
  //изменения
}
