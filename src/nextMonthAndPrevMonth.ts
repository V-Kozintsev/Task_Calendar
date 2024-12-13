import { currentDateHolder, RunTask } from "./api";
import { renderCalendar } from "./index";

export function nextMonth() {
  document.getElementById("nextBtn")?.addEventListener("click", () => {
    currentDateHolder.month++;
    if (currentDateHolder.month > 11) {
      currentDateHolder.month = 0;
      currentDateHolder.year++;
    }
    renderCalendar();
  });
}

export function prevMonth() {
  document.getElementById("prevBtn")?.addEventListener("click", () => {
    currentDateHolder.month--;
    if (currentDateHolder.month < 0) {
      currentDateHolder.month = 11;
      currentDateHolder.year--;
    }
    renderCalendar();
  });
}
