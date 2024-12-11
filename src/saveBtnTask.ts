import { RunTask } from "./api";
import { selected } from "./currentClickDiv";
//комит
export function saveBtnTask() {
  const dayMonthYear = new Date(RunTask.year, RunTask.month);
  const currentDayCalendar = dayMonthYear.toLocaleDateString("ru-Ru", {
    month: "long",
    year: "numeric",
  });
  const popupForm = document.querySelector(".popup") as HTMLDivElement;
  const dateMonthYear = document.querySelector(
    ".dateMonthYear",
  ) as HTMLDivElement;

  dateMonthYear.innerText = currentDayCalendar;
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
      const secureID = crypto.randomUUID();
      RunTask.saveTask({
        id: `${secureID}`,
        title: `${taskText}`,
      });
      inputText.value = "";
      console.log("ЗАПИСАЛ");
    }
  });
}
