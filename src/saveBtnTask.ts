import { RunTask } from "./api";
import { Task } from "./LSCalendarApi";
import { selected, dateClicked } from "./currentClickDiv";

//комит
export async function saveBtnTask() {
  const popupForm = document.querySelector(".popup") as HTMLDivElement;

  const backgroundOverlay = document.querySelector(
    ".window-background",
  ) as HTMLDivElement;
  document.getElementById("btnSave")?.addEventListener("click", (e) => {
    const inputText = document.getElementById("title") as HTMLInputElement;
    const inputTextDescription = document.getElementById(
      "task-description",
    ) as HTMLInputElement;
    const taskText = inputText.value.trim();
    const descriptionText = inputTextDescription.value.trim();
    e.preventDefault();
    if (taskText) {
      const taskTitle = document.createElement("div");
      taskTitle.className = "taskInCells";
      selected.appendChild(taskTitle);
      taskTitle.textContent = taskText;
      popupForm.style.display = "none";
      backgroundOverlay.style.display = "none";
      const secureID = crypto.randomUUID();
      RunTask.saveTask({
        id: secureID,
        title: taskText,
        description: descriptionText,
        date: dateClicked,
      });

      // Добавляем задачу в интерфейс
      addTask(taskText, descriptionText, dateClicked);

      inputText.value = "";
      inputTextDescription.value = "";
    }
  });
}

function addTask(title: string, description: string, date: string) {
  const boxTask = document.getElementById("box-task");
  const itemTask = document.createElement("div"); //коробка для данных
  itemTask.className = "item-task";
  boxTask?.appendChild(itemTask);

  const titleTask = document.createElement("div"); //имя задачи
  titleTask.className = "title-task";
  titleTask.innerText = title;
  itemTask.appendChild(titleTask);

  const descriptionTask = document.createElement("div"); //описание задачи
  descriptionTask.className = "description-task";
  descriptionTask.innerText = description;
  itemTask.appendChild(descriptionTask);

  const dateTask = document.createElement("div"); // дата задачи
  dateTask.className = "date-task";
  dateTask.innerText = date;
  itemTask.appendChild(dateTask);
}
function loadTasks() {
  RunTask.getTasks().forEach((task: Task) => {
    addTask(task.title, task.description, task.date);
  });
}
window.onload = loadTasks;

document.querySelector(".read")?.addEventListener("click", () => {
  console.log(RunTask.getTasks());
});
document.querySelector(".delete")?.addEventListener("click", () => {
  RunTask.clearTasks();
});
