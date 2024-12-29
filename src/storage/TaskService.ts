import { db } from "./firebaseConfig"; // Импортируем db
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Task } from "../interfaces/ITaskStorage";

const tasksCollection = collection(db, "tasks");

const TaskService = {
  create: async (task: Task) => {
    try {
      const docRef = await addDoc(tasksCollection, { ...task });
      return docRef.id; // Возвращаем ID созданного документа
    } catch (error) {
      console.error("Error creating task: ", error);
      throw new Error("Failed to create task");
    }
  },

  filter: async () => {
    try {
      const taskSnapshot = await getDocs(tasksCollection);
      return taskSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      throw new Error("Failed to fetch tasks");
    }
  },

  update: async (task: Task) => {
    try {
      const taskDoc = doc(db, "tasks", task.id);
      await updateDoc(taskDoc, { ...task });
    } catch (error) {
      console.error("Error updating task: ", error);
      throw new Error("Failed to update task");
    }
  },

  delete: async (id: string) => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await deleteDoc(taskDoc);
    } catch (error) {
      console.error("Error deleting task: ", error);
      throw new Error("Failed to delete task");
    }
  },
};

export default TaskService;
