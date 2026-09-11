import { test } from "../fixtures/pages.fixture";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../test-data/users";
import { loginValidationData } from "../test-data/login"

test.describe("Login Tests", () => {

    test('TC01: Successful login with valid credentials', async ({ loginPage, productPage }) => {
        const userData = users.validUser;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.verifyProductPageUrl();
    });

    for (const data of loginValidationData) {
        test(`${data.testId}: ${data.testName}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.gotoLoginPage();
            await loginPage.login(data.username, data.password);

            await loginPage.verifyErrorMessage(data.expectedError);
        });
    }
});