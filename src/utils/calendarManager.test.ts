import { CalendarManager } from "../components/localStorageManager"; // Убедитесь, что путь правильный

describe("CalendarManager", () => {
  let calendarManager: CalendarManager;

  beforeEach(() => {
    // Очистка localStorage перед каждым тестом
    localStorage.clear();
    calendarManager = new CalendarManager();
  });

  test("should create a task", async () => {
    const title = "Test Task";
    const description = "This is a test task";
    const date = "2023-12-31";
    const tags = "test, sample";

    await calendarManager.createTask(title, description, date, tags);

    const tasks = await calendarManager.showTask();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe(title);
    expect(tasks[0].description).toBe(description);
    expect(tasks[0].date).toBe(date);
    expect(tasks[0].tags).toBe(tags);
  });

  test("should read a task", async () => {
    const title = "Sample Task";
    const description = "Sample task description";
    const date = "2023-12-31";

    await calendarManager.createTask(title, description, date);
    const task = await calendarManager.readTask(title);
    expect(task).toBeTruthy();
    expect(task?.title).toBe(title);
  });

  test("should update a task", async () => {
    const title = "Original Title";
    const newTitle = "Updated Title";
    const description = "Original description";

    await calendarManager.createTask(title, description, "2023-12-31");
    await calendarManager.updateTask(title, newTitle, "New description");

    const updatedTask = await calendarManager.readTask(newTitle);
    expect(updatedTask).toBeTruthy();
    expect(updatedTask?.title).toBe(newTitle);
    expect(updatedTask?.description).toBe("New description");
  });

  test("should delete a task", async () => {
    const title = "Task to be deleted";
    await calendarManager.createTask(title, "Some description", "2023-12-31");

    await calendarManager.deleteTask(title);
    const task = await calendarManager.readTask(title);
    expect(task).toBeNull();
  });

  test("should list all tasks", async () => {
    await calendarManager.createTask("Task 1", "Description 1", "2023-12-31");
    await calendarManager.createTask("Task 2", "Description 2", "2023-12-31");

    const tasks = await calendarManager.listTasks();
    expect(tasks.length).toBe(2);
  });

  test("should filter tasks by title", async () => {
    await calendarManager.createTask(
      "Alpha Task",
      "Task description",
      "2023-12-31",
    );
    await calendarManager.createTask(
      "Beta Task",
      "Task description",
      "2023-12-31",
    );

    const filteredTasks = await calendarManager.filterTasks(
      "Alpha Task",
      "",
      "",
      "",
    );
    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].title).toBe("Alpha Task");
  });

  // Вы можете добавить больше тестов для фильтрации по тегам и датам

  test("should return empty array for non-existing task", async () => {
    const task = await calendarManager.readTask("Non-existing Task");
    expect(task).toBeNull();
  });

  afterAll(() => {
    localStorage.clear(); // Очищаем localStorage после всех тестов
  });
});
