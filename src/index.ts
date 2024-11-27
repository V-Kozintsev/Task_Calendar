import "./main.css";

/* import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  remove,
  query,
  orderByChild,
  equalTo,
} from "firebase/database"; */

//описать интерфейс для библиотеки для работы с календарем (закладывая работу с произвольным хранилищем)
interface Task {
  title: string;
  description: string;
  date: string; // Формат: 'YYYY-MM-DD'
  status?: string; // Например, 'completed', 'pending'
  tags?: string[]; // Массив тегов
}

/* interface TaskStorage {
  createTask(task: Task): Promise<void>;
  readTasks(date: string): Promise<Task[]>;
  updateTask(index: number, updatedTask: Task): Promise<void>;
  deleteTask(index: number): Promise<void>;
  filterTasks(criteria: string): Promise<Task[]>;
} */

/* class LocalStorageTaskStorage implements TaskStorage {
  private storageKey = "tasks";

  async createTask(task: Task): Promise<void> {
    const tasks = await this.readAllTasks();
    tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  async readTasks(date: string): Promise<Task[]> {
    const tasks = await this.readAllTasks();
    return tasks.filter((task) => task.date === date);
  }

  async updateTask(index: number, updatedTask: Task): Promise<void> {
    const tasks = await this.readAllTasks();
    tasks[index] = updatedTask;
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  async deleteTask(index: number): Promise<void> {
    const tasks = await this.readAllTasks();
    tasks.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  async filterTasks(criteria: string): Promise<Task[]> {
    const tasks = await this.readAllTasks();
    return tasks.filter(
      (task) =>
        task.title.includes(criteria) || task.description.includes(criteria)
    );
  }

  private async readAllTasks(): Promise<Task[]> {
    const tasksJson = localStorage.getItem(this.storageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }
}

// Функция для добавления задачи в Local Storage
function addTaskToLocalStorage(task: string): void {
  const existingTasks: string[] = JSON.parse(
    localStorage.getItem("tasks") || "[]"
  );
  existingTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(existingTasks));
  console.log(`Задача "${task}" добавлена в Local Storage.`);
}

// Функция для добавления задачи в Firebase
async function addTaskToFirebase(task: string): Promise<void> {
  const firebaseUrl: string =
    "https://your-firebase-app.firebaseio.com/tasks.json";

  try {
    const response: Response = await fetch(firebaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: task }),
    });

    if (response.ok) {
      console.log(`Задача "${task}" добавлена в Firebase.`);
    } else {
      console.error(
        "Ошибка при добавлении задачи в Firebase:",
        response.statusText
      );
    }
  } catch (error) {
    console.error("Ошибка при отправке задачи в Firebase:", error);
  }
}

class FirebaseTaskStorage implements TaskStorage {
  private db;

  constructor() {
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_APP.firebaseapp.com",
      databaseURL: "https://YOUR_APP.firebaseio.com",
      projectId: "YOUR_APP",
      storageBucket: "YOUR_APP.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID",
    };
    const app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
  }

  async createTask(task: Task): Promise<void> {
    const tasksRef = ref(this.db, "tasks/" + task.date);
    await set(tasksRef, task);
  }

  async readTasks(date: string): Promise<Task[]> {
    const tasksRef = ref(this.db, "tasks/" + date);
    const snapshot = await get(tasksRef);
    return snapshot.exists() ? [snapshot.val()] : [];
  }

  async updateTask(index: number, updatedTask: Task): Promise<void> {
    const tasksRef = ref(this.db, "tasks/" + updatedTask.date);
    await set(tasksRef, updatedTask);
  }

  async deleteTask(index: number): Promise<void> {
    // Необходимо реализовать логику удаления задачи по индексу
  }

  async filterTasks(criteria: string): Promise<Task[]> {
    // Реализовать логику фильтрации с использованием Firebase
    return [];
  }
}
 */
const emptyCells: HTMLElement | null = document.getElementById("dates");
const popup: HTMLElement | null = document.querySelector(".popup");
const currentTaskContainer: HTMLElement | null =
  document.querySelector(".box-task");
const currentButton: HTMLElement | null = document.querySelector(".box-btn");
const overlay: HTMLElement | null = document.getElementById("overlay");

const currentDates: Date = new Date();
const monthYear: HTMLElement | null = document.getElementById("monthYear");

const btnNextMonth: HTMLElement | null = document.getElementById("nextMonth");
const btnPrevMonth: HTMLElement | null = document.getElementById("prevMonth");

const inputHeading: HTMLInputElement | null =
  document.querySelector(".task-title");
const inputDescription: HTMLTextAreaElement | null = document.getElementById(
  "task-description",
) as HTMLTextAreaElement;
let selectedDate: string | null = null;
let editingTaskIndex: number | null = null;
const tasks: Task[] = JSON.parse(localStorage.getItem("taskLocal") || "[]");

const saveTaskBtn: HTMLElement | null =
  document.getElementById("save-task-btn");

function updateTask(): void {
  if (!currentTaskContainer || !currentButton) return;

  currentTaskContainer.innerHTML = "";
  currentButton.innerHTML = "";
  if (inputHeading && inputDescription) {
    inputHeading.value = "";
    inputDescription.value = "";
  }

  const filteredTasks: Task[] = tasks.filter(
    (task) => task.date === selectedDate,
  );

  filteredTasks.forEach((task) => {
    const divDay: HTMLDivElement = document.createElement("div");
    divDay.className = "added-task";
    divDay.textContent = `${task.title}: ${task.description}`;
    currentTaskContainer.appendChild(divDay);

    const divDayB: HTMLButtonElement = document.createElement("button");
    divDayB.textContent = "Удалить";
    divDayB.addEventListener("click", () => {
      deleteTask(tasks.indexOf(task)); // Удаляем задачу по индексу
    });
    currentButton.appendChild(divDayB);

    const divDayR: HTMLButtonElement = document.createElement("button");
    divDayR.textContent = "Редактировать";
    divDayR.addEventListener("click", () => {
      editingTaskIndex = tasks.indexOf(task); // Сохраняем индекс редактируемой задачи
      if (inputHeading && inputDescription) {
        inputHeading.value = task.title;
        inputDescription.value = task.description;
      }
    });
    currentButton.appendChild(divDayR);
  });
  //изменения
}

function renderCalendar(): void {
  if (!emptyCells || !monthYear) return;

  emptyCells.innerHTML = "";

  const month: number = currentDates.getMonth();
  const year: number = currentDates.getFullYear();
  const lastDayMonth: number = new Date(year, month + 1, 0).getDate();
  const firstDayIndex: number = new Date(year, month, 1).getDay();
  const weeks: number = (firstDayIndex + 6) % 7;

  monthYear.textContent = currentDates.toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });

  for (let i = 0; i < weeks; i++) {
    const divDay: HTMLDivElement = document.createElement("div");
    divDay.className = "days";
    emptyCells.appendChild(divDay);
  }

  for (let day = 1; day <= lastDayMonth; day++) {
    const divDay: HTMLDivElement = document.createElement("div");
    divDay.className = "days";
    divDay.textContent = day.toString();

    const dateKey: string = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayTasks: Task[] = tasks.filter((task) => task.date === dateKey);

    if (dayTasks.length > 0) {
      dayTasks.forEach((task) => {
        const taskIndicator: HTMLDivElement = document.createElement("div");
        taskIndicator.className = "task-indicator";
        taskIndicator.textContent = task.title; // Показываем только заголовок задачи
        divDay.appendChild(taskIndicator);
      });
    }

    emptyCells.appendChild(divDay);
    divDay.addEventListener("click", () => {
      if (overlay && popup) {
        overlay.classList.add("show");
        popup.classList.add("show");
        selectedDate = dateKey;
        updateTask();
      }
    });
  }
}

if (btnNextMonth) {
  btnNextMonth.addEventListener("click", () => {
    currentDates.setMonth(currentDates.getMonth() + 1);
    renderCalendar();
  });
}

if (btnPrevMonth) {
  btnPrevMonth.addEventListener("click", () => {
    currentDates.setMonth(currentDates.getMonth() - 1);
    renderCalendar();
  });
}

document.querySelector(".close-btn")?.addEventListener("click", () => {
  if (overlay && popup) {
    overlay.classList.remove("show");
    popup.classList.remove("show");
  }
});

if (saveTaskBtn) {
  saveTaskBtn.addEventListener("click", () => {
    const taskTitle: string = inputHeading ? inputHeading.value.trim() : "";
    const taskDescription: string = inputDescription
      ? inputDescription.value.trim()
      : "";

    if (taskTitle && selectedDate) {
      if (editingTaskIndex !== null) {
        // Проверяем, есть ли задача для редактирования
        tasks[editingTaskIndex].title = taskTitle; // Обновляем заголовок задачи по индексу
        tasks[editingTaskIndex].description = taskDescription; // Обновляем описание задачи по индексу
      } else {
        const existingTask = tasks.find((task) => task.date === selectedDate);
        if (existingTask) {
          alert("На эту дату задача уже добавлена");
          return;
        }
        const newTask: Task = {
          title: taskTitle,
          description: taskDescription,
          date: selectedDate,
        };
        tasks.push(newTask); // Добавляем новую задачу
      }

      localStorage.setItem("taskLocal", JSON.stringify(tasks)); // Сохраняем обновленный массив задач
      updateTask(); // Обновляем отображение задач

      if (inputHeading && inputDescription) {
        inputHeading.value = "";
        inputDescription.value = "";
      }
      editingTaskIndex = null; // Сбрасываем индекс редактирования
    } else {
      alert("Введите название задачи и выберите дату.");
    }
  });
}

function deleteTask(index: number): void {
  tasks.splice(index, 1); // Удаляем конкретную задачу по индексу
  localStorage.setItem("taskLocal", JSON.stringify(tasks)); // Сохраняем обновленный массив задач
  updateTask();
}

renderCalendar();
