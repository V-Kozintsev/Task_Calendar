export interface Task {
  id: string;
  title: string;
  /* completed: boolean; */
}

export class LocalTask {
  private TaskKey: string;

  constructor() {
    this.TaskKey = "tasks";
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

// Пример использования класса
const runTask = new LocalTask();

// Получаем все задачи

//тесты
/* document.querySelector(".saved")?.addEventListener("click", () => {
    const secureID = crypto.randomUUID();
    runTask.saveTask({
      id: `${secureID}`,
      title: "Первая задача",
    });
  
    console.log("записал");
  }); */
document.querySelector(".read")?.addEventListener("click", () => {
  console.log(runTask.getTasks());
});
