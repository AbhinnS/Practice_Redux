// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Todo App Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('should load app and show title', async ({ page }) => {
    await expect(page.getByText('Task Manager')).toBeVisible();
  });

  test('should add a new todo', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new task...');
    const button = page.getByRole('button', { name: 'Add' });

    await input.fill('Learn Redux');
    await button.click();

    await expect(page.getByText('Learn Redux')).toBeVisible();
  });

  test('should toggle todo (mark as completed)', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new task...');
    const button = page.getByRole('button', { name: 'Add' });

    await input.fill('Toggle Task');
    await button.click();

    const todo = page.getByText('Toggle Task');

    await todo.click();

    // Check line-through style (completed)
    await expect(todo).toHaveCSS('text-decoration-line', 'line-through');
  });

  test('should delete a todo', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new task...');
    const button = page.getByRole('button', { name: 'Add' });

    await input.fill('Delete Me');
    await button.click();

    const todo = page.getByText('Delete Me');
    await expect(todo).toBeVisible();

    const deleteBtn = page.getByRole('button', { name: '✕' }).last();
    await deleteBtn.click();

    await expect(todo).not.toBeVisible();
  });


});