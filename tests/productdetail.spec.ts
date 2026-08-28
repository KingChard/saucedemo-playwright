import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
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
        const cartPage = new CartPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;
        const productPrice = products.backpack.price;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailsPage.addProductToCartFromDetailsPage();
        await productPage.verifyCartItemCount(1);
        await cartPage.gotoCartPage();
        await cartPage.verifyProductInCart(productName, productPrice);
    });

    test("PDT-007: Verify Remove button is displayed on the Product Details Page.", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const cartPage = new CartPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailsPage.addProductToCartFromDetailsPage();
        await productDetailsPage.verifyRemoveButtonIsDisplayed();
    });

    test("PDT-008: Remove product from cart on Product Details Page", async ({ page }) => {
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
        await productDetailsPage.removeProductFromDetailsPage();
        await productDetailsPage.verifyRemoveProductFromDetailsPage();
    });

    test("PDT-009: Add a product to cart from Product Details Page and verify cart quantity", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const cartPage = new CartPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;
        const productPrice = products.backpack.price;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailsPage.addProductToCartFromDetailsPage();
        await productPage.verifyCartItemCount(1);
        await cartPage.gotoCartPage();
        await cartPage.verifyProductInCart(productName,productPrice);
    });

    test("PDT-010: Return to Products Page from Product Details Page", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailPage.returnToProductPage();
        await productPage.verifyPageTitle();
        await productPage.verifyProductList();
    });

    test("PDT-011: Verify Back to Products Button is Displayed", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailPage.verifyBackToProductButtonDisplayed();
        await productDetailPage.returnToProductPage();
    });

    test("PDT-012: Verify Add to Cart Button is Displayed for a Product Not in Cart ", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailPage.verifyAddToCartButtonIsDisplayed();
        await productDetailPage.verifyRemoveButtonIsNotDisplayed();
    });

    test("PDT-013: Add Product and Verify Button Changes to Remove ", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailPage.addProductToCartFromDetailsPage();
        await productPage.verifyCartItemCount(1);
        await productDetailPage.verifyAddToCartButtonIsNotDisplayed();
        await productDetailPage.verifyRemoveButtonIsDisplayed();
    });

    test("PDT-014: Remove Product and Verify Button Changes Back to Add to Cart ", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailPage.addProductToCartFromDetailsPage();
        await productDetailPage.removeProductFromDetailsPage();
        await productDetailPage.verifyRemoveProductFromDetailsPage();
    });

    test("PDT-015: Verify Product Details for Sauce Labs Bike Light", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.bikelight.name;
        const productPrice = products.bikelight.price;
        const productDesc = products.bikelight.description;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailPage.verifyProductDetails(productName,productPrice,productDesc);
        await productDetailPage.verifyAddToCartButtonIsDisplayed();
    });

    test("PDT-016: Verify Product Details for Sauce Labs Bolt T-Shirt ", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.boltTShirt.name;
        const productPrice = products.boltTShirt.price;
        const productDesc = products.boltTShirt.description;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailPage.verifyProductDetails(productName,productPrice,productDesc);
        await productDetailPage.verifyAddToCartButtonIsDisplayed();
    });

    test("PDT-017: Add Different Products from Product Details Page ", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const userData = users.validUser;
        const productName = products.boltTShirt.name;
        const productPrice = products.boltTShirt.price;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.addProductToCart(productName);
        await productPage.removeButtonSpecificProduct(productName);
        await cartPage.gotoCartPage();
        await cartPage.verifyProductInCart(productName,productPrice);
    });

    test("PDT-018: Verify Product Details Data Matches Product Listing ", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        
        const productPageName = await productPage.getProductName(productName);
        const productPagePrice = await productPage.getProductPrice(productName);
        const productPageDesc = await productPage.getProductDescription(productName);

        await productPage.openProductDetails(productName);
        await productDetailPage.verifyProductDetailMatch(productPageName,productPagePrice,productPageDesc);
    });

    test("PDT-019: Navigate Between Product Details and Products Page ", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailPage.returnToProductPage();
        await productPage.verifyProductPageUrl();
        await productPage.verifyPageTitle();
        await productPage.verifyProductList();
        await productPage.verifySpecificProductDisplayed(productName);
    });

    test("PDT-020: Add Product, Return to Products, and Verify Cart ", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const productDetailPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;
        const productPrice = products.backpack.price;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailPage.addProductToCartFromDetailsPage();
        await productPage.verifyCartItemCount(1);
        await productDetailPage.returnToProductPage();
        await productPage.verifyProductPageUrl();
        await productPage.verifyCartItemCount(1);
        await productPage.OpenCartPage();
        await cartPage.verifyCartPageUrl();
        await cartPage.verifyProductInCart(productName,productPrice);

    });

});