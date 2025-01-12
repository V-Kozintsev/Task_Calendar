import { Task } from "./interface";
export class CalendarManager {
  key = "tasks";
  arrayTask: Task[] = []; // Явно указываем тип

  constructor() {
    this.loadTasks(); // Загружаем задачи при создании экземпляра
  }

  createTask(title: string, description: string, date: string) {
    const task: Task = { title, description, date }; // Указываем тип
    this.arrayTask.push(task);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem(this.key, JSON.stringify(this.arrayTask));
  }

  loadTasks() {
    this.arrayTask = this.getTask();
  }

  getTask(): Task[] {
    // Указываем возвращаемый тип
    const taskData = localStorage.getItem(this.key);
    if (taskData) {
      try {
        const parsedData = JSON.parse(taskData);
        if (Array.isArray(parsedData)) {
          return parsedData; // Вернуть массив задач
        } else {
          console.warn("Data in localStorage is not an array");
          return [];
        }
      } catch (e) {
        console.error("Failed to parse tasks from localStorage:", e);
        return [];
      }
    }
    return [];
  }

  showTask(): Task[] {
    // Возвращаем тип
    return this.arrayTask;
  }

  deleteTask(title: string) {
    this.arrayTask = this.arrayTask.filter((task) => task.title !== title);
    this.saveTasks();
  }

  clickTask(title: string) {
    const task = this.arrayTask.find((task) => task.title === title);
    return task ? { title: task.title, description: task.description } : null;
  }

  deleteTaskAll() {
    localStorage.removeItem(this.key);
    this.arrayTask = [];
  }
}
