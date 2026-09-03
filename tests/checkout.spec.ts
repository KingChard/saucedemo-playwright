import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users } from "../test-data/users";
import { products } from "../test-data/products";

test.describe("Checkout Page Test", () => {
    test('CHK-001: Open Checkout Information Page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productBackpackName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productBackpackName);
        await productPage.openCartPage();

        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutPageUrl();
        await checkoutPage.verifyPageTitle();
        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.cancelButtonIsDisplayed();
        await checkoutPage.continueButtonIsDisplayed();
    });

    test('CHK-002: Verify Checkout Information Form Controls', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productBackpackName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productBackpackName);
        await productPage.openCartPage();

        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.cancelButtonIsDisplayed();
        await checkoutPage.continueButtonIsDisplayed();
    });

    test('CHK-003: Continue with Valid Checkout Information', async ({ page }) => {

    });

    test('CHK-004: Verify First Name is Required', async ({ page }) => {

    });

    test('CHK-005: Verify Last Name is Required', async ({ page }) => {

    });

    test('CHK-006: Verify Postal Code is Required', async ({ page }) => {

    });

    test('CHK-007: Cancel Checkout from Information Page', async ({ page }) => {

    });

    test('CHK-008: Verify Cart Data Persists After Cancelling Checkout', async ({ page }) => {

    });

    test('CHK-009: Verify Checkout Overview Page', async ({ page }) => {

    });

    test('CHK-010: Verify Product Data on Checkout Overview', async ({ page }) => {

    });

    test('CHK-011: Verify Product Quantity on Checkout Overview', async ({ page }) => {

    });

    test('CHK-012: Verify Item Total for Single Product', async ({ page }) => {

    });

    test('CHK-013: Verify Multiple Products on Checkout Overview', async ({ page }) => {

    });

    test('CHK-014: Verify Item Total for Multiple Products', async ({ page }) => {

    });

    test('CHK-015: Verify Tax and Final Total', async ({ page }) => {

    });

    test('CHK-016: Cancel from Checkout Overview', async ({ page }) => {

    });

    test('CHK-017: Complete Checkout Successfully', async ({ page }) => {

    });

    test('CHK-018: Verify Order Confirmation Message', async ({ page }) => {

    });

    test('CHK-019: Return Home After Completed Checkout', async ({ page }) => {

    });

    test('CHK-020: Complete Checkout with Multiple Products End-to-End', async ({ page }) => {

    });
});