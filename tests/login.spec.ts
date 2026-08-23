import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../test-data/users";

test.describe("Login Tests", () => {

    test("TC01: Successful login with valid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const userData = users.validUser;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        // console.log("TC01 current URL:", page.url());
        await expect(page).toHaveURL(userData.expectedUrl);
    });

    test("TC02: Login fails with invalid username", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const userData = users.invalidUsername;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        // const errorText = await page.getByText(userData.expectedErrorMessage).textContent();
        // console.log("TC02 error message:", errorText);
        await loginPage.verifyErrorMessage(userData.expectedErrorMessage);
    });

    test("TC03: Login fails with invalid password", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const userData = users.invalidPassword;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await loginPage.verifyErrorMessage(userData.expectedErrorMessage);
    });

    test("TC04: Login fails when username is empty", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const userData = users.emptyUsername;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await loginPage.verifyErrorMessage(userData.expectedErrorMessage);
    });

    test("TC05: Login fails when password is empty", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const userData = users.emptyPassword;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await loginPage.verifyErrorMessage(userData.expectedErrorMessage);
    });

});