import { Locator, Page, expect } from "@playwright/test";

export class ProductDetailsPage {
    readonly page: Page;
    readonly productDetailName: Locator;
    readonly productDetailPrice: Locator;
    readonly productDetailDescription: Locator;
    readonly addToCartDetailButton: Locator;
    readonly removeDetailButton: Locator;
    readonly cartBadge: Locator;
    readonly cartButton: Locator;
    readonly backToProductButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productDetailName = page.getByTestId('inventory-item-name');
        this.productDetailPrice = page.getByTestId('inventory-item-price');
        this.productDetailDescription = page.getByTestId('inventory-item-desc');
        this.addToCartDetailButton = page.getByRole('button', { name: 'Add to cart' });
        this.removeDetailButton = page.getByRole('button', { name: 'Remove' });
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartButton = page.getByRole('link', { name: /shopping cart/i });
        this.backToProductButton = page.getByRole('button', { name: 'Back to products'})
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
        await expect(productDetailImage).toBeVisible
    }

    async addProductToCartFromDetailsPage() {
        await this.addToCartDetailButton.click();
    }

    async verifyAddToCartButtonIsDisplayed(){
        await expect(this.addToCartDetailButton).toBeVisible();
        await expect(this.addToCartDetailButton).toBeEnabled();
    }

    async verifyAddToCartButtonIsNotDisplayed(){
        await expect(this.addToCartDetailButton).not.toBeVisible();
    }

    async verifyRemoveButtonIsDisplayed() {
        await expect(this.removeDetailButton).toBeVisible();
        await expect(this.removeDetailButton).toBeEnabled();
    }

    async verifyRemoveButtonIsNotDisplayed(){
        await expect(this.removeDetailButton).not.toBeVisible();
    }

    async removeProductFromDetailsPage() {
        await this.removeDetailButton.click();
        // await expect(this.removeDetailButton).not.toBeVisible();
        // await expect(this.addToCartDetailButton).toBeVisible();
    }

    async verifyRemoveProductFromDetailsPage() {
        await expect(this.removeDetailButton).not.toBeVisible();
        await expect(this.addToCartDetailButton).toBeVisible();
        await expect(this.addToCartDetailButton).toBeEnabled();
        await expect(this.cartBadge).not.toBeVisible();
    }

    async returnToProductPage() {
        await this.backToProductButton.click();
    }

    async verifyBackToProductButtonDisplayed(){
        await expect(this.backToProductButton).toBeVisible();
        await expect(this.backToProductButton).toBeEnabled();
    }

    async getProductDetailName(){
        return this.productDetailName.textContent();
    }

    async getProductDetailPrice(){
        return this.productDetailPrice.textContent();
    }

    async getProductDetailDescription(){
        return this.productDetailDescription.textContent();
    }

    async verifyProductDetailMatch(productPageName: string | null, productPagePrice: string | null, productPageDesc: string|null){
        // const productDetailName = await this.getProductDetailName();
        // const productDetailPrice = await this.getProductDetailPrice();
        // const productDetailDesc = await this.getProductDetailDescription();

        await expect(await this.getProductDetailName()).toBe(productPageName);
        await expect(await this.getProductDetailPrice()).toBe(productPagePrice);
        await expect(await this.getProductDetailDescription()).toBe(productPageDesc);
    }
}