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

     test('Clicking "Open menu" to select All Items', async ({page})=>{
        await page.click('#react-burger-menu-btn');
        await page.waitForSelector('.bm-menu');
        await page.getByText('All Items').click();

        //to nagivate to the home page
        await expect(page.locator('.inventory_list')).toBeVisible();
     });

     test('Clicking "Open menu" to select about', async ({page})=>{
        await page.click('#react-burger-menu-btn');
        await page.waitForSelector('.bm-menu');
        await page.getByText('About').click();

        //to nagivate to above page
        await expect(page).toHaveURL(/.*saucelabs\.com/);
     });

     test('Clicking "Open menu" to logout', async ({page})=>{
        await page.click('#react-burger-menu-btn');
        await page.waitForSelector('.bm-menu');
        await page.getByText('Logout').click();

        // to logout from the app
        await expect(page.getByPlaceholder('Username')).toBeVisible();
     });

     test('Clicking "Open menu" to reset app state', async ({page})=>{
         // Add an item to the cart
         await page.locator('.inventory_item')
         .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
         .getByRole('button', { name: 'Add to cart' }).click();

     // Verify item was added to the cart
     await expect(page.locator('.shopping_cart_badge')).toBeVisible();

     // Open menu and reset app state
     await page.click('#react-burger-menu-btn');
     await page.waitForSelector('.bm-menu');
     await page.getByText('Reset App State').click();

     // Verify cart is empty
     await expect(page.locator('.shopping_cart_badge')).toBeHidden();
 });

 });
