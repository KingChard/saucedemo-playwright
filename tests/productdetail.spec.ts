import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { users } from "../test-data/users";
import { products } from "../test-data/products";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";

test.describe("Product Details Page Tests", () => {
    test("PDT-001: Open a specific product's details", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;
        const productPrice = products.backpack.price;
        const productDescription = products.backpack.description;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductDetails(productName, productPrice, productDescription);
    });

    test("PDT-002: Verify product name is displayed correctly in the product details page", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductName(productName);
    });

    test("PDT-003: Verify product price is displayed correctly in the product details page", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;
        const productPrice = products.backpack.price;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductPrice(productPrice);
    });

    test("PDT-004: Verify product description is displayed correctly in the product details page", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;
        const productDescription = products.backpack.description;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductDescription(productDescription);
    });

    test("PDT-005: Verify that the product image is displayed correctly in the product details page", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductImage(productName);
    });

    test("PDT-006: Add product to cart from details page", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailsPage.addProductToCartFromDetailsPage();
    });
});