const { test, expect } = require('@playwright/test');

test.describe('TodoMVC Basics - Task 1', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('Exercise 1: Add one todo and verify it is visible and the count is 1', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.getByTestId('todo-item');
    const todoCount = page.getByTestId('todo-count');

    await todoInput.fill('Buy groceries');
    await todoInput.press('Enter');

    await expect(todoItems.filter({ hasText: 'Buy groceries' })).toBeVisible();
    await expect(todoItems).toHaveText(['Buy groceries']);
    await expect(todoCount).toHaveText('1 item left');
  });

  test('Exercise 2: Add three todos and verify the count and their text', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.getByTestId('todo-item');
    const todoCount = page.getByTestId('todo-count');

    const todosToAdd = [
      'Buy groceries',
      'Pay electric bill',
      'Book doctor appointment',
    ];

    for (const item of todosToAdd) {
      await todoInput.fill(item);
      await todoInput.press('Enter');
    }

    await expect(todoItems).toHaveCount(3);
    await expect(todoItems).toHaveText(todosToAdd);
    await expect(todoCount).toHaveText('3 items left');
  });

  test('Exercise 3: Complete one todo and verify its checkbox and completed state', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.getByTestId('todo-item');
    const todoCount = page.getByTestId('todo-count');

    await todoInput.fill('Buy groceries');
    await todoInput.press('Enter');
    await todoInput.fill('Walk the dog');
    await todoInput.press('Enter');

    const firstTodo = todoItems.filter({ hasText: 'Buy groceries' });
    const checkbox = firstTodo.getByRole('checkbox');

    await expect(checkbox).not.toBeChecked();

    await checkbox.check();

    await expect(checkbox).toBeChecked();
    await expect(firstTodo).toHaveClass(/completed/);
    await expect(todoCount).toHaveText('1 item left');
  });

  test('Exercise 4: Test the Active and Completed filters', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.getByTestId('todo-item');

    await todoInput.fill('Active task');
    await todoInput.press('Enter');
    await todoInput.fill('Completed task');
    await todoInput.press('Enter');

    const completedItem = todoItems.filter({ hasText: 'Completed task' });
    await completedItem.getByRole('checkbox').check();

    await page.getByRole('link', { name: 'Active' }).click();

    await expect(todoItems).toHaveCount(1);
    await expect(todoItems).toHaveText(['Active task']);

    await page.getByRole('link', { name: 'Completed' }).click();

    await expect(todoItems).toHaveCount(1);
    await expect(todoItems).toHaveText(['Completed task']);

    await page.getByRole('link', { name: 'All' }).click();

    await expect(todoItems).toHaveCount(2);
    await expect(todoItems).toHaveText(['Active task', 'Completed task']);
  });

  test('Exercise 5: Delete a todo and verify the count decreases', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todoItems = page.getByTestId('todo-item');
    const todoCount = page.getByTestId('todo-count');

    await todoInput.fill('Task 1 to keep');
    await todoInput.press('Enter');
    await todoInput.fill('Task 2 to delete');
    await todoInput.press('Enter');

    await expect(todoItems).toHaveCount(2);
    await expect(todoCount).toHaveText('2 items left');

    const itemToDelete = todoItems.filter({ hasText: 'Task 2 to delete' });
    await itemToDelete.hover();

    await itemToDelete.getByRole('button', { name: 'Delete' }).click();

    await expect(todoItems).toHaveCount(1);
    await expect(todoItems).toHaveText(['Task 1 to keep']);
    await expect(todoCount).toHaveText('1 item left');
  });
});
