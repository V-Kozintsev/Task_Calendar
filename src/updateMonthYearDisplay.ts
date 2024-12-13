import { currentDateHolder } from "./api";
import { currentMonth } from "./index";

export async function updateMonthYearDisplay() {
  const renderMonthYear = new Date(currentDateHolder.year, currentDateHolder.month);
  currentMonth.textContent = renderMonthYear.toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });
}
