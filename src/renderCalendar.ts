const currentDate = new Date();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();

export function renderCalendar() {
  //цикл создает 35 ячеек с номерами
  for (let cells = 1; cells <= 35; ++cells) {
    const dayBox: Element | null = document.querySelector(
      ".container_calendar__box-day",
    );
    const daysCells: HTMLDivElement = document.createElement("div");
    daysCells.className = "days";
    dayBox?.appendChild(daysCells);
    daysCells.textContent = cells.toString();
  }
  const a = new Date(month, year);
  console.log(a);
}
