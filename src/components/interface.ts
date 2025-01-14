export interface Task {
  title: string;
  description: string;
  date: string; // Дата выполнения задачи
  createdDate: string; // Дата создания задачи
  tags?: string; // Теги для фильтрации
  status?: "pending" | "completed"; // Статус задачи (например, ожидает выполнения или выполнена)
}

export interface ICalendarManager {
  createTask(
    title: string,
    description: string,
    date: string,
    tags?: string,
    status?: "pending" | "completed",
  ): Promise<void>; // Изменено на Promise<void>

  readTask(title: string): Promise<Task | null>; // Изменено на Promise<Task | null>

  updateTask(
    oldTitle: string,
    newTitle: string,
    newDescription: string,
    newDate?: string,
    newTags?: string,
    newStatus?: "pending" | "completed",
  ): Promise<void>; // Изменено на Promise<void>

  deleteTask(title: string): Promise<void>; // Изменено на Promise<void>

  deleteAllTasks(): Promise<void>; // Изменено на Promise<void>

  listTasks(): Promise<Task[]>; // Изменено на Promise<Task[]>

  filterTasks(
    titleFilter?: string,
    tagsFilter?: string,
    startDateFilter?: string,
    endDateFilter?: string,
    statusFilter?: "pending" | "completed",
  ): Promise<Task[]>; // Изменено на Promise<Task[]>
}
