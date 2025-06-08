import { test, expect } from '@playwright/test';

test.describe('RatesPage flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="username-input"]', 'demo');
    await page.fill('[data-testid="password-input"]', 'demo');
    await page.click('[data-testid="login-button"]');
    await expect(page).toHaveURL(/.*\/rates/);
  });

  test('should paginate be visible', async ({ page }) => {
    await expect(page.locator('[data-testid="rates-list"]')).toBeVisible();
    await expect(page.locator('[data-testid="rates-list"] > div')).toHaveCount(10);
  });
});
