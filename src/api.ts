import { LSCalendarApi } from "./LSCalendarApi";

export const RunTask = new LSCalendarApi();

// Получаем все задачи

//тесты
/* document.querySelector(".saved")?.addEventListener("click", () => {
    const secureID = crypto.randomUUID();
    runTask.saveTask({
      id: `${secureID}`,
      title: "Первая задача",
    });
  
    console.log("записал");
  }); */
document.querySelector(".read")?.addEventListener("click", () => {
  /* const blockBtn = document.querySelector(".block"); */
  const newDiv = document.createElement("div") as HTMLDivElement;
  newDiv.className = "newTask";
  if (newDiv) {
    newDiv.textContent = "212121";
  }
});

document.querySelector(".delete")?.addEventListener("click", () => {
  RunTask.clearTasks();
});
