import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartTitle: Locator;
    readonly cartItems: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly cartBadge: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cartTitle = page.getByTestId('title');
        this.cartItems = page.getByTestId('inventory-item');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.cartBadge = page.getByTestId('shopping-cart-badge');
    }

    async verifyCartPageUrl() {
        await expect(this.page).toHaveURL('/cart.html')
    }

    async verifyCartPageTitle() {
        await expect(this.cartTitle).toHaveText('Your Cart');
    }

    async verifyContinueShoppingButtonIsDisplayed() {
        await expect(this.continueShoppingButton).toBeEnabled();
        await expect(this.continueShoppingButton).toBeVisible();

    }

    async verifyCheckoutButtonIsDisplayed() {
        await expect(this.checkoutButton).toBeEnabled();
        await expect(this.checkoutButton).toBeVisible();
    }

    async verifyProductInCart(productName: string, productPrice: string, productDescription: string) {
        const specificCartItem = this.cartItems.filter({ hasText: productName });

        const specificCartItemName = specificCartItem.getByTestId('inventory-item-name');
        await expect(specificCartItemName).toHaveText(productName);


        const specificCartItemPrice = specificCartItem.getByTestId('inventory-item-price');
        await expect(specificCartItemPrice).toHaveText(productPrice);

        const specificCartItemDescription = specificCartItem.getByTestId('inventory-item-desc');
        await expect(specificCartItemDescription).toHaveText(productDescription);
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

    async verifyCartIsEmpty() {
        await expect(this.cartItems).toHaveCount(0);
        await expect(this.cartBadge).not.toBeVisible();
    }

    async verifyCartBadgeCount(expectedCount: number) {
        await expect(this.cartBadge).toHaveText(expectedCount.toString());

    }

    async verifySpecificProductRemoveButtonIsDisplayed(productName: string) {
        const specificCartItem = this.cartItems.filter({ hasText: productName });
        const specificCartRemoveButton = specificCartItem.getByRole('button', { name: 'Remove' });
        await expect(specificCartRemoveButton).toBeVisible();
    }

    async verifyCartBadgeIsNotVisible() {
        await expect(this.cartBadge).not.toBeVisible();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async openItemDetailsFromCart(productName: string) {
        const specificCartItem = this.cartItems.filter({ hasText: productName });
        const specificCartItemName = specificCartItem.getByTestId('inventory-item-name');
        await specificCartItemName.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async verifyProductQuantity(productName: string, expectedQuantity: number) {
        const specificCartItem = this.cartItems.filter({ hasText: productName });
        const itemQuantity = specificCartItem.getByTestId('item-quantity');

        await expect(itemQuantity).toHaveText(expectedQuantity.toString());
    }
    async verifyCartItemCount(expectedCount: number) {
        await expect(this.cartItems).toHaveCount(expectedCount);
    }

}