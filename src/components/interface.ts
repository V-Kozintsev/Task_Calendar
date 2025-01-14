// interface.ts
export interface Task {
  id?: string; // Добавлено поле id
  title: string;
  description: string;
  date: string;
  createdDate: string;
  tags?: string;
  status?: "pending" | "completed";
}

export interface ICalendarManager {
  createTask(
    title: string,
    description: string,
    date: string,
    tags?: string,
    status?: "pending" | "completed",
  ): Promise<void>;

  readTask(title: string): Promise<Task | null>;

  updateTask(
    oldTitle: string,
    newTitle: string,
    newDescription: string,
    newDate?: string,
    newTags?: string,
    newStatus?: "pending" | "completed",
  ): Promise<void>;

  deleteTask(title: string): Promise<void>;

  deleteAllTasks(): Promise<void>;

  listTasks(): Promise<Task[]>;

  filterTasks(
    titleFilter?: string,
    tagsFilter?: string,
    startDateFilter?: string,
    endDateFilter?: string,
    statusFilter?: "pending" | "completed",
  ): Promise<Task[]>;
}
