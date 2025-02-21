 import { test, expect } from '@playwright/test';
import { addProduct } from './functions/add-product';
import { login } from './functions/login-function';

 
 test.describe('login flow', () => {
 
     test.beforeEach(async ({ page }) => {
         await login(page);
 
         // Verify login is successful
         await expect(page.locator('.inventory_list')).toBeVisible();
     });

     test('Clicking "Checkout" button to process the order', async ({page}) => {
        // Add item to cart
        await addProduct(page, 'Sauce Labs Bolt T-Shirt');
    
        // Verify that the user is navigated to the checkout personal information page
        const checkoutTitle = page.locator('.title');
        await expect(checkoutTitle).toHaveText('Checkout: Your Information');
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