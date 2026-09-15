import { test } from "../../fixtures/pages.fixture";
import { users } from "../../test-data/users";
import { products } from "../../test-data/products";

test.describe("Cart Page Tests", () => {
    test.beforeEach(async ({ loginPage }) => {
        const userData = users.validUser;
        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

    });

    test.describe("Empty Cart Tests", () => {

        test.beforeEach(async ({ productPage }) => {
            await productPage.openCartPage();
        });

        test('CT-001: Verify Cart Page Opens Correctly ', async ({ cartPage }) => {
            await cartPage.verifyCartPageUrl();
            await cartPage.verifyCartPageTitle();
            await cartPage.verifyCheckoutButtonIsDisplayed();
            await cartPage.verifyContinueShoppingButtonIsDisplayed();

        });

        test('CT-002: Verify Empty Cart ', async ({ cartPage }) => {
            await cartPage.verifyCartPageUrl();
            await cartPage.verifyCartPageTitle();

            await cartPage.verifyCartIsEmpty();
            await cartPage.verifyContinueShoppingButtonIsDisplayed();
            await cartPage.verifyCheckoutButtonIsDisplayed();

        });

        test('CT-003: Verify Cart Page Buttons', async ({ cartPage }) => {
            await cartPage.verifyContinueShoppingButtonIsDisplayed();
            await cartPage.verifyCheckoutButtonIsDisplayed();
        });

        test('CT-013: Continue Shopping from Empty Cart ', async ({ productPage, cartPage }) => {
            await cartPage.verifyCartIsEmpty();
            await cartPage.continueShopping();
            await cartPage.verifyCartBadgeIsNotVisible();

            await productPage.verifyProductPageUrl();
            await productPage.verifyPageTitle();
            await productPage.verifyProductList();
        });
    });

    test.describe('Single Product Cart Tests', () => {

        test.beforeEach(async ({ productPage }) => {
            const productName = products.backpack.name;

            await productPage.addProductToCart(productName);
            await productPage.openCartPage();
        });

        test('CT-004: Verify Single Product in Cart ', async ({ productPage, cartPage }) => {
            const productNameBackpack = products.backpack.name;
            const productPriceBackpack = products.backpack.price;
            const productDescriptionBackpack = products.backpack.description;

            await productPage.verifyProductCartBadge(1);

            await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescriptionBackpack);
            await cartPage.verifyProductQuantity(productNameBackpack, 1);
            await cartPage.verifySpecificProductRemoveButtonIsDisplayed(productNameBackpack);
        });

        test('CT-005: Verify Product Description in Cart ', async ({ cartPage }) => {
            const productNameBackpack = products.backpack.name;
            const productPriceBackpack = products.backpack.price;
            const productDescriptionBackpack = products.backpack.description;

            await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescriptionBackpack);
        });

        test('CT-006: Verify Cart Badge Matches Cart Items ', async ({ productPage, cartPage }) => {
            const productNameBackpack = products.backpack.name;
            const productPriceBackpack = products.backpack.price;
            const productDescriptionBackpack = products.backpack.description;

            await productPage.verifyProductCartBadge(1);

            await cartPage.verifyCartItemCount(1);
            await cartPage.verifyCartBadgeCount(1);
            await cartPage.verifyProductInCart(productNameBackpack, productPriceBackpack, productDescriptionBackpack);

        });

        test('CT-009: Remove Single Product from Cart ', async ({ cartPage }) => {
            const backpackData = products.backpack;

            await cartPage.removeProductFromCart(backpackData.name);
            await cartPage.verifyProductIsRemoved(backpackData.name);
            await cartPage.verifyCartIsEmpty();
            await cartPage.verifyCartPageUrl();
        });

        test('CT-014: Continue Shopping with Product in Cart ', async ({ productPage, cartPage }) => {
            const backpackData = products.backpack;

            await cartPage.continueShopping();

            await productPage.verifyProductPageUrl();
            await productPage.verifyPageTitle();
            await productPage.verifyProductCartBadge(1);
            await productPage.openCartPage();

            await cartPage.verifyCartBadgeCount(1);
            await cartPage.verifyProductInCart(backpackData.name, backpackData.price, backpackData.description);
        });

        test('CT-015: Add Another Product After Continue Shopping ', async ({ productPage, cartPage }) => {
            const backpackData = products.backpack;
            const bikelightData = products.bikelight;

            await cartPage.continueShopping();

            await productPage.verifyProductPageUrl();
            await productPage.verifyProductCartBadge(1);
            await productPage.addProductToCart(bikelightData.name);
            await productPage.verifyProductCartBadge(2);
            await productPage.openCartPage();

            await cartPage.verifyProductInCart(backpackData.name, backpackData.price, backpackData.description);
            await cartPage.verifyProductInCart(bikelightData.name, bikelightData.price, bikelightData.description);
            await cartPage.verifyCartItemCount(2);
            await cartPage.verifyCartBadgeCount(2);
        });

        test('CT-016: Open Product Details from Cart ', async ({ cartPage, productDetailsPage }) => {
            const backpackData = products.backpack;

            await cartPage.openItemDetailsFromCart(backpackData.name);

            await productDetailsPage.verifyProductDetails(backpackData.name, backpackData.price, backpackData.description);
            await productDetailsPage.verifyRemoveButtonIsDisplayed();


        });


        test('CT-018: Verify Cart State After Visiting Product Details ', async ({ productPage, cartPage, productDetailsPage }) => {
            const backpackData = products.backpack;

            await cartPage.openItemDetailsFromCart(backpackData.name);

            await productDetailsPage.returnToProductsPage();

            await productPage.verifyProductCartBadge(1);
            await productPage.openCartPage();

            await cartPage.verifyProductInCart(backpackData.name, backpackData.price, backpackData.description);
        });

        test('CT-019: Verify Checkout Button Navigation ', async ({ cartPage, checkoutPage }) => {
            const backpackData = products.backpack;

            await cartPage.verifyProductInCart(backpackData.name, backpackData.price, backpackData.description);
            await cartPage.proceedToCheckout();
            await checkoutPage.verifyCheckoutInformationPageUrl();
            await checkoutPage.verifyCheckoutInformationPageTitle();

        });

        test('CT-020: Verify Product Data Before Starting Checkout ', async ({ productPage, cartPage }) => {
            const backpackData = products.backpack;

            await productPage.verifyProductCartBadge(1);

            await cartPage.verifyCartBadgeCount(1);
            await cartPage.verifyProductInCart(backpackData.name, backpackData.price, backpackData.description);
            await cartPage.verifyProductQuantity(backpackData.name, 1);
            await cartPage.verifyCheckoutButtonIsDisplayed();
        });
    });

    test.describe('Two Product Cart Tests', () => {

        test.beforeEach(async ({ productPage }) => {
            const backpackData = products.backpack;
            const bikelightData = products.bikelight;

            await productPage.addProductToCart(backpackData.name);
            await productPage.addProductToCart(bikelightData.name);
            await productPage.openCartPage();
        });

        test('CT-007: Add Two Products and Verify Both in Cart ', async ({ productPage, cartPage }) => {
            const backpackData = products.backpack;
            const bikelightData = products.bikelight;

            await productPage.verifyProductCartBadge(2);

            await cartPage.verifyProductInCart(backpackData.name, backpackData.price, backpackData.description);
            await cartPage.verifyProductInCart(bikelightData.name, bikelightData.price, bikelightData.description);
            await cartPage.verifyCartItemCount(2);
            await cartPage.verifyCartBadgeCount(2);
        });

        test('CT-008: Verify Quantity for Multiple Products ', async ({ cartPage }) => {
            const backpackData = products.backpack;
            const bikelightData = products.bikelight;

            await cartPage.verifyProductQuantity(backpackData.name, 1);
            await cartPage.verifyProductQuantity(bikelightData.name, 1);
            await cartPage.verifyCartItemCount(2);
        });

        test('CT-010: Remove One Product from Multiple Cart Items ', async ({ productPage, cartPage }) => {
            const backpackData = products.backpack;
            const bikelightData = products.bikelight;

            await productPage.verifyProductCartBadge(2);

            await cartPage.removeProductFromCart(backpackData.name);
            await cartPage.verifyProductIsRemoved(backpackData.name);
            await cartPage.verifyCartBadgeCount(1);
            await cartPage.verifyProductInCart(bikelightData.name, bikelightData.price, bikelightData.description);
            await cartPage.verifyCartItemCount(1);
        });

        test('CT-011: Remove All Products from Cart ', async ({ cartPage }) => {
            const backpackData = products.backpack;
            const bikelightData = products.bikelight;

            await cartPage.removeProductFromCart(backpackData.name);
            await cartPage.removeProductFromCart(bikelightData.name);
            await cartPage.verifyCartIsEmpty();
            await cartPage.verifyCartPageUrl();
        });

        test('CT-012: Verify Remove Button Belongs to Correct Product ', async ({ cartPage }) => {
            const backpackData = products.backpack;
            const bikelightData = products.bikelight;

            await cartPage.removeProductFromCart(bikelightData.name);
            await cartPage.verifyProductInCart(backpackData.name, backpackData.price, backpackData.description);
            await cartPage.verifyProductIsRemoved(bikelightData.name);
            await cartPage.verifyCartItemCount(1);
            await cartPage.verifyCartBadgeCount(1);
        });
    });

    test('CT-017: Verify Cart Data Matches Product Listing ', async ({ productPage, cartPage }) => {
        const productNameBackpack = products.backpack.name;

        const productPageName = await productPage.getProductName(productNameBackpack);
        const productPagePrice = await productPage.getProductPrice(productNameBackpack);
        const productPageDesc = await productPage.getProductDescription(productNameBackpack);
        await productPage.addProductToCart(productNameBackpack);
        await productPage.openCartPage();

        await cartPage.verifyProductInCart(productPageName!, productPagePrice!, productPageDesc!);

    });

});