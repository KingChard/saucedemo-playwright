import { Locator, Page, expect } from "@playwright/test";

export class ProductDetailsPage {
    readonly page: Page;
    readonly productDetailName: Locator;
    readonly productDetailPrice: Locator;
    readonly productDetailDescription: Locator;
    readonly addToCartDetailButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productDetailName = page.getByTestId('inventory-item-name');
        this.productDetailPrice = page.getByTestId('inventory-item-price');
        this.productDetailDescription = page.getByTestId('inventory-item-desc');
        this.addToCartDetailButton = page.getByRole('button', { name: 'Add to cart' });
    }

    async verifyProductDetails(productName: string, productPrice: string, productDescription: string) {
        await expect(this.productDetailName).toHaveText(productName);
        await expect(this.productDetailPrice).toHaveText(productPrice);
        await expect(this.productDetailDescription).toHaveText(productDescription);
    }
}