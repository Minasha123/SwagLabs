import { Page } from "@playwright/test";

export const addProduct = async (page: Page, productName: string): Promise<void> => {
    await page.locator('.inventory_item')
    .filter({ hasText: productName })
    .getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

}