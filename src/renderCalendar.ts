const currentDate = new Date();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();
/* const firstDay = new Date(year, month, 1); */

const btnNext = document.querySelector(".next_month_btn");

export function renderCalendar() {
  const lastDay = new Date(year, month + 1, 0);
  const lastDate = lastDay.getDate();
  //отображаем месяц и год
  const monthRender: HTMLElement | null = document.getElementById("month");
  if (monthRender) {
    monthRender.textContent = currentDate.toLocaleDateString("ru-Ru", {
      month: "long",
      year: "numeric",
    });
  }
  const dayBox: Element | null = document.querySelector(
    ".container_calendar__box-day",
  );
  //цикл создает нужное колиство ячеек
  for (let cells = 1; cells <= lastDate; cells++) {
    const daysCells: HTMLDivElement = document.createElement("div");
    daysCells.className = "days";
    dayBox?.appendChild(daysCells);
    daysCells.textContent = cells.toString();
  }
  const dateN = new Date();
  let monthN = dateN.getMonth();
  const yearN = dateN.getFullYear();
  const dateNW = new Date(yearN, monthN, 1);

  btnNext?.addEventListener("click", (e) => {
    e.preventDefault();

    monthN += 1;
    console.log(dateNW);
  });
}
