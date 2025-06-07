import { test, expect } from '@playwright/test';

test.describe('Login flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should redirect to /rates after successful login', async ({ page }) => {
    await expect(page).toHaveURL(/.*\/login/);

    await page.fill('[data-testid="username-input"]', 'demo');
    await page.fill('[data-testid="password-input"]', 'demo');
    await page.click('[data-testid="login-button"]');

    await page.waitForURL(/.*\/rates/);
    await expect(page.locator('[data-testid="header"]')).toHaveText('Rates');
  });

  test('should display error on invalid credentials', async ({ page }) => {
    await expect(page).toHaveURL(/.*\/login/);

    await page.fill('[data-testid="username-input"]', 'wrong');
    await page.fill('[data-testid="password-input"]', 'wrong');
    await page.click('[data-testid="login-button"]');

    await expect(page.locator('text=Incorrect username or password')).toBeVisible();
  });
});
