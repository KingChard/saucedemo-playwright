import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoCheckoutPage(){
        await this.page.goto('/checkout-step-one.html');
    }

    async verifyCheckoutPageUrl() {
        await expect(this.page).toHaveURL('/checkout-step-one.html');
    }
}