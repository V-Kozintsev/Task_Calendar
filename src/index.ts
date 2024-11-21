import "./main.css";
// Определяем интерфейс для задачи
export interface Task {
  id: string; // уникальный идентификатор задачи
  title: string; // заголовок задачи
  description: string; // описание задачи
  dueDate: Date; // дата выполнения
  status: "pending" | "completed"; // статус задачи
  tags?: string[]; // метки задачи
}

// Интерфейс для работы с Tasks
export interface ITaskStorage {
  createTask(task: Task): Promise<void>; // Создание задачи
  /* readTask(id: string): Promise<Task | null>; // Чтение задачи по id
  updateTask(task: Task): Promise<void>; // Обновление задачи
  deleteTask(id: string): Promise<void>; // Удаление задачи

  filterTasks(
    text?: string,
    date?: Date,
    status?: "pending" | "completed",
    tags?: string[]
  ): Promise<Task[]>; // Фильтрация задач */
}
