import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const MyFullCalendar: React.FC = () => {
  // Функция обработчик для клика по дате
  /*  const handleDateClick = (arg: { dateStr: string }) => {
    // Выводим в консоль дату, по которой кликнули
    console.log("Вы кликнули на дату: ", arg.dateStr);
  }; */

  return (
    <div>
      <h1>Календарь задач</h1>
      <FullCalendar
        plugins={[dayGridPlugin]} // Убедитесь, что используете нужные плагины
        initialView="dayGridMonth"
        locale={"ru"}
        firstDay={1}
        height={"90vh"}
        events={[
          { title: "Событие 1", date: "2024-04-01" },
          { title: "Событие 2", date: "2024-04-05" },
        ]}
        // Исправленный способ обработки кликов по дате
        /* dateClick={handleDateClick} // Теперь это должно работать */
      />
    </div>
  );
};

export default MyFullCalendar;
