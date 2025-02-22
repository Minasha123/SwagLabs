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

    test('Clicking drop-down to select "Name Z to A" should display "Test.allTheThings() T-Shirt (Red)" first', async ({ page }) => {
        // Click sorting dropdown and select "Name (Z to A)"
        await page.click('[data-test="product-sort-container"]');
        //await page.getByRole('option',{ name: 'Name (Z to A)' }).click();
        await page.selectOption('[data-test="product-sort-container"]', { label: 'Name (Z to A)' });

        // Ensure "Test.allTheThings() T-Shirt (Red)" is the first item in the list
        const firstItem = page.locator('.inventory_item_name').first();
        await expect(firstItem).toHaveText('Test.allTheThings() T-Shirt (Red)');
    });

    test('Clicking drop-down to select "Price (low to high)" should display "Sauce Labs Onesie', async ({ page }) => {
        // Click sorting dropdown and select "Price (low to high)"
        await page.click('[data-test="product-sort-container"]');
        //await page.getByRole('option',{ name: 'Price (low to high)' }).click();
        await page.selectOption('[data-test="product-sort-container"]', { label: 'Price (low to high)' });

        // Ensure "Sauce Labs Onesie" is the first item in the list
        const firstItem = page.locator('.inventory_item_name').first();
        await expect(firstItem).toHaveText('Sauce Labs Onesie');
    });

    test('Clicking drop-down to select "Price (high to low)" should display "Sauce Labs Fleece Jacket" first', async ({ page }) => {
        // Click sorting dropdown and select "Price (high to low)"
        await page.click('[data-test="product-sort-container"]');
        //await page.getByRole('option',{ name: 'Price (high to low)' }).click();
        await page.selectOption('[data-test="product-sort-container"]', { label: 'Price (high to low)' });

        // Ensure "Sauce Labs Fleece Jacket" is the first item in the list
        const firstItem = page.locator('.inventory_item_name').first();
        await expect(firstItem).toHaveText('Sauce Labs Fleece Jacket');
    });






    








});
