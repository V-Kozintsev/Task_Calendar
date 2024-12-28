export interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: "pending" | "complited";
  tags: string[];
}

export interface StoringTasks {
  create(task: Task): Promise<void>;
  read(id: string): Promise<Task | null>;
  update(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
  filter(criteria: FilterCriteria): Promise<Task[]>;
}

export interface FilterCriteria {
  title?: string;
  status?: "pending" | "completed";
  tags?: string[];
  dateRange?: {
    start?: Date;
    end?: Date;
  };
}
