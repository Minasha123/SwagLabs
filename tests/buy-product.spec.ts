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

    test('Fill buyer information to view total price', async ({ page }) => {
        // Add item to cart
        await page.locator('.inventory_item')
            .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
            .getByRole('button', { name: 'Add to cart' }).click();
    
        // Navigate to cart and proceed to checkout
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();
    
        // Fill out buyer information
        await page.getByPlaceholder('First Name').fill('some name');
        await page.getByPlaceholder('Last Name').fill('some lastname');
        await page.getByPlaceholder('Zip/Postal Code').fill('some code');
        await page.getByRole('button', { name: 'Continue' }).click();
    
        // Wait for total price element to be visible
        const totalPrice = page.locator('.summary_total_label');
        await totalPrice.waitFor();
    
        // Verify total price text
        await expect(totalPrice).toContainText('Total:');
    });


    test('Order completed', async ({page}) => {
        // Add item to cart
        await page.locator('.inventory_item')
            .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
            .getByRole('button', { name: 'Add to cart' }).click();
        
        // Navigate to cart and proceed to checkout
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();
    
        // Fill out buyer information
        await page.getByPlaceholder('First Name').fill('some name');
        await page.getByPlaceholder('Last Name').fill('some lastname');
        await page.getByPlaceholder('Zip/Postal Code').fill('some code');
        await page.getByRole('button', { name: 'Continue' }).click();
    
        // Click on Finish button
        await page.getByRole('button', { name: 'Finish' }).click();
    
        // Verify order completion message
        const orderCompleted = page.locator('.complete-text');
        await expect(orderCompleted).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });

    test('Clicking "back Home" button to navigate to the home page', async ({page}) =>{
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click()

        await page.getByPlaceholder('First Name').fill('some name');
        await page.getByPlaceholder('Last Name').fill('some lastname');
        await page.getByPlaceholder('Zip/Postal Code').fill('some code');
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.getByRole('button',{name:'finish'}).click();
        await page.getByRole('button',{name:'Back Home'}).click();

        //Navigate to the home page to continue shopping 
        const backpack = page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' });
        await expect(backpack).toBeVisible();

    });

});