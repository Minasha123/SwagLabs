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

    test('Fill buyer information',async ({page}) =>{
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();

        await page.getByPlaceholder('First Name').fill('some name');
        await page.getByPlaceholder('Last Name').fill('some lastname');
        await page.getByPlaceholder('Zip/Postal Code').fill('some code');
        await page.getByRole('button', { name: 'Continue' }).click();

        //verify that the user able to view summary information about buying items
        await expect (page.locator('.summary_info')).toBeVisible();
    });

    test('Without filling buyer information try to click contiune button', async({page}) =>{
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();

        await page.getByPlaceholder('First Name').fill('');
        await page.getByPlaceholder('Last Name').fill('');
        await page.getByPlaceholder('Zip/Postal Code').fill('');
        await page.getByRole('button', { name: 'Continue' }).click();

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('First Name is required'); 
    });

    test('Without filling buyer "Frist Name" try to click contiune button', async({page}) =>{
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();

        await page.getByPlaceholder('First Name').fill('');
        await page.getByPlaceholder('Last Name').fill('some name');
        await page.getByPlaceholder('Zip/Postal Code').fill('some code');
        await page.getByRole('button', { name: 'Continue' }).click();

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('First Name is required'); 
    });

    test('Without filling buyer "Last Name" try to click contiune button', async({page}) =>{
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();

        await page.getByPlaceholder('First Name').fill('some name');
        await page.getByPlaceholder('Last Name').fill('');
        await page.getByPlaceholder('Zip/Postal Code').fill('some code');
        await page.getByRole('button', { name: 'Continue' }).click();

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('Last Name is required'); 
    });

    test('Without filling buyer "Postal Code" try to click contiune button', async({page}) =>{
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();

        await page.getByPlaceholder('First Name').fill('some fristname');
        await page.getByPlaceholder('Last Name').fill('some lastname');
        await page.getByPlaceholder('Zip/Postal Code').fill('');
        await page.getByRole('button', { name: 'Continue' }).click();

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('Postal Code is required'); 
    });

      test('Clicking "Cancel" button to go back to the item cart',async ({page})=>{
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();
        await page.locator('[data-test="cancel"]').click();

        await expect (page.locator('.cart_item_label')).toBeVisible();
    });


});
