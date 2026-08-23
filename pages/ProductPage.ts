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
        this.pageTitle = page.getByRole('heading', { name: 'Products' });
        this.productList = page.getByTestId('inventory_list');
        this.specificProduct = page.getByTestId('inventory_item');
        this.productName = page.getByTestId('inventory_item_name');
        this.productPrice = page.getByTestId('inventory_item_price');
        this.shoppingCartBadge = page.getByTestId('shopping_cart_badge');
        this.shoppingCartButton = page.getByRole('link', { name: /shopping cart/i });
        this.sortDropdown = page.getByTestId('product_sort_container');
    }

    async gotoProductPage() {
        await this.page.goto('/inventory.html');
    }

    async addProductToCart(productName: string) {
        const specificProduct = this.specificProduct.filter({ hasText: productName });
        const specificAddToCartButton = specificProduct.getByRole('button', { name: 'Add to cart' });
        await specificAddToCartButton.click();
    }

    async verifyCartItemCount(expectedCount: number) {
        await expect(this.shoppingCartBadge).toHaveText(expectedCount.toString());

    }

    async getAllProductPrice() {
        const allProductPrices = await this.page.getByTestId('inventory_item_price').allTextContents();
        const productPrices = allProductPrices.map((price) => parseFloat(price.replace('$', '')));
        return productPrices;
    }

}