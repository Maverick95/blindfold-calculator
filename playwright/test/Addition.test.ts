import { test, expect } from '@playwright/test';

test('first Playwright test', async({page}) => {

  await page.goto('/');
  await expect(page).toHaveTitle('Blindfold Calculator');

});