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

    test('Clicking "Checkout" button to place the order', async ({page}) =>{
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
        
        // Navigate to the cart
        await page.locator('.shopping_cart_link').click();

        // Click checkout button
        await page.locator('[data-test="checkout"]').click();

        // Verfiy that the user is navigate to the your infromation page
        await expect (page.locator('Checkout: Your Information')).toBeVisible();
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

        //verify that the user navigate to the checkout overview page 

        const CheckoutOverview = page.locator('[data_test="Checkout: Overview"]');
        await expect (CheckoutOverview).toBeVisible();
    });

    test('Without filling buyer information try to click contiune button', async({page}) =>{
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click()

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
        await page.locator('[data-test="checkout"]').click()

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
        await page.locator('[data-test="checkout"]').click()

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
        await page.locator('[data-test="checkout"]').click()

        await page.getByPlaceholder('First Name').fill('some fristname');
        await page.getByPlaceholder('Last Name').fill('some lastname');
        await page.getByPlaceholder('Zip/Postal Code').fill('');
        await page.getByRole('button', { name: 'Continue' }).click();

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('Postal Code is required'); 
    });
});
