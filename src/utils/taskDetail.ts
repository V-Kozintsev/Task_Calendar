// taskDetail.ts
export function openTaskDetailPopup(task: {
  title: string;
  description: string;
}) {
  const taskPopupDetail = document.getElementById(
    "task-popupDetail",
  ) as HTMLDivElement;
  const titleInput = document.getElementById("edit-title") as HTMLInputElement;
  const descriptionInput = document.getElementById(
    "edit-description",
  ) as HTMLTextAreaElement;

  titleInput.value = task.title; // Заполняем заголовок
  descriptionInput.value = task.description; // Заполняем описание

  // Показываем попап
  taskPopupDetail.style.display = "block";
}
