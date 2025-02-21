import { test, expect } from '@playwright/test';
import { addProduct } from './functions/add-product';
import { login } from './functions/login-function';
import { buyerInfo } from './functions/buyer-details';

test.describe('login flow', () => {

    test.beforeEach(async ({ page }) => {
        await login(page);

        // Verify login is successful
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    test('Fill buyer information to view total price', async ({ page }) => {
        // Add item to cart
         await addProduct(page, 'Sauce Labs Bolt T-Shirt');
    
        // Fill out buyer information
        await buyerInfo(page, 'firstName','lastName','psotalCode');
    
        // Wait for total price element to be visible
        const totalPrice = page.locator('.summary_total_label');
        await totalPrice.waitFor();
    
        // Verify total price text
        await expect(totalPrice).toContainText('Total:');
    });


    test('Order completed', async ({page}) => {
        // Add item to cart
        await addProduct(page, 'Sauce Labs Bolt T-Shirt');
    
        // Fill out buyer information
        await buyerInfo(page, 'firstName','lastName','psotalCode');
    
        // Click on Finish button
        await page.getByRole('button', { name: 'Finish' }).click();
    
        // Verify order completion message
        const orderCompleted = page.locator('.complete-text');
        await expect(orderCompleted).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });

    test('Clicking "back Home" button to navigate to the home page', async ({page}) =>{
        await addProduct(page, 'Sauce Labs Bolt T-Shirt');

        await buyerInfo(page, 'firstName','lastName','psotalCode');
        
        await page.getByRole('button',{name:'finish'}).click();
        await page.getByRole('button',{name:'Back Home'}).click();

        //Navigate to the home page to continue shopping 
        const backpack = page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' });
        await expect(backpack).toBeVisible();

    });

});