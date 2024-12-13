import { RunTask } from "./api";
import { renderCalendar } from "./index";

export function nextMonth() {
  document.getElementById("nextBtn")?.addEventListener("click", () => {
    RunTask.month++;
    if (RunTask.month > 11) {
      RunTask.month = 0;
      RunTask.year++;
    }
    renderCalendar();
  });
}

export function prevMonth() {
  document.getElementById("prevBtn")?.addEventListener("click", () => {
    RunTask.month--;
    if (RunTask.month < 0) {
      RunTask.month = 11;
      RunTask.year--;
    }
    renderCalendar();
  });
}
