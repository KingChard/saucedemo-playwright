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
        this.cartItems = page.getByTestId('inventory-item');
        this.cartItemNames = page.getByTestId('inventory-item-name');
        this.cartItemPrices = page.getByTestId('inventory-item-price');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.removeButtons = page.getByRole('button', { name: 'Remove' });
    }

    async gotoCartPage() {
        await this.page.goto('/cart.html');
    }

    async verifyCartPageUrl(){
        await expect(this.page).toHaveURL('/cart.html')
    }

    async verifyProductInCart(productName: string, productPrice: string) {
        const specificCartItem = this.cartItems.filter({ hasText: productName });

        const specificCartItemName = specificCartItem.getByTestId('inventory-item-name');
        console.log("Cart item count:", await specificCartItem.count());
        console.log("Cart item name count:", await specificCartItemName.count());
        await expect(specificCartItemName).toHaveText(productName);


        const specificCartItemPrice = specificCartItem.getByTestId('inventory-item-price');
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