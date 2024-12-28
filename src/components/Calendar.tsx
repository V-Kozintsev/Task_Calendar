// components/Calendar.tsx
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Task } from "../interfaces/ITaskStorage";
import storage from "../storage/LocalStorageTaskStorage";
import Fuse from "fuse.js";

export const MyFullCalendar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [titleInput, setTitle] = useState("");
  const [descriptionInput, setDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(true);
  const [isTaskListModalOpen, setIsTaskListModalOpen] = useState(false);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>(
    undefined
  );
  const [filterDateRange, setFilterDateRange] = useState<{
    start?: Date;
    end?: Date;
  }>({});

  useEffect(() => {
    const loadTasks = async () => {
      const initialTasks = await storage.filter({});
      setTasks(initialTasks);
    };
    loadTasks();
  }, []);

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
    setIsOpen(true);
    setIsAddingTask(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setIsTaskModalOpen(true);
    setIsAddingTask(false);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedTask) {
      const newStatus = event.target.value as "В ожидании" | "Завершено"; // Приведение типа
      setSelectedTask({ ...selectedTask, status: newStatus });
    }
  };

  const saveData = async (newTask: Task) => {
    await storage.create(newTask);
    const updatedTasks = await storage.filter({});
    setTasks(updatedTasks);
  };

  const updateTask = async (updatedTask: Task) => {
    await storage.update(updatedTask);
    const updatedTasks = await storage.filter({});
    setTasks(updatedTasks);
  };

  const deleteTask = async (id: string) => {
    const confirmed = window.confirm(
      "Вы уверены, что хотите удалить эту задачу?"
    );
    if (confirmed) {
      await storage.delete(id);
      const updatedTasks = await storage.filter({});
      setTasks(updatedTasks);
      setSelectedTask(null);
      alert("Задача успешно удалена.");
      closeTaskModal();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setTitle("");
    setDescription("");
    setSelectedTask(null);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
    setTitle("");
    setDescription("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newTask: Task = {
      id: Date.now().toString(),
      title: titleInput,
      description: descriptionInput,
      date: new Date(selectedDate),
      status: "В ожидании",
    };
    await saveData(newTask);
    closeModal();
  };

  const handleUpdateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedTask) {
      const updatedTask: Task = {
        ...selectedTask,
        title: titleInput,
        description: descriptionInput,
        date: selectedTask.date,
      };
      await updateTask(updatedTask);
      closeTaskModal();
    }
  };

  const openTaskListModal = () => {
    setIsTaskListModalOpen(true);
  };

  const closeTaskListModal = () => {
    setIsTaskListModalOpen(false);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTitle(event.target.value);
  };

  const handleStatusFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterStatus(event.target.value || undefined);
  };

  const handleDateRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "start" | "end"
  ) => {
    setFilterDateRange({
      ...filterDateRange,
      [type]: event.target.value ? new Date(event.target.value) : undefined,
    });
  };
  const fuse = new Fuse(tasks, {
    keys: ["title", "description"], // Поля для поиска
    threshold: 0.4, // Меньшее значение для более строгого поиска
  });
  const filteredTasks = fuse
    .search(filterTitle)
    .map((result) => result.item)
    .filter((task) => {
      const statusMatches = filterStatus ? task.status === filterStatus : true;
      const dateMatches =
        filterDateRange.start || filterDateRange.end
          ? (!filterDateRange.start || task.date >= filterDateRange.start) &&
            (!filterDateRange.end || task.date <= filterDateRange.end)
          : true;

      return statusMatches && dateMatches;
    });

  return (
    <div>
      <h1>Календарь задач</h1>
      <button onClick={openTaskListModal} className="btnShowTasks">
        Показать все задачи
      </button>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={"ru"}
        firstDay={1}
        height={"90vh"}
        events={tasks.map((task) => ({
          id: task.id,
          title: task.title,
          date: task.date.toISOString().split("T")[0],
          allDay: true,
        }))}
        dateClick={handleDateClick}
        eventClick={(info) => {
          const clickedTask = tasks.find((task) => task.id === info.event.id);
          if (clickedTask) {
            handleTaskClick(clickedTask);
          }
        }}
      />
      {isTaskListModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeTaskListModal}>
              &times;
            </span>
            <h2>Список задач</h2>
            <div className="filter-container">
              <h3>Фильтрация задач</h3>
              <input
                type="text"
                placeholder="По заголовку"
                value={filterTitle}
                onChange={handleFilterChange}
              />
              <select value={filterStatus} onChange={handleStatusFilterChange}>
                <option value="">Все статусы</option>
                <option value="В ожидании">В ожидании</option>
                <option value="Завершено">Завершены</option>
              </select>
              <label>
                Начало:
                <input
                  type="date"
                  onChange={(event) => handleDateRangeChange(event, "start")}
                />
              </label>
              <label>
                Конец:
                <input
                  type="date"
                  onChange={(event) => handleDateRangeChange(event, "end")}
                />
              </label>
            </div>
            <ul className="task-list">
              {filteredTasks.map((task) => (
                <li key={task.id} className={`task-card ${task.status}`}>
                  <div className="task-card-content">
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <p className="task-meta">
                      <span>Статус: {task.status}</span>
                      <span>Дата: {task.date.toLocaleDateString()}</span>
                    </p>
                  </div>
                  <button
                    className="btnDelete"
                    type="button"
                    onClick={() => deleteTask(task.id)}
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
            <button className="btnClose" onClick={closeTaskListModal}>
              Закрыть
            </button>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2>{isAddingTask ? "Добавить задачу" : "Редактировать задачу"}</h2>
            <form onSubmit={isAddingTask ? handleSubmit : handleUpdateSubmit}>
              <label>
                Заголовок:
                <input
                  value={titleInput}
                  onChange={handleTitle}
                  className="titleInput"
                  type="text"
                  required
                />
              </label>
              <label>
                Описание:
                <textarea
                  value={descriptionInput}
                  onChange={handleDescription}
                  className="descriptionInput"
                ></textarea>
              </label>
              {isAddingTask ? null : (
                <label>
                  Статус:
                  <select
                    onChange={handleStatusChange}
                    value={selectedTask?.status || "В ожидании"}
                  >
                    <option value="В ожидании">В ожидании</option>
                    <option value="Завершено">Завершено</option>
                  </select>
                </label>
              )}
              <button className="btnSave" type="submit">
                {isAddingTask ? "Сохранить" : "Обновить"}
              </button>
              {isAddingTask && (
                <button
                  className="btnCancel"
                  type="button"
                  onClick={closeModal}
                >
                  Отмена
                </button>
              )}
            </form>
          </div>
        </div>
      )}
      {isTaskModalOpen && selectedTask && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeTaskModal}>
              &times;
            </span>
            <h2>Редактировать задачу</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>
                Заголовок:
                <input
                  value={titleInput}
                  onChange={handleTitle}
                  className="titleInput"
                  type="text"
                  required
                />
              </label>
              <label>
                Описание:
                <textarea
                  value={descriptionInput}
                  onChange={handleDescription}
                  className="descriptionInput"
                ></textarea>
              </label>
              <label>
                Статус:
                <select
                  onChange={handleStatusChange}
                  value={selectedTask.status}
                >
                  <option value="В ожидании">В ожидании</option>
                  <option value="Завершено">Завершено</option>
                </select>
              </label>
              <button className="btnSave" type="submit">
                Редактировать
              </button>
              <button
                className="btnDelete"
                type="button"
                onClick={() => deleteTask(selectedTask.id)}
              >
                Удалить
              </button>
            </form>
            <p>
              <strong>Дата:</strong> {selectedTask.date.toLocaleDateString()}
            </p>
            <p>
              <strong>Статус:</strong> {selectedTask.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFullCalendar;
