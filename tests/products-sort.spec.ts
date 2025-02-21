import { test, expect } from '@playwright/test';
import { login } from './functions/login-function';

test.describe('login flow', () => {

    test.beforeEach(async ({ page }) => {
        await login(page);

        await expect(page.locator('.inventory_list')).toBeVisible();

    });

    test('Clicking drop-down to select "Name A to Z" should display "Sauce Labs Backpack" first', async ({ page }) => {
        // Click sorting dropdown and select "Name (A to Z)"
        await page.click('[data-test="product-sort-container"]');
        //await page.getByRole('option',{ name: 'Name (A to Z)' }).click();
        await page.selectOption('[data-test="product-sort-container"]', { label: 'Name (A to Z)' });

        // Ensure "Sauce Labs Backpack" is the first item in the list
        const firstItem = page.locator('.inventory_item_name').first();
        await expect(firstItem).toHaveText('Sauce Labs Backpack');
    });




    








});
