import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartTitle: Locator;
    readonly cartItems: Locator;
    readonly cartItemNames: Locator;
    readonly cartItemPrices: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly removeButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartTitle = page.getByRole('heading', { name: 'Your Cart' });
        this.cartItems = page.getByTestId('cart_item');
        this.cartItemNames = page.getByTestId('cart_item_label');
        this.cartItemPrices = page.getByTestId('inventory_item_price');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.removeButtons = page.getByRole('button', { name: 'Remove' });
    }

    async gotoCartPage() {
        await this.page.goto('/cart.html');
    }

    async verifyProductInCart(productName: string, productPrice: string) {
        const specificCartItem = this.cartItems.filter({ hasText: productName });

        const specificCartItemName = specificCartItem.getByTestId('cart_item_label');
        await expect(specificCartItemName).toHaveText(productName);


        const specificCartItemPrice = specificCartItem.getByTestId('inventory_item_price');
        await expect(specificCartItemPrice).toHaveText(productPrice);
    }

    async removeProductFromCart(productName: string) {

        const specificCartItem = this.cartItems.filter({ hasText: productName });

        const specificCartRemoveButton = specificCartItem.getByRole('button', { name: 'Remove' });

        await specificCartRemoveButton.click();

    }

    async verifyProductIsRemoved(productName: string) {
        const specificCartItem = this.cartItems.filter({ hasText: productName });

        await expect(specificCartItem).not.toBeVisible();

    }
}