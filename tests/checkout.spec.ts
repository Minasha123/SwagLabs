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

     test('Clicking "Checkout" button to place process the order', async ({page}) =>{
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
        
        // Navigate to the cart
        await page.locator('.shopping_cart_link').click();

        // Click checkout button
        await page.locator('[data-test="checkout"]').click();

        // Verfiy that the buyer navigate to the fill personal information
        await expect (page.locator('Checkout: Your Information')).toBeVisible();
    });
    
    //clicking contiune shopping button to double check added or to remove item
    test('Clicking "Contiune Shopping" button to view cartlist',async ({page}) =>{
        await page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart' }).click();
         await page.locator('.shopping_cart_link').click();
         await page.locator('[data-test="continue-shopping"]').click();

        //clicking cancel button to view cartlist
        const backpack = page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' });
        await expect(backpack).toBeVisible();   
    });

 });