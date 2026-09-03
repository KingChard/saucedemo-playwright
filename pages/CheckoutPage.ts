import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('title');
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    async gotoCheckoutPage(){
        await this.page.goto('/checkout-step-one.html');
    }

    async verifyCheckoutPageUrl() {
        await expect(this.page).toHaveURL('/checkout-step-one.html');
    }

    async verifyPageTitle() {
        await expect(this.pageTitle).toHaveText('Checkout: Your Information');
    }

    async verifyCheckoutFormFieldsAreDisplayed() {
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.firstNameInput).toBeEditable();

        await expect(this.lastNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeEditable();

        await expect(this.postalCodeInput).toBeVisible();
        await expect(this.postalCodeInput).toBeEditable();
    }

    async cancelButtonIsDisplayed() {
        await expect(this.cancelButton).toBeVisible();
        await expect(this.cancelButton).toBeEnabled();
    }

    async continueButtonIsDisplayed() {
        await expect(this.continueButton).toBeVisible();
        await expect(this.continueButton).toBeEnabled();
    }
}