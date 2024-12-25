import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

const MyFullCalendar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr); // Сохраняем выбранную дату
    setIsOpen(true); // Открываем модальное окно
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Обработка отправки формы
    console.log("Форма отправлена для даты: ", selectedDate);
    closeModal(); // Закрываем модальное окно после отправки
  };

  return (
    <div>
      <h1>Календарь задач</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={"ru"}
        firstDay={1}
        height={"90vh"}
        events={[
          { title: "Событие 1", date: "2024-04-01" },
          { title: "Событие 2", date: "2024-04-05" },
        ]}
        dateClick={handleDateClick}
      />

      {/* Модальное окно */}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2>Добавить задачу</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Заголовок:
                <input type="text" required />
              </label>
              <label>
                Описание:
                <textarea required></textarea>
              </label>
              <button type="submit">Сохранить</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFullCalendar;
