import { Page } from "@playwright/test";

export const buyerInfo = async (page: Page, firstName: string, lastName: string, postalCode: string): Promise<void> => {
    await page.getByPlaceholder('First Name').fill(firstName);
    await page.getByPlaceholder('Last Name').fill(lastName);
    await page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
    await page.getByRole('button', { name: 'Continue' }).click();

}

