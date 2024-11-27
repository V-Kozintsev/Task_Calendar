export interface Task {
    id?: string;
    title: string;
    description: string;
    date: string; // Формат: 'YYYY-MM-DD'
    status?: string; // Например, 'completed', 'pending'
    tags?: string[]; // Массив тегов
  }

  
export interface CalendarApi {
    getAll(): Promise<Task[]>;

    deleteTask(index: number): Promise<boolean>;

    addTask(task: Omit<Task, 'id'>): Promise<Task>;

    updateTask(selectedDate: string, taskUpdate: Partial<Task>): Promise<void>;

    getForDate(date: string) : Promise<Task[]>;
}

export class LSCalendarApi implements CalendarApi{
    async getAll() {
        const items = localStorage.getItem("taskLocal")
        return (items ? JSON.parse(items) : []) as Task[];
    }

    async addTask(task:  Omit<Task, 'id'>) {
        const items = await this.getAll();

        if (items.some(el => el.date === task.date)) {
            throw new Error(`Task for date ${task.date} already exists`);
        }

        const newTask = { ...task, id: Date.now().toString() };
        localStorage.setItem("taskLocal", JSON.stringify([...items, newTask]));
        return newTask;
    }

    async deleteTask(index: number): Promise<boolean> {
        const items = await this.getAll();
        items.splice(index, 1);
        localStorage.setItem('taskLocal', JSON.stringify(items));
        return true;
    }

    async getForDate(selectedDate: string) {
        const items = await this.getAll();
        return items.filter(
            (task) => task.date === selectedDate
          )
    }

    async updateTask(selectedDate: string, taskUpdate: Partial<Task>): Promise<void> {
        const items = await this.getAll();

        const updatedItems = items.map((el) => {
            if (el.date !== selectedDate) {
                return el;
            }

            return {
                ...el,
                ...taskUpdate
            }
        })

        localStorage.setItem('taskLocal', JSON.stringify(updatedItems));
    }
}