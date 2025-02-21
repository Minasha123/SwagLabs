import { Page } from "@playwright/test";

export const login = async (page: Page): Promise<void> => {
    await page.goto('https://www.saucedemo.com/');
         
    // Perform login before each test
    await page.getByPlaceholder('username').fill('standard_user');
    await page.getByPlaceholder('password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
}