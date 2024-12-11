import { RunTask } from "./api";
import { currentMonth } from "./index";

export function updateMonthYearDisplay() {
  const renderMonthYear = new Date(RunTask.year, RunTask.month);
  currentMonth.textContent = renderMonthYear.toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });
}
