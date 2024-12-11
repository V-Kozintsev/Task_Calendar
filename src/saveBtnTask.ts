import { RunTask } from "./api";
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
      inputText.value = "";
      inputTextDescription.value = "";

      console.log("ЗАПИСАЛ");
      console.log(dateClicked);
    }
  });
}
