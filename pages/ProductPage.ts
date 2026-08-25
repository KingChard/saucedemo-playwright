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
        this.productList = page.getByTestId('inventory-list');
        this.specificProduct = page.getByTestId('inventory-item');
        this.productName = page.getByTestId('inventory-item-name');
        this.productPrice = page.getByTestId('inventory-item-price');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.shoppingCartButton = page.getByRole('link', { name: /shopping cart/i });
        this.sortDropdown = page.getByTestId('product-sort-container');
    }

    async gotoProductPage() {
        await this.page.goto('/inventory.html');
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

    async getAllProductPrice() {
        const allProductPrices = await this.page
            .getByTestId('inventory_item_price')
            .allTextContents();

        const productPrices = allProductPrices.map((price) =>
            parseFloat(price.replace('$', ''))
        );

        return productPrices;
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

    async sortProductsLowToHigh() {
        await this.sortDropdown.selectOption({ label: 'Price (low to high)' });
    }

}