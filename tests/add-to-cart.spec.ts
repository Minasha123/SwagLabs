import { test, expect } from '@playwright/test';
import { login } from './functions/login-function';

test.describe('login flow', () => {

    test.beforeEach(async ({ page }) => {
    await login(page);

        // Verify login is successful
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    // Locate the specific inventory item and click 'Add to cart'
    test('add items to cart', async({ page }) => {
        await page.locator ("xpath=(//*[@class='inventory_item'])")
        .filter({hasText:'Sauce Labs Bolt T-Shirt'})
        .getByRole('button').click();

        // Verify the item is added by checking the cart badge
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1', { timeout: 5000 }); // Adding timeout for stability
    });

    test('Remove a product from the cart', async ({ page }) => {
        // Add "Sauce Labs Bolt T-Shirt" to cart
        await page.locator('.inventory_item')
            .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
            .getByRole('button', { name: 'Add to cart' }).click();

        // Navigate to the cart
        await page.locator('.shopping_cart_link').click();

        // Click Remove button
        await page.getByRole('button', { name: 'Remove' }).click();

        // Assert that the item is removed from the cart
        const removedItem = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bolt T-Shirt' });
        await expect(removedItem).toHaveCount(0);
    });

    test('Clicking "Continue Shopping" navigates to the product page', async ({page}) => {
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
        
        // Navigate to the cart
        await page.locator('.shopping_cart_link').click();

        // Click the "Continue Shopping" button
        await page.locator('[data-test="continue-shopping"]').click();

        // Verify that the user is redirected to the product page
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        // Verify that the product list is visible
        const productList = page.locator('.inventory_item');
        await expect(page.locator('.inventory_list')).toBeVisible();
    });


});


