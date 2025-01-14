// firebaseManager.ts
import { Task, ICalendarManager } from "./interface";
import { app } from "./firebaseConfig"; // Импортируем начальную конфигурацию Firebase
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  writeBatch, // Импортируем writeBatch
} from "firebase/firestore";

const db = getFirestore(app);

export class FirebaseManager implements ICalendarManager {
  private taskCollection: string = "tasks";

  constructor() {
    // Инициализация экземпляра
  }

  async createTask(
    title: string,
    description: string,
    date: string,
    tags?: string,
    status: "pending" | "completed" = "pending",
  ): Promise<void> {
    const createdDate = new Date().toLocaleDateString();
    const task: Task = {
      title,
      description,
      date,
      createdDate,
      tags: tags || "",
      status,
    };

    try {
      // Сохраняем задачу в Firestore
      await addDoc(collection(db, this.taskCollection), task);
      console.log("Задача успешно сохранена");
    } catch (error) {
      console.error("Ошибка при сохранении задачи:", error);
    }
  }

  async readTask(title: string): Promise<Task | null> {
    const tasks = await getDocs(collection(db, this.taskCollection));
    const task = tasks.docs.find((doc) => doc.data().title === title);
    return task ? ({ ...task.data(), id: task.id } as Task) : null; // Явное приведение типа
  }

  async updateTask(
    oldTitle: string,
    newTitle: string,
    newDescription: string,
    newDate?: string,
    newTags?: string,
    newStatus?: "pending" | "completed",
  ): Promise<void> {
    const tasks = await getDocs(collection(db, this.taskCollection));
    const taskDoc = tasks.docs.find((doc) => doc.data().title === oldTitle);
    if (taskDoc) {
      const taskRef = doc(db, this.taskCollection, taskDoc.id);
      await updateDoc(taskRef, {
        title: newTitle,
        description: newDescription,
        date: newDate,
        tags: newTags,
        status: newStatus,
      });
    }
  }

  async deleteTask(title: string): Promise<void> {
    const tasks = await getDocs(collection(db, this.taskCollection));
    const taskDoc = tasks.docs.find((doc) => doc.data().title === title);
    if (taskDoc) {
      await deleteDoc(doc(db, this.taskCollection, taskDoc.id));
    }
  }

  async deleteAllTasks(): Promise<void> {
    const tasks = await getDocs(collection(db, this.taskCollection));
    const batch = writeBatch(db); // Правильная инициализация batch
    tasks.docs.forEach((taskDoc) => {
      batch.delete(taskDoc.ref);
    });
    await batch.commit();
  }

  async listTasks(): Promise<Task[]> {
    const tasksSnapshot = await getDocs(collection(db, this.taskCollection));
    return tasksSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id, // теперь id также будет возвращен
    })) as Task[];
  }

  async filterTasks(
    titleFilter?: string,
    tagsFilter?: string,
    startDateFilter?: string,
    endDateFilter?: string,
    statusFilter?: "pending" | "completed",
  ): Promise<Task[]> {
    const tasks = await this.listTasks();
    return tasks.filter((task) => {
      const matchesTitle = titleFilter
        ? task.title.includes(titleFilter)
        : true;
      const matchesTags = tagsFilter
        ? task.tags && task.tags.includes(tagsFilter)
        : true;
      const matchesDate =
        (!startDateFilter ||
          new Date(task.date) >= new Date(startDateFilter)) &&
        (!endDateFilter || new Date(task.date) <= new Date(endDateFilter));
      const matchesStatus = statusFilter ? task.status === statusFilter : true;
      return matchesTitle && matchesTags && matchesDate && matchesStatus;
    });
  }

  async showTask(): Promise<Task[]> {
    return await this.listTasks();
  }

  async editTask(oldTitle: string, newTitle: string, newDescription: string) {
    await this.updateTask(oldTitle, newTitle, newDescription);
  }
}
