import "./main.css";
// Интерфейс ,который будет поддерживать CRUD операцию и филтрацию задачи
export interface Task {
  id: string; //уникальный индефикатор задачи
  title: string; //заголовок задачи
  description: string; //описание задачи
  date: Date; // дата задачи
  status: "pending" | "completed"; //статус задачи
  tags?: string; //теги задачи
}
export interface ITaskStorage {
  create(task: Task): Promise<void>; // создание задачи
  readTask(id: string): Task | null; //чтение задачи
  update(task: Task): void; //обновление задачи
  deleteTask(task: Task): void; //удаление задачи
  getAllTask(): Task[]; //получить все данные задачи
  filterTask(
    query: string,
    date?: Date,
    status?: string,
    tags?: string[],
  ): Task[]; //фильтрация задач
}
