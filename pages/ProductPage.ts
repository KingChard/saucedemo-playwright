import { Locator, Page, expect } from "@playwright/test";

export class ProductPage {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly productList: Locator;
    readonly specificProduct: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartButton: Locator;
    readonly sortDropdown: Locator;



    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('title');
        this.productList = page.getByTestId('inventory-list');
        this.specificProduct = page.getByTestId('inventory-item');
        this.productName = page.getByTestId('inventory-item-name');
        this.productPrice = page.getByTestId('inventory-item-price');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.shoppingCartButton = page.getByTestId('shopping-cart-link');
        this.sortDropdown = page.getByTestId('product-sort-container');
    }

    async gotoProductPage() {
        await this.page.goto('/inventory.html');
    }

    async verifyPageTitle() {
        await expect(this.pageTitle).toBeVisible();
    }

    async verifyProductList() {
        await expect(this.productList).toBeVisible();
    }

    async verifyProductPageUrl(){
        await expect(this.page).toHaveURL('/inventory.html')
    }

    async OpenCartPage(){
        await this.shoppingCartButton.click();
    }

    async addProductToCart(productName: string) {
        const specificProduct = this.specificProduct.filter({ hasText: productName });
        const specificAddToCartButton = specificProduct.getByRole('button', { name: 'Add to cart' });
        console.log(
            "Product count:",
            await specificProduct.count()
        );

        console.log(
            "Add button count:",
            await specificAddToCartButton.count()
        );
        await specificAddToCartButton.click();
    }

    async verifyCartItemCount(expectedCount: number) {
        await expect(this.shoppingCartBadge).toHaveText(expectedCount.toString());

    }

    async verifySpecificProductDisplayed(productName: string){
        const specificProduct = this.specificProduct.filter({ hasText: productName });
        const specificProductName = specificProduct.getByTestId('inventory-item-name');
        await expect(specificProductName).toBeVisible();
    }

    async getAllProductPrice() {
        const allProductPrices = await this.page
            .getByTestId('inventory_item_price')
            .allTextContents();

        const productPrices = allProductPrices.map((price) =>
            parseFloat(price.replace('$', ''))
        );

        return productPrices;
    }

    async sortProductsLowToHigh() {
        await this.sortDropdown.selectOption({ label: 'Price (low to high)' });
    }
    async verifyProductSortedLowToHigh() {
        const productPrices = await this.getAllProductPrice();

        for (let i = 0; i < productPrices.length - 1; i++) {
            if (productPrices[i] > productPrices[i + 1]) {
                throw new Error(
                    `Product prices are not sorted in ascending order: ${productPrices[i]} > ${productPrices[i + 1]}`
                );
            }
        }
    }

    async sortProductsHighToLow() {
        await this.sortDropdown.selectOption({ label: 'Price (high to low)' });
    }

    async verifyProductSortedHighToLow() {
        const productPrices = await this.getAllProductPrice();

        for (let i = 0; i < productPrices.length - 1; i++) {
            if (productPrices[i] < productPrices[i + 1]) {
                throw new Error(
                    `Product prices are not sorted in descending order: ${productPrices[i]} < ${productPrices[i + 1]}`
                );
            }
        }
    }

    async getAllProductNames() {
        const allProductNames = await this.page
            .getByTestId('inventory_item_name')
            .allTextContents();
        return allProductNames;
    }

    async sortProductsNameAToZ() {
        await this.sortDropdown.selectOption({ label: 'Name (A to Z)' });
    }
    async verifyProductNamesSortedAToZ() {
        const productNames = await this.getAllProductNames();
        for (let i = 0; i < productNames.length - 1; i++) {
            if (productNames[i] > productNames[i + 1]) {
                throw new Error(
                    `Product names are not sorted alphabetically A to Z: ${productNames[i]} > ${productNames[i + 1]}`
                );
            }
        }
    }

    async sortProductsNameZToA() {
        await this.sortDropdown.selectOption({ label: 'Name (Z to A)' });
    }

    async verifyProductNamesSortedZToA() {
        const productNames = await this.getAllProductNames();
        for (let i = 0; i < productNames.length - 1; i++) {
            if (productNames[i] < productNames[i + 1]) {
                throw new Error(
                    `Product names are not sorted alphabetically Z to A: ${productNames[i]} < ${productNames[i + 1]}`
                );
            }
        }
    }

    async openProductDetails(productName: string) {
        const specificProducts = this.specificProduct.filter({ hasText: productName });
        const specificLinkName = specificProducts.getByTestId('inventory-item-name');
        await specificLinkName.click();
    }

    async removeButtonSpecificProduct(productName: string) {
        const specificProducts = this.specificProduct.filter({ hasText: productName });
        const specificRemoveButton = specificProducts.getByRole('button', { name: 'Remove' });
        await expect(specificRemoveButton).toBeVisible();
    }

    async getProductName(productName: string) {
        const specificProducts = this.specificProduct.filter({ hasText: productName });
        const productNameElement = specificProducts.getByTestId('inventory-item-name');
        return await productNameElement.textContent();
    }

    async getProductPrice(productName: string) {
        const specificProduct = this.specificProduct.filter({ hasText: productName });

        const productPriceElement =
            specificProduct.getByTestId('inventory-item-price');

        return await productPriceElement.textContent();
    }

    async getProductDescription(productName: string){
        const specificProduct = this.specificProduct.filter({ hasText: productName });
        const productDescElement = specificProduct.getByTestId('inventory-item-desc')

        return await productDescElement.textContent();
    }
}