import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartTitle: Locator;
    readonly cartItems: Locator;
    readonly cartItemNames: Locator;
    readonly cartItemPrices: Locator;
    readonly cartItemDescriptions: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly removeButtons: Locator;
    readonly cartBadge: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cartTitle = page.getByTestId('title');
        this.cartItems = page.getByTestId('inventory-item');
        this.cartItemNames = page.getByTestId('inventory-item-name');
        this.cartItemPrices = page.getByTestId('inventory-item-price');
        this.cartItemDescriptions = page.getByTestId('inventory-item-desc');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.removeButtons = page.getByRole('button', { name: 'Remove' });
        this.cartBadge = page.getByTestId('shopping-cart-badge');
    }

    async gotoCartPage() {
        await this.page.goto('/cart.html');
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

    async verifyCartItemCount(expectedCount: number) {
        await expect(this.cartBadge).toHaveText(expectedCount.toString());
    }

    async verifySpecificProductRemoveButtonIsDisplayed(productName: string) {
        const specificCartItem = this.cartItems.filter({ hasText: productName });
        const specificCartRemoveButton = specificCartItem.getByRole('button', { name: 'Remove' });
        await expect(specificCartRemoveButton).toBeVisible();
    }

    async countCartItems() {
        const cartItemCount = await this.cartItems.count();
        return cartItemCount;
    }

    async countSpecificItemOnCart(productName: string) {
        const specificCartItem = this.cartItems.filter({ hasText: productName });
        const specificCartItemCount = await specificCartItem.count();
        return specificCartItemCount;
    }

    async verifySpecificItemCount(productName: string, productCount: number) {
        const specificCartItem = this.cartItems.filter({ hasText: productName });
        const itemQuantity = await specificCartItem.count();

        await expect(itemQuantity).toEqual(productCount);

    }

    async verifyCartBadgeIsNotVisible() {
        await expect(this.cartBadge).not.toBeVisible();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

}