import { calendarApi } from "./api";
import { updateTask } from "./updateTask";

export async function deleteTask(index: number) {
  await calendarApi.deleteTask(index);
  updateTask();
}
