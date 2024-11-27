import { calendarApi } from "./api";
import { Task } from "./calendar-api";
import "./main.css";
import { renderCalendar } from "./renderCalendar";
import { updateTask } from "./updateTask";


export const emptyCells: HTMLElement | null = document.getElementById("dates");
export const popup: HTMLElement | null = document.querySelector(".popup");
export const currentTaskContainer: HTMLElement | null =
  document.querySelector(".box-task");
export const currentButton: HTMLElement | null = document.querySelector(".box-btn");
export const overlay: HTMLElement | null = document.getElementById("overlay");

export const currentDates = new Date();
export const monthYear = document.getElementById("monthYear");

const btnNextMonth = document.getElementById("nextMonth");
const btnPrevMonth = document.getElementById("prevMonth");

export const inputHeading: HTMLInputElement | null =
  document.querySelector(".task-title");
export const inputDescription: HTMLTextAreaElement | null = document.getElementById(
  "task-description",
) as HTMLTextAreaElement;
export let selectedDate: string | null = null;
export let editingTaskIndex: number | null = null;

export const setEditingTaskIndex = (index: number) => editingTaskIndex = index;
export const setSelectedDate = (date: string) => selectedDate = date;

export let tasks: Task[] = [];

calendarApi.getAll().then((loadedTasks) => {
  tasks = loadedTasks;
  renderCalendar();
});

const saveTaskForm = document.getElementById("save-task-form");



btnNextMonth?.addEventListener("click", () => {
  currentDates.setMonth(currentDates.getMonth() + 1);
  renderCalendar();
});

btnPrevMonth?.addEventListener("click", () => {
  currentDates.setMonth(currentDates.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".close-btn")?.addEventListener("click", () => {
  if (overlay && popup) {
    overlay.classList.remove("show");
    popup.classList.remove("show");
    renderCalendar();
  }
});

saveTaskForm?.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const taskTitle: string = inputHeading ? inputHeading.value.trim() : "";
    const taskDescription: string = inputDescription
      ? inputDescription.value.trim()
      : "";

      if (editingTaskIndex !== null) {
        await calendarApi.updateTask(selectedDate!, {
          title: taskTitle,
          description: taskDescription,
        });
      } else {
        try {
          await calendarApi.addTask({
            title: taskTitle,
            description: taskDescription,
            date: selectedDate!,
          });
        } catch(e: any) {
          alert('Something went wrong: ' + e.message);
        }

        await calendarApi.getAll().then((loadedTasks) => {
          tasks = loadedTasks;
        });
      }

      updateTask(); // Обновляем отображение задач

      if (inputHeading && inputDescription) {
        inputHeading.value = "";
        inputDescription.value = "";
      }
      editingTaskIndex = null; // Сбрасываем индекс редактирования
});
