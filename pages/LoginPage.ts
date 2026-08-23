import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    //LOCATORS
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.errorMessage = page.locator("[data-test='error']");

    }
    
    //NAVIGATION
    async gotoLoginPage() {
        await this.page.goto('/');
    }
    
    //ACTIONS
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyErrorMessage(text: string) {
        await expect(this.errorMessage).toHaveText(text);
        
    }

}