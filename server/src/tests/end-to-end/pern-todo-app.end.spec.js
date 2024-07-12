const { test, expect } = require("@playwright/test");
const { playwrightResetDb } = require("../../../playwrightTestUtils");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("PERN Todo App", () => {
  test("should add a todo", async ({ page }) => {
    await page.fill("#todoInput", "Todo1");
    await page.click("#addTodoBtn");
    await expect(page.getByText("Todo1")).toHaveText("Todo1", {
      timeout: 5000,
    });
  });

  test("should edit a todo", async ({ page }) => {
    await page.pause();
    await page.fill("#todoInput", "Test Todo2");
    await page.click("#addTodoBtn");

    await page.click("#editBtn-1");
    await page.fill(".modal-body input", "Updated Todo2");
    await page.click("#editDoneBtn");
    await expect(
      page.locator('[data-testid="todo-description"][data-todo-id="2"]')
    ).toHaveText("Updated Todo2");
  });

  test("should delete a todo", async ({ page }) => {
    await page.pause();
    await page.fill("#todoInput", "Todo to delete");
    await page.click("#addTodoBtn");

    await page.click("#deleteBtn-3");
    await expect(
      page.locator('[data-testid="todo-description"][data-todo-id="3"]')
    ).toHaveCount(0);
  });
});
