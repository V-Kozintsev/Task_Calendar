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
  console.log(RunTask.getTasks());
});
document.querySelector(".delete")?.addEventListener("click", () => {
  RunTask.clearTasks();
});
