import { LSCalendarApi } from "./LSCalendarApi";

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  /* completed: boolean; */
}

export interface CalendarApi {
  year: number;
  month: number;
  getTasks(): Promise<Task[]>;
  saveTask(task: Task): Promise<void>;
  clearTasks(): Promise<void>;
}

export const RunTask: CalendarApi = new LSCalendarApi();
