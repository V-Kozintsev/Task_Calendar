export interface Task {
  id: string;
  title: string;
  /* completed: boolean; */
}

export class LSCalendarApi {
  private TaskKey: string;
  /* private currentDate: Date; */
  /* static currentDate: any; */
  currentDate = new Date();
  year: number;
  month: number;

  constructor() {
    this.TaskKey = "tasks";
    this.currentDate = new Date();
    this.month = this.currentDate.getMonth();
    this.year = this.currentDate.getFullYear();
  }

  getTasks(): Task[] {
    const data = localStorage.getItem(this.TaskKey); // Получение данных из localStorage
    if (data) {
      try {
        const tasks = JSON.parse(data); // Пробуем преобразовать в JSON
        if (Array.isArray(tasks)) {
          return tasks; // Если это массив, возвращаем его
        } else {
          console.error("Retrieved data is not an array.", tasks);
          this.clearTasks(); // Очистим некорректные данные
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        this.clearTasks(); // Очистим некорректные данные
      }
    }
    return []; // Если данных нет или они некорректные, возвращаем пустой массив
  }

  saveTask(task: Task): void {
    const tasks = this.getTasks(); // Получаем существующие задачи
    if (!Array.isArray(tasks)) {
      // Проверка, что tasks - это массив
      console.error("Retrieved data is not an array.", tasks);
      return; // Остановка выполнения функции если это не массив
    }

    tasks.push(task); // Добавляем новую задачу
    localStorage.setItem(this.TaskKey, JSON.stringify(tasks)); // Сохраняем обновленный массив задач
  }
  clearTasks(): void {
    localStorage.removeItem(this.TaskKey); // Удаляем некорректные данные
  }
}
