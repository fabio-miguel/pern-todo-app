const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("PERN Todo App", () => {
  test("should add a todo", async ({ page }) => {
    await page.fill("#todoInput", "Test Todo");
    await page.pause();
    await page.click("#addTodoBtn");
    await expect(page.getByTestId("todo-description")).toHaveText("Test Todo", {
      timeout: 5000,
    });
  });

  test("should edit a todo", async ({ page }) => {
    await page.pause();
    await page.click("#editBtn");
    await page.fill(".modal-body input", "Updated Test Todo");
    await page.click("#editDoneBtn");
    await expect(page.getByTestId("todo-description")).toHaveText(
      "Updated Test Todo"
    );
  });
});
