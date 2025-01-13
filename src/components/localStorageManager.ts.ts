//файл localStorageManager.ts.ts
import { Task } from "./interface";
import fuzzysearch from "fuzzysearch"; // Импорт библиотеки

export class CalendarManager {
  key = "tasks";
  arrayTask: Task[] = []; // Явно указываем тип

  constructor() {
    this.loadTasks(); // Загружаем задачи при создании экземпляра
  }

  createTask(title: string, description: string, date: string) {
    const createdDate = new Date().toLocaleDateString(); // Получаем текущую дату в формате "дд.мм.гггг"
    const task: Task = { title, description, date, createdDate }; // Включаем дату создания
    this.arrayTask.push(task);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem(this.key, JSON.stringify(this.arrayTask));
  }

  filterTasks(
    titleFilter: string,
    tagsFilter: string,
    startDateFilter: string,
    endDateFilter: string,
  ): Task[] {
    return this.arrayTask.filter((task) => {
      const matchesTitle = titleFilter
        ? this.fuzzyMatch(task.title, titleFilter)
        : true;

      const matchesTags = tagsFilter
        ? task.tags && this.fuzzyMatch(task.tags, tagsFilter)
        : true;

      const matchesDate =
        (!startDateFilter ||
          new Date(task.date) >= new Date(startDateFilter)) &&
        (!endDateFilter || new Date(task.date) <= new Date(endDateFilter));

      return matchesTitle && matchesTags && matchesDate;
    });
  }

  fuzzyMatch(str: string, pattern: string): boolean {
    return fuzzysearch(pattern.toLowerCase(), str.toLowerCase());
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
  editTask(oldTitle: string, newTitle: string, newDescription: string) {
    const taskIndex = this.arrayTask.findIndex(
      (task) => task.title === oldTitle,
    );
    if (taskIndex !== -1) {
      this.arrayTask[taskIndex].title = newTitle;
      this.arrayTask[taskIndex].description = newDescription;
      this.saveTasks();
    }
  }
}
