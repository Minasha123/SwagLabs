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

    test('Fill buyer information to contiune the shopping',async ({page}) =>{
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click()

        await page.getByPlaceholder('First Name').fill('some name');
        await page.getByPlaceholder('Last Name').fill('some lastname');
        await page.getByPlaceholder('Zip/Postal Code').fill('some code');
        await page.getByRole('button', { name: 'Continue' }).click();

        const ProductDescription = page.locator('[data_test="cart-desc-label"]');
        await expect (ProductDescription).toBeVisible();
    });



});