import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users } from "../test-data/users";
import { products } from "../test-data/products";

test.describe("Cart Page test", () => {

    // test('' , async ({ page }) => {

    // }),
    test('CT-001: Verify Cart Page Opens Correctly ', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const userData = users.validUser;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.openCartPage();

        await cartPage.verifyCartPageUrl();
        await cartPage.verifyCartPageTitle();
        await cartPage.verifyCheckoutButtonIsDisplayed();
        await cartPage.verifyContinueShoppingButtonIsDisplayed();

    });

    test('CT-002: Verify Empty Cart ', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const userData = users.validUser;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.openCartPage();

        await cartPage.verifyCartPageUrl();
        await cartPage.verifyCartPageTitle();

        await cartPage.verifyCartIsEmpty();
        await cartPage.verifyContinueShoppingButtonIsDisplayed();
        await cartPage.verifyCheckoutButtonIsDisplayed();

    });

    test('CT-003: Verify Cart Page Buttons', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const userData = users.validUser;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.openCartPage();

        await cartPage.verifyContinueShoppingButtonIsDisplayed();
        await cartPage.verifyCheckoutButtonIsDisplayed();
    });


    test('CT-004: Verify Single Product in Cart ', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const userData = users.validUser;
        const productNameBackpack = products.backpack.name;
        const productPriceBackpack = products.backpack.price;
        const productDescriptionBackpack = products.backpack.description;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productNameBackpack);
        await productPage.verifyCartItemCount(1);
        await productPage.openCartPage();

        await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescriptionBackpack);
        await cartPage.verifyProductQuantity(productNameBackpack, 1);
        await cartPage.verifySpecificProductRemoveButtonIsDisplayed(productNameBackpack);
    });

    test('CT-005: Verify Product Description in Cart ', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const userData = users.validUser;
        const productNameBackpack = products.backpack.name;
        const productPriceBackpack = products.backpack.price;
        const productDescriptionBackpack = products.backpack.description;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productNameBackpack);
        await productPage.openCartPage();

        await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescriptionBackpack);
    }),

        test('CT-006: Verify Cart Badge Matches Cart Items ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;
            const productPriceBackpack = products.backpack.price;
            const productDescriptionBackpack = products.backpack.description;

            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.verifyCartItemCount(1);
            await productPage.openCartPage();

            const cartItemCount = await cartPage.countCartItems();
            await cartPage.verifyCartItemCount(cartItemCount);
            await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescriptionBackpack);

        }),

        test('CT-007: Add Two Products and Verify Both in Cart ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;
            const productPriceBackpack = products.backpack.price;
            const productDescriptionBackpack = products.backpack.description;
            const productNameBikelight = products.bikelight.name;
            const productPriceBikelight = products.bikelight.price;
            const productDescriptionBikelight = products.bikelight.description;

            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.addProductToCart(productNameBikelight);
            await productPage.verifyCartItemCount(2);
            await productPage.openCartPage();

            await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescriptionBackpack);
            await cartPage.verifyProductInCart(productNameBikelight, productPriceBikelight, productDescriptionBikelight);
            const cartItemCount = await cartPage.countCartItems();
            await cartPage.verifyCartItemCount(cartItemCount);
        }),

        test('CT-008: Verify Quantity for Multiple Products ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;
            const productNameBikelight = products.bikelight.name;


            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.addProductToCart(productNameBikelight);
            await productPage.openCartPage();

            await cartPage.verifyProductQuantity(productNameBackpack, 1);
            await cartPage.verifyProductQuantity(productNameBikelight, 1);
            await cartPage.verifyCartItemCount(2);
        }),

        test('CT-009: Remove Single Product from Cart ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;

            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.openCartPage();
            await cartPage.removeProductFromCart(productNameBackpack);
            await cartPage.verifyProductIsRemoved(productNameBackpack);
            await cartPage.verifyCartIsEmpty();
            await cartPage.verifyCartBadgeIsNotVisible();
            await cartPage.verifyCartPageUrl();
        }),

        test('CT-010: Remove One Product from Multiple Cart Items ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;
            const productNameBikelight = products.bikelight.name;
            const productPriceBikelight = products.bikelight.price;
            const productDescBikelight = products.bikelight.description;

            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.addProductToCart(productNameBikelight);
            await productPage.verifyCartItemCount(2);
            await productPage.openCartPage();

            await cartPage.removeProductFromCart(productNameBackpack);
            await cartPage.verifyProductIsRemoved(productNameBackpack);
            await cartPage.verifyCartBadgeCount(1);
            await cartPage.verifyProductInCart(productNameBikelight, productPriceBikelight, productDescBikelight);
            await cartPage.verifyCartItemCount(1);
        }),

        test('CT-011: Remove All Products from Cart ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;
            const productNameBikelight = products.bikelight.name;


            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.addProductToCart(productNameBikelight);
            await productPage.openCartPage();

            await cartPage.removeProductFromCart(productNameBackpack);
            await cartPage.removeProductFromCart(productNameBikelight);
            await cartPage.verifyCartIsEmpty();
            await cartPage.verifyCartBadgeIsNotVisible();
            await cartPage.verifyCartPageUrl();
        }),

        test('CT-012: Verify Remove Button Belongs to Correct Product ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;
            const productPriceBackpack = products.backpack.price;
            const productDescBackpack = products.backpack.description;
            const productNameBikelight = products.bikelight.name;


            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.addProductToCart(productNameBikelight);
            await productPage.openCartPage();

            await cartPage.removeProductFromCart(productNameBikelight);
            await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescBackpack);
            await cartPage.verifyProductIsRemoved(productNameBikelight);
            await cartPage.verifyCartItemCount(1);
            await cartPage.verifyCartBadgeCount(1);
        }),


        test('CT-013: Continue Shopping from Empty Cart ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const userData = users.validUser;

            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.openCartPage();

            await cartPage.verifyCartIsEmpty();
            await cartPage.continueShopping();
            await cartPage.verifyCartBadgeIsNotVisible();

            await productPage.verifyProductPageUrl();
            await productPage.verifyPageTitle();
            await productPage.verifyProductList();
        }),

        test('CT-014: Continue Shopping with Product in Cart ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;
            const productPriceBackpack = products.backpack.price;
            const productDescriptionBackpack = products.backpack.description;

            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.openCartPage();

            await cartPage.continueShopping();

            await productPage.verifyProductPageUrl();
            await productPage.verifyPageTitle();
            await productPage.verifyCartItemCount(1);
            await productPage.openCartPage();

            await cartPage.verifyCartBadgeCount(1);
            await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescriptionBackpack);
        }),

        test('CT-015: Add Another Product After Continue Shopping ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;
            const productPriceBackpack = products.backpack.price;
            const productDescriptionBackpack = products.backpack.description;
            const productNameBikelight = products.bikelight.name;
            const productPriceBikelight = products.bikelight.price;
            const productDescriptionBikelight = products.bikelight.description;

            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.openCartPage();

            await cartPage.continueShopping();

            await productPage.verifyProductPageUrl();
            await productPage.verifyCartItemCount(1);
            await productPage.addProductToCart(productNameBikelight);
            await productPage.verifyCartItemCount(2);
            await productPage.openCartPage();

            await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescriptionBackpack);
            await cartPage.verifyProductInCart(productNameBikelight, productPriceBikelight, productDescriptionBikelight);
            await cartPage.verifyCartItemCount(2);
            await cartPage.verifyCartBadgeCount(2);
        }),

        test('CT-016: Open Product Details from Cart ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const productDetailPage = new ProductDetailsPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;
            const productPriceBackpack = products.backpack.price;
            const productDescriptionBackpack = products.backpack.description;

            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.openCartPage();

            await cartPage.openItemDetailsFromCart(productNameBackpack);

            await productDetailPage.verifyProductDetails(productNameBackpack, productPriceBackpack, productDescriptionBackpack);
            await productDetailPage.verifyRemoveButtonIsDisplayed();


        }),

        test('CT-017: Verify Cart Data Matches Product Listing ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;

            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            const productPageName = await productPage.getProductName(productNameBackpack);
            const productPagePrice = await productPage.getProductPrice(productNameBackpack);
            const productPageDesc = await productPage.getProductDescription(productNameBackpack);
            await productPage.addProductToCart(productNameBackpack);
            await productPage.openCartPage();

            await cartPage.verifyProductInCart(productPageName!, productPagePrice!, productPageDesc!);

        }),

        test('CT-018: Verify Cart State After Visiting Product Details ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const productDetailPage = new ProductDetailsPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;
            const productPriceBackpack = products.backpack.price;
            const productDescriptionBackpack = products.backpack.description;

            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.openCartPage();

            await cartPage.openItemDetailsFromCart(productNameBackpack);

            await productDetailPage.returnToProductsPage();

            await productPage.verifyCartItemCount(1);
            await productPage.openCartPage();

            await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescriptionBackpack);


        }),

        test('CT-019: Verify Checkout Button Navigation ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const checkoutPage = new CheckoutPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;
            const productPriceBackpack = products.backpack.price;
            const productDescriptionBackpack = products.backpack.description;

            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.openCartPage();

            await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescriptionBackpack);
            await cartPage.proceedToCheckout();
            await checkoutPage.verifyCheckoutPageUrl();
            await checkoutPage.verifyPageTitle();

        }),

        test('CT-020: Verify Product Data Before Starting Checkout ', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);
            const userData = users.validUser;
            const productNameBackpack = products.backpack.name;
            const productPriceBackpack = products.backpack.price;
            const productDescriptionBackpack = products.backpack.description;

            await loginPage.gotoLoginPage();
            await loginPage.login(userData.username, userData.password);

            await productPage.addProductToCart(productNameBackpack);
            await productPage.verifyCartItemCount(1);
            await productPage.openCartPage();

            await cartPage.verifyCartBadgeCount(1);
            await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescriptionBackpack);
            await cartPage.verifyProductQuantity(productNameBackpack, 1);
            await cartPage.verifyCheckoutButtonIsDisplayed();
        });

});