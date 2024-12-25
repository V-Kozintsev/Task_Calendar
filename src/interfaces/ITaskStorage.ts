// src/interfaces/ITaskStorage.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "completed";
  tags: string[];
}

export interface ITaskStorage {
  create(task: Task): Promise<Task>;
  read(taskId: string): Promise<Task | null>;
  update(taskId: string, updatedTask: Task): Promise<Task | null>;
  delete(taskId: string): Promise<boolean>;
  filter(filterOptions: FilterOptions): Promise<Task[]>;
}

export interface FilterOptions {
  text?: string;
  date?: Date;
  status?: "pending" | "completed";
  tags?: string[];
}
