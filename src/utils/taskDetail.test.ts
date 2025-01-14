// taskDetail.test.ts
import { openTaskDetailPopup } from "./taskDetail";

describe("openTaskDetailPopup", () => {
  beforeEach(() => {
    // Устанавливаем HTML перед выполнением каждого теста
    document.body.innerHTML = `
            <div id="task-popupDetail" style="display:none;">
                <input id="edit-title" />
                <textarea id="edit-description"></textarea>
            </div>
        `;
  });

  it("should populate the task details in the popup and show it", () => {
    const task = {
      title: "Test Task",
      description: "This is a test task description",
    };

    openTaskDetailPopup(task);

    // Проверяем, что заголовок и описание были заполнены правильно
    expect(
      (document.getElementById("edit-title") as HTMLInputElement).value,
    ).toBe(task.title);
    expect(
      (document.getElementById("edit-description") as HTMLTextAreaElement)
        .value,
    ).toBe(task.description);

    // Проверяем, что попап стал видимым
    const taskPopupDetail = document.getElementById(
      "task-popupDetail",
    ) as HTMLDivElement;
    expect(taskPopupDetail.style.display).toBe("block");
  });
});
