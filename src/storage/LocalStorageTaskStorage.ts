// src/storage/LocalStorageTaskStorage.ts
import { ITaskStorage, Task, FilterOptions } from "../interfaces/ITaskStorage";

export class LocalStorageTaskStorage implements ITaskStorage {
  private storageKey = "tasks";

  private loadTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.storageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  public async create(task: Task): Promise<Task> {
    const tasks = this.loadTasks();
    tasks.push(task);
    this.saveTasks(tasks);
    return task;
  }

  public async read(taskId: string): Promise<Task | null> {
    const tasks = this.loadTasks();
    return tasks.find((task) => task.id === taskId) || null;
  }

  public async update(taskId: string, updatedTask: Task): Promise<Task | null> {
    const tasks = this.loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return null;

    tasks[taskIndex] = updatedTask;
    this.saveTasks(tasks);
    return updatedTask;
  }

  public async delete(taskId: string): Promise<boolean> {
    const tasks = this.loadTasks();
    const newTasks = tasks.filter((task) => task.id !== taskId);
    this.saveTasks(newTasks);
    return tasks.length !== newTasks.length;
  }

  public async filter(filterOptions: FilterOptions): Promise<Task[]> {
    const tasks = this.loadTasks();
    return tasks.filter((task) => {
      const matchesText = filterOptions.text
        ? task.title.includes(filterOptions.text) ||
          task.description.includes(filterOptions.text)
        : true;
      const matchesDate = filterOptions.date
        ? task.dueDate.toDateString() === filterOptions.date.toDateString()
        : true;
      const matchesStatus = filterOptions.status
        ? task.status === filterOptions.status
        : true;
      const matchesTags = filterOptions.tags
        ? filterOptions.tags.some((tag) => task.tags.includes(tag))
        : true;
      return matchesText && matchesDate && matchesStatus && matchesTags;
    });
  }
}
