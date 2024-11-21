import { Task, ITaskStorage } from "../index";

export class LocalStorageTaskStorage implements ITaskStorage {
  async createTask(task: Task): Promise<void> {
    const tasks = this.getTasksFormStorage();
    tasks.push(task);
    this.saveTasksToStorage(tasks);
  }
  private getTasksFormStorage(): Task[] {
    const tasksJson = localStorage.getItem("tasks");
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  private saveTasksToStorage(tasks: Task[]): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
