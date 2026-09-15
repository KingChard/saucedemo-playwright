import { test } from "../../fixtures/pages.fixture";
import { users } from "../../test-data/users";
import { products } from "../../test-data/products";
import { productDetailData } from "../../test-data/productdetail";

test.describe("Product Details Page Tests", () => {
    test.beforeEach(async ({ loginPage }) => {
        const userData = users.validUser;
        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

    });

    test("PDT-001: Open a specific product's details", async ({ productPage, productDetailsPage }) => {

        const productName = products.backpack.name;
        const productPrice = products.backpack.price;
        const productDescription = products.backpack.description;

        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductDetails(productName, productPrice, productDescription);
    });

    test("PDT-002: Verify product name is displayed correctly in the product details page", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;

        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductName(productName);
    });

    test("PDT-003: Verify product price is displayed correctly in the product details page", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;
        const productPrice = products.backpack.price;

        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductPrice(productPrice);
    });

    test("PDT-004: Verify product description is displayed correctly in the product details page", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;
        const productDescription = products.backpack.description;

        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductDescription(productDescription);
    });

    test("PDT-005: Verify that the product image is displayed correctly in the product details page", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;

        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductImage(productName);
    });

    test("PDT-006: Add product to cart from details page", async ({ productPage, cartPage, productDetailsPage }) => {
        const productName = products.backpack.name;
        const productPrice = products.backpack.price;
        const productDescription = products.backpack.description;

        await productPage.openProductDetails(productName);
        await productDetailsPage.addProductToCartFromDetailsPage();
        await productPage.verifyProductCartBadge(1);
        await productPage.openCartPage();

        await cartPage.verifyCartPageUrl(); // Verify that the cart page URL is correct
        await cartPage.verifyCartPageTitle();
        await cartPage.verifyProductInCart(productName, productPrice, productDescription); // Verify that the product is in the cart with the correct name and price
    });

    test("PDT-007: Verify Remove button is displayed on the Product Details Page.", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;

        await productPage.openProductDetails(productName);
        await productDetailsPage.addProductToCartFromDetailsPage();
        await productDetailsPage.verifyRemoveButtonIsDisplayed();
    });

    test("PDT-008: Remove product from cart on Product Details Page", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;

        await productPage.openProductDetails(productName);
        await productDetailsPage.addProductToCartFromDetailsPage();
        await productDetailsPage.removeProductFromDetailsPage();
        await productDetailsPage.verifyRemoveProductFromDetailsPage();
    });

    test("PDT-009: Add a product to cart from Product Details Page and verify cart quantity", async ({ productPage, cartPage, productDetailsPage }) => {
        const productName = products.backpack.name;
        const productPrice = products.backpack.price;
        const productDescription = products.backpack.description;

        await productPage.openProductDetails(productName);
        await productDetailsPage.addProductToCartFromDetailsPage();
        await productPage.verifyProductCartBadge(1);
        await productPage.openCartPage();
        await cartPage.verifyCartPageUrl(); // Verify that the cart page URL is correct
        await cartPage.verifyCartPageTitle();
        await cartPage.verifyProductInCart(productName, productPrice, productDescription);
    });

    test("PDT-010: Return to Products Page from Product Details Page", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;

        await productPage.openProductDetails(productName);
        await productDetailsPage.returnToProductsPage();
        await productPage.verifyPageTitle();
        await productPage.verifyProductList();
    });

    test("PDT-011: Verify Back to Products Button is Displayed", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;

        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyBackToProductsButtonDisplayed();
    });

    test("PDT-012: Verify Add to Cart Button is Displayed for a Product Not in Cart ", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;

        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyAddToCartButtonIsDisplayed();
        await productDetailsPage.verifyRemoveButtonIsNotDisplayed();
    });

    test("PDT-013: Add Product and Verify Button Changes to Remove ", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;

        await productPage.openProductDetails(productName);
        await productDetailsPage.addProductToCartFromDetailsPage();
        await productPage.verifyProductCartBadge(1);
        await productDetailsPage.verifyAddToCartButtonIsNotDisplayed();
        await productDetailsPage.verifyRemoveButtonIsDisplayed();
    });

    test("PDT-014: Remove Product and Verify Button Changes Back to Add to Cart ", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;

        await productPage.openProductDetails(productName);
        await productDetailsPage.addProductToCartFromDetailsPage();
        await productDetailsPage.removeProductFromDetailsPage();
        await productDetailsPage.verifyRemoveProductFromDetailsPage();
    });

    test("PDT-015: Verify Product Details for Sauce Labs Bike Light", async ({ productPage, productDetailsPage }) => {
        const productName = products.bikelight.name;
        const productPrice = products.bikelight.price;
        const productDesc = products.bikelight.description;

        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductDetails(productName, productPrice, productDesc);
        await productDetailsPage.verifyAddToCartButtonIsDisplayed();
    });

    test("PDT-016: Verify Product Details for Sauce Labs Bolt T-Shirt ", async ({ productPage, productDetailsPage }) => {
        const productName = products.boltTShirt.name;
        const productPrice = products.boltTShirt.price;
        const productDesc = products.boltTShirt.description;

        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductDetails(productName, productPrice, productDesc);
        await productDetailsPage.verifyAddToCartButtonIsDisplayed();
    });

    for (const data of productDetailData) {
        test(`${data.testId}: ${data.testName}`, async ({ productPage, cartPage, productDetailsPage }) => {
            await productPage.openProductDetails(data.name);
            await productDetailsPage.verifyProductName(data.name);
            await productDetailsPage.addProductToCartFromDetailsPage();
            await productPage.verifyProductCartBadge(1);
            await productDetailsPage.verifyRemoveButtonIsDisplayed();
            await productPage.openCartPage();
            await cartPage.verifyCartPageUrl();
            await cartPage.verifyProductInCart(data.name, data.price, data.desc);
        });
    }

    test("PDT-018: Verify Product Details Data Matches Product Listing ", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;

        const productPageName = await productPage.getProductName(productName);
        const productPagePrice = await productPage.getProductPrice(productName);
        const productPageDesc = await productPage.getProductDescription(productName);

        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductDetailMatch(productPageName, productPagePrice, productPageDesc);
    });

    test("PDT-019: Navigate Between Product Details and Products Page ", async ({ productPage, productDetailsPage }) => {
        const productName = products.backpack.name;

        await productPage.openProductDetails(productName);
        await productDetailsPage.returnToProductsPage();
        await productPage.verifyProductPageUrl();
        await productPage.verifyPageTitle();
        await productPage.verifyProductList();
        await productPage.verifySpecificProductDisplayed(productName);
    });

    test("PDT-020: Add Product, Return to Products, and Verify Cart ", async ({ productPage, cartPage, productDetailsPage }) => {
        const productName = products.backpack.name;
        const productPrice = products.backpack.price;
        const productDescription = products.backpack.description;

        await productPage.openProductDetails(productName);
        await productDetailsPage.addProductToCartFromDetailsPage();
        await productPage.verifyProductCartBadge(1);
        await productDetailsPage.returnToProductsPage();
        await productPage.verifyProductPageUrl();
        await productPage.verifyPageTitle();
        await productPage.verifyProductCartBadge(1);
        await productPage.openCartPage();
        await cartPage.verifyCartPageUrl();
        await cartPage.verifyProductInCart(productName, productPrice, productDescription);

    });
});