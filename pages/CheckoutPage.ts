import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoCheckoutPage(){
        await this.page.goto('/checkout-step-one.html');
    }
}