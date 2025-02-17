import { test, expect } from '@playwright/test';

test.describe('login flow', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        
        // Perform login before each test
        await page.getByPlaceholder('username').fill('standard_user');
        await page.getByPlaceholder('password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // Verify login is successful
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    test('add items to cart', async({ page }) => {
        await page.locator ("xpath=(//*[@class='inventory_item'])")
        .filter({hasText:'Sauce Labs Bolt T-Shirt'})
        .getByRole('button').click();
    
    //    // Locate the specific inventory item and click 'Add to cart'
    //     const item = page.locator('.inventory_item')
    //     .filter({ hasText: 'Sauce Labs Bolt T-Shirt' });
    //     await item.locator('button').click();

        // Verify the item is added by checking the cart badge
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1', { timeout: 5000 }); // Adding timeout for stability
    });

});