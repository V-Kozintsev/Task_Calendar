import { Task, ICalendarManager } from "./interface";
import fuzzysearch from "fuzzysearch"; // Импорт библиотеки

export class CalendarManager implements ICalendarManager {
  key = "tasks";
  arrayTask: Task[] = []; // Явно указываем тип

  constructor() {
    this.loadTasks(); // Загружаем задачи при создании экземпляра
  }

  async createTask(
    title: string,
    description: string,
    date: string,
    tags?: string,
    status: "pending" | "completed" = "pending",
  ) {
    const createdDate = new Date().toLocaleDateString(); // Получаем текущую дату в формате "дд.мм.гггг"
    const task: Task = { title, description, date, createdDate, tags, status }; // Включаем дату создания
    this.arrayTask.push(task);
    await this.saveTasks(); // Сохраняем изменения асинхронно
  }

  async readTask(title: string): Promise<Task | null> {
    const task = this.arrayTask.find((task) => task.title === title);
    return task || null;
  }

  async updateTask(
    oldTitle: string,
    newTitle: string,
    newDescription: string,
    newDate?: string,
    newTags?: string,
    newStatus?: "pending" | "completed",
  ) {
    const taskIndex = this.arrayTask.findIndex(
      (task) => task.title === oldTitle,
    );
    if (taskIndex !== -1) {
      this.arrayTask[taskIndex].title = newTitle;
      this.arrayTask[taskIndex].description = newDescription;
      if (newDate) this.arrayTask[taskIndex].date = newDate;
      if (newTags) this.arrayTask[taskIndex].tags = newTags;
      if (newStatus) this.arrayTask[taskIndex].status = newStatus;
      await this.saveTasks(); // Сохраняем изменения асинхронно
    }
  }

  async deleteTask(title: string) {
    this.arrayTask = this.arrayTask.filter((task) => task.title !== title);
    await this.saveTasks(); // Сохраняем изменения асинхронно
  }

  async deleteAllTasks() {
    localStorage.removeItem(this.key);
    this.arrayTask = [];
  }

  async listTasks(): Promise<Task[]> {
    return this.arrayTask;
  }

  private async saveTasks(): Promise<void> {
    localStorage.setItem(this.key, JSON.stringify(this.arrayTask)); // Сериализуем и сохраняем массив задач
  }

  async filterTasks(
    titleFilter: string,
    tagsFilter: string,
    startDateFilter: string,
    endDateFilter: string,
  ): Promise<Task[]> {
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

  async loadTasks() {
    this.arrayTask = await this.getTask();
  }

  private async getTask(): Promise<Task[]> {
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

  async showTask(): Promise<Task[]> {
    return this.arrayTask;
  }

  async editTask(oldTitle: string, newTitle: string, newDescription: string) {
    await this.updateTask(oldTitle, newTitle, newDescription);
  }
}
