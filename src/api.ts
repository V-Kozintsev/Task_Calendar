import { LSCalendarApi } from "./LSCalendarApi";

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  /* completed: boolean; */
}

export interface CalendarApi {
  getTasks(): Promise<Task[]>;
  saveTask(task: Task): Promise<void>;
  clearTasks(): Promise<void>;
}

export interface ICurrentDateHolder {
  year: number;
  month: number;
}

class CurrentDateHolder implements ICurrentDateHolder {
  month: number;
  year: number;

  constructor() {
    const currentDate = new Date();
    this.month = currentDate.getMonth();
    this.year = currentDate.getFullYear();
  }
}

// class FirebaseCalendarApi implements CalendarApi {
//     getTasks(): Promise<Task[]> {
//         return fetch('http/...').then(d => d.json())
//     }
// }


export const RunTask: CalendarApi = new LSCalendarApi();

export const currentDateHolder: ICurrentDateHolder = new CurrentDateHolder();

