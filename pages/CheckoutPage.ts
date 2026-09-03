import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('title');

    }

    async gotoCheckoutPage() {
        await this.page.goto('/checkout-step-one.html');
    }

    async verifyCheckoutPageUrl() {
        await expect(this.page).toHaveURL('/checkout-step-one.html');
    }

    async verifyPageTitle() {
        await expect(this.pageTitle).toHaveText('Checkout: Your Information');
    }
}