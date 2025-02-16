import { test, expect } from '@playwright/test';

test.describe('login flow', ()=>{
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/');

    });

//Negative scenario for login
test('Enter invalid username and password', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('invalid_user');
    await page.getByPlaceholder('Password').fill('invalid_password');
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Username and password do not match');
});

test('leave username empty', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = page.locator('[data-test="error"]');
      await expect(errorMessage).toHaveText('Epic sadface: Username is required');

});

test('leave password empty', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('');
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText('Epic sadface: Password is required');

});

test('leave both username and password empty', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('');
    await page.getByPlaceholder('Password').fill('');
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toHaveText('Epic sadface: Username is required');

});

//Positive scenario for login 
test('Fill in login credentials', async({page}) => {
    await page.getByPlaceholder('username').fill('standard_user');
    await page.getByPlaceholder('password').fill('secret_sauce');
    await page.getByRole('button',{name:'login'}).click();

    const backpack = page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' });
        await expect(backpack).toBeVisible();
});

});

