import { Task, StoringTasks, FilterCriteria } from "../interfaces/ITaskStorage";

class LocalStorageTaskStorage implements StoringTasks {
  private storageKey = "tasks";

  private async getAllTasks(): Promise<Task[]> {
    const storedTasks = localStorage.getItem(this.storageKey);
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  async create(task: Task): Promise<void> {
    const tasks = await this.getAllTasks();
    tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  async read(id: string): Promise<Task | null> {
    const tasks = await this.getAllTasks();
    const foundTask = tasks.find((task) => task.id === id);
    return foundTask || null; // Возвращаем найденную задачу или null
  }

  async update(updatedTask: Task): Promise<void> {
    const tasks = await this.getAllTasks();
    const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask; // Обновляем задачу
      localStorage.setItem(this.storageKey, JSON.stringify(tasks)); // Сохраняем изменения
    } else {
      throw new Error("Task not found");
    }
  }

  async delete(id: string): Promise<void> {
    const tasks = await this.getAllTasks();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks)); // Сохраняем изменения
  }

  async filter(criteria: FilterCriteria): Promise<Task[]> {
    const tasks = await this.getAllTasks();

    return tasks.filter((task) => {
      // Фильтрация по заголовку
      const titleMatches = criteria.title
        ? task.title.toLowerCase().includes(criteria.title.toLowerCase())
        : true;

      // Фильтрация по статусу
      const statusMatches = criteria.status
        ? task.status === criteria.status
        : true;

      // Фильтрация по тегам
      const tagsMatch =
        criteria.tags && criteria.tags.length > 0
          ? criteria.tags.some((tag) => task.tags.includes(tag))
          : true;

      // Фильтрация по диапазону дат
      const dateMatches = criteria.dateRange
        ? (!criteria.dateRange.start ||
            task.date >= criteria.dateRange.start) &&
          (!criteria.dateRange.end || task.date <= criteria.dateRange.end)
        : true;

      // Возвращаем true, если задача соответствует всем критериям
      return titleMatches && statusMatches && tagsMatch && dateMatches;
    });
  }
}

export default storage = new LocalStorageTaskStorage();
