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
        const productDetailImage = this.page.getByAltText(productName);
        await expect(this.productDetailName).toHaveText(productName);
        await expect(this.productDetailPrice).toHaveText(productPrice);
        await expect(this.productDetailDescription).toHaveText(productDescription);
        await expect(productDetailImage).toBeVisible();
    }

    async verifyProductName(productName: string) {
        await expect(this.productDetailName).toHaveText(productName);
    }

    async verifyProductPrice(productPrice: string) {
        await expect(this.productDetailPrice).toHaveText(productPrice);
    }
    async verifyProductDescription(productDescription: string) {
        await expect(this.productDetailDescription).toHaveText(productDescription);
    }

    async verifyProductImage(productName: string) {
        const productDetailImage = this.page.getByAltText(productName);
        await expect(productDetailImage).toBeVisible();
    }

    async addProductToCartFromDetailsPage() {
        await this.addToCartDetailButton.click();
    }

}